
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color, textDisable, TxtColor } from '../../../config/System';
import FastImage from 'react-native-fast-image';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalRelationType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [
                {
                    name: 'Bản thân',
                    id: 1,
                    code: 'BAN_THAN'
                },
                {
                    name: 'Bố/mẹ',
                    id: 2,
                    code: 'BO_ME'
                },
                {
                    name: 'Anh/chị/em',
                    id: 3,
                    code: 'ANH_CHI_EM'
                },
                {
                    name: 'Vợ/chồng',
                    id: 4,
                    code: 'VO_CHONG'
                },
                {
                    name: 'Con cái',
                    id: 5,
                    code: 'CON_CAI'
                },
                {
                    name: 'Khác',
                    id: 6,
                    code: 'KHAC'
                },
            ],
        };
    }

    setType = (data) => {
        this.props.setType(data)
        this.props.onClosed()
    }

    render() {
        const { type } = this.state
        const { onClosed, open, selectedBuyer, nameSelected } = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}
            >
                <View style={{ flex: 1 }}>
                    <View style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        backgroundColor: '#F6F5F6'
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Mối quan hệ</Text>
                    </View>
                    <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
                        {type.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => this.setType(item)}
                                    style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: index === type.length - 1 ? 0 : 1,
                                        borderTopWidth: 0,
                                        borderColor: '#F6F5F6',
                                        alignItems: 'center',
                                        paddingVertical: 8
                                    }}
                                    key={index}
                                    disabled={item.id === 1 && selectedBuyer}>
                                    {
                                        nameSelected === item.name ? (
                                            <IconRadioBtnActiveSvg width={15} height={15} style={{opacity: item.id === 1 && selectedBuyer ? 0.3 : 1}} />
                                        ) : (
                                            <IconRadioBtnSvg width={15} height={15} style={{opacity: item.id === 1 && selectedBuyer ? 0.3 : 1}} />
                                        )
                                    }
                                    <Text
                                     style={[
                                         { marginLeft: 8, fontSize: 14, color: TxtColor },
                                         item.id === 1 && selectedBuyer && { color: textDisable }
                                        ]}
                                     >
                                         {item.name}
                                         </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.45,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})

export default ModalRelationType;
