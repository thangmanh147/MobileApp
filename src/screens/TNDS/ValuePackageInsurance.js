
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

import { Actions } from 'react-native-router-flux';
import { fontNormal, fontBold, Color } from '../../config/System';
import Nav from '../../components/Nav';
import Css from '../../config/Css';

import Button from '../../components/ButtonColor';
import Loading from '../../components/Loading';
import FastImage from 'react-native-fast-image'

const { width, height } = Dimensions.get('window');
class ValuePackageInsurance extends Component {
    constructor(props) {
        super(props);
        this.containerTop = new Animated.Value(20);
        this.state = {
            check: true,
            check1: true,
            contract: '',
            openCity: false,
            openDistrict: false,
            city: '',
            districts: [],
            district: '',
            address: '',
            has_contract_active: false,
            has_payment_online: false,
            totalMoney: 0,
            status_code: '',
            note: '',
            typeRender: '1',
            discountCodeCollaborator: [],
            discountCode: [],
            totalDiscountInputCode: 0,
            totalDiscountCollaboratorCode: 0,

            arrayListInputDiscountCode: '',
            totalVat: 0,
        };
    }





    handleBackPress = () => {
        if (this.props.back === 'home') {
            Actions.tab({ type: 'reset' })
            return true;
        } else {
            return false;
        }
    }

    back = () => {
        if (this.props.back === 'home') {
            Actions.tab({ type: 'reset' });
        } else {
            Actions.pop()
        }
    }

