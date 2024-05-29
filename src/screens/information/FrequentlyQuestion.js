import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    ScrollView,
    BackHandler,
    TextInput, ImageBackground,
    Alert,
    Linking,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Config from 'react-native-config';
import {ScaledSheet} from 'react-native-size-matters';
import Input from '../../components/InputQuestion';
import Nav from '../../components/Nav'

import SimpleToast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image'
import { Color } from '../../config/System';

const {width} = Dimensions.get('window');


class FrequentlyQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listParent: [],
            benefit_group_id: '',
            txtSearch: '',
            contract_name: 'Hợp đồng',
            nameCLicked: '',
            benefit: [],
            benefit1: [],
            listParentConst: [],
            open: false,
            loading: true,
            questions: [
                {
                    question:`1. ${Config.APP_NAME} là gì?`,
                    answer:`${Config.APP_NAME} là một ứng dụng trên di động dành cho người bán bảo hiểm có thể cấp đơn cho người được bảo hiểm (khách hàng) nhanh chóng mà không cần dùng các loại giấy tờ thông thường.`,
                    open:false
                },
            ],
        };
    }


    searchBenifit = (text) => {

    };
    checkOpen = (item) => {
        let arr1 = this.state.questions
        for (let j = 0; j < arr1.length; j++) {
            if (item.question == arr1[j].question && item.open == false) {
                let c = Object.assign(arr1, {[j]: {...arr1[j], open: true}})
                this.setState({
                    questions: c
                })
            } else if (item.open == true && item.question == arr1[j].question) {
                let b = Object.assign(arr1, {[j]: {...arr1[j], open: false}})
                this.setState({
                    questions: b
                })
            }
        }
    };

    renderNotLoad = () => {
        return (
            <View onPress={() => this.userEdit()}
                  style={{flex: 0.2, justifyContent: 'center', marginTop: 20, marginLeft: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Không tìm thấy dữ liệu.</Text>
            </View>
        );
    };
    condition = (length, newArr, newArr2) => {

        if (length === 0) {
            return newArr2;
        } else {
            return newArr;
        }
    };

    handleCall = () => {
        const phone = '1900232425';
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Nav isInfo={false} title={'CÂU HỎI THƯỜNG GẶP'}
                            onPress={() => Actions.pop()}/>
                </View>
                <View style={styles.containSearch}>

                    <View style={styles.searchInput}>
                        <Input
                            showBorder={false}
                            borderRadius={10}
                            backgroundColor={'#FFFFFF'}
                            autoCapitalize={'none'}
                            height={50}
                            placeholder={'Tìm kiếm'}
                            onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                        >
                        </Input>
                    </View>
                </View>
                <ScrollView style={{flex: 1,marginTop:5}}>
                    <View>
                        {
                            this.state.questions.length === 0  ? this.renderNotLoad() : null
                        }
                    </View>

                    <View>
                        {
                            this.state.questions && this.state.questions.length > 0 &&
                            this.state.questions.map((item,index)=>{
                                return (
                                    <View key={index} style={[styles.containView, {backgroundColor: 'white'}]}>
                                        <TouchableOpacity onPress={() => this.checkOpen(item)}
                                                          style={styles.wrapperInfor}>
                                            <View style={styles.containInformation}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: '#414042',
                                                    fontWeight: '600'
                                                }}>{item.question}</Text>
                                            </View>
                                            <FastImage style={styles.ic_arrow} resizeMode={'contain'}
                                                   source={item.open == false ? require('../../icons/iconAgent/ic_arrow_down.png') : require('../../icons/iconAgent/ic_arrow_up.png')}/>
                                        </TouchableOpacity>
                                        {
                                            item.open == true ?
                                                <View style={styles.containFullSubInfor}>
                                                    <Text style={styles.txtText2}>{item.answer}</Text>
                                                </View> : null
                                        }
                                    </View>
                                )
                            })
                        }


                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',height:50,paddingBottom: 32}}>
                    <TouchableOpacity disabled onPress={this.handleCall} style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.txtText}>Mọi thắc mắc vui lòng liên hệ chúng tôi tại Hotline</Text>
                        <Text style={styles.txtTextHotline}>1900 232425</Text>
                    </TouchableOpacity>
                </View>
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
        flex: 1,borderRadius:10,marginTop: -25
    },
    oval: {
        marginTop:'-40@ms',
        alignSelf:'center',
        width: '105%',
        height: '20%',
        borderRadius: 50,
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
        paddingVertical: 10,
        paddingLeft: 15,
        flex: 1,
        borderLeftWidth:1,
        borderColor: Color
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

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: '15@s',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    containView: {
        marginHorizontal: 24,
        marginTop:5

    },
    containSubInfor: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    containFullSubInfor: {
        paddingTop:15,
        backgroundColor: '#F4F4F4',
        marginHorizontal: '5@s',
        borderBottomLeftRadius:'10@ms',
        borderBottomRightRadius:'10@ms',
        paddingBottom:'10@ms'

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
        fontSize:14,
        color:'#414042',
        textAlign: 'justify'
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
        fontSize: '15@ms',
        fontWeight:'bold',
        // fontFamily:'SF-Pro-Display-Regular'
    },

    containSearch: {
        flexDirection: 'row',
        marginHorizontal: 24,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default (FrequentlyQuestion);
