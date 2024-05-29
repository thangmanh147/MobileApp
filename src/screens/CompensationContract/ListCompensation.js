import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color, TxtColor, NewColor } from '../../config/System';
import ModalSelectTime from './ModalSelectTime';
import { getList } from './actions';
import { dateImages, statusClaim } from './assets';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

const listFilter = [
    {
        name: 'Họ và tên',
    },
    {
        name: 'Mã YC',
    },
];

class CustomerContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemSelected: 'Họ và tên',
            isShow: false,
            value: '',
            options: {},
            limit: 10,
            isLoading: false,
        };
    }

    componentDidMount() {
        const { listCompen, getList } = this.props;
        if (!listCompen) {
            this.setState({ isLoading: true });
            getList();
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { listCompen } = this.props;
        if (listCompen?.data?.length !== prevProps.listCompen?.data?.length) {
            this.setState({ isLoading: false });
        }
    }

    onShowOptionTypes = () => {
        this.setState({ isShow: true });
    };

    onHideOptionTypes = () => {
        this.setState({ isShow: false });
    };

    onSelect = (value) => {
        this.setState({ itemSelected: value });
        this.onHideOptionTypes();
    };

    onChange = (value) => {
        const { getList } = this.props;
        const { itemSelected, options } = this.state;
        this.setState({ value: value.toUpperCase(), limit: 10 });
        let fullName = '', code = '';
        if (itemSelected === 'Họ và tên') {
            fullName = value;
        } else {
            code = value
        }
        getList(
            fullName,
            code,
            options.status,
        );
    };

    onSetMore = () => {
        const { getList, listCompen } = this.props;
        const { itemSelected, options, value, limit } = this.state;
        if (listCompen && listCompen.totalLength > limit) {
            this.setState({ isLoading: true });
            const _limit = limit + 10;
            this.setState({ limit: _limit });
            let fullName = '', code = '';
            if (itemSelected === 'Họ và tên') {
                fullName = value;
            } else {
                code = value
            }
            getList(
                fullName,
                code,
                options.status,
                _limit,
            );
        }
    };

    onSet = (objModal) => {
        const { getList } = this.props;
        const { itemSelected, value } = this.state;
        this.setState({ options: objModal, limit: 10 });
        let fullName = '', code = '';
        if (itemSelected === 'Họ và tên') {
            fullName = value;
        } else {
            code = value
        }
        getList(
            fullName,
            code,
            objModal.status,
        );
    };

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    render() {
        const { listCompen } = this.props;
        const { itemSelected, isShow, value, isLoading } = this.state;
        console.log('LIST-COMPEN: ', listCompen?.data?.length);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 2201 }}>
                    <Nav isInfo={false} title={'DANH SÁCH YÊU CẦU BỒI THƯỜNG'}
                        onPress={() => Actions.pop()} />
                </View>
                <View style={styles.textBox}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 33,
                        paddingRight: 5,
                        borderRightWidth: 1,
                        borderRightColor: '#D9D9D9',
                    }}>
                        <TouchableOpacity
                            onPress={this.onShowOptionTypes}
                            style={styles.fullName}>
                            <Text style={{ fontSize: 14, color: TxtColor }}>{itemSelected}</Text>
                            <FastImage source={require('../../icons/iconAgent/iconDown.png')}
                                style={{ height: 8, width: 8, marginLeft: 5 }} />
                        </TouchableOpacity>
                        <Modal
                            isVisible={isShow}
                            style={{ margin: 0, justifyContent: 'flex-end' }}
                            onBackButtonPress={this.onHideOptionTypes}
                            onBackdropPress={this.onHideOptionTypes}
                            animationInTiming={200}
                            animationOutTiming={200}
                            backdropTransitionInTiming={0}
                            backdropTransitionOutTiming={0}
                        >
                            <View style={{
                                backgroundColor: '#fff',
                                maxHeight: '50%',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                paddingVertical: 12,
                            }}>
                                {
                                    listFilter.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.itemStyle}
                                                    onPress={() => this.onSelect(item.name)}
                                                    key={index}>
                                                    {
                                                        itemSelected === item.name ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text
                                                        style={[styles.textStyle, itemSelected === item.name && { color: Color }]}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                                {
                                                    index === 0 ? (
                                                        <View style={styles.lineStyle} />
                                                    ) : null
                                                }
                                            </>
                                        );
                                    })
                                }
                            </View>
                        </Modal>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        value={value}
                        placeholder={'Nhập từ khóa tìm kiếm'}
                        placeholderTextColor={'#8D8C8D'}
                        onChangeText={this.onChange}
                        multiline
                        scrollEnabled={false}
                        autoCapitalize={"characters"}
                    />
                    <ModalSelectTime onSet={this.onSet} />
                </View>
                <ScrollView
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 60, paddingHorizontal: 24 }}
                    onScroll={({ nativeEvent }) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.onSetMore();
                        }
                    }}
                >
                    {
                        listCompen && listCompen.data.map(item => {
                            const statusItem = statusClaim[item.status] || statusClaim.default;
                            const contractCode = item.contractCode.split('.');
                            const codeInsur = contractCode ? (contractCode.includes('VNI') ? contractCode[3] : contractCode[2]) : '';
                            return (
                                <TouchableOpacity
                                    onPress={() => Actions.DetailClaim({ idClaim: item.id })}
                                    style={styles.contractItem}>
                                    {dateImages[codeInsur] ? dateImages[codeInsur].icon : dateImages.default.icon}
                                    <View style={{ paddingLeft: 26, paddingRight: 5, flex: 1 }}>
                                        <Text style={styles.title}>Mã YC: {item.code}</Text>
                                        {
                                            dateImages[codeInsur] ? (
                                                <Text style={styles.text}>{dateImages[codeInsur].name}</Text>
                                            ) : null
                                        }
                                        <Text style={styles.text}>Họ và tên: {item.firstName}</Text>
                                        <Text style={styles.text}>
                                            Trạng thái:{' '}
                                            <Text style={{ color: statusItem.color }}>{statusItem.name}</Text>
                                        </Text>
                                        <Text style={styles.text}>Ngày YCBT: {moment(item.createdAt).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <FastImage
                                        source={require('../../config/images/public/icons/ic_chevron.png')}
                                        style={{ height: 14, width: 8.75 }} />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
                {
                    isLoading ? (
                        <View style={{
                            flex: 1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor: '#e8e8e8',
                            justifyContent: 'center',
                            opacity: 0.3,
                            zIndex: 2200,
                        }}>
                            <ActivityIndicator
                                size="large"
                                color={Color}
                            />
                        </View>
                    ) : null
                }
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textBox: {
        zIndex: 2201,
        marginTop: -30,
        marginHorizontal: 24,
        paddingHorizontal: 15,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    fullName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginHorizontal: 8,
        paddingVertical: 5,
        flex: 1,
        color: TxtColor,
        fontSize: 14,
    },
    contractItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingLeft: 26,
        paddingRight: 18,
        marginBottom: 16,
        alignItems: 'center',
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
    },
    title: {
        fontSize: 14,
        color: TxtColor,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    text: {
        marginTop: 3,
        fontSize: 14,
        color: '#8D8C8D',
    },
    itemStyle: {
        // backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 40,
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#efefef',
        marginHorizontal: 24,
    },
    textStyle: {
        color: '#414042',
        fontSize: 14,
        marginLeft: 12,
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        listCompen: state.compensation.listCompen,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getList: (fullName, code, status, limit) =>
            dispatch(getList(fullName, code, status, limit)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomerContract);
