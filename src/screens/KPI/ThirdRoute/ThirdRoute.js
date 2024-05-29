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

class ThirdRoute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {objTimer} = this.props;
        const _objInsure = objTimer.insureSelected.filter((item) => item.id !== '1' && item.status === 'active');
        const arrInsureNumber = _objInsure.map((item) => item.number);
        const arrColor = _objInsure.map((item) => processColor(item.value));
        const objTimerY = objTimer.arrY || [0, 0, 0, 0, 0, 0, 0];
        const highlights = objTimerY.map((item, index) => {
            if(item > 100) return {x: index};
            return null;
        })
        const arrNumberY = objTimerY.map((item, index) => {
            return {y: arrInsureNumber};
        })
        const _arr = [
            {value: Color, label: 'Doanh thu thực tế'},
            {value: '#376829', label: 'Doanh thu vượt kế hoạch'},
        ];
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    {
                        objTimer.insureSelected[0].status === 'active' ? (
                            <>
                                <Text style={styles.titleRoute}>Tỷ lệ hoàn thành theo{objTimer.to && ` ${objTimer.nameTitle}`}</Text>
                                <Text style={styles.titleRoute}>
                                    {objTimer.to && 'từ '}{!objTimer.to && `${objTimer.nameTitle} `}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.titleRoute}>Tỷ lệ hoàn thành theo</Text>
                                <Text style={styles.titleRoute}>sản phẩm bảo hiểm</Text>
                                <Text style={styles.titleRoute}>
                                    {objTimer.nameTitle}{' '}{objTimer.to && 'từ '}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
                                </Text>
                            </>
                        )
                    }
                </View>
                <View style={{position: 'absolute', top: 12, right: 24}}>
                    <ModalSelectTime idRoute={'3'} fillInsure />
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
                    {
                        objTimer.insureSelected[0].status === 'active' ? (
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
                                highlights={highlights}
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

                                    valueFormatter: objTimer.arrX || ['0', '0', '0', '0', '0', '0', '0'],
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
                                visibleRange={{x: { min: objTimer.arrX?.length || 7, max: objTimer.arrX?.length || 7 }}}
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
                        ) : (
                            <BarChart
                                style={{flex: 1, marginTop: 30, zIndex: 1, marginRight: 18}}
                                chartBackgroundColor={processColor('#fff')}
                                data={{
                                    dataSets: [{
                                        values: arrNumberY,
                                        label: 'Bar dataSet',
                                        config: {
                                            colors: arrColor,
                                            barShadowColor: processColor('lightgrey'),
                                            valueTextSize: 10,
                                            valueTextColor: processColor('black'),
                                            valueFormatter: "#.#'%'",
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
                                highlights={[]}
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

                                    valueFormatter: objTimer.arrX || ['0', '0', '0', '0', '0', '0', '0'],
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
                                visibleRange={{x: { min: objTimer.arrX?.length || 7, max: objTimer.arrX?.length || 7 }}}
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
                        objTimer.insureSelected[0].status === 'active' ? (
                            _arr.map((item) => (
                                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                    <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                    <Text style={{fontSize: 12, marginLeft: 9, color: TxtColor}}>{item.label}</Text>
                                </View>
                            ))
                        ) : (
                            _objInsure.map((item) => (
                                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                    <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                    <Text style={{fontSize: 12, marginLeft: 9, marginRight: 15, color: TxtColor}}>{item.name}</Text>
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
        objTimer: state.kpi.kpiInfo['3'],
    };
};

export default connect(
    mapStateToProps,
)(ThirdRoute);
