import React, { Component } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import { Color, TxtColor } from '../../config/System';
import { getNotifyInfo } from './actions';
import ItemNotify from './ItemNotify';

class CustomerNotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            isLoading: false,
        };
    }

    componentDidMount() {
        const { notifyInfo, getNotifyInfo } = this.props;
        getNotifyInfo();
        if (!notifyInfo) {
            this.setState({ isLoading: true });
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { notifyInfo } = this.props;
        if (
            notifyInfo?.data?.length !== prevProps.notifyInfo?.data?.length
        ) {
            this.setState({ isLoading: false });
        }
    }

    onSetMore = () => {
        const { getNotifyInfo, notifyInfo } = this.props;
        if (notifyInfo && notifyInfo.totalLength > notifyInfo?.data?.length) {
            this.setState({ isLoading: true });
            const _limit = notifyInfo?.data?.length + 10;
            getNotifyInfo(
                _limit,
            );
        }
    };

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    render() {
        const { notifyInfo, hideBack } = this.props;
        const { isLoading } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 2201 }}>
                    <Nav isInfo={false} title={'THÔNG BÁO'}
                        onPress={() => Actions.pop()}
                        show={!hideBack}
                    />
                </View>
                <ScrollView
                    style={{ marginTop: notifyInfo?.data?.length > 0 ? -32 : 0, zIndex: 2201 }}
                    contentContainerStyle={{ paddingBottom: 32 }}
                    onScroll={({ nativeEvent }) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.onSetMore();
                        }
                    }}
                >
                    {
                        notifyInfo && notifyInfo?.data?.map((item) => <ItemNotify item={item} />)
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
                            zIndex: 2202,
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
    },
    notifyItem: {
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
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        notifyInfo: state.notifyInfo.notifyInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getNotifyInfo: (limit) =>
            dispatch(getNotifyInfo(limit)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomerNotify);
