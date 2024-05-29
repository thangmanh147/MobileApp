import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text, ScrollView,
    processColor,
} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {Color, TxtColor, ErrTxtColor} from '../../../config/System';
import {connect} from 'react-redux';
import ModalSelectTime from '../ModalSelectTime';
import { formatVND } from '../../../components/Functions';
import moment from 'moment';

class FirstRoute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {objTimer} = this.props;
        let total = 0;
        objTimer?.dataKPI?.datasets[2]?.data?.map(item => {
            total += item;
        });
        const arrayY = objTimer?.dataKPI?.datasets[2]?.data?.map(item => item && item / 1000000);
        const objTimerY = arrayY || [0, 0, 0, 0, 0, 0, 0];
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <Text style={[styles.titleRoute, {fontSize: 17, color: ErrTxtColor}]}>KPI tháng {moment().format('M')}</Text>
                    <Text style={[styles.titleRoute, {fontSize: 17, color: ErrTxtColor}]}>1.000.000.000đ</Text>
                </View>
                <View style={{alignItems: 'center', paddingTop: 5}}>
                    <Text style={styles.titleRoute}>Doanh thu</Text>
                    <Text style={[styles.titleRoute, {marginTop: 2}]}>
                        {objTimer.startStr && objTimer.endStr ? `từ ${objTimer.startStr} - ${objTimer.endStr}` : ''}
                    </Text>
                    <Text style={[styles.titleRoute, {color: Color, marginTop: 2}]}>Tổng: {formatVND(Math.floor(total / 1000) * 1000)}đ</Text>
                </View>
                <View style={{position: 'absolute', top: 22, right: 24}}>
                    <ModalSelectTime idRoute={'1'} />
                </View>
                <View style={{height: 350, marginTop: 15, marginHorizontal: 10}}>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 12,
                        top: 0,
                        left: 0,
                        zIndex: 99,
                        color: '#676667'
                    }}>
                        Doanh thu{'\n'}(triệu đồng)
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 12,
                        bottom: -1,
                        right: -3,
                        zIndex: 99,
                        color: '#676667'
                    }}>
                        {objTimer?.dataKPI?.labelY}
                    </Text>
                    <BarChart
                        style={{flex: 1, marginTop: 30, zIndex: 1, marginRight: 18}}
                        chartBackgroundColor={processColor('#fff')}
                        data={{
                            dataSets: [{
                                values: objTimerY,
                                label: 'Bar dataSet',
                                config: {
                                    color: processColor(Color),
                                    barShadowColor: processColor('lightgrey'),
                                    valueTextSize: 10,
                                    valueTextColor: processColor('#676667'),
                                    valueFormatter: 'largeValue',
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
                        xAxis={{
                            enabled: true,
                            position: 'BOTTOM',
                            textColor: processColor('#676667'),
                            textSize: 10,
                            axisLineColor: processColor(
                                '#CCD6EB',
                            ),
                            axisLineWidth: 1,
                            drawGridLines: false,
                            // axisMaximum: 16,
                            labelRotationAngle:  objTimer?.dataKPI?.labels ? -15 : 0,

                            valueFormatter: objTimer?.dataKPI?.labels || ['0', '0', '0', '0', '0', '0', '0'],
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
                        visibleRange={{x: { min: objTimer?.dataKPI?.labels?.length || 7, max: objTimer?.dataKPI?.labels?.length || 7 }}}
                        drawBarShadow={false}
                        drawHighlightArrow={true}

                        yAxis={{
                            right: {
                                enabled: false,
                            },
                            left: {
                                drawAxisLine: true,
                                textColor: processColor('#676667'),
                                textSize: 11,
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
                    <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                        <View style={{width: 15, height: 15, backgroundColor: Color}} />
                        <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>Doanh thu thực tế</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titleRoute: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor
    },
});

const mapStateToProps = (state) => {
    return {
        objTimer: state.kpi.kpiInfo['1'],
    };
};

export default connect(
    mapStateToProps,
)(FirstRoute);
