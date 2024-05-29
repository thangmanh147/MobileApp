
import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
    Platform,
    ScrollView,
    TextInput, BackHandler, ImageBackground, FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {widthPercentageToDP, heightPercentageToDP} from "../../config/ConfigResponsive";
import {renderVND} from "../../components/Functions";
import SimpleToast from "react-native-simple-toast";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import Nav from "../../components/Nav";
import FastImage from 'react-native-fast-image'
import { Color } from '../../config/System';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

const { width, height } = Dimensions.get('window');
const valueScaleWindowWidth = function (percent) {
    return (Dimensions.get('window').width / 100) * percent;
};

class CivilDetailBuy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listSupplier: '',
            checkbox: false,
            discountCodeCollaborator: '',
            discountCode: [],
            totalDiscountInputCode: 0,
            totalDiscountCollaboratorCode: 0,
            typeRender: '1',
            arrayListInputDiscountCode: [],
            arrayPackageOptionalForTNDS: [

            ],
            txtOptionalTitle: '',
            txtOptional:10000000,
            txtOptionalPrice: '',
            txtOptionalTargetId: '',
            txtMandatory: '',
            txtMandatoryPrice: '',
            txtMandatoryTargetId: '',
            displayFormOptional: false,
            txtSupplier: '',
            supplier_id: '',
            package_id: '',
            vatMadatory: 0,
            vatOptional: 0,
            str_compensation_amount_mandatory: '',
            listInsurance :[
                {
                    icon:require('../../icons/iconAgent/PTI_1.png'),
                    title:'Bảo hiểm PTI'
                },{
                    icon:require('../../icons/iconAgent/BIC.png'),
                    title:'Bảo hiểm BIDV'
                },{
                    icon:require('../../icons/iconAgent/BSH.png'),
                    title:'Bảo hiểm BSH'
                },{
                    icon:require('../../icons/iconAgent/VNI.png'),
                    title:'Bảo hiểm VNI'
                }
            ],
            numColumns: 2
        }
    }



    getDiscountCode() {
        const { discountCodeCollaborator ,discountCode} = this.state;
        var dataPassApi = [];
        if (discountCode.length > 0 && (discountCodeCollaborator)) {
            for (let i = 0; i < discountCode.length; i++) {
                dataPassApi.unshift(discountCode[i].code)
            }
            dataPassApi.unshift(discountCodeCollaborator);
            return dataPassApi;
        } else if (discountCode.length > 0) {
            for (let i = 0; i < discountCode.length; i++) {
                dataPassApi.unshift(discountCode[i].code)
            }
            return dataPassApi;
        } else if (discountCodeCollaborator) {
            dataPassApi.unshift(discountCodeCollaborator);
            return dataPassApi;
        } else {
            return dataPassApi;
        }
    }


    async getInsuranceSupplier() {
        const { dataVehicle, dataOwner, dataReceiver } = this.props;
        const body = {
            "function":"InsoSupplierApi_getListSupplierForTNDS",
            "params": {
                "vehicle_purpose_id":dataVehicle.vehicle_purpose_id,
                "number_seats":dataVehicle.txtSeat,
                "weight":dataVehicle.txtWeight,
                "pickup": dataVehicle.pickup == 'Không' ? false : true,
                "buyer_mobile":dataOwner.txtPhone,
                "buyer_wards_id":dataOwner.idCommune,
            },
        }
        const data = await HTTP.post(body);
        if (data.result_code === '0000') {
            const getPackpageFirst = data.result_data.list_supplier[0];
            this.setState({
                listSupplier: data.result_data.list_supplier
            }, () => this.getPackageForTNDS(getPackpageFirst))
        } else if (data.code == '1001') {
            SimpleToast.show(data.result_message);
            Actions.login({type: 'reset'});
            return;
        } else {
            SimpleToast.show(data.result_message);
            return;
        }
    }




    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        Actions.tab({type: 'reset'})
        return true;
    }
    activeCheckbox = () => {
        let disCountCode = this.state.discountCode
        this.setState({
            checkbox: !this.state.checkbox,
            displayFormOptional: false
        })
        // this.props.deleteFlightDiscountCode(disCountCode)
    }
    checkGiftCode = ()=>{

    }

    displayInputDiscountCode() {
        return (
            <View style={{flexDirection: 'row', height: 50, paddingTop: 10}}>
                <TouchableOpacity style={{flex: 7,}}>
                    <TextInput
                        editable={this.state.submitAgain ? false :true}
                        placeholder={'Mã khuyến mại của bạn…'}
                        style={{borderWidth: 0.5,borderRadius: 5,borderColor: this.state.showErrorSaleCode ? 'red':'#D8D8D8',flex: 1, paddingLeft: 5}}
                        onChangeText={text => this.setState({giftCode: text})}
                        value={this.state.giftCode}
                    />
                </TouchableOpacity>
                <View style={{flex: 0.5}}/>
                <TouchableOpacity
                    disabled={!this.state.submitAgain ? false :true}
                    style={{flex: 2.5,alignItems: 'center',backgroundColor: !this.state.submitAgain ? Color : 'gray',borderRadius: 10,justifyContent: 'center'}}
                    onPress={() => this.checkGiftCode()}
                >
                    <Text style={{color: 'white'}}>{'Áp dụng'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // addDiscount() {
    //     const  {checkbox} = this.state ;
    //     const inso_product_target = checkbox == false ? [
    //         {
    //             "inso_product_target_id":this.state.txtMandatoryTargetId,
    //             "inso_benefit_ids":[]
    //         }
    //     ] : [
    //         {
    //             "inso_product_target_id":this.state.txtMandatoryTargetId,
    //             "inso_benefit_ids":[]
    //         },
    //         {
    //             "inso_product_target_id":this.state.txtOptionalTargetId,
    //             "inso_benefit_ids":[]
    //         }
    //     ]
    //     return (
    //         <TouchableOpacity
    //             onPress={() => Actions.DiscountCodeCivil({
    //                 product_targets: inso_product_target,
    //                 package_id: this.state.package_id,
    //                 insurance_amount: 0,
    //             })}
    //             style={styles.ctBgPrice}>
    //             <View style={{flex: 1.5, justifyContent: 'center'}}>
    //                 <Text style={{paddingLeft: 15}}>Ưu đãi</Text>
    //             </View>
    //             <View style={{flex: 3,flexDirection:'row',}}>
    //                 <View style={styles.buttonDiscountCode}>
    //                     <Text style={{}}>Chọn mã giảm giá</Text>
    //                 </View>
    //             </View>
    //             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //                 <Image resizeMode={'contain'} style={{width: 23, height: 18,}}
    //                        source={require('../../../icons/collaborator/car/next.png')}/>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    displayListDiscount() {
        const { arrayListInputDiscountCode,discountCodeCollaborator,totalDiscountCollaboratorCode,checkbox } = this.state;
        const inso_product_target = checkbox == false ? [
            {
                "inso_product_target_id":this.state.txtMandatoryTargetId,
                "inso_benefit_ids":[]
            }
        ] : [
            {
                "inso_product_target_id":this.state.txtMandatoryTargetId,
                "inso_benefit_ids":[]
            },
            {
                "inso_product_target_id":this.state.txtOptionalTargetId,
                "inso_benefit_ids":[]
            }
        ]
        return (
            <TouchableOpacity
                onPress={() => Actions.DiscountCodeCivil({
                    product_targets: inso_product_target,
                    package_id: this.state.package_id,
                    insurance_amount: 0,
                })}
                style={styles.containDiscountCodeForm}>
                <View style={{justifyContent: 'center'}}>
                    <Text>Mã giảm giá</Text>
                </View>
                <View style={{flex: 1,flexDirection:'row',flexWrap:'wrap'}}>
                    {
                        arrayListInputDiscountCode.length > 0 ? arrayListInputDiscountCode.map((item,index) => {

                            return (
                                <View key={index} style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                    <View style={{flex:1,paddingLeft:20,flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                        <FastImage resizeMode={'contain'} style={{width: 6, height: 6,justifyContent:'flex-end',alignItems:'flex-end'}}
                                               source={require('../../icons/ic_dot.png')}/>
                                        <Text style={{ fontSize: 13, textAlign:'left',flex:1}}> {item.code}</Text>
                                    </View>
                                    <Text style={{color:'#F97C7C', fontSize: 13, flex:1}}>- {renderVND(item.discount_amount)+ 'đ'}</Text>
                                </View>
                            )
                        }) : null
                    }
                    {
                        discountCodeCollaborator ?
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                <View style={{flex:1,paddingLeft:20,flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                    <FastImage resizeMode={'contain'} style={{width: 6, height: 6,justifyContent:'flex-end',alignItems:'flex-end'}}
                                           source={require('../../icons/ic_dot.png')}/>
                                    <Text style={{ fontSize: 13, textAlign:'left',flex:1}}> {discountCodeCollaborator}</Text>
                                </View>
                                <Text style={{color:'#F97C7C', fontSize: 13, flex:1}}>- {renderVND(totalDiscountCollaboratorCode)+ 'đ'}</Text>
                            </View> : null
                    }
                </View>
                {/*<TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}*/}
                {/*                  onPress={() => Actions.DiscountCodeCivil({*/}
                {/*                      product_targets: inso_product_target,*/}
                {/*                      package_id: this.state.package_id,*/}
                {/*                      insurance_amount: 0,*/}
                {/*                  })}*/}
                {/*>*/}
                {/*    <Image resizeMode={'contain'} style={{width: 20, height: 18,}}*/}
                {/*           source={require('../../../icons/collaborator/car/next.png')}/>*/}
                {/*</TouchableOpacity>*/}
            </TouchableOpacity>
        )
    }

    displayFormOptional() {
        const { arrayPackageOptionalForTNDS } = this.state;
        if (arrayPackageOptionalForTNDS.products.length > 0) {
            this.setState({
                displayFormOptional: !this.state.displayFormOptional
            })

        } else {
            this.getPackageForTNDS('clickOptional');
        }
    }

    addOptional(item) {
        let disCountCode= this.state.discountCode
        this.setState({
            txtOptionalTargetId: item.product_target_id,
            txtOptional: item.max_compensation_amount,
            txtOptionalPrice: item.price,
            displayFormOptional: !this.state.displayFormOptional,
            vatOptional: item.vat
        })
        this.props.deleteFlightDiscountCode(disCountCode)
    }

    displayFormChooseOptional() {
        const { arrayPackageOptionalForTNDS, txtOptionalTargetId,txtOptionalPrice } = this.state;
        return (
            <View style={{
                marginTop: 0,
                marginBottom: 15,
                paddingVertical: 5,
                flexDirection: 'row'
            }}
            >
                <View style={{
                    flex:1,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    // shadowColor: '#999',
                    // shadowOffset: {width: 0,height: 0},
                    // shadowRadius: Platform.OS === 'ios' ? 5 : 1,
                    // shadowOpacity:Platform.OS === 'ios' ? 0.3 : 0,
                    // elevation: Platform.OS === 'ios' ? 5 : 1,
                    borderWidth:1,
                    borderColor:'#F0F0F0',
                    paddingHorizontal:10,
                }}>
                    {
                        arrayPackageOptionalForTNDS.products.map((item,index) => {
                            return (
                                <TouchableOpacity disabled={txtOptionalTargetId == item.product_target_id ? true : false} onPress={() => this.addOptional(item)} key={index} style={styles.formChoose}>
                                    <Text style={{color: txtOptionalTargetId == item.product_target_id ? Color : '#666666', textAlign:'left'}}>{item.max_compensation_amount/1000000+' triệu đồng/người/ vụ'}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <TouchableOpacity onPress={() => this.setState({ displayFormOptional: false })} style={{justifyContent:'center',alignItems:'center', backgroundColor:'white'}}>
                    <Text style={{ fontSize: valueScaleWindowWidth(3.4),paddingHorizontal:10,color: 'white',fontWeight: "600"}}>{renderVND(txtOptionalPrice)}đ</Text>
                </TouchableOpacity>
            </View>
        )
    }

    setPackage(item) {
        let disCountCode = this.state.discountCode
        this.getPackageForTNDS(item);
        this.props.deleteFlightDiscountCode(disCountCode)
    }

    renderItem = ({item, index}) => {
        console.log(index)
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View style={[styles.item, {height: (Dimensions.get('window').width - 150) / this.state.numColumns}]}>
                <TouchableOpacity onPress={() => this.onChooseInsurance(index)} style={{justifyContent:'center',alignItems:'center',padding:20}}>
                    <View style={{flex:2,justifyContent:'center'}}>
                        <FastImage source={item.icon} style={{height:70,width:70}} resizeMode={'center'}/>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'center',color:'#5B5B5B',fontSize:14}}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    formatRow = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    }


    render() {
        const { listSupplier,arrayListInputDiscountCode,checkbox,txtMandatory,txtMandatoryPrice,loading,discountCode,
            supplier_id,discountCodeCollaborator,totalDiscountInputCode,txtOptional,txtOptionalPrice,displayFormOptional,
            totalDiscountCollaboratorCode, typeRender, arrayPackageOptionalForTNDS,txtOptionalTitle,
            vatMadatory,vatOptional,str_compensation_amount_mandatory
        } = this.state;
        const totalDiscount = totalDiscountInputCode  + totalDiscountCollaboratorCode;
        const totalPrice = txtMandatoryPrice +  (checkbox == true ? txtOptionalPrice : 0);
        const totalVat = vatMadatory +  (checkbox == true ? vatOptional : 0);
        return (
            <View style={styles.container}>
                <Nav isInfo={false} show={true} title={'CHI TIẾT MUA BẢO HIỂM'}
                    bottom={20}
                    onPress={() => Actions.pop()}/>
                {loading ? <Loading /> : null}
                <ScrollView style={{flex: 1,marginTop:-50}}>
                    <View style={{paddingBottom:20}}>
                        <FlatList
                            data={this.formatRow(this.state.listInsurance, this.state.numColumns)}
                            style={{marginTop:10,marginHorizontal:20}}
                            horizontal={false}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={item => this.renderItem(item)}

                        />
                    </View>
                    <View style={{marginHorizontal: 15,backgroundColor:'#ffffff'}}>
                        <View style={{justifyContent:'center',backgroundColor:'#D5F2F2',padding:15,borderRadius:10,paddingLeft:30}}>
                            <Text style={{height:20,color: Color,fontWeight: '600',fontSize:valueScaleWindowWidth(4)}}>Chọn quyền lợi, mức bảo hiểm</Text>
                        </View>

                                <View>
                                    <View style={{flex:1,flexDirection: 'row',marginTop:20}}>
                                        <View style={{flex: 1}}>
                                            <View style={{flexDirection: 'row',flex: 1,justifyContent: 'center',alignItems: 'center'}} >
                                                <View style={styles.ctChecked}>
                                                    <FastImage style={{width: 15, height: 13 * 22 / 27}}
                                                           source={require('../../icons/iconAgent/ic_check.png')}/>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{flex: 9, justifyContent: 'center',}}>
                                            <Text style={{fontSize: valueScaleWindowWidth(3.8),fontWeight:'600',color:'#B3B2B3',paddingLeft:5,}}>{'Bảo hiểm trách nhiệm dân sự bắt buộc'}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',borderWidth:1,marginTop:20,borderColor:'#F0F0F0', borderRadius: 10}}>
                                        <View style={styles.subContain1}>
                                            <View style={{flex:1,borderBottomWidth: 1,borderColor:'#F0F0F0',justifyContent:'center', paddingLeft: 10}}>
                                                <Text style={styles.txtHuman}>Về người</Text>
                                            </View>
                                            <View style={{flex:1,justifyContent:'center', paddingLeft: 10}}>
                                                <Text style={styles.txtHuman}>Về tài sản</Text>
                                            </View>
                                        </View>

                                        <View style={styles.subContain2}>
                                            <View style={styles.containInfor}>
                                                <Text style={styles.txtMoney}>{str_compensation_amount_mandatory} đồng/ người/ vụ</Text>
                                            </View>
                                            <View style={styles.containInfor}>
                                                <Text style={styles.txtMoney}>{str_compensation_amount_mandatory} đồng/ vụ</Text>
                                            </View>
                                        </View>
                                        <View style={styles.subContain3}>
                                            <Text style={styles.txtMoney2}>{renderVND(txtMandatoryPrice)}đ</Text>
                                        </View>

                                    </View>
                                    <View style={{ flex:1,flexDirection: 'row', marginTop:20 }}>
                                        <View style={{flex: 1}}>
                                            <TouchableOpacity style={{flexDirection: 'row',flex: 1,justifyContent: 'center',alignItems: 'center'}} onPress={() => this.activeCheckbox()}>
                                                {
                                                    this.state.checkbox ?
                                                        <View style={[styles.ctChecked,{backgroundColor: Color}]}>
                                                            <FastImage style={{width: 15, height: 15 * 22 / 27}}
                                                                   source={require('../../icons/iconAgent/ic_check.png')}/>
                                                        </View> : <View style={styles.ctCheck}/>
                                                }
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flex: 9, justifyContent: 'center',}}>
                                            <Text style={{fontSize: valueScaleWindowWidth(3.8),fontWeight:'600',paddingLeft:5,}}>{'Bảo hiểm tai nạn, lái xe, phụ xe, người ngồi trên xe'}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',borderWidth:1,marginTop:20,borderColor:'#F0F0F0', borderRadius: 10}}>
                                        <TouchableOpacity
                                            onPress={() => this.displayFormOptional()}
                                            disabled={checkbox ? false : true }
                                            style={{flex:1,borderRightWidth:1,marginLeft: 20,borderColor:'#F0F0F0',flexDirection:'row',paddingVertical: 10,alignItems:'center',justifyContent: 'space-around'}} >
                                            <Text numberOfLines={2} style={styles.txtPersonOnVehicle}>{(txtOptional/1000000) + ' triệu đồng/ vụ'}</Text>
                                            <View style={{marginHorizontal: 5}}>
                                                <IconDownSvg width={10} height={10} />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{
                                                fontSize: valueScaleWindowWidth(3.4),
                                                paddingHorizontal:10,color: '#333333',
                                                fontWeight: "600"}}>{renderVND(txtOptionalPrice)}đ</Text>
                                        </View>
                                    </View>
                                    { displayFormOptional && arrayPackageOptionalForTNDS.products.length > 0 ? this.displayFormChooseOptional() : null}
                                    {/*{*/}
                                    {/*    typeRender && typeRender == '6' ? this.displayInputDiscountCode() :*/}
                                    {/*        (arrayListInputDiscountCode && arrayListInputDiscountCode.length > 0) || discountCodeCollaborator  ? this.displayListDiscount() : this.addDiscount()*/}
                                    {/*}*/}
                                    <View style={{marginTop:10,paddingVertical:10, backgroundColor: '#ECECEC',paddingHorizontal:10,borderWidth:1,borderColor:'#F0F0F0',borderRadius: 10}}>
                                        <View style={styles.containTotalInfor}>
                                            <Text style={styles.txtFeetotal}>Phí bảo hiểm 1 năm</Text>
                                            <Text style={styles.txtFeetotal}>{renderVND((totalPrice - totalVat).toFixed(0))}đ</Text>
                                        </View>
                                        <View style={styles.containTotalInfor}>
                                            <Text style={styles.txtFeetotal}>Thuế VAT</Text>
                                            <Text style={styles.txtFeetotal}>{renderVND(totalVat)}đ</Text>
                                        </View>
                                        <View style={{marginVertical: 10,borderBottomWidth: 1,borderColor: '#DEDEDE'}}/>
                                        <View style={styles.containTotalInfor}>
                                            <Text style={styles.txtTotalMoney}>Tổng cộng</Text>
                                            <Text style={styles.txtTotalMoney}>{renderVND(totalPrice-totalDiscount)}đ</Text>
                                        </View>
                                    </View>
                                </View>


                    </View>
                </ScrollView>
                <View style={{flex:0.1,justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <Button
                        label='Tiếp Theo'
                        height={45}
                        marginTop={-5}
                        onPress={() => this.continue()}
                    />
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'white'
    },
    ctCheck: {
        height: 21,
        width: 21,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: Color
    },
    ctChecked: {
        backgroundColor: '#96E2E1',
        height: 21,
        width: 21,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtHuman: {
        fontSize: valueScaleWindowWidth(3.5),
        color: '#333333',
        textAlign:'left',
        paddingVertical: 10
    },
    txtMoney: {
        fontSize: valueScaleWindowWidth(3.4),
        textAlign:'left',
        paddingVertical: 10
    },
    containInfor: {
        flex:1,
        borderBottomWidth: 1,
        borderColor:'#F0F0F0',
        justifyContent:'center',
        paddingLeft: 10
    },
    txtMoney2: {
        fontSize: valueScaleWindowWidth(3.4),
        color: '#333333',
        fontWeight: "600",
    },
    subContain1: {
        flex:2.5,
        borderRightWidth:1,
        borderColor:'#F0F0F0'
    },
    subContain2: {
        flex:5,
        borderRightWidth:1,
        borderColor:'#F0F0F0'
    },
    subContain3: {
        paddingHorizontal: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    textHeadTitle: {
        paddingTop:10,
        fontSize:valueScaleWindowWidth(3.6)
    },
    txtTitle: {
        fontSize:valueScaleWindowWidth(3.6),
        textAlign:'center',
        paddingHorizontal: 2,
        marginTop: 10
    },
    txtPersonOnVehicle: {
        flex:1,
        textAlign:'left',
        lineHeight: 19,
        fontSize: valueScaleWindowWidth(3.4),
        color: '#333333',
        fontWeight: "400"
    },
    containTotalInfor: {
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingVertical: 5
    },
    txtFeetotal: {
        fontSize: valueScaleWindowWidth(3.6),
        color: '#666666'
    },
    txtTotalMoney: {
        fontSize: valueScaleWindowWidth(3.7),
        color: Color,
        fontWeight: "600"
    },
    ctBgPrice: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        flexDirection: 'row',
        height: 70,
        marginTop: 10,
        backgroundColor: '#FFFFFF'
    },
    buttonDiscountCode:{
        marginVertical: 15,
        borderRadius: 15,
        borderWidth: 1,
        flex:1,
        borderColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containDiscountCodeForm: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 10,
        marginHorizontal:20,
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    formChoose: {
        paddingVertical: 10,
        paddingLeft: 10
    },
    item: {
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor:'#ffffff',


    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
})




const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default (CivilDetailBuy);

