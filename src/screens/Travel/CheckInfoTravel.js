import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Color, colorTitle, TxtColor } from '../../config/System';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconInfoSvg from '../../config/images/icons/IconInfoSvg';

class CheckInfoTravel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { travelInfo, horizontal } = this.props;
        return (
            <View style={{ paddingHorizontal: horizontal || 0 }}>
                <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconInfoSvg width={15} height={15} />
                        <Text style={styles.titleStyle}>
                            Thông tin chuyến du lịch
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => Actions.InfoScreen()}>
                        <IconEditSvg width={16} height={15} />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <View style={[styles.titleInfo, { paddingTop: 0 }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Điểm đến
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {travelInfo?.info?.areaType}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleInfo}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                {travelInfo?.info?.dataAreaType?.id === 1 ? 'Thành phố' : 'Tên nước đến'}
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {
                                    travelInfo?.info?.dataAreaType?.id === 1 ?
                                        travelInfo?.info?.provinceType :
                                        travelInfo?.info?.nationType
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleInfo}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Ngày đi
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {travelInfo?.info?.startDateString}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleInfo}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Ngày về
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {travelInfo?.info?.endDateString}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleInfo}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số ngày du lịch
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {travelInfo?.info?.longDays}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 10,
        padding: 16,
    },
    titleInfo: {
        flexDirection: 'row',
        paddingTop: 12
    },
    textStyle: {
        fontSize: 14,
        color: '#8D8C8D'
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor,
        textAlign: 'right'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 10,
    },
});

const mapStateToProps = state => {
    return {
        travelInfo: state.travelInsurance.travelInfo,
    };
};

export default connect(
    mapStateToProps,
)(CheckInfoTravel);