    displayListDiscount() {
        const { arrayListInputDiscountCode,discountCodeCollaborator,totalDiscountCollaboratorCode } = this.state;
        return (
            <TouchableOpacity
                onPress={() => Actions.DiscountCode({statusScreen: 'Loving',sale_order_id: this.props.sale_order_id})}
                style={css.containDiscountCodeForm}>
                <View style={{justifyContent: 'center'}}>
                    <Text>Mã giảm giá</Text>
                </View>
                <View style={{flex: 1,flexDirection:'row',flexWrap:'wrap'}}>
                    {
                        arrayListInputDiscountCode.length > 0 ? arrayListInputDiscountCode.map((item,index) => {
                            return (
                                <View key={index} style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                    <View style={{flex:1,paddingLeft:20,flexDirection:'row',alignItems:'center', justifyContent: 'center'}}>
                                        <FastImage resizeMode={'contain'} style={{width: 6, height: 6,justifyContent:'flex-end',alignItems:'flex-end'}}
                                               source={require('../../icons/ic_dot.png')}/>
                                        <Text style={{ fontSize: 13,textAlign:'left',flex:1}}> {item.code}</Text>
                                    </View>
                                    <Text style={{color:'#F97C7C', fontSize: 13, flex:1}}>- {renderVND(item.discount_amount)+ 'đ'}</Text>
                                </View>
                            )
                        }) : null
                    }
                    {
                        discountCodeCollaborator ?
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                <View style={{flex:1,paddingLeft:20,flexDirection:'row',alignItems:'center', justifyContent: 'center'}}>
                                    <FastImage resizeMode={'contain'} style={{width: 6, height: 6,justifyContent:'flex-end',alignItems:'flex-end'}}
                                           source={require('../../icons/ic_dot.png')}/>
                                    <Text style={{ fontSize: 13,textAlign:'left',flex:1}}> {discountCodeCollaborator}</Text>
                                </View>
                                <Text style={{color:'#F97C7C', fontSize: 13, flex:1}}>- {renderVND(totalDiscountCollaboratorCode)+ 'đ'}</Text>
                            </View> : null
                    }
                </View>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
                                  onPress={() => Actions.DiscountCode({
                                      statusScreen: 'Loving',
                                      sale_order_id: this.props.sale_order_id
                                  })}>
                    <FastImage resizeMode={'contain'} style={{width: 20, height: 18,}}
                           source={require('../../icons/collaborator/car/next.png')}/>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }


    // addDiscount() {
    //     return (
    //         <View style={css.ctBgPrice}>
    //             <View style={{flex: 1.5, justifyContent: 'center'}}>
    //                 <Text style={{paddingLeft: 15}}>Ưu đãi</Text>
    //             </View>
    //             <View style={{flex: 3,flexDirection:'row',}}>

    //                 <TouchableOpacity style={css.buttonDiscountCode}
    //                                     onPress={() => Actions.DiscountCode({
    //                                         statusScreen: 'Loving',
    //                                         sale_order_id: this.props.sale_order_id
    //                                     })}
    //                 >
    //                     <Text style={{}}>Chọn mã giảm
    //                         giá</Text>

    //                 </TouchableOpacity>
    //             </View>
    //             <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
    //                                 onPress={() => Actions.DiscountCode({
    //                                     statusScreen: 'Loving',
    //                                     sale_order_id: this.props.sale_order_id
    //                                 })}
    //             >
    //                     <Image resizeMode={'contain'} style={{width: 23, height: 18,}}
    //                             source={require('../../icons/collaborator/car/next.png')}/>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }



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

    async submitPay() {
        const { discountCode,discountCodeCollaborator } = this.state;
        if (discountCode.length > 0 || (discountCodeCollaborator)) {
            const body = {
                "function":"SaleOrderApi_applyGiftCodeAndRequestActiveContract",
                "params": {
                    "sale_order_id": this.props.sale_order_id,
                    "gift_codes": this.getDiscountCode()
                }
            }
            const data = await HTTP.post(body);
            if (data.result_code === '0000') {
                Actions.NewTransactionPasscode({
                    screen: 'activeContract',
                    payment_amount: data.result_data.payment_amount,
                    sale_order_id:this.props.sale_order_id,
                });
            }
        } else {
            // const body = {
            //     "function":"SaleOrderApi_requestActiveContract",
            //     "params": {
            //         "sale_order_id": this.props.sale_order_id,
            //     }
            // }
            // const data = await HTTP.post(body);
            // if (data.result_code === '0000') {
            //     Actions.NewTransactionPasscode({
            //         screen: 'activeContract',
            //         contract_id: this.props.contract_id,
            //         sale_order_id:this.props.sale_order_id,
            //     })
            // }
            Actions.NewTransactionPasscode({
                screen: 'activeContract',
                contract_id: this.props.contract_id,
                sale_order_id:this.props.sale_order_id,
            })
        }

    }

    async addGiftCode() {
        const { discountCode,discountCodeCollaborator, total_payment_amount } = this.state;
        if (discountCode.length > 0 || (discountCodeCollaborator)) {
            const body = {
                "function":"SaleOrderApi_applyGiftCodeAndRequestPayment",
                "params": {
                    "sale_order_id": this.props.sale_order_id,
                    "gift_codes": this.getDiscountCode()
                }
            }
            const data = await HTTP.post(body);
            if (data.result_code === '0000') {
                if (data.result_data.payment_amount == 0) {
                    Actions.CivilInsurancePaymentSuccess({
                        sale_order_id: this.props.sale_order_id ? this.props.sale_order_id : '',
                        payment_amount:parseInt(data.result_data.payment_amount),
                        typePurchase: 'TNDS',


                    });
                } else {
                    Actions.FlightPayment({
                        payment_amount: data.result_data.payment_amount,
                        sale_order_id:this.props.sale_order_id,
                        typePurchase:'TNDS'
                    });
                }
            } else {
                SimpleToast.show(data.result_message)
            }
        } else {
            const body = {
                "function":"SaleOrderApi_requestPayment",
                "params": {
                    "sale_order_id": this.props.sale_order_id,
                }
            }
            const data = await HTTP.post(body);

            if (data.result_code == '0000') {
                Actions.FlightPayment({
                    payment_amount: data.result_data.payment_amount,
                    sale_order_id:this.props.sale_order_id,
                    typePurchase:'TNDS'
                });
            } else {
                SimpleToast.show(data.result_message)
            }
        }
    }


    render() {
        const { check,typeRender,totalVat,totalDiscountInputCode,totalDiscountCollaboratorCode,arrayListInputDiscountCode,discountCodeCollaborator, check1, has_contract_active, has_payment_online, contract, totalMoney} = this.state;
        const total = totalDiscountInputCode  + totalDiscountCollaboratorCode
        const { customer, target, receiver } = contract;
        return (
            <View style={Css.container}>
                <Nav isInfo={false} show={true} title={'ĐỊA CHỈ NHẬN ẤN CHỈ'}
                    bottom={20}
                    onPress={() => Actions.pop()}/>
                {this.props.buy.loading ? <Loading /> : null}
                <ScrollView style={{marginTop:-30}}>
                    <View style={{ marginHorizontal: 30,marginBottom:20, justifyContent: 'center',backgroundColor:'#ffffff',shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,

                        elevation: 2, padding:15,borderRadius:10}}>
                        <Text style={{ color: '#F97C7C', lineHeight: 20, fontSize: 14, fontStyle: 'italic', fontWeight: '600' }}>Chú ý: <Text style={{ fontSize: 14, color: '#666666', fontWeight: 'normal', fontStyle: 'italic', lineHeight: 20 }}>Dưới đây là các thông tin bảo hiểm bạn đã đăng ký, và sẽ là
                            căn cứ để bồi thường bảo hiểm cho bạn. Hãy vui lòng đọc kỹ và xác nhận lại
                        </Text></Text>
                    </View>
                    <View style={{backgroundColor:'#ffffff'}}>
                        <View style={{paddingVertical: 15, backgroundColor: '#D5F2F2', paddingHorizontal: 20, flexDirection: 'row',marginHorizontal:20,borderRadius:10}}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{fontWeight: 'bold', color: Color,}}>A. Thông tin chủ xe</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 10, paddingHorizontal: 20,backgroundColor:'#ffffff'}}>
                            <View style={css.containFormA}>
                                <View style={css.containItemFormA}>
                                    <View style={css.containInfor1}>
                                        <Text style={[css.title,]}>Họ và tên: </Text>
                                    </View>
                                    <View style={css.containInfor2}>
                                        <Text numberOfLines={1} style={css.value}>{customer && customer.fullname}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={css.containFormA}>
                                <View style={css.containItemFormA}>
                                    <View style={css.containInfor1}>
                                        <Text style={[css.title,]}>Email: </Text>
                                    </View>
                                    <View style={css.containInfor2}>
                                        <Text numberOfLines={1} style={css.value}>{customer && customer.email}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={css.containFormA}>
                                <View style={css.containItemFormA}>
                                    <View style={css.containInfor1}>
                                        <Text style={[css.title,]}>Số điện thoại: </Text>
                                    </View>
                                    <View style={css.containInfor2}>
                                        <Text numberOfLines={1} style={css.value}>{customer && customer.mobile}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={css.containFormA}>
                                <View style={css.containItemFormA}>
                                    <View style={[css.containInfor1, {flex:0.8}]}>
                                        <Text numberOfLines={1} style={[css.title,]}>Địa chỉ trên đăng kí xe: </Text>
                                    </View>
                                    <View style={css.containInfor2}>
                                        <Text numberOfLines={5} style={[css.value, { letterSpacing: -0.5, }]}>{customer && customer.address}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{paddingVertical: 15, backgroundColor: '#D5F2F2', paddingHorizontal: 20, flexDirection: 'row',marginHorizontal:20,borderRadius:10}}>
                            <View style={{flex: 1.2, justifyContent: 'center'}}>
                                <Text style={{fontWeight: 'bold', color: Color,}}>B. Loại xe</Text>
                            </View>
                        </View>
                        <View style={css.containFormB}>
                            <View style={css.containFormItemB}>
                                <View style={css.containItemB}>
                                    <View style={css.wrapperItemB}>
                                        <Text style={[css.title,]}>Biển số xe:</Text>
                                    </View>
                                    <View style={css.wrapperItemB}>
                                        <Text numberOfLines={3} style={css.value}>{target && target.number_plates}</Text>
                                    </View>
                                </View>

                                <View style={css.containItemB}>
                                    <View style={[css.wrapperItemB,{flex:0.52}]}>
                                        <Text style={[css.title,]}>Số khung: </Text>
                                    </View>
                                    <View style={css.wrapperItemB}>
                                        <Text numberOfLines={3} style={css.value}>{target && target.chassis_number}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={css.containFormItemB}>
                                {
                                    target && target.number_seats ?
                                        <View style={css.containItemB}>
                                            <View style={css.wrapperItemB}>
                                                <Text style={[css.title,]}>Số chỗ ngồi:</Text>
                                            </View>
                                            <View style={css.wrapperItemB}>
                                                <Text numberOfLines={5} style={[css.value, { letterSpacing: -0.5, }]}>{target && target.number_seats}</Text>
                                            </View>
                                        </View> : null
                                }

                                <View style={css.containItemB}>
                                    <View style={[css.wrapperItemB,{flex:0.52}]}>
                                        <Text style={[css.title,]}>Số máy: </Text>
                                    </View>
                                    <View style={css.wrapperItemB}>
                                        <Text numberOfLines={5} style={[css.value, { letterSpacing: -0.5, }]}>{target && target.engine_id_number}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                target && target.weight ?
                                    <View style={css.containFormItemB}>

                                        <View style={css.containItemB}>
                                            <View style={css.wrapperItemB}>
                                                <Text style={[css.title,]}>Trọng tải:</Text>
                                            </View>
                                            <View style={css.wrapperItemB}>
                                                <Text numberOfLines={5} style={[css.value, { letterSpacing: -0.5, }]}>{target && target.weight} tấn</Text>
                                            </View>
                                        </View>
                                        <View style={css.containItemB}>
                                            <View style={css.wrapperItemB}>
                                                <Text style={[css.title,]}></Text>
                                            </View>
                                            <View style={css.wrapperItemB}>
                                                <Text numberOfLines={5} style={[css.value, { letterSpacing: -0.5, }]}></Text>
                                            </View>
                                        </View>
                                    </View>
                                    : null
                            }

                            <View style={css.containFormA}>
                                <View style={css.containItemFormA}>
                                    <View style={[css.containInfor1,{flex:0.33}]}>
                                        <Text numberOfLines={1} style={[css.title,]}>Mục đích:</Text>
                                    </View>
                                    <View style={css.containInfor2}>
                                        <Text numberOfLines={5} style={[css.value, { letterSpacing: -0.5, }]}>{target && target.vehicle_purpose_name} </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingVertical: 15, backgroundColor: '#D5F2F2', paddingHorizontal: 20, flexDirection: 'row',marginHorizontal:20,borderRadius:10}}>
                            <View style={{flex: 1.2, justifyContent: 'center'}}>
                                <Text style={{fontWeight: 'bold', color: Color,}}>C. Thông tin người nhận</Text>
                            </View>
                        </View>
                        <View style={{marginTop: 10, marginVertical: 10, marginHorizontal: 20,backgroundColor:'#ffffff'}}>
                            <View style={css.containFormC}>
                                <View style={css.containItemFormC}>
                                    <View style={css.containInfor1C}>
                                        <Text style={[css.title,]}>Họ và tên: </Text>
                                    </View>
                                    <View style={css.containInfor2C}>
                                        <Text numberOfLines={1} style={css.value}>{receiver && receiver.fullname}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={css.containFormC}>
                                <View style={css.containItemFormC}>
                                    <View style={css.containInfor1C}>
                                        <Text style={[css.title,]}>Số điện thoại: </Text>
                                    </View>
                                    <View style={css.containInfor2C}>
                                        <Text numberOfLines={1} style={css.value}>{receiver && receiver.mobile}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={css.containFormC}>
                                <View style={css.containItemFormC}>
                                    <View style={css.containInfor1C}>
                                        <Text style={[css.title,]}>Địa chỉ nhận: </Text>
                                    </View>
                                    <View style={css.containInfor2C}>
                                        <Text numberOfLines={4} style={css.value}>{receiver && receiver.address}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{paddingVertical: 15, backgroundColor: '#D5F2F2', paddingHorizontal: 20, flexDirection: 'row',marginHorizontal:20,borderRadius:10}}>
                            <View style={{flex: 1.2, justifyContent: 'center'}}>
                                <Text style={{fontWeight: 'bold', color: Color,}}>D. Thông tin thanh toán</Text>
                            </View>
                        </View>


                        <View style={{marginTop:10,marginHorizontal: 20,paddingVertical:10, backgroundColor: '#FAFAFA',paddingHorizontal:10,borderWidth:1,borderColor:'#F0F0F0',borderRadius: 10}}>
                            <View style={css.containTotalInfor}>
                                <Text style={css.txtNameBranch}>Hãng bảo hiểm</Text>
                                <Text numberOfLines={3} style={[css.txtNameBranch,{textAlign:'right'}]}>{contract && contract.supplier_name}</Text>
                            </View>
                            {
                                contract && contract.products && contract.products.length > 0 ?
                                    contract.products.map((item,index) => {
                                        return (
                                            <View key={index} style={css.containTotalInfor}>
                                                <Text style={[css.txtFeetotal, {flex:1, marginRight: 25}]}>{item.name}</Text>
                                                <Text style={css.txtFeetotal}>{(renderVND(parseInt(item.total_fee) - item.vat) + 'đ')}</Text>
                                            </View>
                                        )
                                    }) : null
                            }
                            <View style={css.containTotalInfor}>
                                <Text style={css.txtFeetotal}>Thuế VAT</Text>
                                <Text style={css.txtFeetotal}>{renderVND(totalVat)+'đ'}</Text>
                            </View>
                            <View style={{marginVertical: 10,borderBottomWidth: 1.5,borderColor: '#F1F1F1'}}/>
                            <View style={css.containTotalInfor}>
                                <Text style={css.txtTotalMoney}>Tổng cộng</Text>
                                <Text style={css.txtTotalMoney}>{contract && renderVND(contract.amount - total)+'đ'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={css.ctBottom}>
                        <View style={{flexDirection: 'row', alignItems: 'center',marginLeft: 10}}>
                            {
                                check ?
                                    <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={[css.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>
                                        <FastImage style={css.icon} source={require('../../icons/iconAgent/ic_check.png')}/>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={css.ctCheck}>
                                    </TouchableOpacity>
                            }
                            <AppText style={css.txt}>Tôi xác nhận các thông tin trên là đúng</AppText>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10}}>
                            {
                                check1 ?
                                    <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={[css.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>
                                        <FastImage style={css.icon} source={require('../../icons/iconAgent/ic_check.png')}/>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={css.ctCheck}>
                                    </TouchableOpacity>
                            }
                            <AppText style={css.txt}>Tôi xác nhận đã đọc, hiểu và đồng ý với các
                                <AppText onPress={() => Linking.openURL('http://inso.vn/images/app/thong-tu-22.pdf')} style={css.txtActive}>{'\n'}Điểm loại trừ và Quy tắc bảo hiểm</AppText></AppText>
                        </View>
                        {
                            !check || !check1 ?
                                <View style={{flexDirection:'row', paddingTop: 10}}>
                                    {
                                        has_contract_active ?
                                            <Button
                                                label={'Cấp đơn'}
                                                marginTop = {10}
                                                backgroundColor={'#DEDEDE'}
                                                disabled={true}
                                                flex={1}
                                                marginRight={10}
                                            /> : null
                                    }
                                    {
                                        has_payment_online ?
                                            <Button
                                                label={'Thanh toán' }
                                                marginTop = {10}
                                                flex={1.5}
                                                backgroundColor={'#DEDEDE'}
                                                disabled={true}
                                            /> : null
                                    }

                                </View>
                                :
                                <View style={{flexDirection:'row', paddingTop: 10}}>
                                    {
                                        has_contract_active ?
                                            <Button
                                                label={'Cấp đơn'}
                                                marginTop = {10}
                                                onPress={() => this.submitPay()}
                                                flex={1}
                                                marginRight={10}
                                            />
                                            : null
                                    }
                                    {
                                        has_payment_online ?
                                            <Button
                                                label={'Thanh toán' }
                                                marginTop = {10}
                                                onPress={() => this.addGiftCode()}
                                                flex={1.5}
                                            /> : null
                                    }
                                </View>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const css = StyleSheet.create({
    title: {
        color: '#CECECE',
        fontSize: valueScaleWindowWidth(3.5)
    },
    value:{
        color:'#666666',
        fontSize:valueScaleWindowWidth(3.8)
    },
    containTotalInfor: {
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
    txtBranch: {
        color: '#333333',
        fontWeight: '600'
    },
    txtNameBranch: {
        flex:1,
        color: '#333333',
        fontWeight: '600',
        fontSize: 14
    },
    ctBottom: {
        padding: 20,
    },
    icon: {
        width: 15,
        height: 15*22/27
    },
    txt: {
        color: '#666666',
        flex: 1,
        fontFamily: fontNormal,
        fontSize: 14
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
    txtActive: {
        color: '#30cecb',
        fontWeight: 'bold',
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
    ctBgPrice: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        flexDirection: 'row',
        height: 70,
        marginTop: 10,
        marginHorizontal:20,
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
    containFormA: {
        flexDirection: 'row',
        marginTop: 10
    },
    containItemFormA: {
        flex: 1,
        flexDirection: 'row',
    },
    containInfor1: {
        flex:0.8,
        justifyContent:'flex-start'
    },
    containInfor2: {
        justifyContent: 'center',
        flex:1
    },
    containFormB: {
        marginTop: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor:'#ffffff'
    },
    containFormItemB: {
        flexDirection: 'row',
        marginTop: 10
    },
    containItemB: {
        flex: 1,
        flexDirection: 'row'
    },
    wrapperItemB: {
        justifyContent: 'center',
        flex:0.8
    },
    containFormC: {
        flexDirection: 'row',
        marginTop: 10
    },
    containItemFormC: {
        flex: 1,
        flexDirection: 'row'
    },
    containInfor1C : {
        flex:0.8,
        justifyContent:'flex-start'
    },
    containInfor2C: {
        justifyContent: 'center',
        flex:1
    },




})
import {renderVND, valueScaleWindowWidth} from "../../components/Functions";
import { connect } from 'react-redux';
import { contractInfo, updateBuyerAddress } from '../../actions/buy';
import { getListDistrict } from '../../actions/app';

import SimpleToast from 'react-native-simple-toast';
import AppText from '../../components/AppText';

const mapStateToProps = (state) => {
    return {
        buy: state.buy,
        app: state.app,
        profile: state.profile,
        infoFlight: state.flightBuy.infoFlight,
        flightBuy: state.flightBuy,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        contractInfo: (body) => dispatch(contractInfo(body)),
        getListDistrict: (body) => dispatch(getListDistrict(body)),
        updateBuyerAddress: (body, status, sale_order_id, amount_money) => dispatch(updateBuyerAddress(body, status, sale_order_id, amount_money)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ValuePackageInsurance);
