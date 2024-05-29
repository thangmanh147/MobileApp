import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Animated,
    ScrollView,
} from 'react-native';
import {
  saveCustomerInfo,
} from './actions/acare';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import { Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, colorNote } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import ItemCustomerRender from './ItemCustomerRender';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconInsurancerSvg from '../../config/images/icons/IconInsurancerSvg';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';

class ListCustomer extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            listCustomer: props.customerInfo || [],
            isGetNewFee: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { customerInfo } = this.props;
        if (
            customerInfo?.length !== prevProps.customerInfo?.length
        ) {
            this.setState({ listCustomer: customerInfo });
        }
    }

    onRemove = (index) => {
        const {saveCustomerInfo} = this.props;
        const {listCustomer} = this.state;
        listCustomer.splice(index, 1);
        this.setState({listCustomer: listCustomer, isGetNewFee: true}, () => {
            saveCustomerInfo(listCustomer);
            if (listCustomer?.length === 0) {
                Actions.ACareItemCustomer({index: 0});
            }
        })
    }
    
    onAdd = () => {
        const {listCustomer} = this.state;
        Actions.ACareSurvey({index: listCustomer?.length});
    }
    
    render() {
        const {newFee} = this.props;
        const {listCustomer, isGetNewFee} = this.state;
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
    
        return (
            <View style={styles.container}>
                <Animated.View style={{zIndex: headerZIndex}}>
                    <ImageHeaderScroll code={'HC10'} offset={this.scrollYAnimatedValue} />
                </Animated.View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.ACareBuyer()}
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
                <View style={{zIndex: 2011}}>
                    <HeaderScroll code={'HC10'} offset={this.scrollYAnimatedValue} />
                </View>
                <ScrollView
                    style={{ zIndex: 1000 }}
                    contentContainerStyle={{
                        paddingTop: HEADER_MAX_HEIGHT,
                        paddingBottom: 24,
                    }}
                    ref={this.setScrollViewRef}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                        { useNativeDriver: false }
                    )}>
                    <View style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        marginTop: -20,
                    }}>
                        <View style={[styles.titleContainer, { marginHorizontal: 24, marginTop: 20 }]}>
                            <IconInsurancerSvg width={15} height={15} />
                            <Text style={styles.titlePreview}>
                                Danh sách người được bảo hiểm
                            </Text>
                        </View>
                        {
                            listCustomer && listCustomer.map((item, index) => (
                                <ItemCustomerRender
                                    item={item}
                                    index={index}
                                    onRemove={() => this.onRemove(index)}
                                />
                            ))
                        }
                        <TouchableOpacity
                            onPress={this.onAdd}
                            style={{ alignItems: 'center', marginTop: 16 }}>
                            <IconPlusSvg width={20} height={20} />
                            <Text style={{ color: TxtColor, marginTop: 4, fontSize: 14 }}>
                                Thêm người được bảo hiểm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <FooterButton>
                    <Button
                        color={NewColor}
                        label={'TIẾP TỤC'}
                        onPress={() => Actions.ACarePackage({getNewFee: (isGetNewFee || newFee) ? true : false})}
                    />
                </FooterButton>
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
const mapStateToProps = (state, ownProps) => {
    return {
        customerInfo: state.acare.customerInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveCustomerInfo: body => dispatch(saveCustomerInfo(body)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListCustomer);
