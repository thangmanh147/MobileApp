
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color, TxtColor } from '../../../config/System';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalBuyerType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [
                {
                    name: 'Cá nhân',
                    id: 1
                },
                // {
                //     name: 'Doanh nghiệp',
                //     id: 2
                // },
            ],
        };
    }

    setBuyerType = (data) => {
        this.props.setBuyerType(data)
        this.props.onClosed()
    }

    render() {
        const { type } = this.state
        const { onClosed, open, nameSelected } = this.props;
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
                <View style={{flex: 1, marginHorizontal: 24, marginTop: 16}}>
                    {type.map((item, index) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => this.setBuyerType(item)} 
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: index === type.length - 1 ? 0 : 1,
                                    borderTopWidth: 0,
                                    borderColor: '#F6F5F6',
                                    alignItems: 'center',
                                    paddingVertical: 8
                                }} 
                                key={index}>
                                {
                                  nameSelected === item.name ? (
                                      <IconRadioBtnActiveSvg width={15} height={15} />
                                  ) : (
                                      <IconRadioBtnSvg width={15} height={15} />
                                  )
                                }
                                <Text style={{marginLeft: 8, fontSize: 14, color: TxtColor}}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.3,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})

export default ModalBuyerType;
