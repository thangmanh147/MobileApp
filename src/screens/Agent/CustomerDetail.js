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
    Image, TextInput, Linking,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import FooterButton from '../../components/FooterButton';
import InputText from '../../components/Input';
import Swipeable from 'react-native-swipeable-row';


const screen = Dimensions.get('window');


class CustomerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCredit: [
                {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    title: 'Khoản vay Bảo an Tín dụng',
                    codeRequest: '43744212',
                    fee: '200.000.000đ',
                    status: 'Đã duyệt',
                    dateCreate: '18: 14 - 11/12/2020',
                },
                {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    title: 'Bảo hiểm Nhà',
                    codeRequest: '26292844',
                    fee: '150.000.000đ',
                    status: 'Đã duyệt',
                    dateCreate: '07: 24 - 15/12/2020',
                }, {
                    icon: require('../../icons/iconAgent/ic_car.png'),
                    title: 'Bảo hiểm Nhà',
                    codeRequest: '4917452',
                    fee: '1.000.000đ',
                    status: 'Đã duyệt',
                    dateCreate: '08: 15 - 19/12/2020',
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
                    title: 'Bảo hiểm vật chất xe',
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
            openModal: false,
            index: 0, //if index=1 g listvoucher, else default uservoucher
            routes: [
                {key: 'first', title: 'Cơ hội bán hàng'},
                {key: 'second', title: 'Lịch sử tín dụng'},
                {key: 'third', title: 'Hợp đồng bảo hiểm'},
                {key: 'four', title: 'Lịch sử bồi thường'},
            ],
        };
    }

    FirstRoute = () => (
        <ScrollView>
            {this.chanceSale()}
        </ScrollView>
    );
    SecondRoute = () => (
        <ScrollView>
            {this.renderCredit()}
        </ScrollView>
    );
    ThirdRoute = () => (
        <ScrollView>
            {this.listContract()}
        </ScrollView>
    );
    FourRoute = () => (
        <ScrollView>
            {this.renderListClaim()}
        </ScrollView>
    );


    chanceSale() {
        return (
            <View>
                {
                    this.state.listChanceSale && this.state.listChanceSale.length > 0 ?
                        this.state.listChanceSale.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={{
                                    flexDirection: 'row',
                                    height: 'auto',
                                    marginHorizontal: 30,
                                    borderColor: '#D9D9D9',
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    paddingVertical: 10,
                                    backgroundColor: '#FFFFFF',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,

                                }}
                                                  onPress={()=>Actions.InsuredSuggest()}
                                >
                                    <View style={{
                                        flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderLeftWidth: 1.5,
                                        borderLeftColor: Color,
                                    }}>
                                        <FastImage source={item.icon}
                                                   style={{height: 50, width: 50, resizeMode: 'contain'}}/>
                                    </View>
                                    <View style={{flex: 5, justifyContent: 'center'}}>
                                        <View style={{paddingVertical: 10}}>
                                            <View style={{justifyContent: 'center', flex: 1}}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#414042',
                                                    fontWeight: '600',
                                                }}>{item?.title}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                            <View style={{justifyContent: 'center', flex: 1}}>
                                                <Text style={{fontSize: 14, color: '#8D8C8D'}}>Giá
                                                    trị: {item?.fee}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                            <View style={{justifyContent: 'center', flex: 1}}>
                                                <Text style={{fontSize: 14, color: '#8D8C8D'}}>Trạng thái: <Text
                                                    style={{color: '#414042'}}>{item?.status}</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                                        <FastImage source={require('../../icons/iconAgent/ar_grey.png')}
                                                   style={{height: 14, width: 9, resizeMode: 'contain'}}/>
                                    </View>
                                </TouchableOpacity>
                            );
                        }) : null
                }
            </View>
        );
    }

    renderListClaim() {
        return (
            <View>
                {
                    this.state.listClaim && this.state.listClaim.length > 0 ?
                        this.state.listClaim.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    height: 'auto',
                                    backgroundColor: '#FFFFFF',
                                    marginHorizontal: 24,
                                    paddingHorizontal: 16,
                                    paddingTop: 15,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,

                                }}>
                                    <View style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: '#D9D9D9'}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#414042', fontWeight: '600'}}>Số hợp
                                                đồng: {item?.contractCode}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 5, paddingTop: 12}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#8D8C8D'}}>Ngày gửi</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#8D8C8D'}}>{item.dateCreate}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 5}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#8D8C8D'}}>Mã yêu cầu</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#8D8C8D'}}>{item.codeRequest}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 10}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#8D8C8D'}}>Trạng thái HS</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: item.statusCode == '1' ? '#30bebc' : '#be3030',
                                            }}>{item.status}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }) : null
                }
            </View>
        );
    }

    listContract() {
        return (
            <View>
                {
                    this.state.listContract && this.state.listContract.length > 0 ?
                        this.state.listContract.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    flexDirection: 'row',
                                    height: 'auto',
                                    marginHorizontal: 30,
                                    borderColor: '#D9D9D9',
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    paddingVertical: 10,
                                    backgroundColor: '#FFFFFF',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,

                                }}>
                                    <View style={{
                                        flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderLeftWidth: 1.5,
                                        borderLeftColor: Color,
                                    }}>
                                        <FastImage source={item.icon}
                                                   style={{height: 50, width: 50, resizeMode: 'contain'}}/>
                                    </View>
                                    <View style={{flex: 5, justifyContent: 'center'}}>
                                        <View style={{paddingVertical: 10}}>
                                            <View style={{justifyContent: 'center', flex: 1}}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#414042',
                                                    fontWeight: '600',
                                                }}>{item?.contractCode}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                            <View style={{justifyContent: 'center', flex: 1}}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#8D8C8D',
                                                }}>BKS: {item?.codeRequest}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                            <View style={{justifyContent: 'center', flex: 1}}>
                                                <Text style={{fontSize: 14, color: '#8D8C8D'}}>Ngày
                                                    mua: {item?.dateCreate}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                            <View style={{justifyContent: 'center', flex: 1}}>
                                                <Text style={{fontSize: 14, color: '#8D8C8D'}}>Trạng thái: <Text
                                                    style={{color: item.statusCode == '1' ? '#30bebc' : '#be3030'}}>{item?.status}</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                                    </View>
                                </View>
                            );
                        }) : null
                }
            </View>
        );
    }
    _renderTabBar = props => (
        <View style={{marginTop: hp('2%')}}>
            <View style={{
                borderRadius: 10,
                flexDirection: 'row',
                marginHorizontal: 24,
                paddingVertical: 10,
                backgroundColor: '#ffffff',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,

            }}>
                {
                    this.state.routes.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => this.setState({index: index})} style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRightWidth: (index == (this.state.routes.length - 1) ? 0 : 1),
                                borderColor: '#D9D9D9',
                            }}>
                                <Text style={{
                                    color: this.state.index == index ? Color : '#333',
                                    fontSize: 14,
                                    textAlign: 'center',
                                }}>{item?.title}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
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
                    onPress={() => this.openModalFilter()}
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

        </View>

    );

    searchBenifit = (txtSearch) => {
        this.setState({
            txtSearch:txtSearch
        })
    }

    renderCredit() {
        return (
            <View>
                {
                    this.state.listCredit && this.state.listCredit.length > 0 ?
                        this.state.listCredit.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    height: 'auto',
                                    marginHorizontal: 24,
                                    borderBottomWidth: 1,
                                    borderColor: '#D9D9D9',
                                    // marginVertical: 10,
                                    paddingVertical: 10,

                                }}>
                                    <View style={{flexDirection: 'row', paddingVertical: 10}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: '#414042',
                                                fontWeight: '600',
                                            }}>{item.title}</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: '#414042',
                                                fontWeight: '600',
                                            }}>{item.fee}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 5}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#414042'}}>Số hợp đồng</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#414042'}}>{item.codeRequest}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 5}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#414042'}}>Trạng thái HS</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#414042'}}>{item.status}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingBottom: 5}}>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#414042'}}>Ngày tạo</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                            <Text style={{fontSize: 14, color: '#414042'}}>{item.dateCreate}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }) : null
                }
            </View>
        );
    }

    openModalFilter = () => {
        this.setState({
            isOpen: true,
        });
    };
    onCloseModal = () => {
        this.setState({
            isOpen: null,
            openModal:null
        });
    };

    onChangeDate = (text) => {
        const str = text;
        if (text.length === 2 && this.state.departTime.charAt(2) !== '/') {
            let a = str.slice(0, 2);
            this.setState({
                departTime: text += '/',
            });
        } else if (text.length === 5 && this.state.departTime.charAt(5) !== '/') {
            let a = str.slice(3, 5);
            this.setState({
                departTime: text += '/',
            });
        } else {
            this.setState({departTime: text});
        }
    };

    render() {
        console.log('listContract', this.state.listContract);
        return (
            <View style={styles.container}>
                <View>
                    <Nav calender isInfo={false} title={'CHI TIẾT KHÁCH HÀNG'}
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
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Trần Kiều Anh</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 5}} onPress={()=>this.setState({openModal:true})}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 5}}>
                                        <Image source={require('../../icons/newicon1/ic_edit_yellow.png')}
                                               style={{height: 20, width: 20, resizeMode: 'contain'}}/>
                                    </View>
                                    <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                                        <Text style={{fontSize: 14, color: '#FEB404'}}>Sửa</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>Linking.openURL('tel:0904626046')}>
                                    <Text style={{fontSize: 12, color: '#8D8C8D'}}>0904 626 046</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>Linking.openURL('mailto:thunth8192@gmail.com')}>
                                    <Text style={{fontSize: 12, color: '#8D8C8D'}}>thunth8192@gmail.com</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{paddingTop: 10}}>
                            <View style={{flexDirection: 'row',paddingBottom:5}}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 14, color: '#8D8C8D'}}>BH trễ chuyến bay</Text>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                    <Text style={{fontSize: 14, color: '#30bebc'}}>Khách hàng</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 14, color: '#8D8C8D'}}>BH ô tô TNDS</Text>
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                    <Text style={{fontSize: 14, color: '#BE3030'}}>Có cơ hội</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.FirstRoute,
                        second: this.SecondRoute,
                        third: this.ThirdRoute,
                        four: this.FourRoute,
                    })}
                    onIndexChange={index => this.setState({index})}
                    renderTabBar={this._renderTabBar}
                />
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.openModal}
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
                            <Text style={{fontSize: 16, fontWeight: '600'}}>Sửa thông tin khách hàng</Text>
                        </View>
                        <View style={{paddingHorizontal: 20}}>
                            <InputText
                                fontSize={14}
                                labelFontSize={10}
                                label={'Họ và tên'}
                            />
                            <InputText
                                fontSize={14}
                                labelFontSize={10}
                                label={'Số điện thoại'}
                            />
                            <InputText
                                fontSize={14}
                                labelFontSize={10}
                                label={'Email'}
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
                        <View style={{paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between',marginBottom: 10}}>
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
                            label={'Lưu'}
                            onPress={() => this.setState({isOpen:false})}
                        />
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
                            this.state.listFilter2.map((item, index) => {
                                return (
                                    <TouchableOpacity style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 24}} key={index}>
                                        <FastImage source={require('../../icons/iconAgent/single_select.png')}
                                                   style={{height:15,width:15}}/>
                                        <Text style={{paddingLeft:5}}>{item.statusFilter}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                        <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center', paddingTop: 10, paddingLeft: 0, marginHorizontal: 24}} >
                            <FastImage source={require('../../icons/iconAgent/single_select.png')}
                                       style={{height:15,width:15}}/>
                            <Text style={{paddingLeft:5}}>{'Tùy chọn'}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',paddingHorizontal:45,paddingVertical:10}}>
                            <View style={{flex:1}}>
                                <TextInput placeholder={"Từ dd/mm/yyyy"}/>
                            </View>
                            <View style={{flex:1}}>
                                <TextInput placeholder={"Đến dd/mm/yyyy"}/>
                            </View>
                        </View>
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
                                        <FastImage source={require('../../icons/iconAgent/single_select.png')}
                                                   style={{height:15,width:15}}/>
                                        <Text style={{paddingLeft:5}}>{item.statusFilter}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                        <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center', paddingTop: 10, paddingLeft: 0, marginHorizontal: 24}} >
                            <FastImage source={require('../../icons/iconAgent/single_select.png')}
                                       style={{height:15,width:15}}/>
                            <Text style={{paddingLeft:5}}>{'Tùy chọn'}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',paddingHorizontal:45,paddingVertical:10}}>
                            <View style={{flex:1}}>
                                <TextInput placeholder={"Từ xxxđ"}/>
                            </View>
                            <View style={{flex:1}}>
                                <TextInput placeholder={"Đến xxxđ"}/>
                            </View>
                        </View>
                    </ScrollView>
                    <FooterButton>
                        <TwoButton
                            backgroundColor={'#30BEBC'}
                            label={'BỎ CHỌN'}
                            labelConfirm={'ÁP DỤNG'}
                            onPressConfirm={()=>this.setState({isOpen:false})}
                            onPress={()=>this.setState({isOpen:false})}/>
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

export default (CustomerDetail);
