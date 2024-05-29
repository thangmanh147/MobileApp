import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { NewColor, NewColorDisable, TxtColor } from '../../../../config/System';
import { connect } from 'react-redux';
import IconRadioBtnActiveSvg from '../../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../../config/images/icons/IconRadioBtnSvg';

class ModalSelectTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channelIdSelected: props.dataTokenInsur?.channelId || '',
            orgIdSelected: props.dataTokenInsur?.orgId || '',
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {dataTokenInsur} = this.props;
        if(dataTokenInsur?.channelId !== prevProps.dataTokenInsur?.channelId) {
            this.setState({channelIdSelected: dataTokenInsur?.channelId});
        }
        if(dataTokenInsur?.orgId !== prevProps.dataTokenInsur?.orgId) {
            this.setState({orgIdSelected: dataTokenInsur?.orgId});
        }
    }

    onShowOptionTypes = () => {
        this.setState({ showModal: true });
    };

    handleSet = () => {
        const {callBackCreate} = this.props;
        const {channelIdSelected, orgIdSelected} = this.state;
        callBackCreate(channelIdSelected, orgIdSelected);
    };

    render() {
        const { channels, modalAgent, callBackModal } = this.props;
        const {
            channelIdSelected,
            orgIdSelected,
        } = this.state;
        const channelSelected = channels ? channels.find(item => item.channelId === channelIdSelected) : {};
        return (
            <>
                <Modal
                    isVisible={modalAgent}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={callBackModal}
                    onBackdropPress={callBackModal}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={styles.container}>
                        <ScrollView style={{ marginBottom: 10 }} contentContainerStyle={{ paddingBottom: 24 }}>
                            <View>
                                <View style={[styles.title, { marginBottom: 4 }]}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Chọn kênh</Text>
                                </View>
                                {
                                    channels.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.itemStyle}
                                                    onPress={() => this.setState({ channelIdSelected: item.channelId, orgIdSelected: '' })}
                                                    key={index}>
                                                    {
                                                        channelIdSelected === item.channelId
                                                            ? <IconRadioBtnActiveSvg width={15} height={15} />
                                                            : <IconRadioBtnSvg width={15} height={15} />
                                                    }
                                                    <Text
                                                        style={[styles.textStyle, { marginLeft: 8 }]}
                                                    >
                                                        {item.channelName}
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={styles.lineStyle} />
                                            </>
                                        );
                                    })
                                }
                            </View>
                            {
                                channelSelected ? (
                                    <View>
                                        <View style={[styles.title, { borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 12, marginBottom: 4 }]}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Chọn đại lý</Text>
                                        </View>
                                        {
                                            channelSelected.agents && channelSelected.agents.map((item, index) => {
                                                return (
                                                    <>
                                                        <TouchableOpacity
                                                            style={styles.itemStyle}
                                                            onPress={() => this.setState({ orgIdSelected: item.organizationId })}
                                                            key={index}>
                                                            {
                                                                orgIdSelected === item.organizationId
                                                                    ? <IconRadioBtnActiveSvg width={15} height={15} />
                                                                    : <IconRadioBtnSvg width={15} height={15} />
                                                            }
                                                            <Text
                                                                style={[styles.textStyle, { marginLeft: 8 }]}
                                                            >
                                                                {item.organizationName}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <View style={styles.lineStyle} />
                                                    </>
                                                );
                                            })
                                        }
                                    </View>
                                ) : null
                            }
                        </ScrollView>
                        <View style={styles.containerSubmit}>
                            <TouchableOpacity
                                disabled={
                                    !channelIdSelected ||
                                    !orgIdSelected
                                }
                                style={[
                                    styles.butSubmit,
                                    {
                                        backgroundColor:
                                            !channelIdSelected ||
                                            !orgIdSelected ?
                                                NewColorDisable :
                                                NewColor
                                    }
                                ]}
                                onPress={this.handleSet}>
                                <Text style={styles.titleSubmit}>TIẾP TỤC</Text>
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
        paddingVertical: 12,
    },
    itemStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 40,
        paddingRight: 24,
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#F6F5F6',
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
        color: TxtColor,
        fontSize: 14,
        flex: 1,
    },
    textTime: {
        color: '#B3B2B3',
        fontSize: 14,
    },
    containerSubmit: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    butSubmit: {
        flex: 1,
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
        dataTokenInsur: state.insurance.tokenInsur[ownProps.codeInsur],
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
