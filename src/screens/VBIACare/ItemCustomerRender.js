import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import FastImage from 'react-native-fast-image';
import { Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, colorNote } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';

class ItemRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHide: false 
        };
    }

    render() {
        const {item, index, onRemove} = this.props;
        const {isHide} = this.state;
        return (
            <View style={[styles.contentContainer, { marginTop: 16 }]}>
                <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                    <Text style={styles.titleStyle}>Người được bảo hiểm {index + 1  > 9 ? index + 1 : `0${index + 1}`}:</Text>
                    <TouchableOpacity onPress={() => Actions.ACareItemCustomer({index: index})}>
                        <IconEditSvg width={16} height={15} />
                    </TouchableOpacity>
                </View>
                
                <View
                    style={{
                        zIndex: 1,
                    }}>
                    <View style={styles.tourInfo}>
                        <View
                            style={{ flex: 0.5 }}
                        >
                            <Text style={styles.titleInfo}>Họ và tên</Text>
                        </View>
                        <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={styles.contentInfo}>
                                {item?.fullName}
                            </Text>
                            <TouchableOpacity
                                onPress={() => this.setState({isHide: !isHide})}
                                style={{ paddingLeft: 10 }}>
                                {
                                    !isHide ?
                                        <IconUpItemSvg width={18} height={18} /> :
                                        <IconDownItemSvg width={18} height={18} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        !isHide ? (
                            <>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Giới tính</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.gender}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Ngày sinh</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.birthday}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.identity}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.phone}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Email</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.email}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Địa chỉ</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.address}, {item?.district}, {item?.province}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Mối quan hệ</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.relation}</Text>
                                    </View>
                                </View>
                            </>
                        ) : null
                    }
                </View>
                <TouchableOpacity
                    onPress={onRemove}
                    style={{ alignItems: 'center', marginTop: 8 }}>
                    <FastImage
                      source={require('../../config/images/public/icons/ic_Subtract.png')}
                      style={{ height: 20, width: 20 }}
                      resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    headerContent: {
        marginTop: isIPhoneX ? 15 : 5,
        padding: 24,
        position: 'absolute',
        left: 0,
        zIndex: 2012,
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        paddingHorizontal: 8,
        marginTop: 100,
    },
    titlePreview: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
    titleInfo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor,
    },
    contentInfo: {
        fontSize: 14,
        fontWeight: '400',
        color: TxtColor,
        textAlign: 'right',
    },
    contentContainer: {
        marginHorizontal: 24,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor,
    },
    tourInfoContainer: {
        alignSelf: 'center',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 1,
        elevation: 5,
        shadowColor: 'rgba(0, 107, 153, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 14,
        width: widthPercentageToDP('87'),
        marginTop: 16,
    },
    tourInfo: {
        flexDirection: 'row',
        paddingTop: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 0,
    },
    table: {
        flex: 1,
        alignSelf: 'center',
        width: widthPercentageToDP('87'),
        backgroundColor: '#F6F5F6',
        borderRadius: 10,
        marginTop: 16,
    },
    tableTitleContainer: {
        height: 45,
        backgroundColor: Color,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    tableTitle: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    hr: {
        borderWidth: 0.5,
        borderColor: '#676667',
        borderRadius: 1,
    },
    textError: {
        color: '#F97C7C',
    },
    txtErrorCode: {
        color: '#F97C7C',
        fontSize: 12,
        marginTop: 5,
    },
});

export default ItemRender;
