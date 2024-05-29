'use strict';

import React, { Component } from 'react';
import { Color } from '../../config/System';
import {
    View,
    Text,
    Dimensions,
    processColor,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import {ScrollView} from 'react-native-gesture-handler';

const screen = Dimensions.get('window');


class Benefits extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Nav show={true}
                         isInfo={false}
                         title={'QUYỀN LỢI BẢO HIỂM'}
                         onPress={() => Actions.pop()}
                    />
                </View>
                <ScrollView
                    style={{ paddingHorizontal: 12}}
                    contentContainerStyle={{paddingBottom: 24}}
                >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.titleHeader}>Phạm vi địa lý được bảo hiểm</Text>
                        </View>
                        <View style={[styles.headerRight, {alignItems: 'center'}]}>
                            <Text style={[styles.textTitle, {textTransform: 'uppercase'}]}>Việt Nam</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <View
                            style={[styles.headerLeft, {
                                flex: 1,
                                borderRightWidth: 0,
                            }]}>
                            <Text style={styles.titleHeader}>Tổng quyền lợi bảo hiểm tai nạn</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={[styles.titleContent, {marginTop: 5}]}>
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>I. Tử vong, thương tật vĩnh viễn</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>30 tháng lương và không quá 200.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>II. Chi phí y tế do tai nạn</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>20.000.000 VND</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.titleHeader}>Bảo hiểm sức khỏe (Health)/năm</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <Text style={styles.textTitle}>40.000.000 VND</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={[styles.titleContent, {marginTop: 5}]}>
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Giới hạn cho 01 ngày nằm viện</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn ngày</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>2.000.000 VND</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>40.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Phẫu thuật nội trú</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>40.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Phẫu thuật trong ngày</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>40.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Điều trị cấp cứu</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>40.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Vận chuyển cấp cứu bằng phương tiện cứu thương</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>40.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Vận chuyển cấp cứu bằng taxi</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>500.000 VND/người</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Trợ cấp mai táng</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>2.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Trợ cấp nằm viện/ngày</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn ngày</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>100.000 VND</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm (tối đa 30 ngày/năm)</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>3.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Chi phí khám trước khi nhập viện</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Trong vòng ngày</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>30 ngày</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>2.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Chi phí điều trị sau khi xuất viện</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Trong vòng ngày</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>30 ngày</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>2.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Chi phí y tá chăm sóc tại nhà</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Trong vòng ngày</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>30 ngày</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>2.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Chi phí dưỡng nhi/năm</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>500.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Chăm sóc thai sản</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>15.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Chi phí phục hồi chức năng</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>5.000.000 VND</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.titleHeader}>Tổng hạn mức ngoại trú do ốm đau, bệnh tật và thai sản</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <Text style={styles.textTitle}>2.000.000 VND/năm</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={[styles.titleContent, {marginTop: 5}]}>
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Giới hạn tối đa 01 lần khám ngoại trú</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>01 lần khám</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>500.000 VND</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>2.000.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Vật lý trị liệu</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn ngày</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>50.000 VND/ngày</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Trong vòng ngày</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>60 ngày</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Khám thai định kỳ</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>400.000 VND</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.titleContent, {
                                borderColor: '#D9D9D9',
                                borderTopWidth: 1,
                            }]}
                        >
                            <View style={styles.titleLeft}>
                                <Text style={styles.textTitle}>Chăm sóc răng cơ bản</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight} >
                                <Text style={styles.contentText}>500.000 VND/năm</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <View
                            style={[styles.headerLeft, {
                                flex: 1,
                                borderRightWidth: 0,
                            }]}>
                            <Text style={styles.titleHeader}>Tử vong, thương tật vĩnh viễn do ốm đau, bệnh tật, thai sản</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Giới hạn năm</Text>
                            </View>
                            <View style={styles.titleRight}>
                                <Text style={styles.contentText}>100.000.000 VND</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Tử vong/Thương tật toàn bộ vĩnh viễn</Text>
                            </View>
                            <View style={styles.titleRight}>
                                <Text style={styles.contentText}>100.000.000 VND</Text>
                            </View>
                        </View>
                        <View style={styles.contentItem}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.contentText}>Thương tật bộ phận vĩnh viễn</Text>
                            </View>
                            <View style={styles.titleRight}>
                                <Text style={styles.contentText}>Tỷ lệ phần trăm dựa theo bảng tỷ lệ thương tật</Text>
                            </View>
                        </View>
                    </View>
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
    headerContainer: {
        marginTop: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headerLeft: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRightWidth: 1,
        borderColor: '#D9D9D9',
        flex: 1.2,
    },
    headerRight: {
        justifyContent: 'center',
        padding: 5,
        flex: 1,
        paddingVertical: 10,
    },
    titleHeader: {
        textTransform: 'uppercase',
        marginVertical: 5,
        textAlign: 'center',
        fontSize: 14,
        color: Color,
        fontWeight: 'bold',
    },
    content: {
        marginHorizontal: 5,
        borderColor: '#D9D9D9',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    titleContent: {
        flexDirection: 'row',
        backgroundColor: '#F6F5F6',
        borderColor: '#D9D9D9',
        borderBottomWidth: 1,
    },
    titleLeft: {
        justifyContent: 'center',
        padding: 5,
    },
    contentLeft: {
        justifyContent: 'center',
        padding: 5,
        borderRightWidth: 1,
        borderColor: '#D9D9D9',
        flex: 1.2,
    },
    textTitle: {
        margin: 5,
        fontSize: 14,
        color: Color,
        fontWeight: 'bold',
    },
    titleRight: {
        justifyContent: 'center',
        padding: 5,
        flex: 1,
    },
    contentItem: {
        flexDirection: 'row',
        borderColor: '#D9D9D9',
        borderTopWidth: 1,
    },
    contentText: {
        margin: 5,
        fontSize: 14,
        color: '#676667',
    },
});

export default Benefits;
