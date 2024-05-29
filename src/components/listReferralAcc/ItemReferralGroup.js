import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import { Color, TxtColor } from '../../config/System';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconIntroSvg from '../../config/images/icons/IconIntroSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';

class ItemContract extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {listReferralAcc, levelFilter} = this.props;
        const listAccFollow = listReferralAcc.filter((item) => levelFilter === item?.referralLevel);
        const listAccFollowActive = listAccFollow && listAccFollow.filter((item) => item?.hasContract);
        return (
            <View
                style={styles.contractItem}>
                <View style={{ flex: 1, paddingVertical: 16 }}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.title}>Người dùng cấp F{levelFilter}: <Text style={{color: Color}}>{listAccFollow?.length}</Text></Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 12 }}>
                            <IconIntroSvg height={17} width={17} color={Color} />
                            <Text style={[styles.title, {marginLeft: 4}]}>
                                Số user đang hoạt động:
                                <Text style={{fontWeight: 'normal'}}> {listAccFollowActive?.length}/{listAccFollow?.length}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
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
        paddingHorizontal: 24,
        marginBottom: 24,
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
    },
    text: {
        fontSize: 14,
        color: TxtColor,
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

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemContract);
