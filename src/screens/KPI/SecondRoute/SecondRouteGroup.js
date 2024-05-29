import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text, ScrollView,
    processColor,
} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';
import {Color, TxtColor} from '../../../config/System';
import {connect} from 'react-redux';
import ModalSelectTime from '../ModalSelectTime';

class SecondRouteGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {objTimer} = this.props;
        const arr = [{value: '#BE3030', label: 'BH TNDS Ô TÔ'},
            {value: '#F58220', label: 'BH TNDS XE MÁY'},
            {value: Color, label: 'BH Tai nạn'},
            {value: '#C4C4C4', label: 'BH Vật chất Xe'},];
        return (
            <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={styles.titleRoute}>Doanh thu</Text>
                    <Text style={styles.titleRoute}>theo sản phẩm bảo hiểm nhóm 1</Text>
                    <Text style={styles.titleRoute}>
                        {objTimer.nameTitle}{' '}{objTimer.to && 'từ '}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
                    </Text>
                </View>
                <View style={{position: 'absolute', top: 12, right: 24}}>
                    <ModalSelectTime fillInsure fillGroup />
                </View>
                <View style={{
                    height: 330,
                    marginTop: 10,
                    marginHorizontal: 24,
                }}>
                    <PieChart
                        style={{flex: 1}}
                        logEnabled={true}
                        chartBackgroundColor={processColor('#FFF')}
                        data={{
                            dataSets: [
                                {
                                    values: [{value: 45},
                                        {value: 21},
                                        {value: 15},
                                        {value: 10},],
                                    label: '',
                                    config: {
                                        colors: [
                                            processColor('#BE3030'),
                                            processColor('#F58220'),
                                            processColor('#C4C4C4'),
                                            processColor(Color),],
                                        sliceSpace: 0,
                                        valueTextSize: 12,
                                        valueTextColor: processColor('black'),
                                        selectionShift: 13,
                                        valueFormatter: "#.#'%'",
                                        valueLineColor: processColor('green'),
                                        valueLinePart1Length: 0.5
                                    },
                                },
                            ],
                        }}

                        extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

                        // entryLabelColor={processColor('green')}
                        // entryLabelTextSize={20}
                        // entryLabelFontFamily={'HelveticaNeue-Medium'}
                        drawEntryLabels={false}

                        usePercentValues={true}
                        // styledCenterText={{text:'30.000.000đ', color: processColor('black'), size: 14}}
                        centerTextRadiusPercent={100}
                        holeRadius={40}
                        holeColor={processColor('#fff')}
                        transparentCircleRadius={45}
                        transparentCircleColor={processColor('#f0f0f088')}
                        // touchEnabled={true}
                        legend={{
                            enabled: false,
                            textSize: 12,
                            textColor: processColor(TxtColor),
                            form: 'SQUARE',
                            formSize: 14,
                            xEntrySpace: 100,
                            yEntrySpace: 10,
                            formToTextSpace: 5,
                            wordWrapEnabled: true,
                            maxSizePercent: 1
                        }}
                        animation={{
                            durationX: 1000,
                            durationY: 1000,
                        }}
                        drawInside={true}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', color: TxtColor}}>30.000.000đ</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                        {
                            arr.map((item) => (
                                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                    <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                    <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>{item.label}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <View style={{height: 1, backgroundColor: '#E9E9E9', margin: 24}} />
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={styles.titleRoute}>Doanh thu</Text>
                    <Text style={styles.titleRoute}>theo sản phẩm bảo hiểm nhóm 2</Text>
                    <Text style={styles.titleRoute}>
                        {objTimer.nameTitle}{' '}{objTimer.to && 'từ '}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
                    </Text>
                </View>
                <View style={{
                    height: 330,
                    marginTop: 10,
                    marginHorizontal: 24,
                }}>
                    <PieChart
                        style={{flex: 1}}
                        logEnabled={true}
                        chartBackgroundColor={processColor('#FFF')}
                        data={{
                            dataSets: [
                                {
                                    values: [{value: 45},
                                        {value: 21},
                                        {value: 15},
                                        {value: 10},],
                                    label: '',
                                    config: {
                                        colors: [
                                            processColor('#BE3030'),
                                            processColor('#F58220'),
                                            processColor('#C4C4C4'),
                                            processColor(Color),],
                                        sliceSpace: 0,
                                        valueTextSize: 12,
                                        valueTextColor: processColor('black'),
                                        selectionShift: 13,
                                        valueFormatter: "#.#'%'",
                                        valueLineColor: processColor('green'),
                                        valueLinePart1Length: 0.5
                                    },
                                },
                            ],
                        }}

                        extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

                        // entryLabelColor={processColor('green')}
                        // entryLabelTextSize={20}
                        // entryLabelFontFamily={'HelveticaNeue-Medium'}
                        drawEntryLabels={false}

                        usePercentValues={true}
                        // styledCenterText={{text:'30.000.000đ', color: processColor('black'), size: 14}}
                        centerTextRadiusPercent={100}
                        holeRadius={40}
                        holeColor={processColor('#fff')}
                        transparentCircleRadius={45}
                        transparentCircleColor={processColor('#f0f0f088')}
                        // touchEnabled={true}
                        legend={{
                            enabled: false,
                            textSize: 12,
                            textColor: processColor(TxtColor),
                            form: 'SQUARE',
                            formSize: 14,
                            xEntrySpace: 100,
                            yEntrySpace: 10,
                            formToTextSpace: 5,
                            wordWrapEnabled: true,
                            maxSizePercent: 1
                        }}
                        animation={{
                            durationX: 1000,
                            durationY: 1000,
                        }}
                        drawInside={true}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', color: TxtColor}}>30.000.000đ</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                        {
                            arr.map((item) => (
                                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                    <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                    <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>{item.label}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titleRoute: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TxtColor
    },
});

const mapStateToProps = (state) => {
    return {
        objTimer: state.kpi.kpiInfo,
    };
};

export default connect(
    mapStateToProps,
)(SecondRouteGroup);
