import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color, TxtColor } from '../../../config/System';
import FastImage from 'react-native-fast-image';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

const arr = [{
    promotionName: 'Điền mã khuyến mãi',
}];

class ModalPromotion extends React.Component {
    constructor(props) {
        super(props);
    }

    setPromotion = data => {
        this.props.setPromotion(data);
        this.props.onClosed();
    };

    render() {
        const { onClosed, open, promotionInfo, nameSelected } = this.props;
        const _promotionInfo = promotionInfo ? promotionInfo.concat(arr) : arr;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        backgroundColor: '#F6F5F6'
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Chương trình khuyến mãi</Text>
                    </View>
                    <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
                        <ScrollView>
                            {_promotionInfo.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.setPromotion(item)}
                                        style={{
                                            flexDirection: 'row',
                                            borderBottomWidth: index === _promotionInfo.length - 1 ? 0 : 1,
                                            borderTopWidth: 0,
                                            borderColor: '#F6F5F6',
                                            alignItems: 'center',
                                            paddingTop: 8,
                                            paddingBottom: index === _promotionInfo.length - 1 ? 32 : 8,
                                        }}>
                                        {
                                            nameSelected === item.promotionName ? (
                                                <IconRadioBtnActiveSvg width={15} height={15} />
                                            ) : (
                                                <IconRadioBtnSvg width={15} height={15} />
                                            )
                                        }
                                        <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>{item.promotionName}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </ModalBox>
        );
    }
}
const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.35,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row',
    },
});

export default ModalPromotion;
