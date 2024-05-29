'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    Dimensions,
    processColor,
} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import { Color } from '../../config/System';
import { connect } from 'react-redux';
import { getCommissions } from './actions';
import moment from 'moment';
import { formatVND } from '../../components/Functions';

const screen = Dimensions.get('window');


class Commissions extends Component {
    constructor(props) {
        super(props);
        const arr = [0, 1, 2, 3, 4, 5, 6]
        const _arr = arr.map((i) => moment().startOf('week').add(i, 'days').format('DD/MM'));
        this.state = {
            dataCommissions: {},
            _arr: _arr,
        }

    }

    componentDidMount = () => {
        const fromDate = moment().startOf('week').format('DD/MM/YYYY');
        const toDate = moment().startOf('week').add(6, 'days').format('DD/MM/YYYY');
        const chartType = 'day';
        this.props.getCommissions(fromDate, toDate, chartType);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {};
        if (
            nextProps.dataCommissions &&
            nextProps.dataCommissions !== prevState.dataCommissions
        ) {
            update.dataCommissions = nextProps.dataCommissions;
        }
        return update;
    }

    render() {
        const {dataCommissions, _arr} = this.state;
        const arrayY = dataCommissions?.chartBarData?.map(item => item && item / 1000);
        const objTimerY = arrayY || [0, 0, 0, 0, 0, 0, 0];
        return (
            <View style={styles.container}>

                <View>
                    <Nav show={true}
                         isInfo={false}
                         title={'HOA HỒNG CHO CỘNG TÁC VIÊN'}
                         onPress={() => Actions.pop()}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Hoa hồng cho cộng tác viên</Text>
                    <Text style={styles.number}>{formatVND(dataCommissions?.total || 0)}đ</Text>
                </View>
                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <Text style={styles.titleChart}>Hoa hồng NGÀY</Text>
                    <Text style={styles.titleChart}>
                        từ {moment().startOf('week').format('DD/MM')} - {moment().startOf('week').add(6, 'days').format('DD/MM/YYYY')}
                    </Text>
                </View>
                <View style={{flex: 1, marginTop: 5, marginHorizontal: 12, paddingRight: 18}}>
                    <Text style={{position: 'absolute', fontSize: 12, color: '#676667', top: 0, left: 0, zIndex: 99}}>Hoa hồng{'\n'}(nghìn đồng)</Text>
                    <Text style={{position: 'absolute', fontSize: 12, color: '#676667', bottom: 33, right: 0, zIndex: 99}}>Ngày</Text>
                    <BarChart
                        style={{flex: 1, marginTop: 30, zIndex: 1}}
                        chartBackgroundColor={processColor('#fff')}
                        data={{
                            dataSets: [{
                                values: objTimerY,
                                label: 'Hoa hồng',
                                config: {
                                    color: processColor(Color),
                                    barShadowColor: processColor('lightgrey'),
                                    valueTextSize: 11,
                                    valueTextColor: processColor('#676667'),
                                    valueFormatter: 'largeValue',
                                }
                            }],

                            config: {
                                barWidth: 0.5,
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

                            valueFormatter: _arr,
                            granularityEnabled: true,
                            granularity : 1,
                        }}
                        animation={{
                            durationX: 0,
                            durationY: 1000,
                        }}
                        legend={{
                            enabled: true,
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
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        alignItems: 'center',
        marginHorizontal: 24,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
        color: Color,
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleChart: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    number: {
        marginTop: 20,
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    },
});




const mapStateToProps = (state) => {
    return {
        dataCommissions: state.commissions.commissionsInfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCommissions: (fromDate, toDate, chartType) => dispatch(getCommissions(fromDate, toDate, chartType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Commissions);
