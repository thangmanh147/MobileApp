
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
import { screen, TxtBlack, Color, TxtColor } from '../../../config/System';
import FastImage from 'react-native-fast-image'
import IconSearchSvg from '../../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBanks: props.bankInfo,
            value: '',
        };
    }
    
    componentDidMount() {
        const { bankInfo, getBank } = this.props;
        // if (!bankInfo) {
            getBank();
        // }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { bankInfo } = this.props;
        if (
            bankInfo?.length !== prevProps.bankInfo?.length
        ) {
            this.setState({ listBanks: bankInfo });
        }
    }

    setBank = (data) => {
        this.props.setBank(data)
        this.props.onClosed()
    }

    renderItem = (item, length) => {
        const { nameSelected } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.setBank(item.item)}
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
                    nameSelected === `(${item.item.stock_name}) ${item.item.short_name} - ${item.item.name}` ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                    ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                    )
                }
                <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor, flex: 1 }}>
                    ({item.item.stock_name}) {item.item.short_name} - {item.item.name}
                </Text>
            </TouchableOpacity>
        )
    }
    onChangeText = (text) => {
        const {bankInfo} = this.props;
        const b = [];
        this.setState({ value: text });
        bankInfo && bankInfo.map(item => {
            if (
                item.stock_name.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
                item.short_name.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
                item.name.toUpperCase().indexOf(text.toUpperCase()) > -1
            ) {
                b.push(item);
                this.setState({ listBanks: b });
            }
        });
    }
    render() {
        const { listBanks, value } = this.state
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
                            placeholder='Tìm ngân hàng'
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
                            data={listBanks}
                            renderItem={(item) => this.renderItem(item, listBanks?.length)}
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
import { getBankFmarket } from '../actions';

const mapStateToProps = (state) => {
    return {
        bankInfo: state.userInfo.listBank
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBank: () => dispatch(getBankFmarket())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalBank);
