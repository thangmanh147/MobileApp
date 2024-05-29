
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
    TextInput,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    Linking,
    Animated,
    Dimensions, ImageBackground,
} from 'react-native';
import Nav from '../../components/Nav';
import InfoBuyer from '../../components/InfoBuyer';
import Css from '../../config/Css';
import InfoCar from '../../components/InfoCar';
import InfoPackage from '../../components/InfoPackage';
import InfoReject from '../../components/InfoReject';
import Button from '../../components/ButtonColor';
import ButtonNoColor from '../../components/ButtonNoColor';
import Loading from '../../components/Loading';
import Drawer from 'react-native-drawer';
import Information from '../../components/Information';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image'
import IconDownSvg from '../../config/images/icons/IconDownSvg';

const { width, height } = Dimensions.get('window');
let HTTP = require('../../services/HTTP');
class CarRegisterInsuranceInfo extends Component {
    constructor(props) {
        super(props);
        this.containerTop = new Animated.Value(20);
        this.state = {
            intro: 'Cảm ơn bạn đã đăng ký gói bảo hiểm của chúng tôi, khi bạn gặp bất cứ vấn đề gì của hợp đồng hay cần khiếu nại bồi thường, hãy liên hệ với chúng tôi ngay theo số Hotline 1900 232425',
            check: true,
            check1: true,
            data: {},
            data2:'',
            openCity: false,
            openDistrict: false,
            city: '',
            districts: [],
            district: '',
            address: '',
            has_contract_active: false,
            has_payment_online: false,
            status_code: '',
            note: '',

            discountCodeCollaborator: [],
            discountCode: [],
            totalDiscountInputCode: '',
            totalDiscountCollaboratorCode: '',
            user:'',
            arrayListInputDiscountCode: '',
        };
    }

    // componentWillMount = () => {
    //     var body = {
    //         function: 'SaleOrderApi_getInfoForCar',
    //         params: {
    //             "sale_order_id": this.props.sale_order_id
    //         },
    //     }
    //     this.props.contractInfo(body)
    // };




    keyboardDidShow = () => {
        Animated.timing(this.containerTop, {
            duration: 200,
            toValue: Platform.OS === 'ios' ? (height * 37) / 100 : (height * 0) / 100
        }).start();
    };
    keyboardDidHide = () => {
        Animated.timing(this.containerTop, {
            duration: 200,
            toValue: 20
        }).start();
    };

    // handleBackPress = () => {
    //     if(this.props.back === 'home') {
    //         Actions.tab({type: 'reset'})
    //         return true;
    //     }else {
    //         return false;
    //     }
    // }
    //
    // back = () => {
    //     if(this.props.back === 'home') {
    //         Actions.tab({type: 'reset'});
    //     } else {
    //         Actions.pop()
    //     }
    // }

