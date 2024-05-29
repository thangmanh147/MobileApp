import React, { useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import { errValidColor, TxtColor } from '../../config/System';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../utils/Util';

function IntroCommission({ dataUser, orgCodeUser }) {
    const offset = useRef(new Animated.Value(0)).current;
    const getBack = () => {
        Actions.pop();
    }

    const renderContent = () => {
        const referralDefault = dataUser?.referrals ?
            (
                dataUser?.referrals?.length === 1 ? dataUser?.referrals[0] : dataUser?.referrals?.find((item) => item?.isDefault)
            ) : {};
        if (orgCodeUser === 'DLJSC') {
            if (referralDefault?.roleCode?.includes('HO')) {
                return renderCommission(3.75, 3.75, 3.75, 9.75, 9.75);
            } else if (referralDefault?.roleCode?.includes('B0')) {
                return renderCommission(1.25, 1.25, 1.25, 3.25, 3.25);
            } else if (referralDefault?.roleCode?.includes('B1')) {
                return renderCommission(2.5, 2.5, 2.5, 6.5, 6.5);
            } else if (referralDefault?.roleCode?.includes('B2')) {
                return renderCommission(17.5, 17.5, 17.5, 45.5, 45.5);
            }
        } else if (orgCodeUser === 'LVY' || orgCodeUser === 'BANKAS' || orgCodeUser === 'KAT') {
            if (referralDefault?.referralLevel == 0) {
                return renderCommission(2, 2, 1, 5, 5, 1, 2, 3);
            } else if (referralDefault?.referralLevel == 1) {
                return renderCommission(2, 2, 1, 5, 5, 1, 3, 3);
            } else if (referralDefault?.referralLevel == 2) {
                return renderCommission(3, 3, 2, 5, 5, 2, 3, 4);
            } else if (referralDefault?.referralLevel == 3) {
                return renderCommission(23, 23, 13, 50, 50, 16, 22, 25);
            }
        } else if (orgCodeUser === 'DL001') {
            if (referralDefault?.referralLevel == 0) {
                return renderCommission(15, 15, 15, 15, 15);
            } else if (referralDefault?.referralLevel == 1) {
                return renderCommission(5, 5, 5, 5, 5);
            } else if (referralDefault?.referralLevel == 2) {
                return renderCommission(10, 10, 10, 10, 10);
            } else if (referralDefault?.referralLevel == 3) {
                return renderCommission(70, 70, 70, 70, 70);
            }
        } else if (orgCodeUser === 'YCHI' || orgCodeUser === 'KNN') {
            if (referralDefault?.referralLevel == 0) {
                return renderCommission(2, 2, 1, 5, 5, 1, 3, 3);
            } else if (referralDefault?.referralLevel == 1) {
                return renderCommission(3, 3, 2, 5, 5, 2, 3, 4);
            } else if (referralDefault?.referralLevel == 2) {
                return renderCommission(23, 23, 13, 50, 50, 16, 22, 25);
            }
        } else if (orgCodeUser === 'VNPTQB') {
            if (referralDefault?.referralLevel == 0) {
                return renderCommission('0', '0', null, '0', '0');
            } else if (referralDefault?.referralLevel == 1) {
                return renderCommission('100', '100', null, '100', '100');
            }
        }
    }

    const renderCommission = (c1, c2, c3, c4, c5, c6, c7, c8) => {
        return (
            <>
                <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 12 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                        <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Loại bảo hiểm</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, flex: 1 }}>
                        <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Mức hoa hồng</Text>
                    </View>
                </View>
                {
                    c1 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>TNDS xe ô tô</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c1}%</Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    c2 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>Tai nạn LPX/NNTX</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c2}%</Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    c3 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>Vật chất xe ô tô</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c3}%</Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    c4 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>TNDS xe máy</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c4}%</Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    c5 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>Tai nạn NN trên xe máy</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c5}%</Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    c6 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>Tai nạn cá nhân</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c6}%</Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    c7 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>Nhà tư nhân/chung cư</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c7}%</Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    c8 ? (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>BH Du lịch</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, flex: 1 }}>
                                <Text style={{ fontSize: 14, color: TxtColor }}>{c8}%</Text>
                            </View>
                        </View>
                    ) : null
                }
            </>
        );
    }

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.container}>
            <Animated.View style={{ zIndex: headerZIndex }}>
                <ImageHeaderScroll code={'A1'} offset={offset} />
            </Animated.View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2012
            }}>
                <TouchableOpacity
                    onPress={() => getBack()}
                    style={{
                        paddingHorizontal: 24,
                        paddingTop: 43,
                        zIndex: 2012
                    }}>
                    <FastImage
                        style={{
                            height: 15,
                            width: (15 * 21) / 39,
                        }}
                        source={require('../../icons/ic_back.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={{ zIndex: 2011 }}>
                <HeaderScroll code={'A1'} offset={offset} title={'Giới thiệu hoa hồng'} />
            </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }]
                )}>
                <View style={styles.contentContainer}>
                    <View style={{ padding: 24 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Mức hoa hồng theo từng loại bảo hiểm</Text>
                        {renderContent()}
                        <Text style={{ fontSize: 14, marginTop: 12, color: errValidColor, fontStyle: 'italic' }}>Lưu ý: Hoa hồng được tính trên doanh thu trước thuế VAT và khuyến mãi (nếu có).</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        dataUser: state.userInfo.userInfo,
        orgCodeUser: state.userInfo.orgCodeUser,
    }
}

export default connect(mapStateToProps)(IntroCommission);
