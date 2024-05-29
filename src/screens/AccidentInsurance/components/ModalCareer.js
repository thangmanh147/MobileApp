
import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color, TxtColor } from '../../../config/System';
import IconSearchSvg from '../../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

const dataList = [
    {
        id: '0001',
        name: 'Bác sĩ'
    },
    {
        id: '0002',
        name: 'Giáo viên'
    },
    {
        id: '0003',
        name: 'Nội trợ'
    },
    {
        id: '0004',
        name: 'Nông dân'
    },
    {
        id: '0005',
        name: 'Buôn bán'
    },
    {
        id: '0006',
        name: 'Nhân viên văn phòng (tài chính, bất động sản, kế toán, thủ quỹ)'
    },
    {
        id: '0007',
        name: 'Cứu hỏa'
    },
    {
        id: '0008',
        name: 'Thủy thủ đoàn'
    },
    {
        id: '0009',
        name: 'Công an/bộ đội'
    },
    {
        id: '0010',
        name: 'Kỹ sư/công nhân xây dựng/lắp đặt'
    },
    {
        id: '0011',
        name: 'Hầm mỏ'
    },
    {
        id: '0012',
        name: 'Dàn khoan'
    },
    {
        id: '0013',
        name: 'Cơ khí'
    },
    {
        id: '0014',
        name: 'Luyện kim'
    },
    {
        id: '0015',
        name: 'Bốc vác'
    },
    {
        id: '0016',
        name: 'Ngành nghề khác'
    },
];

class ModalCareer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCareer: dataList,
        };
    }

    setData = (data) => {
        this.props.setData(data)
        this.props.onClosed()
    }
    renderItem = (item, length) => {
        const { nameSelected } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.setData(item.item)}
                style={{
                    flexDirection: 'row',
                    borderBottomWidth: item.index === length - 1 ? 0 : 1,
                    borderTopWidth: 0,
                    borderColor: '#F6F5F6',
                    alignItems: 'center',
                    paddingTop: 8,
                    paddingBottom: item.index === length - 1 ? 32 : 8,
                }} >
                {
                    nameSelected === item.item.name ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                    ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                    )
                }
                <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor, flex: 1 }}>
                    {item.item.name}
                </Text>
            </TouchableOpacity>
        )
    }
    onChangeText = (text) => {
        this.setState({
            listCareer: dataList.filter(item => item.name.toUpperCase().includes(text?.toUpperCase() || ''))
        })
    }
    render() {
        const { listCareer } = this.state
        const { onClosed, open } = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={true}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}
            >
                <View style={{
                    backgroundColor: '#fff', flex: 1, marginTop: 24,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={css.ctInput}>
                        <IconSearchSvg width={15} height={15} />
                        <TextInput
                            placeholder='Tìm ngành nghề'
                            placeholderTextColor={'#8D8C8D'}
                            onChangeText={text => this.onChangeText(text)}
                            style={{
                                marginLeft: 8,
                                flex: 1,
                                color: TxtColor,
                                fontSize: 14,
                                padding: 0
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1, marginTop: 8, marginHorizontal: 24
                    }}>

                        <FlatList
                            data={listCareer}
                            renderItem={(item) => this.renderItem(item, listCareer?.length)}
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
        marginHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
    },
})

export default ModalCareer;
