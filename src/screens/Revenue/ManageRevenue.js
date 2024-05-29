import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import Nav from '../../components/Nav';
import RevenueTotal from './Routes/RevenueTotal';
import RevenuePersonal from './Routes/RevenuePersonal';
import RevenueStaff from './Routes/RevenueStaff';
import {TabView, SceneMap} from 'react-native-tab-view';

import { Color, nameApp } from '../../config/System';

class ManageRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'first', title: 'Tổng DT'},
                {key: 'second', title: 'DT cá nhân'},
                {key: 'third', title: 'DT nhóm'},
            ],
        };
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
        const {index, routes} = this.state;
        return (
            <View style={styles.container}>
                <View style={{zIndex: 100}}>
                    <Nav isInfo={false} title={'BÁO CÁO DOANH THU'}
                        bottom={15}
                        onPress={() => Actions.pop()}/>
                </View>
                <View style={{zIndex: 1001, flex: 1, marginTop: -30}}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={SceneMap(
                            {
                                first: () => <RevenueTotal />,
                                second: () => <RevenuePersonal />,
                                third: () => <RevenueStaff />,
                            }
                        )}
                        onIndexChange={index => this.setState({index})}
                        renderTabBar={this.renderTabbar}
                    />
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

export default ManageRevenue;
