import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color, TxtColor } from '../../../config/System';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import moment from 'moment';
import { formatHours } from '../../../components/Functions';
import IconSearchSvg from '../../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';

class ModalReturnFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newText: '',
        };
    }

    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    //     const {listMotorBrand} = this.props;
    //     if(listMotorBrand !== prevProps.listMotorBrand) {
    //         this.setState({ fullData: listMotorBrand, newText: ''});
    //     }
    // }

    onChangeText = (text) => {
        this.setState({ newText: text });
    }

    setItem = (data) => {
        this.props.setReturnFlight(data);
        this.props.onClosed();
    }
    renderItem = ({ item, index }) => {
        const { returnSelected } = this.props;
        return (
            <View style={{ paddingHorizontal: 15, paddingBottom: 15, paddingTop: index === 0 ? 15 : 0 }}>
                <TouchableOpacity
                    onPress={() => this.setItem(item)}
                    style={{
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
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10
                    }}
                >
                    {
                        returnSelected?.flightNumber === item?.flightNumber ? (
                            <IconRadioBtnActiveSvg width={15} height={15} />
                        ) : (
                            <IconRadioBtnSvg width={15} height={15} />
                        )
                    }
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {
                                item?.airline?.logo?.length > 0 ? (
                                    <SvgUri
                                        width="130"
                                        height="30"
                                        source={{ uri: item?.airline?.logo }}
                                    />
                                ) : null
                            }
                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold', textAlign: 'right' }}>{item?.flightNumber}</Text>
                        </View>
                        <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{moment(item?.estimateDepartTime).format('HH:mm')}</Text>
                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{moment(item?.estimateArriveTime).format('HH:mm')}</Text>
                        </View>
                        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 13, color: TxtColor }}>{item?.estimateDepartAirPort}</Text>
                            <Text style={{ fontSize: 13, color: TxtColor }}>{item?.estimateArriveAirPort}</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{formatHours(item?.estimateDurationMinutes)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { newText } = this.state;
        const { onClosed, open, listReturn } = this.props;
        const arr = listReturn?.filter(item => item?.flightNumber?.toUpperCase().indexOf(newText.toUpperCase()) > -1)
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={true}
                onClosed={onClosed}
                coverScreen={true}
                style={css.ctModal}
            >
                <View style={{
                    backgroundColor: '#fff', flex: 1, marginTop: 10,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20,
                }}>
                    <View style={css.ctInput}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <IconSearchSvg width={18} height={18} />
                        </View>
                        <TextInput
                            placeholder='Tìm số hiệu chuyến bay'
                            value={newText}
                            onChangeText={text => this.onChangeText(text)}
                            style={{
                                height: 40,
                                marginLeft: 10,
                                flex: 1
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1, marginHorizontal: 10
                    }}>

                        <FlatList
                            data={arr}
                            renderItem={this.renderItem}
                            onEndReachedThreshold={0.6}
                        />
                    </View>
                </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.85,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'


    },
})

export default ModalReturnFlight;