    render() {
        // const { user } = this.props.profile;
        const {data2,note,has_payment_online,totalDiscountInputCode,totalDiscountCollaboratorCode,arrayListInputDiscountCode,discountCodeCollaborator,discountCode,
            has_contract_active,status_code,intro, check, address, check1, data, openCity, city, openDistrict, districts, district} = this.state;
        const total = totalDiscountInputCode  + totalDiscountCollaboratorCode
        return (
            <Drawer
                openDrawerOffset={80}
                tapToClose={true}
                side={'right'}
                tweenHandler={(ratio) => ({
                    main: {opacity: (2 - ratio) / 2, backgroundColor: 'black' },

                })}
                ref={(ref) => this._drawer = ref}
                content={<Information/>}
            >
                <View style={Css.container}>
                    <Nav show={true} isInfo={false} title={'THÔNG TIN ĐĂNG KÝ BẢO HIỂM XE'}
                        bottom={20}
                        onPress={() => Actions.pop()}/>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{flex: 1, position:'relative',marginTop:-30,}}>

                        <Animated.View style={{flex: 1,bottom:0, }}>
                            {/*<Text style={styles.intro}>{intro}</Text>*/}
                            <View style={styles.containTitle}>
                                <Text style={{
                                    color: '#F97C7C',
                                    lineHeight: 20,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                }}>Chú ý: </Text>
                                <View style={styles.containTxt}>
                                    <Text style={styles.txtDescribeNote}>{intro}</Text>
                                </View>

                            </View>
                            {
                                data.update_address_status ?
                                    <View style={{backgroundColor:'#ffffff'}}>
                                        <CtLabel label='A. Thông tin mua bảo hiểm'/>
                                        <View style={styles.ctContent}>
                                            <AppText style={styles.name}>{data.customer.fullname}</AppText>
                                            <View style={styles.ctItem}>
                                                <AppText style={styles.label}>Điện thoại</AppText>
                                                <AppText style={styles.value}>{data.customer.mobile}</AppText>
                                            </View>
                                            <TouchableOpacity onPress={() => this.setState({openCity: true})} style={styles.ctItem}>
                                                <AppText style={styles.label}>Tỉnh/Thành phố *</AppText>
                                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                                    {
                                                        city ?
                                                            <AppText style={styles.value}>{city.name}</AppText>
                                                            :
                                                            <AppText style={styles.label}>Chọn Tỉnh/TP</AppText>
                                                    }
                                                    <IconDownSvg width={10} height={10} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity disabled={city.id ? false : true} onPress={() => this.setState({openDistrict: true})} style={styles.ctItem}>
                                                <Text style={styles.label}>Quận huyện/Thị xã *</Text>
                                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                                    {
                                                        district ?
                                                            <Text style={styles.value}>{district.name}</Text>
                                                            :
                                                            <Text numberOfLines={1} style={styles.label}>Chọn Quận huyện/Thị xã</Text>
                                                    }
                                                    <IconDownSvg width={10} height={10} />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={styles.ctItem}>
                                                <Text style={styles.label}>Địa chỉ *</Text>
                                                <TextInput
                                                    value={address}
                                                    placeholder='Nhập địa chỉ của bạn'
                                                    placeholderTextColor='#999'
                                                    style={{
                                                        padding: 0,
                                                        flex: 1,
                                                    }}
                                                    multiline={true}
                                                    underlineColorAndroid={"#00000000"}
                                                    selectionColor={'#333'}
                                                    onChangeText={text => this.setState({address: text})}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <InfoBuyer data={data.customer ? data.customer : ''}/>
                            }
                            {/* <InfoBuyer data={data.customer ? data.customer : ''}/> */}
                            <InfoCar data={data.target ? data.target : ''}/>
                            <InfoPackage
                                // total_fee={data.total_fee ? data.total_fee : 0}
                                discount_amount={data.discount_amount ? data.discount_amount : 0}
                                dataTarget={data.target ? data.target : []}
                                data={data ? data : ''}
                                data2={data2 ? data2: ''}
                                dataGroupProducts={data.group_products ? data.group_products : []}
                                arrayListInputDiscountCode={this.state.arrayListInputDiscountCode}
                                discountCodeCollaborator={this.state.discountCodeCollaborator}
                                sale_order_id={this.props.sale_order_id}
                                totalDiscountCollaboratorCode={this.state.totalDiscountCollaboratorCode}
                                total={total}
                                // screen={this.props.load ? this.props.load  : ''}
                                // user={user && user.type ? user.type : '1' }
                            />
                            {
                                status_code == 'STATUS_PROFILE_OWE' ?
                                    <InfoReject
                                        data = {data ? data : ''}
                                        status_code={status_code}
                                    /> : null
                            }
                            {
                                data.exclusions ?
                                    data.exclusions.length == 0 ?
                                        null
                                        :
                                        <InfoReject
                                            data = {data ? data : ''}
                                            status_code={status_code}
                                        />
                                    : null
                            }
                            {/*{*/}
                            {/*    user && user.type == '6' ?*/}
                            {/*        <View>*/}
                            {/*            <View style={styles.containSection}>*/}
                            {/*                <AppText style={styles.txtTitle}>F. Ghi chú</AppText>*/}
                            {/*            </View>*/}
                            {/*            <View style={styles.formInput}>*/}
                            {/*                <TextInput*/}
                            {/*                    value={note}*/}
                            {/*                    placeholder='Nhập Nội dung'*/}
                            {/*                    placeholderTextColor='#999'*/}
                            {/*                    style={styles.txtInput}*/}
                            {/*                    multiline={true}*/}
                            {/*                    underlineColorAndroid={"#00000000"}*/}
                            {/*                    selectionColor={'#333'}*/}
                            {/*                    onChangeText={note => this.setState({note})}*/}
                            {/*                />*/}
                            {/*            </View>*/}
                            {/*        </View> : null*/}
                            {/*}*/}
                        </Animated.View>
                        <View style={styles.ctBottom}>
                            {/*{ has_payment_online && has_contract_active ?*/}
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                {
                                    check ?
                                        <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>
                                            <FastImage style={styles.icon} source={require('../../icons/iconAgent/ic_check.png')}/>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={styles.ctCheck}>
                                        </TouchableOpacity>
                                }
                                <Text style={styles.txt}>Tôi xác nhận các thông tin trên là đúng</Text>
                            </View>
                            {/*: null }*/}
                            {/*{ has_payment_online && has_contract_active ?*/}
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                {
                                    check1 ?
                                        <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>
                                            <FastImage style={styles.icon} source={require('../../icons/iconAgent/ic_check.png')}/>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={styles.ctCheck}>
                                        </TouchableOpacity>
                                }
                                <Text style={styles.txt}>Tôi xác nhận đã đọc, hiểu và đồng ý với các <Text onPress={() => Actions.infoCarExclusion()} style={styles.txtActive}>Điểm loại trừ </Text>và <Text onPress={() => Linking.openURL('http://inso.vn/images/app/quy-tac-82-bao-hiem-vat-chat-xe.pdf')} style={styles.txtActive}>Quy tắc bảo hiểm</Text></Text>
                            </View>
                            {/*: null }*/}


                            <View style={{flexDirection:'row'}}>


                                <Button
                                    label={'Thanh toán' }
                                    marginTop = {10}
                                    onPress={() => this.submitPay('nonactive')}
                                    flex={1}
                                />

                            </View>

                        </View>
                    </KeyboardAwareScrollView>

                    {/*{*/}
                    {/*    Platform.OS === 'ios' ?*/}
                    {/*        <KeyboardAvoidingView behavior='padding'>*/}
                    {/*            <View>*/}
                    {/*                {*/}
                    {/*                    this.props.load == 'CONTRACT_DETAIL' ?*/}
                    {/*                        null*/}
                    {/*                        :*/}
                    {/*                        <View style={styles.ctBottom}>*/}
                    {/*                            /!*{ has_payment_online && has_contract_active ?*!/*/}
                    {/*                                <View style={{flexDirection: 'row', alignItems: 'center',}}>*/}
                    {/*                                    {*/}
                    {/*                                        check ?*/}
                    {/*                                            <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>*/}
                    {/*                                                <Image style={styles.icon} source={require('../../icons/iconAgent/ic_check.png')}/>*/}
                    {/*                                            </TouchableOpacity>*/}
                    {/*                                            :*/}
                    {/*                                            <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={styles.ctCheck}>*/}
                    {/*                                            </TouchableOpacity>*/}
                    {/*                                    }*/}
                    {/*                                    <Text style={styles.txt}>Tôi xác nhận các thông tin trên là đúng</Text>*/}
                    {/*                                </View>*/}
                    {/*                            /!*: null }*!/*/}
                    {/*                            /!*{ has_payment_online && has_contract_active ?*!/*/}
                    {/*                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>*/}
                    {/*                                    {*/}
                    {/*                                        check1 ?*/}
                    {/*                                            <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>*/}
                    {/*                                                <Image style={styles.icon} source={require('../../icons/iconAgent/ic_check.png')}/>*/}
                    {/*                                            </TouchableOpacity>*/}
                    {/*                                            :*/}
                    {/*                                            <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={styles.ctCheck}>*/}
                    {/*                                            </TouchableOpacity>*/}
                    {/*                                    }*/}
                    {/*                                    <Text style={styles.txt}>Tôi xác nhận đã đọc, hiểu và đồng ý với các <Text onPress={() => Actions.infoCarExclusion()} style={styles.txtActive}>Điểm loại trừ </Text>và <Text onPress={() => Linking.openURL('http://inso.vn/images/app/quy-tac-82-bao-hiem-vat-chat-xe.pdf')} style={styles.txtActive}>Quy tắc bảo hiểm</Text></Text>*/}
                    {/*                                </View>*/}
                    {/*                            /!*: null }*!/*/}


                    {/*                                    <View style={{flexDirection:'row'}}>*/}


                    {/*                                                <Button*/}
                    {/*                                                    label={'Thanh toán' }*/}
                    {/*                                                    marginTop = {10}*/}
                    {/*                                                    onPress={() => this.submitPay('nonactive')}*/}
                    {/*                                                    flex={1}*/}
                    {/*                                                />*/}

                    {/*                                    </View>*/}

                    {/*                        </View>*/}
                    {/*                }*/}
                    {/*            </View>*/}
                    {/*        </KeyboardAvoidingView>*/}

                    {/*        :*/}
                    {/*        <View>*/}
                    {/*            {*/}
                    {/*                this.props.load == 'CONTRACT_DETAIL' ?*/}
                    {/*                    null*/}
                    {/*                    :*/}
                    {/*                    <View style={styles.ctBottom}>*/}
                    {/*                        { has_payment_online && has_contract_active ?*/}
                    {/*                            <View style={{flexDirection: 'row', alignItems: 'center',}}>*/}
                    {/*                                {*/}
                    {/*                                    check ?*/}
                    {/*                                        <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>*/}
                    {/*                                            <Image style={styles.icon} source={require('../../icons/iconAgent/ic_check.png')}/>*/}
                    {/*                                        </TouchableOpacity>*/}
                    {/*                                        :*/}
                    {/*                                        <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={styles.ctCheck}>*/}
                    {/*                                        </TouchableOpacity>*/}
                    {/*                                }*/}
                    {/*                                <Text style={styles.txt}>Tôi xác nhận các thông tin trên là đúng</Text>*/}
                    {/*                            </View> : null }*/}
                    {/*                        { has_payment_online && has_contract_active ?*/}
                    {/*                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>*/}
                    {/*                                {*/}
                    {/*                                    check1 ?*/}
                    {/*                                        <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>*/}
                    {/*                                            <Image style={styles.icon} source={require('../../icons/iconAgent/ic_check.png')}/>*/}
                    {/*                                        </TouchableOpacity>*/}
                    {/*                                        :*/}
                    {/*                                        <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={styles.ctCheck}>*/}
                    {/*                                        </TouchableOpacity>*/}
                    {/*                                }*/}
                    {/*                                <Text style={styles.txt}>Tôi xác nhận đã đọc, hiểu và đồng ý với các <Text onPress={() => Actions.infoCarExclusion()} style={styles.txtActive}>Điểm loại trừ </Text>và <Text onPress={() => Linking.openURL('http://inso.vn/images/app/quy-tac-82-bao-hiem-vat-chat-xe.pdf')} style={styles.txtActive}>Quy tắc bảo hiểm</Text></Text>*/}
                    {/*                            </View> : null }*/}
                    {/*                        {*/}
                    {/*                            !check || !check1 ?*/}
                    {/*                                <View style={{flexDirection:'row'}}>*/}
                    {/*                                    {*/}
                    {/*                                        has_payment_online ?*/}
                    {/*                                            <ButtonNoColor*/}
                    {/*                                                label={'Thanh toán'}*/}
                    {/*                                                marginTop = {10}*/}
                    {/*                                                backgroundColor={'#ccc'}*/}
                    {/*                                                color='#fff'*/}
                    {/*                                                disabled = {true}*/}
                    {/*                                            /> : null*/}
                    {/*                                    }*/}
                    {/*                                    {*/}
                    {/*                                        has_contract_active ?*/}
                    {/*                                            <ButtonNoColor*/}
                    {/*                                                label={'Cấp đơn bảo hiểm'}*/}
                    {/*                                                marginTop = {10}*/}
                    {/*                                                backgroundColor={'#ccc'}*/}
                    {/*                                                color='#fff'*/}
                    {/*                                                disabled = {true}*/}
                    {/*                                            />*/}
                    {/*                                            : null*/}
                    {/*                                    }*/}

                    {/*                                </View>*/}
                    {/*                                :*/}
                    {/*                                <View style={{flexDirection:'row'}}>*/}
                    {/*                                    { has_payment_online ?*/}
                    {/*                                        <Button*/}
                    {/*                                            label={'Thanh toán' }*/}
                    {/*                                            marginTop = {10}*/}
                    {/*                                            onPress={() =>  this.submitPay('nonactive')}*/}
                    {/*                                        /> : null }*/}
                    {/*                                    {*/}
                    {/*                                        has_contract_active ?*/}
                    {/*                                            <Button*/}
                    {/*                                                label={'Cấp đơn bảo hiểm'}*/}
                    {/*                                                marginTop = {10}*/}
                    {/*                                                onPress={() => this.activeContract('active')}*/}
                    {/*                                            /> : null*/}
                    {/*                                    }*/}
                    {/*                                </View>*/}
                    {/*                        }*/}
                    {/*                    </View>*/}
                    {/*            }*/}
                    {/*        </View>*/}
                    {/*}*/}


                    <ModalCity
                        open = {openCity}
                        city={city}
                        onClosed={() => this.setState({openCity: false})}
                        setCity = {city => this.setCity(city)}
                    />
                    <ModalDistrict
                        open = {openDistrict}
                        districts={districts}
                        district={district}
                        onClosed={() => this.setState({openDistrict: false})}
                        setDistrict = {district => this.setDistrict(district)}
                    />
                </View>
            </Drawer>
        );
    }
}

