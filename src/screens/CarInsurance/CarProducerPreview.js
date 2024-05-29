import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Keyboard,
    Alert,
    BackHandler,
    Dimensions,
    TouchableOpacity, ImageBackground, Image
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view/index';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import InputProducer from '../../components/buy/InputProducer';
import InputYear from '../../components/buy/InputYear';
import Button from "../../components/buy/Button";
import InputModel from '../../components/buy/InputModel';
import InputSeat from '../../components/buy/InputSeat';
import InputPurpose from '../../components/buy/InputPurpose';
import FooterButton from '../../components/FooterButton';
import Drawer from 'react-native-drawer';
import Information from '../../components/Information';
import { ScaledSheet } from 'react-native-size-matters';
import {renderVND} from '../../components/Functions';
import FastImage from 'react-native-fast-image'
// import {renderVND} from '../../../components/Functions';
let HTTP = require('../../services/HTTP');
const { height, width } = Dimensions.get('window');
class CarProducerPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idProducer: null,
            idModel: null,
            car: {},
            openYear: null,
            year: '',
            producer: '',
            openProducer: null,
            model: '',
            openModel: null,
            seat: '',
            purpose:'',
            openSeat: null,
            producers: [],
            checkDisplayText: false,
            payload:'',
            valueCar:'',
            openPurpose: null,
            openGetPurpose:null,
            openGetBrand:null,
            has_weight: false,
            vehicle_purpose_id: '',

            notValidWeight: false,
            WeightValidateErrorCode: false,

            notValidValue: false,
            ValueValidateErrorCode: false,
            checkValueCar: false,

            PurposeUsingValidateErrorCode: false,
            SeatUsingValidateErrorCode: false,
            ProducerUsingValidateErrorCode: false,
            YearUsingValidateErrorCode: false,
            ModelUsingValidateErrorCode: false,
            brandCarErrorCode:false,
            modalBackHome: false,
            //updatenewshowroomcar
            purpose_id:'',
            brand_car:'',
            onActive :'personal',
        };
    }

    componentWillMount = () => {
        // this.setState({openGetPurpose: true, checkDisplayText: true});
        this.setState({checkDisplayText: true});
        // var body = {
        //     function: 'InsoSupplierApi_searchProducerCar',
        //     params: {
        //         keyword: ''
        //     }
        // }
        // this.props.searchProducer(body)
    };

    // componentWillReceiveProps = (nextProps) => {
    // 	if(nextProps.carBuy.producer) {
    // 	this.setState({
    // 		producers: nextProps.carBuy.producer
    // 	})
    // 	}
    // 	if(nextProps.carBuy.years) {
    // 		this.setState({
    // 			years: nextProps.carBuy.years
    // 		})
    // 	}
    // 	if(nextProps.carBuy.models) {
    // 		this.setState({
    // 			models: nextProps.carBuy.models
    // 		})
    // 	}
    // 	if(nextProps.carBuy.seats) {
    // 		this.setState({
    // 			seats: nextProps.carBuy.seats
    // 		})
    // 	}
    // };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }


    handleBackPress = () => {
        Actions.pop()
        return true;
    }

    setIdProducer = (data) => {
        this.setState({
            idProducer: data.vehicle_producer_id,
            producer: data.name,
            year: '',
            idModel: '',
            model: '',
            checkValueCar: false,
            valueCar: '',
            payload: ''
        })
    }

    setYear = (data) => {
        this.setState({
            year: data.toString(),
            idModel: '',
            model: '',
            checkValueCar: false,
            valueCar: '',
            payload: ''
        })
        // var car = this.state.car;
        // car['year'] = year;
        // this.setState({year, car})
        // if (year) {
        //     if (year !== this.state.year) {
        //         this.props.setProducer('year')
        //         this.setState({
        //             idModel: null,
        //             model: '',
        //             seat: ''
        //         })
        //     }
        //     var body = {
        //         function: 'InsoSupplierApi_getModelCar',
        //         params: {
        //             vehicle_producer_id: this.state.idProducer,
        //             manufacture_year: year,
        //         },
        //     }
        //     this.props.getModel(body)
        // }
    }


    setSeat = (seat) => {
        this.setState({
            seat: seat.toString(),
            idProducer: '',
            producer: '',
            year: '',
            idModel: '',
            model: '',
            checkValueCar: false,
            valueCar: '',
            payload: ''
        });
        // var car = this.state.car;
        // car['seat'] = seat;
        // this.setState({seat, car})
    }

    next = () => {
        Keyboard.dismiss();
        let validateNum = /^[0-9]+$/;
        let re = /^[0-9\s\,\.]+$/;
        const {
            seat,year,vehicle_purpose_id,valueCar,payload,idModel, notValidValue,brand_car,
            producer, purpose_id, model, checkValueCar, has_weight, WeightValidateErrorCode,notValidWeight
        } = this.state;
        const { profile_id } = this.props;
        // console.log('payload.replace(",", ".") : ', parseFloat(payload.replace(",", ".")));
        if (purpose_id == '') {
            this.setState({PurposeUsingValidateErrorCode: true})
            return;
        }else if (brand_car == '') {
            this.setState({brandCarErrorCode: true})
            return;
        } else if (seat == '') {
            this.setState({SeatUsingValidateErrorCode: true})
            return;
        } else if (producer == '') {
            this.setState({ProducerUsingValidateErrorCode: true})
            return;
        } else if (year == '') {
            this.setState({YearUsingValidateErrorCode: true})
            return;
        } else if (model == '') {
            this.setState({ModelUsingValidateErrorCode: true})
            return;
        } else if (checkValueCar && valueCar.toString() == '') {
            this.setState({ValueValidateErrorCode: true})
            return;
        } else if (checkValueCar && valueCar < 1) {
            SimpleToast.show('Giá trị xe không hợp lệ.')
            return;
        }
        //  else if (notValidValue) {
        //     return;
        // }
        else if (has_weight && payload.trim() == '' ) {
            this.setState({WeightValidateErrorCode: true})
            return;
        } else if (notValidWeight) {
            return;
        } else if (has_weight && (parseFloat(payload.replace(",", ".").trim()) <= 0 || parseFloat(payload.replace(",", ".").trim()) > 300 ) ) {
            SimpleToast.show('Trọng tải xe không hợp lệ.')
            return;
        } else {
            const body = {
                "function":"InsoSupplierApi_checkManufactureYearAndPriceForCar",
                "params":{
                    "vehicle_purpose_id": vehicle_purpose_id,
                    "vehicle_model_id": idModel,
                    "number_seats": seat,
                    "manufacture_year": year,
                    "price": valueCar,
                    "weight": parseFloat(payload.replace(",", "."))
                }
            }
            // console.log('body: ', body);
            const car  = {
                name: producer,
                model: model,
                year: year,
                seat:seat ,
                purpose: purpose_id,
                payload: parseFloat(payload.replace(",", ".")),
                valueCar: valueCar,
                vehicle_model_id: idModel,
                vehicle_purpose_id: vehicle_purpose_id,
                brand_car: brand_car,
            }
            this.props.carGetPrice(body, car,profile_id)
        }
        // const {idModel, year, seat, idProducer} = this.state;
        // if (!idProducer) {
        //     SimpleToast.show('Bạn chưa nhập hãng xe');
        //     return
        // }
        // if (!year) {
        //     SimpleToast.show('Bạn chưa nhập năm sản xuất');
        //     return
        // }
        // // const now = (new Date()).getFullYear();
        // // if(now - Number(year) > 10) {
        // // 	SimpleToast.show('Gói bảo hiểm không tồn tại do xe cuả bạn sản xuất trên 10 năm');
        // // 	return
        // // }
        // if (!idModel) {
        //     SimpleToast.show('Bạn chưa nhập dòng xe');
        //     return
        // }
        // if (!seat) {
        //     SimpleToast.show('Bạn chưa nhập số chỗ ngồi');
        //     return
        // }
        // if (Number(seat) > 9) {
        //     SimpleToast.show('INSO hiện chỉ cung cấp gói bảo hiểm cho xe dưới 9 chỗ, không kinh doanh');
        //     return
        // }
        // Keyboard.dismiss()
        // var body = {
        //     function: 'InsoSupplierApi_getInsuranceAmountCar',
        //     params: {
        //         vehicle_model_id: idModel,
        //         manufacture_year: year,
        //         number_seats: seat
        //     },
        // }
        // this.props.resetProfileId()
        // this.props.carGetPrice(body, this.state.car)
    }

    gobackAndReset() {
        this.props.back == 'again' ? Actions.tab({type: 'reset'}) : Actions.pop();
    }

    back = () => {
        const { backTwoway } = this.props;
        if (backTwoway) {
            // Actions.popTo('IntroductionCar');
            Actions.tab({type: 'reset'})

        } else {
            const {openProducer, openModel, openYear, openSeat, idProducer} = this.state;
            if (openProducer || openModel || openYear || openSeat) {
                this.setState({
                    openProducer: null,
                    openModel: null,
                    openYear: null,
                    openSeat: null,
                })
                return
            }
            if (idProducer !== null) {
                this.setState({ modalBackHome: true})
                return;
                // Alert.alert(
                //     'Thông báo',
                //     'Nếu quay lại bạn sẽ phải điền lại thông tin xe',
                //     [
                //         {text: 'Huỷ'},
                //         {
                //             text: 'OK',
                //             onPress: () => this.props.back == 'again' ? Actions.tab({type: 'reset'}) : Actions.pop()
                //         },
                //     ],
                //     {cancelable: false}
                // )
                // return
            }
            if (this.props.back == 'again') {
                Actions.tab({type: 'reset'})
                return
            }

            Actions.pop()
        }
    }

    onChangeText = (text) => {
        // var a = this.props.carBuy.producer;
        // var b = [];
        // // text = text.replace(/\(/g,'').replace(/\)/g,'')
        // var newText = text.toUpperCase()
        // for (let i = 0; i < a.length; i++) {
        //     if (a[i].name.toUpperCase().indexOf(newText) > -1) {
        //         b.push(a[i])
        //     }
        // }
        // this.setState({producers: b})
        // // this.props.setId()
    }

    // onChangeTextModel(text) {
    //     var a = this.props.carBuy.models;
    //     var b = [];
    //     // text = text.replace(/\(/g,'').replace(/\)/g,'')
    //     var newText = text.toUpperCase()
    //     for (let i = 0; i < a.length; i++) {
    //         if (a[i].code.toUpperCase().indexOf(newText) > -1) {
    //             b.push(a[i])
    //         }
    //     }
    //     this.setState({models: b})
    // }

    // onChangeTextYear = (text) => {
    //     //     var a = this.props.carBuy.years;
    //     //     var b = [];
    //     //     // text = text.replace(/\(/g,'').replace(/\)/g,'')
    //     //     for (let i = 0; i < a.length; i++) {
    //     //         if (a[i].indexOf(text) > -1) {
    //     //             b.push(a[i])
    //     //         }
    //     //     }
    //     //     this.setState({years: b})
    //     //     // this.props.setId()
    //     // }

    // onChangeTextSeat = (text) => {
    //     var a = this.props.carBuy.seats;
    //     var b = [];
    //     // text = text.replace(/\(/g,'').replace(/\)/g,'')
    //     for (let i = 0; i < a.length; i++) {
    //         // if(a[i].search(text) == 0) {
    //         // 	b.push(a[i])
    //         // }
    //         if (a[i].indexOf(text) > -1) {
    //             b.push(a[i])
    //         }
    //     }
    //     this.setState({seats: b})
    // }

    closeInputSearch(conditional) {
        this.setState({
            openProducer: false,
            openYear: false,
            openModel: false,
            openSeat: false,
            checkDisplayText: false
        })
    }

    setProducer = (data) => {
        this.setIdProducer(data.vehicle_producer_id, data.name)
        this.closeInputSearch()
    }
    setProducerYear = (data) => {
        this.setYear(data)
        this.closeInputSearch();
    }

    setModel(data) {
        this.setIdModel(data.vehicle_model_id, data.code)
        this.closeInputSearch();
    }

    setSeatItem(data) {
        this.setSeat(data)
        this.closeInputSearch();
    }

    setShowModal(modal) {
        if (modal == 'openProducer') {
            this.setState({
                openProducer: true,
                openYear: false,
                openModel: false,
                openSeat: false,
                checkDisplayText: true
            })
        } else if (modal == 'openYear') {
            this.setState({
                openProducer: false,
                openYear: true,
                openModel: false,
                openSeat: false,
                checkDisplayText: true
            })
        } else if (modal == 'openModel') {
            this.setState({
                openProducer: false,
                openYear: false,
                openModel: true,
                openSeat: false,
                checkDisplayText: true
            })
        } else {
            this.setState({
                openProducer: false,
                openYear: false,
                openModel: false,
                openSeat: true,
                checkDisplayText: true
            })
        }

    }
    checkOpenModal = (condition)=>{
        if(condition == 'year'){
            if(this.state.producer === ''){
                SimpleToast.show('Bạn phải chọn hãng xe trước')
            }else{
                this.setState({openYear: true})
            }
        }else if(condition == 'typeCar'){
            if(this.state.year === ''){
                SimpleToast.show('Bạn phải chọn năm sản xuất trước')
            }else{
                this.setState({openModel: true})
            }
        }else if(condition == 'seat'){
            if(this.state.vehicle_purpose_id === ''){
                SimpleToast.show('Bạn phải chọn loại xe trước')
            }else{
                this.setState({openSeat: true})
            }
        }else if(condition == 'getPurpose'){
            this.setState({openGetPurpose: true})
        }else if(condition == 'openBrand'){
            if(this.state.purpose_id === ''){
                SimpleToast.show('Bạn phải chọn mục đích sử dụng trước')
            }else{
                this.setState({openGetBrand: true})
            }
        } else if (condition == 'producer'){
            if(this.state.seat === ''){
                SimpleToast.show('Bạn phải chọn số chỗ ngồi trước')
            }else{
                this.setState({openProducer: true})
            }
        }
    }

    // setPurpose(data) {
    //     this.setState({
    //         has_weight: data.has_weight,
    //         brand_car: data.name,
    //         vehicle_purpose_id: data.vehicle_purpose_id,
    //         seat: '',
    //         idProducer: '',
    //         producer: '',
    //         year: '',
    //         idModel: '',
    //         model: '',
    //         checkValueCar: false,
    //         valueCar: '',
    //         payload: ''
    //     })
    // }
    setBrand=(data)=>{
        this.setState({
            has_weight: data.has_weight,
            brand_car: data.name,
            vehicle_purpose_id: data.vehicle_purpose_id,
            seat: '',
            idProducer: '',
            producer: '',
            year: '',
            idModel: '',
            model: '',
            checkValueCar: false,
            valueCar: '',
            payload: ''
        })
    }
    setGetPurpose(data) {
        this.setState({
            purpose_id:data.id,
            purpose_name:data.name,
        })
    }

    assignValue(item, value) {
        const checkPlate = /^(\d{2})[A-Za-z]{1,2}[\-]{0,1}(\d{4,5})[TX]{0,1}$/;
        const input = value.replace(/\s+/g,'').trim();
        let re = /^[0-9\s\,\.]+$/;
        let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        let validateNumber = /^\d*$/;
        let validatePhone = /^\d{10,11}$/;
        let validateNum = /^[0-9]+$/;
        let validateEmail = /^([a-zA-Z0-9][a-zA-Z0-9_\-]*(([\.][a-zA-Z0-9_\-]*)*)[a-zA-Z0-9]@([a-zA-Z0-9][a-zA-Z0-9_\-]*[a-zA-Z0-9]\.)+([a-zA-Z0-9]{2,4}))$/;
        switch (item) {
            case 'weight':
                if (value.length > 0) {
                    if (re.test(value) == false) {
                        this.setState({ notValidWeight: true, WeightValidateErrorCode: false});
                    } else {
                        this.setState({
                            notValidWeight: false,
                            WeightValidateErrorCode: false
                        })
                    }
                } else {
                    this.setState({
                        notValidWeight: false,
                        WeightValidateErrorCode: false
                    })
                }
                this.setState({payload: value.replace(/\s+/g,'').trim()})
                return;
            case 'value':
                if (value == '') {
                    this.setState({valueCar: value})
                } else {
                    var b = value.replace(/\,/g, '')
                    var a = Number(b);
                    // if(isNaN(a) || !isFinite(a)) {
                    if (!isFinite(a)) {
                        return
                    }
                    this.setState({valueCar: a})
                }
            default:
                return;
        }
    }
    onPressGroup () {
        this.setState({
            onActive:'group'
        })
    }

    onPressPersonal () {
        this.setState({
            onActive:'personal'
        })
    }
    render() {
        const {
            openProducer, producer,ValueCarUsingValidateErrorCode,modalBackHome,
            openYear, year,YearUsingValidateErrorCode,ModelUsingValidateErrorCode,
            openModel, model,PurposeUsingValidateErrorCode,SeatUsingValidateErrorCode,
            openSeat, seat,valueCar,ValueValidateErrorCode,ProducerUsingValidateErrorCode,brandCarErrorCode,
            openGetBrand,openGetPurpose,purpose_name,idProducer,payload,notValidValue,checkValueCar,brand_car,
            PayloadValidateErrorCode,has_weight,vehicle_purpose_id,WeightValidateErrorCode,notValidWeight,purpose_id
        } = this.state;
        return (

            <Drawer
                openDrawerOffset={80}
                tapToClose={true}
                side={'right'}
                tweenHandler={(ratio) => ({
                    main: {opacity: (2 - ratio) / 2, backgroundColor: 'black'},

                })}
                ref={(ref) => this._drawer = ref}
                content={<Information/>}
            >
                {
                    openGetPurpose ?
                        <NewModalGetPurpose
                            open={openGetPurpose}
                            onClosed={() => this.setState({openGetPurpose: null})}
                            setGetPurpose={(data) => this.setGetPurpose(data)}
                        /> : null
                }
                {
                    openGetBrand ?
                        <NewModalBrandCar
                            open={openGetBrand}
                            onClosed={() => this.setState({openGetBrand: null})}
                            purpose_id={purpose_id}
                            setPurpose={(data) => this.setBrand(data)}
                        /> : null
                }
                {
                    openSeat ?
                        <NewModalSeat
                            open={openSeat}
                            onClosed={() => this.setState({openSeat: null})}
                            vehicle_purpose_id={vehicle_purpose_id}
                            setSeat={seat => this.setSeat(seat)}
                        /> : null
                }
                {
                    openProducer ?
                        <NewModalProducer
                            vehicle_purpose_id={vehicle_purpose_id}
                            seat={seat}
                            open={openProducer}
                            onClosed={() => this.setState({openProducer: null})}
                            setIdProducer={(id, name) => this.setIdProducer(id, name)}
                        /> : null
                }
                {
                    openYear ?
                        <NewModalYear
                            vehicle_purpose_id={vehicle_purpose_id}
                            seat={seat}
                            idProducer={idProducer}
                            open={openYear}
                            onClosed={() => this.setState({openYear: null})}
                            setYear={data => this.setYear(data)}
                        /> : null
                }
                {
                    openModel ?
                        <NewModalModel
                            vehicle_purpose_id={vehicle_purpose_id}
                            seat={seat}
                            idProducer={idProducer}
                            manufacture_year={year}
                            open={openModel}
                            onClosed={() => this.setState({openModel: null})}
                            setModel={(data) => this.setIdModel(data)}
                        /> : null
                }

                {/* {
                    openModel ?
                    <NewModalModel
                        open={openModel}
                        onClosed={() => this.setState({openModel: null})}
                        setModel={(id, code) => this.setIdModel(id, code)}
                    />  : null
                } */}

                <View style={Css.container}>
                    <Nav isInfo={false} show={true} title={'HOÀN THIỆN HỒ SƠ XE'}
                        bottom={20}
                        onPress={() => Actions.pop()}/>
                    <View style={{marginHorizontal:10,marginTop:-30}}>
                        <TouchableOpacity onPress={()=>this.onPressPersonal()} style={{height:'auto',backgroundColor:'#ffffff',marginHorizontal:10,borderRadius:10,shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3}}>
                            <View style={{justifyContent:'center'}}>
                                <FastImage source={require('../../screens/CarInsurance/image_giaydangkiem.png')}
                                       style={{height:200,width:'100%',borderRadius:10}}/>
                            </View>
                            <View style={{justifyContent:'center',flex:1}}>
                                <Text style={{color:this.state.onActive == 'personal' ? '#414042' :'#B3B2B3',fontWeight:'bold',fontSize:14}}>OCR giấy đăng kiểm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <KeyboardAwareScrollView style={{flex: 1}}>
                        <ScrollView keyboardShouldPersistTaps={'always'}>
                            <View style={{flex: 1, padding: 15,}}>

                                <InputPurpose
                                    openModal={() => this.checkOpenModal('getPurpose')}
                                    keyword={purpose_name}
                                    erroCodeValidate={PurposeUsingValidateErrorCode ? true : false}
                                />
                                <Input
                                    label='Giá trị xe'
                                    onChangeText={(value) => this.assignValue('value',value)}
                                    value={renderVND(valueCar)}
                                    keyboardType={'number-pad'}
                                    noIconWrite={true}
                                    isAcreage={'đ'}
                                    onFocus={() => this.checkFocus()}
                                    erroCodeValidate={ValueValidateErrorCode && valueCar == '' ? true : false}
                                />

                                        <View>
                                            <InputBrandCar
                                                openModal={() => this.checkOpenModal('openBrand')}
                                                keyword={brand_car}
                                                vehicle_purpose_id={vehicle_purpose_id}
                                                erroCodeValidate={brandCarErrorCode ? true : false}
                                            />
                                            <InputSeat
                                                model={true}
                                                openModal={() => this.checkOpenModal('seat')}
                                                keyword={seat}
                                                erroCodeValidate={SeatUsingValidateErrorCode ? true : false}
                                            />

                                            <InputProducer
                                                openModal={() => this.checkOpenModal('producer')}
                                                keyword={producer}
                                                erroCodeValidate={ProducerUsingValidateErrorCode ? true : false}
                                            />
                                            <InputYear
                                                openModal={() => this.checkOpenModal('year')}
                                                keyword={year}
                                                keyboardType='numeric'
                                                erroCodeValidate={YearUsingValidateErrorCode ? true : false}
                                            />
                                            <InputModel
                                                year={true}
                                                openModal={() => this.checkOpenModal('typeCar')}
                                                keyword={model}
                                                erroCodeValidate={ModelUsingValidateErrorCode ? true : false}
                                            />
                                            <Input
                                                // editable={false}
                                                label='Số khung'
                                                // value={chassicNumber}
                                                // onChangeText={(chassicNumber) => this.setState({chassicNumber:chassicNumber})}
                                                autoUpperCase={true}
                                            />
                                            <Input
                                                // editable={false}
                                                label='Số máy'
                                                // value={engineIdNumber}
                                                // onChangeText={(engineIdNumber) => this.setState({engineIdNumber:engineIdNumber})}
                                            />
                                            <Input
                                                autoUpperCase={true}
                                                label='Biển số xe'
                                                // value={plates.replace(/\s+/g,'').trim()}
                                                // onChangeText={(plates) => this.setState({plates})}
                                            />
                                        </View>



                                {/* {
                                    notValidValue ?
                                    <View style={{width: width}}>
                                        <Text style={styles.textError}>
                                        {'Giá trị xe không hợp lệ'}
                                        </Text>
                                    </View> : null
                                } */}
                                { has_weight ?
                                    <View style={{width: '100%'}}>
                                        <Input
                                            label='Trọng tải'
                                            onChangeText={(value) => this.assignValue('weight',value)}
                                            value={this.state.payload}
                                            keyboardType={'numeric'}
                                            noIconWrite={true}
                                            isAcreage={'Tấn'}
                                            onFocus={() => this.checkFocus()}
                                            erroCodeValidate={WeightValidateErrorCode && payload == '' ? true : false}
                                        />
                                    </View> : null
                                }
                                {
                                    notValidWeight  ?
                                        <View style={{width: width}}>
                                            <Text style={styles.textError}>
                                                {'Trọng tải không hợp lệ'}
                                            </Text>
                                        </View> : null
                                }
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                    <FooterButton>
                        <Button
                            label='Tiếp Theo'
                            marginTop={0}
                            onPress={this.next}
                        />
                    </FooterButton>
                    <ModalFlightNew
                        open={modalBackHome}
                        label2={'Hủy'}
                        button={true}
                        forceUpdate={true}
                        onPress={() => this.gobackAndReset()}
                        text='Nếu quay lại bạn sẽ phải điền lại thông tin xe?'
                        onPressButtonNo={() => this.setState({ modalBackHome: false })}
                    />
                </View>
            </Drawer>

        );
    }
}

const styles = ScaledSheet.create({
    textError: {
        color: '#F97C7C',
        fontSize: 12
    }
})

import {connect} from 'react-redux';
import ModalFlightNew from "../../components/buy/ModalFlightNew";
import SimpleToast from 'react-native-simple-toast';
import NewModalProducer from '../../components/buy/NewModalProducer';
import NewModalBrandCar from '../../components/buy/NewModalBrandCar';
import NewModalGetPurpose from '../../components/buy/NewModalGetPurpose';
import NewModalYear from '../../components/buy/NewModalYear';
import NewModalModel from '../../components/buy/NewModalModel';
import NewModalSeat from '../../components/buy/NewModalSeat';
import {Actions} from 'react-native-router-flux/';
import Input from "../../components/buy/Input";
import InputBrandCar from "../../components/buy/InputBrandCar";

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {

}
export default (CarProducerPreview);





