import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text, ScrollView,
    processColor,
} from 'react-native';
import {BarChart, PieChart} from 'react-native-charts-wrapper';
import {Color, TxtColor} from '../../../config/System';
import {connect} from 'react-redux';
import ModalSelectTime from '../ModalSelectTime';

class FirstRouteGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {objTimer} = this.props;
        const groupIndex = objTimer.groupSelected && objTimer.groupSelected.length === 1 ? objTimer.groupSelected[0] : '';
        const objTimerY = objTimer.arrY || [0, 0, 0, 0, 0, 0, 0];
        const arr = objTimerY.filter(item => item !== 0);
        const _arr = [
            {value: Color, label: 'Doanh thu thực tế'},
            {value: 'green', label: 'Doanh thu vượt\n' +
                    'kế hoạch'},
        ];
        return (
            <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={styles.titleRoute}>Tỷ lệ hoàn thành theo{objTimer.to && ` ${objTimer.nameTitle}`}</Text>
                    <Text style={styles.titleRoute}>Nhóm 1</Text>
                    <Text style={styles.titleRoute}>
                        {objTimer.to && 'từ '}{!objTimer.to && `${objTimer.nameTitle} `}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
                    </Text>
                </View>
                <View style={{position: 'absolute', top: 12, right: 24}}>
                    <ModalSelectTime fillGroup />
                </View>
                <View style={{height: 300, marginTop: 15, marginHorizontal: 24}}>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 12,
                        top: 0,
                        left: 0,
                        zIndex: 99,
                        color: '#676667'
                    }}>
                        Doanh thu{'\n'}(%)
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 12,
                        bottom: -1,
                        right: 0,
                        zIndex: 99,
                        color: '#676667'
                    }}>
                        {objTimer.nameLabelX}
                    </Text>
                    <BarChart
                        style={{flex: 1, marginTop: arr.length > 0 ? 5 : 30, zIndex: 1, marginRight: 18}}
                        chartBackgroundColor={processColor('#fff')}
                        data={{
                            dataSets: [{
                                values: [100, 80, 120, 90],
                                config: {
                                    color: processColor('#F58220'),
                                    barShadowColor: processColor('lightgrey'),
                                    valueTextSize: 10,
                                    valueTextColor: processColor('#676667'),
                                    valueFormatter: "#.#'%'",
                                    highlightColor: processColor('green'),
                                }
                            }],

                            config: {
                                barWidth: 0.7,
                                group: {
                                    barSpace: 0,
                                },
                            }
                        }}
                        touchEnabled={false}
                        chartDescription={{
                            text: '',
                        }}
                        highlights={[{x: 2}]}
                        xAxis={{
                            enabled: true,
                            position: 'BOTTOM',
                            textColor: processColor('#676667'),
                            textSize: 11,
                            axisLineColor: processColor(
                                '#CCD6EB',
                            ),
                            axisLineWidth: 1,
                            drawGridLines: false,
                            axisMaximum: 16,

                            valueFormatter: ['Q1', 'Q2', 'Q3', 'Q4'] || [0, 0, 0, 0, 0, 0, 0],
                            granularityEnabled: true,
                            granularity : 1,
                        }}
                        animation={{
                            durationX: 0,
                            durationY: 1000,
                        }}
                        legend={{
                            enabled: false,
                            textSize: 13,
                            textColor: processColor('#676667'),
                            form: 'SQUARE',
                            formSize: 14,
                            xEntrySpace: 10,
                            yEntrySpace: 5,
                            formToTextSpace: 5,
                            wordWrapEnabled: true,
                            maxSizePercent: 0.5
                        }}
                        gridBackgroundColor={processColor('#ffffff')}
                        visibleRange={{x: { min: 7, max: 7 }}}
                        drawBarShadow={false}
                        drawHighlightArrow={true}

                        yAxis={{
                            right: {
                                enabled: false,
                            },
                            left: {
                                drawAxisLine: false,
                                textColor: processColor('#676667'),
                                textSize: 11,
                                valueFormatter: "#.#'%'",
                                gridColor: processColor(
                                    '#CCD6EB',
                                ),
                                drawLimitLinesBehindData: false,
                                granularityEnabled: true,
                                axisMinimum: 0,
                            },
                        }}
                        scaleEnabled={false}
                        scaleXEnabled={false}
                        scaleYEnabled={false}
                        pinchZoom={false}
                        drawBorders={false}
                        autoScaleMinMaxEnabled={false}
                        syncX={false}
                        syncY={false}
                        drawValueAboveBar={true}
                        highlightFullBarEnabled={true}
                    />
                </View>
                <View
                    style={{
                        marginTop: 20,
                        paddingHorizontal: 24,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                    {
                        _arr.map((item) => (
                            <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>{item.label}</Text>
                            </View>
                        ))
                    }
                </View>
                <View style={{height: 1, backgroundColor: '#E9E9E9', margin: 24}} />
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={styles.titleRoute}>Tỷ lệ hoàn thành theo{objTimer.to && ` ${objTimer.nameTitle}`}</Text>
                    <Text style={styles.titleRoute}>Nhóm 2</Text>
                    <Text style={styles.titleRoute}>
                        {objTimer.to && 'từ '}{!objTimer.to && `${objTimer.nameTitle} `}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
                    </Text>
                </View>
                <View style={{position: 'absolute', top: 12, right: 24}}>
                    <ModalSelectTime fillGroup />
                </View>
                <View style={{height: 300, marginTop: 15, marginHorizontal: 24}}>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 12,
                        top: 0,
                        left: 0,
                        zIndex: 99,
                        color: '#676667'
                    }}>
                        Doanh thu{'\n'}(%)
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 12,
                        bottom: -1,
                        right: 0,
                        zIndex: 99,
                        color: '#676667'
                    }}>
                        {objTimer.nameLabelX}
                    </Text>
                    <BarChart
                        style={{flex: 1, marginTop: arr.length > 0 ? 5 : 30, zIndex: 1, marginRight: 18}}
                        chartBackgroundColor={processColor('#fff')}
                        data={{
                            dataSets: [{
                                values: [100, 80, 120, 90],
                                config: {
                                    color: processColor(Color),
                                    barShadowColor: processColor('lightgrey'),
                                    valueTextSize: 10,
                                    valueTextColor: processColor('#676667'),
                                    valueFormatter: "#.#'%'",
                                    highlightColor: processColor('green'),
                                }
                            }],

                            config: {
                                barWidth: 0.7,
                                group: {
                                    barSpace: 0,
                                },
                            }
                        }}
                        touchEnabled={false}
                        chartDescription={{
                            text: '',
                        }}
                        highlights={[{x: 2}]}
                        xAxis={{
                            enabled: true,
                            position: 'BOTTOM',
                            textColor: processColor('#676667'),
                            textSize: 11,
                            axisLineColor: processColor(
                                '#CCD6EB',
                            ),
                            axisLineWidth: 1,
                            drawGridLines: false,
                            axisMaximum: 16,

                            valueFormatter: ['Q1', 'Q2', 'Q3', 'Q4'] || [0, 0, 0, 0, 0, 0, 0],
                            granularityEnabled: true,
                            granularity : 1,
                        }}
                        animation={{
                            durationX: 0,
                            durationY: 1000,
                        }}
                        legend={{
                            enabled: false,
                            textSize: 13,
                            textColor: processColor('#676667'),
                            form: 'SQUARE',
                            formSize: 14,
                            xEntrySpace: 10,
                            yEntrySpace: 5,
                            formToTextSpace: 5,
                            wordWrapEnabled: true,
                            maxSizePercent: 0.5
                        }}
                        gridBackgroundColor={processColor('#ffffff')}
                        visibleRange={{x: { min: 7, max: 7 }}}
                        drawBarShadow={false}
                        drawHighlightArrow={true}

                        yAxis={{
                            right: {
                                enabled: false,
                            },
                            left: {
                                drawAxisLine: false,
                                textColor: processColor('#676667'),
                                textSize: 11,
                                valueFormatter: "#.#'%'",
                                gridColor: processColor(
                                    '#CCD6EB',
                                ),
                                drawLimitLinesBehindData: false,
                                granularityEnabled: true,
                                axisMinimum: 0,
                            },
                        }}
                        scaleEnabled={false}
                        scaleXEnabled={false}
                        scaleYEnabled={false}
                        pinchZoom={false}
                        drawBorders={false}
                        autoScaleMinMaxEnabled={false}
                        syncX={false}
                        syncY={false}
                        drawValueAboveBar={true}
                        highlightFullBarEnabled={true}
                    />
                </View>
                <View
                    style={{
                        marginTop: 20,
                        paddingHorizontal: 24,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                    {
                        _arr.map((item) => (
                            <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>{item.label}</Text>
                            </View>
                        ))
                    }
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
)(FirstRouteGroup);
