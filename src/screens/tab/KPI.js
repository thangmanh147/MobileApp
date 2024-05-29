import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import Nav from '../../components/Nav';
import FirstRoute from '../KPI/FirstRoute/FirstRoute';
import SecondRoute from '../KPI/SecondRoute/SecondRoute';
import ThirdRoute from '../KPI/ThirdRoute/ThirdRoute';
// import FirstRouteGroup from '../KPI/FirstRoute/FirstRouteGroup';
// import SecondRouteGroup from '../KPI/SecondRoute/SecondRouteGroup';
// import ThirdRouteGroup from '../KPI/ThirdRoute/ThirdRouteGroup';
import {TabView, SceneMap} from 'react-native-tab-view';

import { Color, TxtColor } from '../../config/System';
import moment from 'moment';
import {getKPIInfo} from '../KPI/actions/kpiAction';
import {connect} from 'react-redux';

class KPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // onActive :'personal',
            index:0,
            routes: [
                {key: 'first', title: 'Ngày'},
                {key: 'second', title: 'Sản phẩm'},
                {key: 'third', title: 'Tỷ lệ hoàn thành'},
            ],
        };
    }

    componentDidMount() {
        const {onSet, objTimer, insuranceInfo} = this.props;
        if(!objTimer.type) {
            const arr = [0, 1, 2, 3, 4, 5, 6];
            const _arr = arr.map((i) =>
                moment().startOf('week').add(i, 'days').format('DD/MM'));
            const fromDate = moment().startOf('week').format('DD/MM');
            const toDate = moment().startOf('week').add(6, 'days').format('DD/MM/YYYY');
            const arrInsur = [
                {
                    id: '1',
                    status: 'active',
                    name: 'Tất cả',
                },
                {
                    id: '2',
                    status: 'active',
                    name: 'BH Trách nhiệm dân sự ô tô',
                    value: '#BE3030',
                    number: 50,
                    code: 'C1',
                },
                {
                    id: '3',
                    status: 'active',
                    name: 'BH Trách nhiệm dân sự xe máy',
                    value: '#F58220',
                    number: 30,
                    code: 'M1',
                },
                {
                    id: '4',
                    status: 'active',
                    name: 'BH Tai nạn cá nhân',
                    value: '#007CC4',
                    number: 20,
                    code: 'A1'
                },
                {
                    id: '5',
                    status: 'active',
                    name: 'BH Tai nạn hộ gia đình',
                    value: '#C4C4C4',
                    number: 10,
                    code: 'A2'
                },
                {
                    id: '6',
                    status: 'active',
                    name: 'BH Vật chất xe ô tô',
                    value: 'green',
                    number: 60,
                    code: 'C2'
                },
                {
                    id: '7',
                    status: 'active',
                    name: 'BH Vật chất xe máy',
                    value: '#F58220',
                    number: 70,
                    code: 'M3'
                },
                {
                    id: '8',
                    status: 'active',
                    name: 'BH Nhà tư nhân',
                    value: '#007CC4',
                    number: 80,
                    code: 'H1'
                },
                {
                    id: '9',
                    status: 'active',
                    name: 'BH Du lịch trong nước',
                    value: '#C4C4C4',
                    number: 90,
                    code: 'T1'
                },
                {
                    id: '10',
                    status: 'active',
                    name: 'BH Du lịch quốc tế',
                    value: 'yellow',
                    number: 65,
                    code: 'T2'
                },
                {
                    id: '11',
                    status: 'active',
                    name: 'BH Trễ chuyến bay',
                    value: '#BE3030',
                    number: 55,
                    code: 'DF1'
                },
            ];
            const arrInsur1 = [
                {
                    id: '1',
                    status: 'active',
                    name: 'Tất cả',
                },
                {
                    id: '2',
                    status: 'active',
                    name: 'BH Trách nhiệm dân sự ô tô',
                    value: '#BE3030',
                    number: 50,
                    code: 'C1',
                },
                {
                    id: '3',
                    status: 'active',
                    name: 'BH Trách nhiệm dân sự xe máy',
                    value: '#F58220',
                    number: 30,
                    code: 'M1',
                },
                {
                    id: '4',
                    status: 'active',
                    name: 'BH Tai nạn cá nhân',
                    value: '#007CC4',
                    number: 20,
                    code: 'A1'
                },
                {
                    id: '5',
                    status: 'active',
                    name: 'BH Tai nạn hộ gia đình',
                    value: '#C4C4C4',
                    number: 10,
                    code: 'A2'
                },
                {
                    id: '6',
                    status: 'active',
                    name: 'BH Vật chất xe ô tô',
                    value: 'green',
                    number: 60,
                    code: 'C2'
                },
                {
                    id: '7',
                    status: 'active',
                    name: 'BH Vật chất xe máy',
                    value: '#F58220',
                    number: 70,
                    code: 'M3'
                },
                {
                    id: '8',
                    status: 'active',
                    name: 'BH Nhà tư nhân',
                    value: '#007CC4',
                    number: 80,
                    code: 'H1'
                },
                {
                    id: '9',
                    status: 'active',
                    name: 'BH Du lịch trong nước',
                    value: '#C4C4C4',
                    number: 90,
                    code: 'T1'
                },
                {
                    id: '10',
                    status: 'active',
                    name: 'BH Du lịch quốc tế',
                    value: 'yellow',
                    number: 65,
                    code: 'T2'
                },
                {
                    id: '11',
                    status: 'active',
                    name: 'BH Trễ chuyến bay',
                    value: '#BE3030',
                    number: 55,
                    code: 'DF1'
                },
            ];
            const _arrInsur = arrInsur.filter(item => {
                if (item.id === '1' || (insuranceInfo && insuranceInfo.find(i => i.code === item.code))) {
                    return true;
                }
                return false;
            });
            const _arrInsur1 = arrInsur1.filter(item => {
                if (item.id === '1' || (insuranceInfo && insuranceInfo.find(i => i.code === item.code))) {
                    return true;
                }
                return false;
            });
            onSet('1', {
                type: 'day',
                nameTitle: 'tuần',
                nameLabelX: 'Ngày',
                arrX: _arr,
                arrY: _arr.map((item, index) => index * 6 + 80).reverse(),
                long: 7,
                from: fromDate,
                to: toDate,
                startStr: moment().startOf('week').format('DD/MM/YYYY'),
                endStr: toDate,
                itemSelected: 0,
                // insureSelected: insureSelected,
                // groupSelected: groupSelected,
            });
            onSet('2', {
                type: 'day',
                nameTitle: 'tuần',
                nameLabelX: 'Ngày',
                arrX: _arr,
                arrY: _arr.map((item, index) => index * 6 + 80).reverse(),
                long: 7,
                from: fromDate,
                to: toDate,
                startStr: moment().startOf('week').format('DD/MM/YYYY'),
                endStr: toDate,
                itemSelected: 0,
                insureSelected: _arrInsur,
            });
            onSet('3', {
                type: 'day',
                nameTitle: 'tuần',
                nameLabelX: 'Ngày',
                arrX: _arr,
                arrY: _arr.map((item, index) => index * 6 + 80).reverse(),
                long: 7,
                from: fromDate,
                to: toDate,
                startStr: moment().startOf('week').format('DD/MM/YYYY'),
                endStr: toDate,
                itemSelected: 0,
                insureSelected: _arrInsur1,
            });
        }
    }

    // onPressGroup () {
    //     this.setState({
    //         onActive:'group'
    //     })
    // }

    // onPressPersonal = () => {
    //     this.setState({
    //         onActive:'personal'
    //     })
    // };

    _renderTabbar = props => (
        <View >
            <View style={{flexDirection:'row',paddingVertical:15,paddingHorizontal: 24}}>
                <TouchableOpacity onPress={()=>this.setState({index:0})} style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:this.state.index == 0 ? 2 : 0,paddingVertical:10,borderColor: Color}}>
                    <Text style={{color:this.state.index == 0 ? Color : '#8D8C8D',fontSize:14 }}>Ngày</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({index:1})} style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:this.state.index == 1 ? 2 : 0,paddingVertical:10,borderColor: Color}}>
                    <Text style={{color:this.state.index == 1 ? Color : '#8D8C8D',fontSize:14 }}>Sản phẩm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({index:2})} style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:this.state.index == 2 ? 2 : 0,paddingVertical:10,borderColor: Color}}>
                    <Text style={{color:this.state.index == 2 ? Color : '#8D8C8D',fontSize:14 }}>Tỷ lệ HT</Text>
                </TouchableOpacity>
            </View>

        </View>
    );



    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Nav isInfo={false} showKPI={true} title={'KPI'}
                         onPress={() => Actions.pop()}/>
                </View>
                {/*<View style={{*/}
                {/*    borderRadius: 10,*/}
                {/*    flexDirection: 'row',*/}
                {/*    marginHorizontal: 24,*/}
                {/*    backgroundColor: '#ffffff',*/}
                {/*    height: 'auto',*/}
                {/*    shadowColor: "#000",*/}
                {/*    shadowOffset: {*/}
                {/*        width: 0,*/}
                {/*        height: 1,*/}
                {/*    },*/}
                {/*    shadowOpacity: 0.22,*/}
                {/*    shadowRadius: 2.22,*/}
                {/*    elevation: 3,*/}
                {/*    marginTop:-30*/}

                {/*}}>*/}
                {/*    <TouchableOpacity style={{*/}
                {/*        flex: 1,*/}
                {/*        paddingVertical:15,*/}
                {/*        justifyContent: 'center',*/}
                {/*        alignItems: 'center',*/}
                {/*        borderRightWidth: 1,*/}
                {/*        borderColor: '#D9D9D9'*/}
                {/*    }} onPress={()=>this.onPressPersonal()}>*/}
                {/*        <Text*/}
                {/*            style={{ fontSize: 14,color:this.state.onActive == "personal" ? Color : '#8D8C8D'}}>KPI cá nhân</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={{*/}
                {/*        flex: 1,*/}
                {/*        paddingVertical:15,*/}
                {/*        justifyContent: 'center',*/}
                {/*        alignItems: 'center'*/}
                {/*    }} onPress={()=>this.onPressGroup()}>*/}
                {/*        <Text style={{color:this.state.onActive == "group" ? Color : '#8D8C8D', fontSize: 14}}>KPI nhóm</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                {/* <TabView
                    navigationState={this.state}
                    // renderScene={SceneMap(
                    //     this.state.onActive == 'personal' ? {
                    //         first: () => <FirstRoute />,
                    //         second: () => <SecondRoute />,
                    //         third: () => <ThirdRoute />,
                    //     } : {
                    //         first: () => <FirstRouteGroup />,
                    //         second: () => <SecondRouteGroup />,
                    //         third: () => <ThirdRouteGroup />,
                    //     }
                    // )}
                    renderScene={SceneMap(
                        {
                            first: () => <FirstRoute />,
                            second: () => <SecondRoute />,
                            third: () => <ThirdRoute />,
                        }
                    )}
                    onIndexChange={index => this.setState({index})}
                    renderTabBar={this._renderTabbar}
                /> */}
                <FirstRoute />
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    titleRoute: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TxtColor
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchInput: {
        flex: 1,borderRadius:50,marginTop:-20,marginHorizontal:15
    },
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
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
        borderRadius: 15,
        paddingVertical: 10,
        flex: 1,
    },
    ic_arrow: {
        alignSelf:'center',
        height: '12@vs',
        width: '12@s',
        marginHorizontal: '10@s',
    },
    wrapperInfor: {
        backgroundColor: '#F4F5F6',
        marginTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:20,
        paddingVertical:10
        // marginHorizontal: '15@s',

    },
    containView: {
        marginHorizontal: '15@s',
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
    chart: {
        width: 200,
        height: 200
    }
});

const mapStateToProps = (state) => {
    return {
        objTimer: state.kpi.kpiInfo['1'],
        insuranceInfo: state.insurance.insuranceInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSet: (id, data) => dispatch(getKPIInfo(id, data)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(KPI);
