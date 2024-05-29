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
            {value: groupIndex === 1 ? '#F58220' : Color, label: 'Doanh thu thực tế'},
        ];
        const _arr1 = [
            {value: '#F58220', label: 'Doanh thu Nhóm 1'},
            {value: Color, label: 'Doanh thu Nhóm 2'},
        ];
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={styles.titleRoute}>Doanh thu nhóm {groupIndex}</Text>
                    <Text style={styles.titleRoute}>
                        {objTimer.to && `${objTimer.nameTitle} `}{objTimer.to && 'từ '}{!objTimer.to && `${objTimer.nameTitle} `}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
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
                        Doanh thu{'\n'}(đ)
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
                    {
                        objTimer.groupSelected?.length !== 3 ? (
                            <BarChart
                                style={{flex: 1, marginTop: arr.length > 0 ? 5 : 30, zIndex: 1, marginRight: 18}}
                                chartBackgroundColor={processColor('#fff')}
                                data={{
                                    dataSets: [{
                                        values: [100, 80, 120, 90],
                                        config: {
                                            color: processColor(groupIndex === 1 ? '#F58220' : Color),
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
                        ) : (
                            <BarChart
                                style={{flex: 1, marginTop: arr.length > 0 ? 5 : 30, zIndex: 1, marginRight: 18}}
                                chartBackgroundColor={processColor('#fff')}
                                data={{
                                    dataSets: [{
                                        values: [{y:[80, 20]}, {y:[10, 50]}, {y:[30, 20]}, {y:[30, 40]}],
                                        config: {
                                            colors: [
                                                processColor('#F58220'),
                                                processColor(Color),
                                            ],
                                            barShadowColor: processColor('lightgrey'),
                                            valueTextSize: 10,
                                            valueTextColor: processColor('black'),
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
                                drawValueAboveBar={false}
                                highlightFullBarEnabled={true}
                            />
                        )
                    }
                </View>
                <View
                    style={{
                        marginTop: 20,
                        paddingHorizontal: 24,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                    {
                        objTimer.groupSelected?.length !== 3 ? (
                            _arr.map((item) => (
                                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                    <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                    <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>{item.label}</Text>
                                </View>
                            ))
                        ) : (
                            _arr1.map((item) => (
                                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                    <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                    <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>{item.label}</Text>
                                </View>
                            ))
                        )
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
