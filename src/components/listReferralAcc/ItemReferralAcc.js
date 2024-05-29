import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import { Color, colorText, textDisable, TxtColor } from '../../config/System';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconIntroSvg from '../../config/images/icons/IconIntroSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';

class ItemContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: true,
        };
    }

    render() {
        const {listReferralAcc, index, levelFilter} = this.props;
        const listAccFollow = listReferralAcc.filter((item) => levelFilter === item?.referralLevel);
        const listAccFollowActive = listAccFollow && listAccFollow.filter((item) => item?.hasContract);
        const {showList} = this.state;
        return (
            <View
                style={styles.contractItem}>
                <View style={{ flex: 1, paddingVertical: 16 }}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2}}>
                                <Text style={styles.title}>Người dùng cấp {index === 0 ? 'trực tiếp' : 'gián tiếp'}: <Text style={{color: Color}}>{listAccFollow?.length}</Text></Text>
                            </View>
                            {
                                index === 0 ? (
                                    <TouchableOpacity
                                        style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}
                                        onPress={() => this.setState({showList: !showList})}
                                    >
                                        {
                                            showList ? (
                                                <IconUpItemSvg width={20} height={20} />
                                            ) : (
                                                <IconDownItemSvg width={20} height={20} />
                                            )
                                        }
                                    </TouchableOpacity>
                                ) : null
                            }
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 12 }}>
                            <IconIntroSvg height={17} width={17} color={Color} />
                            <Text style={[styles.title, {marginLeft: 4}]}>
                                Số user đang hoạt động:
                                <Text style={{fontWeight: 'normal'}}> {listAccFollowActive?.length}/{listAccFollow?.length}</Text>
                            </Text>
                        </View>
                    </View>
                    {
                        (showList && listAccFollow?.length > 0 && index === 0) ? (
                            <View style={{flexDirection: 'row', marginTop: 16}}>
                                <View style={{flex: 1}}>
                                    <View style={{height: 1,borderBottomWidth: 1, borderColor:'#D9D9D9'}} />
                                    {
                                        listAccFollow.sort((a, b) => {
                                            let x = a?.hasContract;
                                            let y = b?.hasContract;
                                            if (!x && y) {return 1;}
                                            if (x && !y) {return -1;}
                                            return 0;
                                          }).map((item) => (
                                            <View style={{flexDirection:'row', flex: 1, marginTop: 16}}>
                                                <View style={{flex:1.2, flexDirection: 'row'}}>
                                                    <IconBuyerSvg height={15} width={15} color={item?.hasContract ? Color : '#D9D9D9'} />
                                                    <View style={{marginLeft: 5}}>
                                                        {
                                                            item?.fullName ? (
                                                                <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>
                                                                    {item?.fullName}
                                                                </Text>
                                                            ) : null
                                                        }
                                                        <Text style={{color: TxtColor, fontSize: item?.fullName ? 13 : 14}}>
                                                            {item?.username}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{flex:1}}>
                                                    <Text style={{fontSize:14, color: item?.hasContract ? Color : '#B3B2B3', textAlign: 'right'}}>
                                                        {
                                                            item?.hasContract ? 'Hoạt động' : 'Chưa hoạt động'
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        ) : null
                    }
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