const styles = ScaledSheet.create({
    formInput:{
        marginHorizontal: '20@s',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E2E2E2',
        marginVertical: '15@vs',
        paddingVertical: '10@vs'
    },
    containTitle: {
        // marginHorizontal: '15@s',
        // marginBottom: '20@vs',
        // marginVertical: '15@vs',
        paddingVertical: '10@vs',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginHorizontal:30,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    containTxt: {
        flexDirection: 'row',
        paddingVertical: '5@vs',
        marginHorizontal: '5@s',
        alignItems:'flex-start',
    },
    txtDescribeNote: {
        lineHeight: 20,
        color: '#666666',
        fontSize: '14@s',
        paddingLeft: '5@s',
        fontStyle: 'italic',
    },
    txtNote: {
        color: '#F97C7C',
        lineHeight: 20,
        fontSize: '14@s',
        fontStyle: 'italic',
    },
    txtInput: {
        paddingVertical: '5@vs',
        paddingHorizontal: '15@s'
    },
    containNote: {
        paddingHorizontal: 15,
        marginHorizontal: 10
    },
    containSection: {
        paddingVertical: '15@vs',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: '20@s'
    },
    txtTitle: {
        fontSize: '14@s',
        color: Color,
        fontWeight: 'bold'
    },
    text02: {
        position: 'absolute',
        alignItems: 'center'
    },
    ctItem: {
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
        alignItems: 'center',
    },
    ctContent:  {
        padding: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    txtActive: {
        color: '#30cecb',
        fontWeight: 'bold',
    },
    txt: {
        color: '#333',
        flex: 1
    },
    icon: {
        width: 15,
        height: 15*22/27
    },
    ctBottom: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    ctCheck: {
        height: 20,
        width: 20,
        marginRight: 15,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
    },
    intro: {
        margin: 20,
        marginTop: 10,
        marginBottom: 10,
        color: '#F97C7C'
    },
    label: {
        color: '#999',
        flex: 1,
        fontSize: 14,
    },
    value: {
        color: '#333',
        flex: 1,
        fontSize: 14
    },
})


import { Actions } from 'react-native-router-flux';
import CtLabel from '../../components/CtLabel';
import ModalCity from '../../components/modal/ModalCity';
import ModalDistrict from '../../components/modal/ModalDistrict';
import AppText from '../../components/AppText';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default(CarRegisterInsuranceInfo);
