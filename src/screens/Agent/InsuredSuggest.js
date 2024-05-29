'use strict';

import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image, TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import FooterButton from '../../components/FooterButton';
import InputText from '../../components/Input';
import Swipeable from 'react-native-swipeable-row';


const screen = Dimensions.get('window');
const width = 80;
const width1 = 50;

class InsuredSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCredit: [
                {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    title: 'Khoản vay Bảo an Tín dụng',
                    codeRequest: '012556544',
                    fee: '100.000.000đ',
                    status: 'Đã duyệt',
                    dateCreate: '08: 14 - 23/12/2020',
                },
                {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    title: 'Bảo hiểm Nhà',
                    codeRequest: '012556544',
                    fee: '100.000.000đ',
                    status: 'Đã duyệt',
                    dateCreate: '08: 14 - 23/12/2020',
                }, {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    title: 'Bảo hiểm Nhà',
                    codeRequest: '012556544',
                    fee: '100.000.000đ',
                    status: 'Đã duyệt',
                    dateCreate: '08: 14 - 23/12/2020',
                },
            ],
            listClaim: [
                {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    contractCode: '343454',
                    codeRequest: '990090',
                    fee: '100.000.000đ',
                    status: 'Đã duyệt',
                    dateCreate: '23/12/2020',
                    statusCode: '1',
                },
                {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    contractCode: '343455',
                    codeRequest: '990089',
                    fee: '100.000.000đ',
                    status: 'Từ chối',
                    dateCreate: '23/12/2020',
                    statusCode: '2',
                },
            ],
            listContract: [
                {
                    icon: require('../../icons/iconAgent/oto.png'),
                    contractCode: 'INSOF00132150520',
                    codeRequest: '29A12345',
                    fee: '100.000.000đ',
                    status: 'Hết hiệu lực',
                    dateCreate: '23/12/2020',
                    statusCode: '2',
                },
                {
                    icon: require('../../icons/iconAgent/tnds.png'),
                    contractCode: 'INSOF00132150520',
                    codeRequest: '29A54321',
                    fee: '100.000.000đ',
                    status: 'Đang hoạt động',
                    dateCreate: '23/12/2020',
                    statusCode: '1',
                },
            ],
            listChanceSale: [
                {
                    icon: require('../../icons/iconAgent/oto.png'),
                    title: 'Bảo hiểm TNDS',
                    codeRequest: '29A12345',
                    fee: '5.000.000đ',
                    status: 'Lead',
                    dateCreate: '23/12/2020',
                    statusCode: '2',
                },

            ],
            listFilter: [
                {
                    statusFilter: 'Tháng trước',
                },
                {
                    statusFilter: 'Quý trước',
                },
                {
                    statusFilter: 'Năm trước',
                },
            ],
            listFilter1: [
                {
                    statusFilter: '10.000.000đ - 50.000.000đ',
                },
                {
                    statusFilter: '> 50.000.000đ - 100.000.000đ',
                },
                {
                    statusFilter: '> 100.000.000đ - 200.000.000đ',
                },
            ],
            listFilter2: [
                {
                    statusFilter: 'Tất cả',
                },
                {
                    statusFilter: 'Bảo hiểm ô tô',
                },
                {
                    statusFilter: 'Bảo hiểm trễ chuyến bay',
                }, {
                    statusFilter: 'Bảo hiểm trách nhiệm dân sự',
                }, {
                    statusFilter: 'Bảo hiểm nhà riêng',
                },
            ],
            listStatus: [
                {
                    status: 'Có quan tâm',
                }, {
                    status: 'Có tiềm năng',
                }, {
                    status: 'Có cơ hội',
                }, {
                    status: 'Khách hàng',
                },
            ],
            isOpen: false,
            benefits: [
                {
                    name: 'Mua và yêu cầu Bồi thường online chỉ trong 15 phút.',
                    icon: require('../../icons/introduction/benefit_1.png'),
                    width,
                    height: width * 133 / 151,
                },
                {
                    name: 'Tự giám định tổn thất bằng camera trên điện thoại.',
                    icon: require('../../icons/introduction/benefit_2.png'),
                    width,
                    height: width * 134 / 132,
                },
                {
                    name: 'Trả góp không lãi suất.',
                    icon: require('../../icons/introduction/benefit_3.png'),
                    width,
                    height: width * 131 / 146,
                },
                {
                    name: 'Đặt hẹn lịch gara ngay trên app, không cần chờ đợi.',
                    icon: require('../../icons/introduction/benefit_4.png'),
                    width,
                    height: width * 167 / 146,
                },
                {
                    name: 'Giảm chi phí bảo hiểm cho năm tiếp theo khi có lịch sử bảo hiểm tốt.',
                    icon: require('../../icons/introduction/benefit_5.png'),
                    width,
                    height: width * 95 / 140,
                },
            ],
            rights: [
                {
                    label: 'Bảo hiểm bắt buộc',
                    product: [
                        {
                            title: 'Bảo hiểm Trách nhiệm dân sự (TNDS)',
                            sub: 'Lên tới 100 triệu đồng/người/vụ',
                            width: width1 - 15,
                            height: (width1 - 15) * 64 / 58,
                            icon: require('../../icons/introduction/right_1.png'),
                        },
                        {
                            title: 'Bảo hiểm tai nạn lái, phụ xe và  người ngồi trên xe',
                            sub: 'Lên tới 1 tỷ đồng/người/vụ ',
                            sub1: '(tối đa không quá 3 tỷ đồng/xe/vụ)',
                            width: width1,
                            height: width1 * 46 / 87,
                            icon: require('../../icons/introduction/right_2.png'),
                        },
                    ],
                },
                {
                    label: 'Bảo hiểm vật chất xe',
                    product: [
                        {
                            title: 'BS02. Bảo hiểm thay thế mới',
                            sub: 'Được bồi thường các bộ phận bị hư hỏng cần phải thay thế thuộc phạm vi bảo hiểm mà không trừ phần hao mòn (khấu hao) sử dụng.',
                            width: width1,
                            height: (width1) * 55 / 87,
                            icon: require('../../icons/introduction/right_3.png'),
                        },
                        {
                            title: 'BS04. Bảo hiểm xe bị mất trộm, cướp bộ phận ',
                            sub: 'Được thanh toán chi phí thực tế, hợp lý để thay thế bộ phận bị tổn thất.',
                            width: width1 - 10,
                            height: (width1 - 10) * 58 / 65,
                            icon: require('../../icons/introduction/right_4.png'),
                        },
                        {
                            title: 'BS05. Bảo hiểm lựa chọn cơ sở sửa chữa',
                            sub: 'Được lựa chọn cơ sở sửa chữa (gara) ở thời điểm ký kết Hợp đồng bảo hiểm.',
                            width: width1,
                            height: width1 * 64 / 90,
                            icon: require('../../icons/introduction/right_5.png'),
                        },
                        {
                            title: 'BS06. Bảo hiểm tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước',
                            sub: 'Được bồi thường chi phí sửa chữa, thay thế những thiệt hại thực tế của xe khi hoạt động trong vùng ngập nước.',
                            width: width1,
                            height: width1 * 49 / 88,
                            icon: require('../../icons/introduction/right_6.png'),
                        },
                        {
                            title: 'BS13. Bảo hiểm cho thiết bị lắp thêm',
                            sub: 'a. Phạm vi bảo hiểm: Tổn thất của các thiết bị, bạt phủ lắp thêm trên xe ngoài các thiết bị của Nhà sản xuất đã lắp ráp.\nb. Quyền lợi bảo hiểm: PTI chịu trách nhiệm thanh toán chi phí thực tế, hợp lý để thay thế bộ phận bị tổn thất hoặc trả tiền cho Chủ xe cơ giới để bù đắp tổn thất thuộc phạm vị bảo hiểm trên cơ sở xác định được chi phí khắc phục tổn thất có thể phải trả.',
                            width: width1,
                            height: width1 * 49 / 88,
                            icon: require('../../icons/introduction/right_6.png'),
                        },
                        {
                            title: 'Miễn thường khấu trừ 500,000 đồng/vụ tổn thất',
                            sub: '',
                            width: width1,
                            height: width1 * 60 / 89,
                            icon: require('../../icons/introduction/right_8.png'),
                        },
                    ],
                },
            ],
        };
    }




    openModalFilter = () => {
        this.setState({
            isOpen: true,
        });
    };
    onCloseModal = () => {
        this.setState({
            isOpen: null,
        });
    };

    onChangeText =()=>{

    }

    render() {
        console.log('listContract', this.state.listContract);
        const {benefits, rights} = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Nav isInfo={false} title={'BẢO HIỂM VẬT CHẤT XE'}
                         onPress={() => Actions.pop()}/>
                </View>
                <View style={{
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginHorizontal: 24,
                    backgroundColor: '#ffffff',
                    height: 'auto',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    marginTop: -hp('3%'),
                }}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Bảo hiểm vật chất xe</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 5}} onPress={()=>this.setState({isOpen:true})}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 5}}>
                                        <Image source={require('../../icons/newicon1/ic_edit_yellow.png')}
                                               style={{height: 20, width: 20, resizeMode: 'contain'}}/>
                                    </View>
                                    <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                                        <Text style={{fontSize: 14, color: '#FEB404'}}>Sửa</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{paddingTop: 10}}>
                            <View style={{flexDirection: 'row', paddingBottom: 5}}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 14, color: '#8D8C8D'}}>Giá trị</Text>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                    <Text style={{fontSize: 14, color: '#8D8C8D'}}>5.000.000đ</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 14, color: '#8D8C8D'}}>Trạng thái</Text>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                    <Text style={{fontSize: 14, color: '#414042'}}>Lead</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{
                    width: widthPercentageToDP('90'),//marginRight screen
                    height: heightPercentageToDP('70'),
                    alignSelf: 'center',
                    marginTop:10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }} keyboardShouldPersistTaps={'always'}>
                    <View style={{flex: 1, paddingTop: 0}}>
                        <View style={{backgroundColor: '#ffffff'}}>
                            <AppText style={styles.label}>Quyền lợi bảo hiểm</AppText>
                            {
                                rights.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <AppText style={styles.sub1}>{index + 1}. {item.label}</AppText>
                                            {
                                                item.product.map((product, i) => {
                                                    return (
                                                        <View style={styles.ctItemRight} key={i}>
                                                            <View style={{width: width1 + 25, alignItems: 'center'}}>
                                                                <FastImage style={{
                                                                    width: product.width,
                                                                    height: product.height,
                                                                }} source={product.icon}/>
                                                            </View>
                                                            <View style={{flex: 1}}>
                                                                <AppText style={styles.sub}>{product.title}</AppText>
                                                                {
                                                                    product.sub !== '' && <AppText style={{
                                                                        color: '#333',
                                                                        marginTop: 5,
                                                                    }}>{product.sub}</AppText>
                                                                }
                                                                {
                                                                    product.sub1 && <AppText
                                                                        style={{color: '#333'}}>{product.sub1}</AppText>
                                                                }
                                                            </View>
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <FooterButton>
                    <TwoButton
                        backgroundColor={'#30BEBC'}
                        label={'TẠO TICKET'}
                        labelConfirm={'TẠO HỢP ĐỒNG'}
                        onPressConfirm={()=>Actions.CarProducer()}
                        onPress={()=>this.setState({isOpen:false})}/>
                </FooterButton>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpen}
                    onClosed={() => this.onCloseModal()}
                    style={styles.ctModal}
                >
                    <ScrollView
                        style={{backgroundColor: '#fff', flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                        <View style={{
                            backgroundColor: '#F4F5F6',
                            flex: 1,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            justifyContent: 'center',
                            paddingHorizontal: 30,
                            paddingVertical: 20,
                        }}>
                            <Text style={{fontSize: 14, fontWeight: '600'}}>Bảo hiểm vật chất xe</Text>
                        </View>
                        <View style={{paddingHorizontal: 20}}>
                            <InputText
                                fontSize={14}
                                labelFontSize={10}
                                label={'Giá trị'}
                                value={'5.000.000đ'}
                                onChangeText={()=>this.onChangeText()}
                            />
                        </View>
                        <View style={{paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                            {
                                this.state.listStatus.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            flex: 1,
                                            marginHorizontal: 5,
                                            padding: 12,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderColor:index == 0 ? '#30bebc' : '#D9D9D9',
                                            backgroundColor:index == 0 ? '#30bebc' : '#fff'
                                        }}>
                                            <Text style={{textAlign: 'center', fontSize: 14,color:index == 0 ? '#fff' : '#414042'}}>{item?.status}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                    <FooterButton>
                        <Button
                            label={'LƯU'}
                            onPress={() => this.setState({isOpen:false})}
                        />
                    </FooterButton>
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
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    searchInput: {
        marginHorizontal: 24, paddingVertical: 24,
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
        paddingBottom: '10@ms',

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
        fontSize: 14,
    },
    txtTextHotline: {
        color: '#be3030',
        fontSize: '15@ms',
    },

    containSearch: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',

    },
    sub: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 10
    },
    sub1: {
        color: '#333',
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    ctLine: {
        backgroundColor: '#F4F5F6',
        height: 1,
        flex: 1,
        marginTop: 15
    },
    txtName: {
        color: '#333',
        flex: 1,
        lineHeight: 25,
        marginLeft: 15,
        fontSize: 14
    },
    ctItemBenefit: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ctItemRight: {
        paddingVertical: 10,
        // paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
});


import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/InputQuestion';
import FastImage from 'react-native-fast-image';
import {Color} from '../../config/System';
import ModalBox from 'react-native-modalbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputForm from '../../components/buy/InputForm';
import TwoButton from '../../components/TwoButton';
import Button from '../../components/Button';
import {heightPercentageToDP, widthPercentageToDP} from '../../config/ConfigResponsive';
import AppText from '../../components/AppText';

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default (InsuredSuggest);
