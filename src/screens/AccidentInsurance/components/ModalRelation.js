
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color, TxtColor } from '../../../config/System';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

const dataList = [
    {
        id: '0001',
        name: 'Bố'
    },
    {
        id: '0002',
        name: 'Mẹ'
    },
    {
        id: '0003',
        name: 'Chồng'
    },
    {
        id: '0004',
        name: 'Vợ'
    },
    {
        id: '0005',
        name: 'Con'
    },
    {
        id: '0006',
        name: 'Anh'
    },
    {
        id: '0007',
        name: 'Chị'
    },
    {
        id: '0008',
        name: 'Em'
    },
];

class Relation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listRelation: dataList,
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
    render() {
        const { listRelation } = this.state
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
                    backgroundColor: '#fff', flex: 1, marginTop: 8,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={{
                        flex: 1, marginTop: 8, marginHorizontal: 24
                    }}>

                        <FlatList
                            data={listRelation}
                            renderItem={(item) => this.renderItem(item, listRelation?.length)}
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
        flex: 0.4,
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

export default Relation;
