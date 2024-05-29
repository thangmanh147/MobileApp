'use strict';

import React, { Component } from 'react';

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
    TextInput, ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import IconFilterSvg from '../../config/images/icons/IconFilterSvg';

const screen = Dimensions.get('window');


class Favors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listFavor: [
                {
                    imageFavor: require('../../icons/iconAgent/ic_thecoffeehosue.png'),
                    pointRedeem: '120',
                    iconBranch: require('../../icons/iconAgent/branch_name_coffee_house.png'),
                    branchName: 'The Coffee House',
                    title: 'Miễn phí 1 cốc trà đào cam sả size M',
                    endDate: '22/03/2020'
                }, {
                    imageFavor: require('../../icons/iconAgent/ic_thecoffeehosue.png'),
                    pointRedeem: '120',
                    iconBranch: require('../../icons/iconAgent/branch_name_coffee_house.png'),
                    branchName: 'The Coffee House',
                    title: 'Miễn phí 1 cốc trà đào cam sả size M',
                    endDate: '22/03/2020'
                }, {
                    imageFavor: require('../../icons/iconAgent/ic_thecoffeehosue.png'),
                    pointRedeem: '120',
                    iconBranch: require('../../icons/iconAgent/branch_name_coffee_house.png'),
                    branchName: 'The Coffee House',
                    title: 'Miễn phí 1 cốc trà đào cam sả size M',
                    endDate: '22/03/2020'
                }, {
                    imageFavor: require('../../icons/iconAgent/ic_thecoffeehosue.png'),
                    pointRedeem: '120',
                    iconBranch: require('../../icons/iconAgent/branch_name_coffee_house.png'),
                    branchName: 'The Coffee House',
                    title: 'Miễn phí 1 cốc trà đào cam sả size M',
                    endDate: '22/03/2020'
                }, {
                    imageFavor: require('../../icons/iconAgent/ic_thecoffeehosue.png'),
                    pointRedeem: '120',
                    iconBranch: require('../../icons/iconAgent/branch_name_coffee_house.png'),
                    branchName: 'The Coffee House',
                    title: 'Miễn phí 1 cốc trà đào cam sả size M',
                    endDate: '22/03/2020'
                }, {
                    imageFavor: require('../../icons/iconAgent/ic_thecoffeehosue.png'),
                    pointRedeem: '120',
                    iconBranch: require('../../icons/iconAgent/branch_name_coffee_house.png'),
                    branchName: 'The Coffee House',
                    title: 'Miễn phí 1 cốc trà đào cam sả size M',
                    endDate: '22/03/2020'
                }, {
                    imageFavor: require('../../icons/iconAgent/ic_thecoffeehosue.png'),
                    pointRedeem: '120',
                    iconBranch: require('../../icons/iconAgent/branch_name_coffee_house.png'),
                    branchName: 'The Coffee House',
                    title: 'Miễn phí 1 cốc trà đào cam sả size M',
                    endDate: '22/03/2020'
                },
            ],
            textSearch: ''
        };

    }

    onPressLoginButton = () => {
        if (this.state.mobile == '') {
            SimpleToast.show('Bạn chưa nhập số điện thoại');
        }
    }



    onSearch = (text) => {
        this.setState({
            textSearch: text
        })
    }

    render() {
        return (

            <View style={styles.container}>
                <ImageBackground
                    style={{ height: 165, width: '100%' }}>
                    <Nav isInfo={true} title={'ƯU ĐÃI ĐỔI ĐIỂM'}
                        bottom={20}
                        onPress={() => Actions.pop()} />
                    <View style={{
                        alignSelf: 'center',
                        borderRadius: 20,
                        flexDirection: 'row',
                        backgroundColor: '#ffffff',
                        width: '35%',
                    }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <FastImage source={require('../../icons/iconAgent/ic_diamond.png')}
                                    style={{ width: 13, height: 11 }} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}>
                                <Text style={{ color: '#414042', fontWeight: 'bold', fontSize: 16 }}>3.524 điểm</Text>
                            </View>
                        </View>

                    </View>

                </ImageBackground>
                <View style={{
                    padding: 5,
                    borderRadius: 10,
                    flexDirection: 'row',
                    marginHorizontal: 24,
                    backgroundColor: '#ffffff',
                    height: 'auto',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    marginTop: -30
                }}>
                    <View style={{
                        padding: 10,
                        flex: 2,
                        alignItems: 'center',
                        borderRightWidth: 1,
                        borderColor: '#D9D9D9',
                        flexDirection: 'row', marginHorizontal: 10
                    }}>
                        <FastImage source={this.state.textSearch == '' ? require('../../icons/iconAgent/ic_search.png') : require('../../icons/iconAgent/ic_search_30bebc.png')}
                            style={{ height: 20, width: 20 }} />
                        <TextInput onChangeText={(text) => this.onSearch(text)} placeholder={'Tìm kiếm'} style={{ color: '#414042', fontSize: 14, marginLeft: 10 }} />
                    </View>
                    <TouchableOpacity style={{ flex: 0.6, padding: 10, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: '#8D8C8D', fontSize: 14 }}>Lọc</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>  
                                <IconFilterSvg width={20} height={20} />
                            </View>
                        </View>
                    </TouchableOpacity>


                </View>
                <ScrollView style={{ flex: 1, paddingVertical: 24 }}>
                    {
                        this.state.listFavor && this.state.listFavor.length > 0 ?
                            this.state.listFavor.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => Actions.FavorsDetail()} style={{
                                        marginHorizontal: 24, borderRadius: 10, backgroundColor: '#ffffff', shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.22,
                                        shadowRadius: 2.22,
                                        elevation: 3, marginBottom: 12
                                    }}>
                                        <FastImage source={item.imageFavor}
                                            style={{ height: 173, width: '100%', borderRadius: 10 }}
                                            cache={{ cache: FastImage.cacheControl.immutable }}>
                                        </FastImage>
                                        <View style={{ height: 173, width: '100%', position: 'absolute' }}>
                                            <View style={{ flex: 1 }} />
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                                    <FastImage source={item.iconBranch}
                                                        style={{ height: 70, width: 70 }} />
                                                </View>
                                                <View style={{ flex: 2.5, justifyContent: 'center' }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 14 }}>{item.branchName}</Text>
                                                </View>
                                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                                    <View style={{ height: 'auto', padding: 7, width: '100%', backgroundColor: Color, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <FastImage source={require('../../icons/iconAgent/ic_diamond.png')}
                                                                style={{ width: 13, height: 11 }} />
                                                        </View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}>
                                                            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: 'bold' }}>{item.pointRedeem} điểm</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ padding: 15 }}>
                                            <Text style={{ fontSize: 16 }}>{item.title}</Text>
                                            <Text style={{ fontSize: 16, color: '#8D8C8D' }}>Hạn sử dụng: {item.endDate}</Text>

                                        </View>
                                    </TouchableOpacity>
                                )
                            }) : null
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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


import SimpleToast from 'react-native-simple-toast';
import Nav from "../../components/Nav";
import FastImage from 'react-native-fast-image';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (Favors);
