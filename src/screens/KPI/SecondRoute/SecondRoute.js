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

class SecondRoute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {objTimer} = this.props;
        const _objInsure = objTimer.insureSelected.filter((item) => item.id !== '1' && item.status === 'active');
        const arrX = _objInsure.map((item) => item.number);
        const arrColor = _objInsure.map((item) => processColor(item.value));
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={styles.titleRoute}>Doanh thu</Text>
                    <Text style={styles.titleRoute}>theo sản phẩm bảo hiểm</Text>
                    <Text style={styles.titleRoute}>
                        {objTimer.nameTitle}{' '}{objTimer.to && 'từ '}{objTimer.from}{objTimer.to && ` - ${objTimer.to}`}
                    </Text>
                </View>
                <View style={{position: 'absolute', top: 12, right: 24}}>
                    <ModalSelectTime idRoute={'2'} fillInsure />
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
                                    values: arrX,
                                    label: '',
                                    config: {
                                        colors: arrColor,
                                        sliceSpace: 0.1,
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
                        styledCenterText={{text:'30.000.000đ', color: processColor('black'), size: 13}}
                        centerTextRadiusPercent={100}
                        holeRadius={40}
                        holeColor={processColor('#fff')}
                        transparentCircleRadius={45}
                        transparentCircleColor={processColor('#f0f0f088')}
                        touchEnabled={false}
                        chartDescription={{text: ''}}
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
                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        position: 'absolute',*/}
                    {/*        top: 0,*/}
                    {/*        left: 0,*/}
                    {/*        right: 0,*/}
                    {/*        bottom: 45,*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'center',*/}
                    {/*    }}>*/}
                    {/*    <Text style={{fontSize: 13, fontWeight: 'bold', color: TxtColor}}>30.000.000đ</Text>*/}
                    {/*</View>*/}
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                        {
                            _objInsure.map((item) => (
                                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', marginBottom: 8}}>
                                    <View style={{width: 15, height: 15, backgroundColor: item.value}} />
                                    <Text style={{fontSize: 12, marginLeft: 9, marginRight: 15, color: TxtColor}}>{item.name}</Text>
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
        objTimer: state.kpi.kpiInfo['2'],
    };
};

export default connect(
    mapStateToProps,
)(SecondRoute);
