import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import Nav from '../../components/Nav';
import CommissionTotal from './Routes/CommissionTotal';
import CommissionPersonal from './Routes/CommissionPersonal';
import CommissionStaff from './Routes/CommissionStaff';
import {TabView, SceneMap} from 'react-native-tab-view';

import { Color, nameApp } from '../../config/System';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";

class ManageCommission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'first', title: 'Tổng HH'},
                {key: 'second', title: 'HH trực tiếp'},
                {key: 'third', title: 'HH gián tiếp'},
            ],
        };
    }

    componentDidMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            this.setState({
                orgCode: dataToken?.organizationCode,
            });
        })
    }

    renderTabbar = props => {
        const {routes, index} = this.state;
        return (
            <View style={styles.textBox}>
                {
                    routes?.map((item, i) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.setState({index: i})}
                                style={[styles.styleTab, i < 2 ? {
                                    borderRightWidth: 1,
                                    borderRightColor: '#D9D9D9'
                                } : {}]}
                            >
                                <Text style={{
                                    color: i === index ? Color : '#8D8C8D',
                                    fontSize: 14,
                                    fontWeight: i === index ? 'bold' : 'normal',
                                }}>{item?.title}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    };

    render() {
        const {index, routes, orgCode} = this.state;
        return (
            <View style={styles.container}>
                <View style={{zIndex: 100}}>
                    <Nav isInfo={false} title={'THỐNG KÊ'}
                        bottom={15}
                        onPress={() => Actions.pop()}/>
                </View>
                {
                    (nameApp.includes('IAGENT') && orgCode !== 'INSO') ? (
                        <View style={{zIndex: 1001, flex: 1, marginTop: -30}}>
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={SceneMap(
                                    {
                                        first: () => <CommissionTotal />,
                                        second: () => <CommissionPersonal />,
                                        third: () => <CommissionStaff />,
                                    }
                                )}
                                onIndexChange={index => this.setState({index})}
                                renderTabBar={this.renderTabbar}
                            />
                        </View>
                    ) : (
                        <CommissionPersonal />
                    )
                }
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    styleTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    textBox: {
        marginHorizontal: 24,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
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

export default ManageCommission;
