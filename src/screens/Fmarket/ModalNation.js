
import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color, TxtColor } from '../../config/System';
import FastImage from 'react-native-fast-image'
import IconSearchSvg from '../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

class ModalBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listNations: props.nationInfo,
            value: '',
        };
    }
    
    componentDidMount() {
        const { nationInfo, getNation } = this.props;
        if (!nationInfo) {
            getNation();
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { nationInfo } = this.props;
        if (
            nationInfo?.length !== prevProps.nationInfo?.length
        ) {
            this.setState({ listNations: nationInfo });
        }
    }

    setNation = (data) => {
        this.props.setNation(data)
        this.props.onClosed()
    }

    renderItem = (item, length) => {
        const { nameSelected } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.setNation(item.item)}
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
        const {nationInfo} = this.props;
        const b = [];
        this.setState({ value: text });
        nationInfo && nationInfo.map(item => {
            if (
                item.name.toUpperCase().indexOf(text.toUpperCase()) > -1
            ) {
                b.push(item);
                this.setState({ listNations: b });
            }
        });
    }
    render() {
        const { listNations, value } = this.state
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
                            value={value}
                            placeholder='Tìm quốc tịch'
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
                            data={listNations}
                            renderItem={(item) => this.renderItem(item, listNations?.length)}
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
import { connect } from 'react-redux';
import { getNation } from '../../screens/Account/actions';

const mapStateToProps = (state) => {
    return {
        nationInfo: state.userInfo.listNation
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNation: () => dispatch(getNation())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalBank);
