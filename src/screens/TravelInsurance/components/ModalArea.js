
import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color } from '../../../config/System';
import FastImage from 'react-native-fast-image';

class ModalArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [
                {
                    name: 'Việt Nam',
                    id: 1
                },
                {
                    name: 'Đông Nam Á ',
                    description: '(Brunei, Campuchia, Indonesia, Lào, Malaysia, Myanmar (Burma), Philippines, Singapore, Thái Lan, Đông Timo.)',
                    id: 1
                },
                {
                    name: 'Châu Á ',
                    description: '(Bao gồm các nước Châu Á (Loại trừ các nước Tây Á bao gồm: Syria, Israel, Jodan, Liban, Iran, Irag, Saudi Arbia, Syrian Arb Repulic, Bahrain, Qatar, Oman, Yemen, Kuwait.... và loại trừ các nước Nhật Bản, Úc, New Zealand).)',
                    id: 1
                },
                {
                    name: 'Toàn Cầu ',
                    description: '(Các nước còn lại (bao gồm Nhật Bản, Úc, New Zealand,..) và loại trừ Tây Tạng.)',
                    id: 1
                },
            ],
        };
    }

    setArea = (data) => {
        this.props.setArea(data)
        this.props.onClosed()
    }

    render() {
        const { type } = this.state
        const { onClosed, open } = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
            >
                <ScrollView style={{ flex: 1, marginHorizontal: 10, marginTop: 10 }}>
                    {type.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => this.setArea(item)} style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <FastImage
                                    source={require('../../../icons/iconAgent/single_select.png')}
                                    style={{ width: 15, height: 15 }}
                                    resizeMode={'contain'} />
                                <View style={{
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderTopWidth: 0,
                                    borderColor: '#efefef',
                                    paddingVertical: 10,
                                    paddingLeft: 0,
                                    marginHorizontal: 10,
                                    paddingRight: 15
                                }} key={index}>

                                    <View>
                                        <Text>{item.name}</Text>
                                        <Text style={{ fontStyle: 'italic', color: '#82D8D7' }}>{item.description}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    })}
                </ScrollView>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.6,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})

export default (ModalArea);
