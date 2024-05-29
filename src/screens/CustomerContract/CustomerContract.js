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
import SimpleToast from 'react-native-simple-toast';
import { saveLogContract } from '../../actions/logContract';
import { Color, TxtColor, NewColor, errValidColor, URL } from '../../config/System';
import ModalSelectTime from './ModalSelectTime';
import { getContractInfo, getContractInfoSuccess, getListTPBAcc } from './actions';
import ItemContract from './ItemContract';
import ItemAcc from './ItemAcc';
import Store from '../../services/Store';
import Const from '../../services/Const';
import IconGetMoreSvg from '../../config/images/icons/IconGetMoreSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';

const listFilter = [
    {
        name: 'Họ và tên',
    },
    {
        name: 'Mã HĐ',
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
            isRefresh: false,
            listContract: props.contractInfo?.data,
            showModal: false,
            contractSelected: {}
        };
    }

    componentWillMount() {
        new Store().getSession(Const.PASS_WORD).then(pass => {
            if (!pass || pass.length === 0) {
                Actions.LoginNew();
            } else {
                return null;
            }
        })
    }

    componentDidMount() {
        const { contractInfo, id, getContractInfo, getListTPBAcc, orgCodeUser } = this.props;
        if (orgCodeUser === 'TEST') {
            getListTPBAcc('');
        }
        if (!contractInfo) {
            this.setState({ isLoading: true });
            getContractInfo(id);
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { contractInfo } = this.props;
        const {isRefresh} = this.state;
        if (
            (contractInfo?.data?.length !== prevProps.contractInfo?.data?.length) ||
            isRefresh
        ) {
            this.setState({ isLoading: false, isRefresh: false, listContract: contractInfo?.data });
        }
    }

    setShowModal = (item) => {
        this.setState({ showModal: true, contractSelected: item });
    }
    
    removeContract = () => {
        const { saveLogContract } = this.props;
        const { contractSelected } = this.state;
        console.log('0101010101 :: ', contractSelected);
        if (contractSelected?.key?.length > 0) {
            this.setState({showModal: false, contractSelected: {}}, () => {
                saveLogContract(contractSelected?.code, null);
            })
        } else {
            this.setState({showModal: false, contractSelected: {}}, () => {
                this.deleteContract(
                    contractSelected?.id,
                    contractSelected?.code,
                );
            })
        }
    }

    deleteContract = (idContract, code) => {
        const { contractInfo, saveContracts, id } = this.props;
        let url = `${URL}/api/contract/v1/contracts`;
        let body = {
            "contractId": idContract,
            "contractCode": code
        }
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Cookie': 'connect.sid=s%3Al9KCKjFLR7OflF81IkykxNBQxTvVnvgf.p5iehLi%2BFis8KkXF54rVqi8%2BfOhhn%2FfVyranwnSzkgY'
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log('RES :: ', res);
                    if(res.status == 200 || res.status == 'success') {
                        const arr = contractInfo && contractInfo.data.filter(item => item?.id !== idContract);
                        console.log('22222 :: ', contractInfo?.totalLength - 1);
                        saveContracts(id, {data: arr, totalLength: contractInfo?.totalLength - 1});
                    } else {
                        SimpleToast.show(res.message);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
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
        const { id, getContractInfo, getListTPBAcc, orgCodeUser } = this.props;
        const { itemSelected, options } = this.state;
        this.setState({ value: value.toUpperCase(), limit: 10 });
        let fullName = '', code = '';
        if (itemSelected === 'Họ và tên') {
            fullName = value;
        } else {
            code = value
        }
        if (orgCodeUser === 'TEST') {
            getListTPBAcc(value);
        }
        getContractInfo(
            id,
            fullName,
            code,
            options.fromDate,
            options.toDate,
            options.status,
            options.expiredAt,
            options.productCode,
            options.type,
            null,
            options.orgId,
        );
    };

    onSetMore = () => {
        const { id, getContractInfo, contractInfo } = this.props;
        const { itemSelected, options, value, limit } = this.state;
        if (contractInfo && contractInfo.totalLength > limit) {
            this.setState({ isLoading: true });
            const _limit = limit + 10;
            this.setState({ limit: _limit });
            let fullName = '', code = '';
            if (itemSelected === 'Họ và tên') {
                fullName = value;
            } else {
                code = value
            }
            getContractInfo(
                id,
                fullName,
                code,
                options.fromDate,
                options.toDate,
                options.status,
                options.expiredAt,
                options.productCode,
                options.type,
                _limit,
                options.orgId,
            );
        }
    };

    onSetFirst = () => {
        const { id, getContractInfo, getListTPBAcc, orgCodeUser } = this.props;
        const { itemSelected, options, value } = this.state;
        this.setState({ isLoading: true, limit: 10 }, () => {
            let fullName = '', code = '';
            if (itemSelected === 'Họ và tên') {
                fullName = value;
            } else {
                code = value
            }
            if (orgCodeUser === 'TEST') {
                getListTPBAcc(value);
            }
            getContractInfo(
                id,
                fullName,
                code,
                options.fromDate,
                options.toDate,
                options.status,
                options.expiredAt,
                options.productCode,
                options.type,
                10,
                options.orgId,
            );
            setTimeout(() => {
                clearTimeout(this.timer);
                this.timer = this.setState({isRefresh: true});
            }, 600);
        });
    };

    onSet = (objModal) => {
        const { id, getContractInfo } = this.props;
        const { itemSelected, value } = this.state;
        this.setState({ options: objModal, limit: 10 });
        let fullName = '', code = '';
        if (itemSelected === 'Họ và tên') {
            fullName = value;
        } else {
            code = value
        }
        getContractInfo(
            id,
            fullName,
            code,
            objModal.fromDate,
            objModal.toDate,
            objModal.status,
            objModal.expiredAt,
            objModal.productCode,
            objModal.type,
            null,
            objModal.orgId,
        );
    };

    checkStatusContract = (expiredAt, status) => {
        if (moment().startOf('day').add(1, 'days').valueOf() > moment(expiredAt).valueOf()) {
            return {
                name: 'Hết hiệu lực',
                color: 'red',
            };
        } else if (status === 'da-ky-so' && moment().startOf('day').add(1, 'days').valueOf() < moment(expiredAt).valueOf()) {
            return {
                name: 'Đang hoạt động',
                color: '#007CC4',
            };
        } else if (status !== 'da-ky-so' && moment().startOf('day').add(1, 'days').valueOf() < moment(expiredAt).valueOf()) {
            return {
                name: 'Đang xử lý',
                color: '#F58220',
            };
        } else return {
            name: 'Đang xử lý',
            color: '#F58220',
        };
    };

    showOption = (index) => {
        const { listContract } = this.state;
        listContract[index].selected = 'active';
        this.setState({ listContract: listContract });
    };

    hideOption = (index) => {
        const { listContract } = this.state;
        listContract[index].selected = '';
        this.setState({ listContract: listContract });
    };

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    isCloseToTop = ({ contentOffset }) => {
        return contentOffset.y == 0;
    };

    render() {
        const { contractLogData, contractInfo, hideBack, listTPBAcc, orgCodeUser } = this.props;
        const { itemSelected, isShow, value, isLoading, listContract, limit, showModal } = this.state;
        let arr = contractInfo && contractInfo?.data?.filter(item => !item?.key);
        const arrKeys = Object.keys(contractLogData);
        arrKeys && arrKeys.map(i => {
            if (contractLogData[i]?.key?.length > 0) {
                arr?.unshift(contractLogData[i]);
            }
        });
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 2201 }}>
                    <Nav isInfo={false} title={'DANH SÁCH HỢP ĐỒNG BẢO HIỂM'}
                        onPress={() => Actions.pop()}
                        show={!hideBack}
                    />
                </View>
                <View style={styles.textBox}>
                    {/* <View style={{
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
                    </View> */}
                    <TextInput
                        style={styles.textInput}
                        value={value}
                        placeholder={'Nhập từ khóa tìm kiếm'}
                        placeholderTextColor={'#D9D9D9'}
                        onChangeText={this.onChange}
                        multiline
                        scrollEnabled={false}
                        autoCapitalize={"characters"}
                    />
                    <ModalSelectTime onSet={this.onSet} />
                </View>
                <ScrollView
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 32, paddingHorizontal: 24 }}
                    onScroll={({ nativeEvent }) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.onSetMore();
                        } else if (this.isCloseToTop(nativeEvent)) {
                            this.onSetFirst();
                        }
                    }}
                >
                    {
                        orgCodeUser === 'TEST' && listTPBAcc && listTPBAcc.length > 0 && listTPBAcc.map((item) => (
                            <ItemAcc
                                item={item}
                            />
                        ))
                    }
                    {
                        arr && arr.map((item) => (
                            <ItemContract
                                item={item}
                                contractId={item?.id}
                                onSelectContract={this.setShowModal}
                            />
                        ))
                    }
                    {
                        contractInfo && contractInfo.totalLength > limit ? (
                            <IconGetMoreSvg width={15} height={15} style={{alignSelf: 'center'}} />
                        ) : null
                    }
                </ScrollView>
                <Modal
                    isVisible={showModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={() => this.setState({ showModal: false, contractSelected: {} })}
                    onBackdropPress={() => this.setState({ showModal: false, contractSelected: {} })}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                    >
                <View
                    style={{
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingTop: 24,
                    paddingHorizontal: 24,
                    paddingBottom: 32,
                    alignItems: 'center'
                    }}>
                    <NotifyRingSvg width={53} height={60} />
                    <Text style={{ marginVertical: 36, fontSize: 14, color: TxtColor }}>
                        Bạn muốn xóa hợp đồng bảo hiểm này ?
                    </Text>
                    <TouchableOpacity
                    onPress={this.removeContract}
                    style={{
                        width: '100%',
                        paddingVertical: 16,
                        backgroundColor: errValidColor,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                        XÓA
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.setState({ showModal: false, contractSelected: {} })}
                    style={{
                        marginTop: 12,
                        width: '100%',
                        paddingVertical: 16,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: Color }}>
                        KHÔNG
                    </Text>
                    </TouchableOpacity>
                </View>
                </Modal>
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
        paddingHorizontal: 12,
        paddingVertical: 9,
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
        marginRight: 8,
        paddingVertical: 5,
        flex: 1,
        color: TxtColor,
        fontSize: 14,
        padding: 0
    },
    contractItem: {
        flexDirection: 'row',
        // paddingVertical: 16,
        paddingLeft: 26,
        // paddingRight: 18,
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
        contractInfo: state.contracts.contractInfo[ownProps.id],
        contractLogData: state.logContract.logContract || {},
        listTPBAcc: state.contracts.listRegisAcc['TPB'],
        orgCodeUser: state.userInfo.orgCodeUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getContractInfo: (id, fullName, code, fromDate, toDate, status, expiredAt, productCode, type, limit, orgId) =>
            dispatch(getContractInfo(id, fullName, code, fromDate, toDate, status, expiredAt, productCode, type, limit, orgId)),
        saveLogContract: (id, data) => dispatch(saveLogContract(id, data)),
        saveContracts: (id, data) => dispatch(getContractInfoSuccess(id, data)),
        getListTPBAcc: (value) => dispatch(getListTPBAcc('TPB', value)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomerContract);
