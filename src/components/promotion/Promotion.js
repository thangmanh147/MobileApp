import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../screens/Motorbike/components/Input';
import InputSelect from '../buy/InputSelect';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Color, colorText, colorTitle, textDisable } from '../../config/System';
import ModalPromotion from './ModalSelect/ModalPromotion';
import { getPromotionInfo, setPromotionPrice, setPromotionPriceSuccess } from './actions/promotion';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import IconPromotionSvg from '../../config/images/icons/IconPromotionSvg';

class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationCode: '',
            modalPromotion: false,
            code: props.promotionPrice?.code || '',
            promotionName: props.promotionPrice?.name || '',
        };
    }

    componentDidMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            this.setState({ organizationCode: dataToken?.organizationCode });
        })
        const { promotionInfo, getPromotionInfo, totalPrice, insurProductCode } = this.props;
        if (!promotionInfo || promotionInfo.length === 0) {
            getPromotionInfo(totalPrice, insurProductCode);
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { setPromotionPrice, totalPrice, insurProductCode } = this.props;
        const { code, promotionName } = this.state;
        if ((code !== prevState.code) ||
            (totalPrice && totalPrice !== prevProps.totalPrice)
        ) {
            if (totalPrice === 66000 && insurProductCode === 'M1') {
                setPromotionPrice(totalPrice, '', promotionName, insurProductCode);
            } else {
                setPromotionPrice(totalPrice, code, promotionName, insurProductCode);
            }
        }
    }

    onSet = (data) => {
        const { setPromotionPriceDefault, insurProductCode } = this.props;
        if (data.promotionName === 'Điền mã khuyến mãi') {
            this.setState({ promotionName: data.promotionName, code: '' });
            setPromotionPriceDefault(insurProductCode, { price: null, name: 'Điền mã khuyến mãi', code: '' });
        } else this.setState({ promotionName: data.promotionName, code: data.promotionCode });
    };

    onOpen = () => {
        const { totalPrice, getPromotionInfo, insurProductCode } = this.props;
        getPromotionInfo(totalPrice, insurProductCode);
        this.setState({ modalPromotion: true });
    };

    onChangeText = (text) => {
        this.setState({ code: text });
    };

    render() {
        const { promotionInfo, totalPrice, promotionPrice, insurProductCode } = this.props;
        console.log('Bbbbb --- : ', promotionPrice);
        const { value, modalPromotion, promotionName, code, organizationCode } = this.state;
        // if (organizationCode === 'SVFC') return null;
        return (
            <View style={{ marginTop: 24 }}>
                <ModalPromotion
                    open={modalPromotion}
                    promotionInfo={promotionInfo}
                    onClosed={() => this.setState({ modalPromotion: null })}
                    setPromotion={this.onSet}
                    onOpened={() => this.setState({ modalPromotion: true })}
                    nameSelected={promotionName}
                />
                <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                    <IconPromotionSvg width={15} height={15} />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colorTitle,
                        marginLeft: 8,
                    }}>
                        Chọn chương trình khuyến mãi
                    </Text>
                </View>
                <View style={{ marginTop: 6 }}>
                    <InputSelect
                        value={promotionName}
                        label={'Chọn chương trình khuyến mãi'}
                        openModal={this.onOpen}
                    />
                </View>
                {
                    promotionName === 'Điền mã khuyến mãi' ? (
                        <Input
                            value={code}
                            label={'Mã khuyến mãi'}
                            autoCapitalize={'characters'}
                            onChangeText={this.onChangeText}
                            baseColor={promotionName === 'Điền mã khuyến mãi' ? colorText : textDisable}
                            editable={promotionName === 'Điền mã khuyến mãi'}
                            error={
                                code.length > 0 && !promotionPrice?.price ?
                                    (totalPrice === 66000 && insurProductCode === 'M1' ? 'Áp dụng cho thời hạn bảo hiểm từ 02 năm trở lên' : 'Mã khuyến mãi không hợp lệ')
                                    : ''
                            }
                        />
                    ) : null
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        promotionInfo: state.promotion.promotionInfo,
        promotionPrice: state.promotion.promotionPrice[ownProps.insurProductCode],
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getPromotionInfo: (value, code) => dispatch(getPromotionInfo(value, code)),
        setPromotionPrice: (totalPrice, code, promotionName, insureId) => dispatch(setPromotionPrice(totalPrice, code, promotionName, insureId)),
        setPromotionPriceDefault: (id, obj) => dispatch(setPromotionPriceSuccess(id, obj)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Promotion);
