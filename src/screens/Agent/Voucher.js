'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Linking,
    ImageBackground,
    AsyncStorage,
    SafeAreaView,
    Share,
    StatusBar, Keyboard, BackHandler,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput, ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';

import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/Input';
import Button from "../../components/Button";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalBox from 'react-native-modalbox';
import TwoButton from '../../components/TwoButton';
import { Color } from '../../config/System';
import FastImage from 'react-native-fast-image';



const screen = Dimensions.get('window');


class Voucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:null,
            isOpenCodeVoucher:null,
            isOpenSuccess:null,
        };

    }
    openModal = () => {
        this.setState({
            isOpen :true
        })
    }
    openModalCodeVoucher = () => {
        this.setState({
            isOpen :null,
            isOpenCodeVoucher :true,
        })
    }
    openModalSuccess = () => {
        this.setState({
            isOpenSuccess :true,
            isOpenCodeVoucher :null,
        })
    }
    onCloseModal = () => {
        this.setState({
            isOpen:null,
        })
    }
    onCloseCodeVoucher = () => {
        this.setState({
            isOpenCodeVoucher :null,
        })
    }
    onCloseModalSuccess = () => {
        this.setState({
            isOpenSuccess :null,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Nav isInfo={false} title={'VOUCHER'}
                             onPress={() => Actions.pop()}/>
                </View>
                <View style={{marginHorizontal: 24, marginTop: -30}}>
                    <FastImage source={require('../../icons/iconAgent/ic_thecoffeehosue.png')}
                           style={{height: 173, width: '100%'}}>
                    </FastImage>
                    <View style={{flex: 1, flexDirection: 'row',position:'absolute'}}>
                        <View style={{flex: 1}}>
                            <FastImage source={require('../../icons/iconAgent/branch_name_coffee_house.png')}
                                   style={{height: 90, width: 90}}/>
                        </View>
                    </View>
                    <View style={{
                        borderRadius: 20,
                        padding: 8,
                        flexDirection: 'row',
                        marginHorizontal: 35,
                        backgroundColor: '#FEB404',
                        marginTop: -15
                    }}>
                        <View style={{
                            flex: 1.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ffffff',
                            flexDirection: 'row'
                        }}>
                            <FastImage source={require('../../icons/iconAgent/ic_diamon_white.png')}
                                   style={{height: 11, width: 13, marginRight: 5}}/>
                            <Text style={{color: '#ffffff', fontSize: 15}}>120 điểm</Text>
                        </View>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#ffffff', fontSize: 15,}}>HSD: 22/06/2020</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 20}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>THE COFFEE HOUSE</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>Voucher miễn phí 1 cốc trà đào
                            cam sả size M</Text>
                    </View>
                    <View style={{alignItems: 'center', paddingVertical: 10}}>
                        <Text style={{fontSize: 14, color: '#333'}}>Vị thanh ngọt của đào Hy Lạp, vị chua dịu của Cam
                            Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc
                            trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này. Sản phẩm hiện có 2
                            phiên bản Nóng và Lạnh phù hợp cho mọi thời gian trong năm.</Text>
                    </View>
                    <View style={{alignItems: 'center', paddingVertical: 10}}>
                        <Text style={{fontSize: 14, color: '#333'}}>1. Cách dùng Sử dụng mã voucher để đổi nước ngay tại quầy thu ngân trước khi sử dụng dịch vụ</Text>
                    </View>
                    <View style={{alignItems: 'center', paddingVertical: 10}}>
                        <Text style={{fontSize: 14, color: '#333'}}>2. Điều kiện sử dụng Mã voucher có hiệu lực trong vòng 48h kể từ thời điểm nhận mã{'\n'}Mỗi khách hàng chỉ được dùng 1 lần/voucher/hóa đơn</Text>
                    </View>
                    <View style={{alignItems: 'center', paddingVertical: 10}}>
                        <Text style={{fontSize: 14, color: '#333'}}>3. Phạm vi áp dụng Mã voucher áp dụng cho tất cả các cửa hàng trên phạm vi toàn quốc</Text>
                    </View>
                    <View style={{height:24}}/>
                </ScrollView>
                <View style={{alignItems:'center',justifyContent:'center',paddingBottom: 20}}>
                    <Button
                        label={'DÙNG NGAY'}
                        borderRadius={10}
                        onPress={()=> this.openModal()}
                    />
                </View>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpen}
                    onClosed={()=>this.onCloseModal()}
                    style={styles.ctModal}
                >
                    <View style={{backgroundColor: '#fff',flex: 1, borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                            <Text style={{color: '#414042',fontSize:16,fontWeight:'bold',textAlign:'center'}}>Bạn chắc chắn sử dụng ưu đãi này?</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                            <TwoButton
                                label={'KHÔNG'}
                                labelConfirm={'CÓ'}
                                backgroundColor={Color}
                                onPress={()=>this.setState({isOpen:null})}
                                onPressConfirm={()=>this.openModalCodeVoucher()}/>
                        </View>
                    </View>
                </ModalBox>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpenCodeVoucher}
                    onClosed={()=>this.onCloseCodeVoucher()}
                    style={styles.ctModalCode}
                >
                    <View style={{backgroundColor: '#fff',flex: 1, borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <View style={{justifyContent:'center',alignItems:'center',paddingTop:24,paddingHorizontal:15}}>
                            <Text style={{fontSize:16,fontWeight:'bold',color:'#414042',textAlign:'center'}}>Mã ưu đãi của bạn</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',paddingVertical:24,paddingHorizontal:15,flexDirection:'row'}}>
                            <Text style={{fontSize:14,color: Color,textAlign:'center'}}>ABCDEFG</Text>
                           <TouchableOpacity style={{paddingLeft:5}}>
                               <FastImage style={{height:18,width:15}}
                                      source={require('../../icons/iconAgent/ic_copy.png')}/>
                           </TouchableOpacity>
                        </View>

                        <View style={{justifyContent:'center',alignItems:'center',paddingTop:20,paddingHorizontal:15}}>
                            <Button label={'SỬ DỤNG'}
                                    onPress={()=>this.openModalSuccess()}/>
                        </View>
                    </View>
                </ModalBox>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpenSuccess}
                    onClosed={()=>this.onCloseModalSuccess()}
                    style={styles.ctModalSuccess}
                >
                    <View style={{backgroundColor: '#fff',flex: 1, borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <View style={{justifyContent:'center',alignItems:'center',paddingTop:24}}>
                            <FastImage source={require('../../icons/iconAgent/ic_success.png')}
                                   style={{height:61,width:60}}/>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',paddingVertical:36,paddingHorizontal:15}}>
                            <Text style={{fontSize:14,color:'#414042',textAlign:'center'}}>Bạn đã sử dụng ưu đãi thành công</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',paddingTop:0,paddingHorizontal:15}}>
                            <Button label={'OK'}
                                    onPress={()=>this.setState({isOpenSuccess:null})}/>
                        </View>
                    </View>
                </ModalBox>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    ctModal: {
        backgroundColor: '#fff',
        flex:0.25,
        borderTopLeftRadius:20,borderTopRightRadius:20
    },
    ctModalCode: {
        backgroundColor: '#fff',
        flex:0.3,
        borderTopLeftRadius:20,borderTopRightRadius:20
    },
    ctModalSuccess: {
        backgroundColor: '#fff',
        flex:0.37,
        borderTopLeftRadius:20,borderTopRightRadius:20
    },
    searchInput: {
        flex: 0.5, marginHorizontal: 30
    },
    oval: {
        marginTop: '-40@ms',
        alignSelf: 'center',
        width: '105%',
        height: '30%',
        borderRadius: 100,
        backgroundColor: Color,

    },
    containNoBank: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '30@vs',
    },
    ic_bank: {
        height: '70@vs',
        width: '70@s',
    },
    txtNoBank: {
        fontSize: '14@s',
        color: '#A8A8A8',
        paddingVertical: '15@vs',
        textAlign: 'center',
    },
    ic_add_bank: {
        height: '16@vs',
        width: '16@s',
    },
    txtAddBank: {
        fontSize: '14@s',
        color: Color,
        paddingLeft: '5@s',
    },
    containAddBank: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: '20@vs',
    },
    containInformation: {
        marginVertical: 5,
        borderRadius: 15,
        paddingVertical: 10,
        paddingLeft: 15,
        flex: 1,
    },
    ic_arrow: {
        height: '12@vs',
        width: '12@s',
        marginRight: '10@s',
    },
    wrapperInfor: {
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: '15@s',
        shadowOpacity: Platform.OS === 'android' ? 0.6 : 0.2,
        shadowRadius: 10,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    containView: {
        marginHorizontal: '15@s',
        marginTop: 5,
    },
    containSubInfor: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    containFullSubInfor: {
        backgroundColor: '#F4F4F4',
        marginHorizontal: '5@s',
        borderBottomLeftRadius: '10@ms',
        borderBottomRightRadius: '10@ms',
        paddingBottom: '10@ms'

    },
    txtText1: {
        flex: 1,
        lineHeight: 20,
        fontSize: 15,
        color: '#000000',
        fontWeight: '400',
    },
    txtText2: {
        marginHorizontal: '10@s',
    },
    txtTitle: {
        fontSize: '15@s',
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: '15@vs',
    },
    ic_search: {
        height: '19@vs',
        width: '19@s',
    },
    txtText: {
        color: '#333',
        fontSize: 14
    },
    txtTextHotline: {
        color: '#be3030',
        fontSize: '15@ms'
    },

    containSearch: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',

    },
});


const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (Voucher);
