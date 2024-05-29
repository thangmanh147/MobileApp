import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import {Color, TxtColor} from '../../config/System';
import FastImage from 'react-native-fast-image';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

class ModalORC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: [
                {
                    name: 'LIVE',
                    id: 1,
                    url: 'https://gw.epti.vn',
                    domain: 'epti.vn'
                },
                {
                    name: 'UAT',
                    id: 2,
                    url: 'https://gwuat.capdon.vn',
                    domain: 'beta.epti.vn'
                },
                {
                    name: 'DEV',
                    id: 3,
                    url: 'https://gwdev.inso.vn',
                    domain: 'eptidev.inso.vn'
                },
            ],
        };
    }

    setSex = data => {
        this.props.setSex(data);
        this.props.onClosed();
    };

    render() {
        const {sex} = this.state;
        const {onClosed, open, nameSelected} = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}>
                <View style={{flex: 1}}>
                <View style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    backgroundColor: '#F6F5F6'
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Chọn môi trường thử nghiệm</Text>
                  </View>
                <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
                {sex.map((item, index) => {
                    return (
                      <TouchableOpacity 
                        onPress={() => this.setSex(item)}
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: index === sex.length - 1 ? 0 : 1,
                            borderTopWidth: 0,
                            borderColor: '#F6F5F6',
                            alignItems: 'center',
                            paddingVertical: 8
                        }}>
                        {
                            nameSelected === item.url ? (
                                <IconRadioBtnActiveSvg width={15} height={15} />
                            ) : (
                                <IconRadioBtnSvg width={15} height={15} />
                            )
                        }
                        <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                </View>
            </ModalBox>
        );
    }
}
const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.3,
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

export default ModalORC;
