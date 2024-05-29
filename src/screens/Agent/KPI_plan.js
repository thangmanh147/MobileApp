import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    ScrollView,
    BackHandler,
    TextInput, ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import Input from '../../components/InputQuestion';
import Nav from '../../components/Nav'

import SimpleToast from 'react-native-simple-toast';
import Button from "../../components/Button";
import { Color } from '../../config/System';
import FooterButton from '../../components/FooterButton';

const {width} = Dimensions.get('window');

class KpiPlan extends Component {
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
            openMonth:false,
            loading: true,
            KPI_month:'',
            questions: [
                {
                    KPI_expected:'3.000.000.000',
                    open:false,
                    quarter:1,
                    month:[
                        {
                            month:1,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000',
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },{
                            month:2,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'300.000.000'
                                },
                            ]
                        },{
                            month:3,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },
                    ]
                },{
                    KPI_expected:'3.000.000.000',
                    open:false,
                    quarter:2,
                    month:[
                        {
                            month:4,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },{
                            month:5,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },{
                            month:6,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },
                    ]
                },{
                    KPI_expected:'3.000.000.000',
                    open:false,
                    quarter:3,
                    month:[
                        {
                            month:7,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },{
                            month:8,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },{
                            month:9,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },
                    ]

                },{
                    KPI_expected:'3.000.000.000',
                    open:false,
                    quarter:4,
                    month:[
                        {
                            month:10,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },{
                            month:11,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },{
                            month:12,
                            KPI_month_expected:'1.000.000.000',
                            openMonth:false,
                            week: [
                                {
                                    week: 1,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 2,
                                    KPI_week_expected:'200.000.000'
                                },{
                                    week: 3,
                                    KPI_week_expected:'300.000.000'
                                },{
                                    week: 4,
                                    KPI_week_expected:'200.000.000'
                                },
                            ]
                        },
                    ]
                },
            ],
        };
    }



    searchBenifit = (text) => {

    };
    checkOpen = (item) => {
        let arr1 = this.state.questions
        for (let j = 0; j < arr1.length; j++) {
            if (item.quarter == arr1[j].quarter && item.open == false) {
                let c = Object.assign(arr1, {[j]: {...arr1[j], open: true}})
                this.setState({
                    questions: c
                })
            } else if (item.open == true && item.quarter == arr1[j].quarter) {
                let b = Object.assign(arr1, {[j]: {...arr1[j], open: false}})
                this.setState({
                    questions: b
                })
            }
        }
    };
    checkOpenMonth = (item1) => {
        if (this.state.KPI_month !== item1.month) {
            this.setState({
                KPI_month: item1.month
            })
        }else if (this.state.KPI_month == item1.month) {
            this.setState({
                KPI_month: ''
            })
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

    render() {
        console.log('this.state.KPI_month',this.state.KPI_month)
        return (
            <View style={styles.container}>
                <Nav isInfo={false} title={'KẾ HOẠCH DỰ KIẾN'}
                    bottom={20}
                    onPress={() => Actions.pop()}/>
                <ScrollView style={{flex: 1,marginTop:-35}} contentContainerStyle={{paddingBottom: 10}}>
                    <View style={{
                        marginHorizontal: 24,
                        borderRadius: 20,
                        backgroundColor: 'white',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>
                        {
                            this.state.questions && this.state.questions.length > 0 &&
                            this.state.questions.map((item,index)=>{
                                console.log('item',item)
                                return (
                                    <View key={index} style={[styles.containView, this.state.questions.length === index + 1 && {marginBottom: 0}]}>
                                        <TouchableOpacity onPress={() => this.checkOpen(item)}
                                                          style={styles.wrapperInfor}>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={styles.containInformation}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: '#414042',
                                                        fontWeight: 'bold'
                                                    }}>Quý {index + 1}/2021</Text>
                                                </View>
                                                <View style={[styles.containInformation,{alignItems:'flex-end'}]}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: '#414042',
                                                        fontWeight: 'bold'
                                                    }}>{item.KPI_expected}đ</Text>
                                                </View>
                                            </View>
                                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                                <Image source={item.open == true ? require('../../icons/iconAgent/ic_double_arrow_up.png') : require('../../icons/iconAgent/ic_double_arrow_down.png')}
                                                       style={{height:15,width:15}} />
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            item.open == true && item.month && item.month.length > 0 ?
                                                item.month.map((item1,index1) => {
                                                    return (
                                                        <View key={index1} style={{backgroundColor:'#ffffff'}}>
                                                            <TouchableOpacity style={{
                                                                flexDirection: 'row',
                                                                borderBottomWidth: item.month.length === index1 + 1 ? 0 : 1,
                                                                paddingVertical:15,
                                                                borderColor:'#E9E9E9'
                                                            }} onPress={() => this.checkOpenMonth(item1)}>
                                                                <Text style={{
                                                                    flex: 6,
                                                                    fontSize: 14,
                                                                    color: '#414042',
                                                                    marginLeft: 15,
                                                                }}>Tháng {item1.month}</Text>
                                                                <Text style={{
                                                                    flex: 6,
                                                                    textAlign:'right',
                                                                    fontSize: 14,
                                                                    color: '#414042',
                                                                }}>{item1.KPI_month_expected}đ</Text>
                                                                <Image style={styles.ic_arrow}
                                                                       resizeMode={'contain'}
                                                                       source={this.state.KPI_month == item1.month ? require('../../icons/iconAgent/ic_arrow_up.png') : require('../../icons/iconAgent/ic_arrow_right.png')}/>
                                                            </TouchableOpacity>
                                                            {
                                                                this.state.KPI_month == item1.month && item1.week.length > 0 ?
                                                                    item1.week.map((item2,index2) => {
                                                                        return (
                                                                            <View style={{
                                                                                flexDirection: 'row',
                                                                                marginVertical: 5,
                                                                                paddingVertical:10,
                                                                                paddingHorizontal: 20
                                                                            }} >
                                                                                <Text style={{
                                                                                    flex: 6,
                                                                                    fontSize: 14,
                                                                                    color: '#414042',
                                                                                    marginLeft: 5,
                                                                                }}>Tuần {item2.week}</Text>
                                                                                <Text style={{
                                                                                    flex: 6,
                                                                                    textAlign:'right',
                                                                                    fontSize: 14,
                                                                                    color: '#414042',
                                                                                    marginRight: 15,
                                                                                }}>{item2.KPI_week_expected}đ</Text>
                                                                            </View>
                                                                        )
                                                                    }) : null
                                                            }
                                                        </View>

                                                    )
                                                }) : null
                                        }

                                    </View>
                                )
                            })
                        }

                        <View style={[styles.wrapperInfor,{backgroundColor:'white', marginTop: 5, marginBottom: 15,borderBottomLeftRadius: 20,borderBottomRightRadius: 20}]}>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.containInformation}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#414042',
                                        fontWeight: 'bold'
                                    }}>Năm 2021</Text>
                                </View>
                                <View style={[styles.containInformation,{alignItems:'flex-end'}]}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#414042',
                                        fontWeight: 'bold'
                                    }}>12.000.000.000đ</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
                {/*<TouchableOpacity onPress={()=>Actions.pop()} style={{alignItems:'center',justifyContent:'center'}}>*/}
                {/*    <Button label={'ĐÓNG'}></Button>*/}
                {/*</TouchableOpacity>*/}
                <FooterButton>
                    <Button

                        label={'ĐÓNG'}
                        //disabled={this.state.isDisabled}
                        backgroundColor={Color}
                        onPress={()=>Actions.pop()}
                    />
                </FooterButton>
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
        flex: 1,borderRadius:50,marginTop:-20,marginHorizontal:15
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
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 15,
        flex: 1,
    },
    ic_arrow: {
        alignSelf:'center',
        height: '12@vs',
        width: '12@s',
        marginHorizontal: '10@s',
    },
    wrapperInfor: {
        backgroundColor: '#F6F5F6',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 10
        // marginHorizontal: '15@s',

    },
    containView: {
        marginBottom: 15,
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
        marginHorizontal: 15,
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
export default (KpiPlan);
