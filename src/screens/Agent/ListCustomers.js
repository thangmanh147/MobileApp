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
import moment from 'moment';
import Loading from '../../components/Loading';


const screen = Dimensions.get('window');

let clear

class ListCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCustomers: [
                {
                    fullName: 'Trần Kiều Anh',
                    phone: '0929091868',
                    email: 'kieuanh@gmail.com',
                    list: [
                        {
                            title: 'BH trễ chuyến bay',
                            status: 'Khách hàng',
                        }, {
                            title: 'BH ô tô TNDS',
                            status: 'Có cơ hội',
                        },
                    ],
                }, {
                    fullName: 'Nguyễn Trần Trung Quân',
                    phone: '0929091868',
                    email: 'kieuanh@gmail.com',
                    list: [
                        {
                            title: 'BH trễ chuyến bay',
                            status: 'Khách hàng',
                        }, {
                            title: 'BH ô tô TNDS',
                            status: 'Có tiềm năng',
                        }, {
                            title: 'BH ô tô vật chất xe',
                            status: 'Có tiềm năng',
                        },
                    ],
                }, {
                    fullName: 'Nguyễn Quốc Đạt',
                    phone: '0929091868',
                    email: 'kieuanh@gmail.com',
                    list: [
                        {
                            title: 'BH trễ chuyến bay',
                            status: 'Có quan tâm',
                        }, {
                            title: 'BH ô tô TNDS',
                            status: 'Có cơ hội',
                        }, {
                            title: 'BH ô tô TNLXPX',
                            status: 'Khách hàng',
                        },
                    ],
                },
            ],
            listFilter: [
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
            listFilter1: [
                {
                    status: 'Tất cả',
                },
                {
                    status: 'Có quan tâm',
                },
                {
                    status: 'Có tiềm năng',
                }, {
                    status: 'Có cơ hội',
                }, {
                    status: 'Khách hàng',
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
            isOpenFilter: false,
            dateUpdate:'10:30 - 21/11/2020',
            fullName: '',
            phone: '',
            email: ''
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
            isOpenFilter:null
        });
    };

    renderStatus = (item1) => {
        switch (item1.status) {
            case 'Khách hàng':
                return '#30bebc';
            case 'Có cơ hội':
                return '#BE3030';
            case 'Có tiềm năng':
                return '#FEB404';
            case 'Có quan tâm':
                return '#30BE69';
        }
    };
    searchBenifit = (txtSearch)=>{
        this.setState({
            txtSearch:txtSearch
        })
    }
    componentWillMount() {
        this.getDate()
    }

    getDate = () => {
        let date = new Date()
        let dateFormat = moment(date).format('HH:mm - DD/MM/YYYY')
        this.setState({
            loading:false,
            dateUpdate:dateFormat
        })
    }

    reloadDate = () => {
        this.setState({
            loading:true
        })
        clearTimeout(clear)
        clear = setTimeout(()=>{
            this.getDate()
        },1000)
    }


    chooseStatus = (item,index) => {

    }


    addCustomer = () => {
        let {listCustomers,fullName,phone,email} = this.state
        let body = {
            fullName: fullName,
            phone: phone,
            email: email,
            list: [
                {
                    title: 'BH trễ chuyến bay',
                    status: 'Có quan tâm',
                }, {
                    title: 'BH ô tô TNDS',
                    status: 'Có cơ hội',
                }, {
                    title: 'BH ô tô TNLXPX',
                    status: 'Khách hàng',
                },
            ],

        }
    }

    render() {

        return (
            <View style={styles.container}>
                {
                    this.state.loading == true ? <Loading/> : null
                }
                <View>
                    <Nav isInfo={false} title={'DANH SÁCH KHÁCH HÀNG'}
                         onPress={() => Actions.pop()} showAddCustomer onPressCustomer={()=>this.setState({isOpen:true})}/>
                </View>
                <View style={styles.searchInput}>
                    <Input
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}
                        icon
                        onPress={() => this.setState({isOpenFilter:true})}
                        showFilter
                        value={this.state.txtSearch}
                        borderRadius={10}
                        backgroundColor={'#FFFFFF'}
                        autoCapitalize={'none'}
                        height={50}
                        placeholder={'Nhập từ khóa'}
                        onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}

                    >
                    </Input>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 15,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 24,
                    alignItems: 'center',
                }}>
                    <Text style={{paddingRight: 10, color: '#414042'}}>Cập nhật {this.state.dateUpdate}</Text>
                    <TouchableOpacity onPress={()=>this.reloadDate()}>
                        <Image source={require('../../icons/newicon1/reload.png')} style={{width: 20, height: 18}}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        this.state.listCustomers.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 10,
                                        paddingLeft: 15,
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
                                        marginVertical: 10,
                                    }}
                                    onPress={()=>Actions.CustomerDetail()}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 9}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{justifyContent: 'center', flex: 1}}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                    }}>{item?.fullName}</Text>
                                                </View>
                                                <View
                                                    style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                                    <Text style={{fontSize: 12, color: '#8D8C8D'}}>{item?.phone}</Text>
                                                    <Text style={{fontSize: 12, color: '#8D8C8D'}}>{item?.email}</Text>
                                                </View>
                                            </View>
                                            <View style={{paddingTop: 10}}>
                                                {
                                                    item.list.map((item1, index1) => {
                                                        return (

                                                            <View style={{flexDirection: 'row', paddingBottom: 5}}>
                                                                <View style={{
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        color: '#8D8C8D',
                                                                    }}>{item1.title}</Text>
                                                                </View>
                                                                <View style={{
                                                                    justifyContent: 'center',
                                                                    alignItems: 'flex-end',
                                                                    flex: 1,
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        color: this.renderStatus(item1),
                                                                    }}>{item1.status}</Text>
                                                                </View>
                                                            </View>

                                                        );
                                                    })
                                                }
                                            </View>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <FastImage source={require('../../icons/iconAgent/ar_grey.png')}
                                                       style={{height: 14, width: 9, resizeMode: 'contain'}}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpenFilter}
                    onClosed={() => this.onCloseModal()}
                    style={styles.ctModal}
                >
                    <ScrollView style={{backgroundColor: '#fff', flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                        <View style={{
                            backgroundColor: '#F4F5F6',
                            flex: 1,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            justifyContent: 'center',
                            paddingHorizontal: 30,
                            paddingVertical:20
                        }}>
                            <Text style={{fontSize: 14, fontWeight: '600'}}>Lọc theo Thời gian</Text>
                        </View>

                        {
                            this.state.listFilter.map((item, index) => {
                                return (
                                    <TouchableOpacity style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 24}} key={index}>
                                        <FastImage source={require('../../icons/iconAgent/ic_choose_multi.png')}
                                                   style={{height:15,width:15}}/>
                                        <Text style={{paddingLeft:10}}>{item.statusFilter}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                        <View style={{
                            backgroundColor: '#F4F5F6',
                            flex: 1,
                            justifyContent: 'center',
                            paddingHorizontal: 30,
                            paddingVertical:20
                        }}>
                            <Text style={{fontSize: 14, fontWeight: '600'}}>Lọc theo giá trị tín dụng</Text>
                        </View>
                        {
                            this.state.listFilter1.map((item, index) => {
                                return (


                                    <TouchableOpacity style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 24}} key={index}>
                                        <FastImage source={require('../../icons/iconAgent/ic_choose_multi.png')}
                                                   style={{height:15,width:15}}/>
                                        <Text style={{paddingLeft:10,color:this.renderStatus(item)}}>{item.status}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }

                    </ScrollView>
                    <FooterButton>
                        <TwoButton
                            backgroundColor={'#30BEBC'}
                            label={'BỎ CHỌN'}
                            labelConfirm={'ÁP DỤNG'}
                            onPressConfirm={()=>this.setState({isOpenFilter:false})}
                            onPress={()=>this.setState({isOpenFilter:false})}/>
                    </FooterButton>
                </ModalBox>
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
                            <Text style={{fontSize: 16, fontWeight: '600'}}>Thêm khách hàng</Text>
                        </View>
                        <View style={{paddingHorizontal: 20}}>
                            <InputText
                                fontSize={14}
                                labelFontSize={10}
                                label={'Họ và tên'}
                                value={this.state.fullName}
                                onChangeText={(text) => this.setState({fullName:text})}
                            />
                            <InputText
                                fontSize={14}
                                labelFontSize={10}
                                label={'Số điện thoại'}
                                value={this.state.phoneNumber}
                                onChangeText={(text) => this.setState({phoneNumber:text})}
                            />
                            <InputText
                                fontSize={14}
                                labelFontSize={10}
                                label={'Email'}
                                value={this.state.email}
                                onChangeText={(text) => this.setState({email:text})}
                            />
                        </View>
                        <View style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            justifyContent: 'center',
                            paddingHorizontal: 30,
                            paddingVertical: 20,
                        }}>
                            <Text style={{fontSize: 16, fontWeight: '500', color: '#414042'}}>Bảo hiểm KH quan
                                tâm</Text>
                        </View>
                        {
                            this.state.listFilter2.map((item, index) => {
                                return (


                                    <TouchableOpacity style={{
                                        flexDirection: 'row',
                                        borderTopWidth: 0,
                                        alignItems: 'center',
                                        paddingBottom: 10,
                                        paddingLeft: 0,
                                        marginHorizontal: 24,
                                    }} key={index}>
                                        <FastImage source={require('../../icons/iconAgent/ic_choose_multi.png')}
                                                   style={{height: 15, width: 15}}/>
                                        <Text style={{paddingLeft: 10, fontSize: 14}}>{item.statusFilter}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                        <View style={{paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
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
                                        }} onPress={()=>this.chooseStatus(item,index)}>
                                            <Text style={{textAlign: 'center', fontSize: 14,color:index == 0 ? '#fff' : '#414042'}}>{item?.status}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>

                    <FooterButton>
                        <Button
                            label={'THÊM KHÁCH HÀNG'}
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
        flex: 0.65,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    searchInput: {
        marginHorizontal: 24, marginTop: -hp('3%'),
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

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default (ListCustomers);
