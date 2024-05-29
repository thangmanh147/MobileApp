import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image'
import { Color, NewColor } from '../../../config/System';
import {connect} from 'react-redux';
import IconFilterSvg from '../../../config/images/icons/IconFilterSvg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';

class ModalSelectTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusContracts: [
                {
                    id: '1',
                    status: 'active',
                    name: 'Tất cả',
                },
                {
                    "id": '2',
                    "status": 'active',
                    "name": "Đang xử lý",
                    "code": "dang-xu-ly",
                },
                {
                    "id": '3',
                    "status": 'active',
                    "name": "Đã duyệt",
                    "code": "da-duyet",
                },
                {
                    "id": '4',
                    "status": 'active',
                    "name": "Từ chối",
                    "code": "tu-choi",
                },
                {
                    "id": '5',
                    "status": 'active',
                    "name": "Bổ sung thông tin",
                    "code": "bo-sung-thong-tin",
                },
                {
                    "id": '6',
                    "status": 'active',
                    "name": "Tạo lại",
                    "code": "tao-lai",
                },
                {
                    "id": '7',
                    "status": 'active',
                    "name": "Đã thanh toán",
                    "code": "da-thanh-toan",
                },
                {
                    "id": '8',
                    "status": 'active',
                    "name": "Đã nhận tiền",
                    "code": "da-nhan-tien",
                }
            ],
            showModal: false,
        };
    }

    componentDidMount() {
        this.handleSet();
    }

    onShowOptionTypes = () => {
        this.setState({showModal: true});
    };

    onHideOptionTypes = () => {
        this.setState({showModal: false});
    };

    onSelectStatus = (index, value) => {
        const {statusContracts} = this.state;
        if (index === 0) {
            const arr = statusContracts.map((item) => {
                item.status = value;
                return item;
            })
            this.setState({statusContracts: arr});
        } else {
            if(value === '') {
                statusContracts[0].status = '';
            } else {
                const arr = statusContracts.filter((item) => item.status === '');
                if(arr.length === 2) {
                    statusContracts[0].status = 'active';
                }
            }
            statusContracts[index].status = value;
            this.setState({statusContracts: statusContracts});
        }
    };

    handleSet = () => {
        const {
            statusContracts,
        } = this.state;
        const {onSet} = this.props;
        let status = '';
        this.onHideOptionTypes();
        if (
            statusContracts[0].status !== 'active'
        ) {
            const arr = statusContracts.filter((item) => item.id !== '1' && item.status === 'active');
            status = arr.map(item => item.code).toString();
        }
        onSet({status});
    };

    render() {
        const {
            statusContracts,
            showModal,
        } = this.state;
        return (
            <>
                <TouchableOpacity onPress={this.onShowOptionTypes}>  
                    <IconFilterSvg width={20} height={20} />
                </TouchableOpacity>
                <Modal
                    isVisible={showModal}
                    style={{margin: 0, justifyContent: 'flex-end'}}
                    onBackButtonPress={this.onHideOptionTypes}
                    onBackdropPress={this.onHideOptionTypes}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={styles.container}>
                        <ScrollView style={{marginBottom: 10}} contentContainerStyle={{paddingBottom: 24}}>
                            <View>
                                <View style={styles.title}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#414042'}}>Lọc theo trạng thái</Text>
                                </View>
                                {
                                    statusContracts.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.itemStyle}
                                                    onPress={() => this.onSelectStatus(index, item.status === 'active' ? '' : 'active')}
                                                    key={index}>
                                                    {
                                                        item.status === 'active'
                                                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                                                    }
                                                    <Text
                                                        style={[styles.textStyle, item.status === 'active' && {color: Color}]}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={styles.lineStyle} />
                                            </>
                                        );
                                    })
                                }
                            </View>
                        </ScrollView>
                        <View style={styles.containerSubmit}>
                            <TouchableOpacity style={styles.butSubmit} onPress={this.handleSet}>
                                <Text style={styles.titleSubmit}>ÁP DỤNG</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#fff',
        maxHeight: '86%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    title: {
        backgroundColor: '#F4F5F6',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        paddingLeft: 40,
        paddingVertical: 15,
    },
    itemStyle: {
        backgroundColor: 'white',
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
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    itemTime: {
        flex: 1,
    },
    textStyle: {
        color: '#414042',
        fontSize: 14,
        marginLeft: 8
    },
    textTime: {
        color: '#B3B2B3',
        fontSize: 14,
    },
    containerSubmit: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    butSubmit: {
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: NewColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSubmit: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        insuranceInfo: state.insurance.insuranceInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalSelectTime);
