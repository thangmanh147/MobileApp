import React, { useState } from 'react';
import {
    Clipboard,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SimpleToast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import {
  savePreviewCarImage,
} from '../../../CarPhysical/actions/car_Buy';
import FooterButton from '../../../../components/FooterButton';
import Button from '../../../../components/Button';
import { connect } from 'react-redux';
import { callApiUpdateImgContract } from '../../../../utils/Api'
import { Color, linkWeb, NewColor, NewColorDisable, URL, TxtColor } from '../../../../config/System';
import NotifyRingSvg from '../../../../config/images/login/NotifyRingSvg';

function SendLinkContract({
    setLoading,
    disabledBtn = false,
    savePreviewCarImage,
    contractId,
    dataPreviewCarImg
}) {
    const [showModal,setShowModal] = useState(false);

    const updateImgContract = async () => {
        const urlImage = `${URL}/api/contract/v1/car-contracts/${contractId}/images`;
        const dataImage = await callApiUpdateImgContract({ body: dataPreviewCarImg, url: urlImage });
        if (dataImage?.status == 'success') {
            setShowModal(true);
        } else {
            setLoading(false);
        }
    }

    return (
        <>
            <FooterButton>
                <Button
                    disabled={disabledBtn}
                    label={'GỬI DUYỆT'}
                    marginTop={10}
                    marginBottom={16}
                    onPress={() => {
                        setLoading(true);
                        updateImgContract();
                    }}
                />
            </FooterButton>
            <TouchableOpacity
                disabled={!disabledBtn}
                style={{ marginTop: 8, alignItems: 'center' }}
                onPress={() => {
                    const link = `${linkWeb}/bao-hiem-vat-chat-xe-oto?contractId=${contractId}`;
                    SimpleToast.show('Đã sao chép', 0.5);
                    Clipboard.setString(link);
                }}
            >
                <Text style={{ textDecorationLine: 'underline', color: disabledBtn ? NewColor : NewColorDisable }}>
                    GỬI LINK CHỤP ẢNH
                </Text>
            </TouchableOpacity>
            <Modal
                isVisible={showModal}
                style={{ margin: 0, justifyContent: 'flex-end' }}
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
                    <Text style={{ marginTop: 24, marginBottom: 32, fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        Chúng tôi đã nhận được yêu cầu.{'\n'}Vui lòng chờ trong 5 phút
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModal(false);
                            savePreviewCarImage({ name: 'IMG_RESET' });
                            Actions.tab();
                        }}
                        style={{
                            width: '100%',
                            paddingVertical: 16,
                            backgroundColor: Color,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                            VỀ TRANG CHỦ
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return ({
        dataPreviewCarImg: state.carBuy.dataPreviewCarImg,
    })
};

const mapDispatchToProps = dispatch => {
    return {
        savePreviewCarImage: body => dispatch(savePreviewCarImage(body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendLinkContract);

