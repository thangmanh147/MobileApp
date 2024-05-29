import React, { useState, useEffect } from 'react';
import {
    Clipboard,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SimpleToast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import { saveCarImage } from '../CarInsurance/actions/car_Buy';
import { saveContractCarId } from './actions/carPhysical'
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import { dataSubmitCarPhysical, dataSubmitCarPhysicalImage, dataSubmitTNDS, dataSubmitTNDSVNI } from './helpers';
import { callApiContract, callApiGet } from '../../utils/Api'
import { Color, linkWeb, NewColor, NewColorDisable, URL, TxtColor } from '../../config/System';
import { saveLogContract } from '../../actions/logContract';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';

function SendLinkContract({
    idComSelected,
    codeSelected,
    buyerInfo,
    dataStep2,
    infoCar,
    buyerAddress,
    arrayCarImg,
    contractCarId,
    saveContractCarId,
    saveLogContract,
    setLoading,
    dataTokenInsur,
    disabledBtn = false,
    saveCarImage,
    onResetCarPhysical
}) {
    const [showModal,setShowModal] = useState(false);
    // const checkImg = () => {
    //     if (infoCar?.licensePlate?.length > 0) {
    //         return (
    //             arrayCarImg[0].cetificateCar ||
    //             arrayCarImg[0].regisCertificateCar ||
    //             arrayCarImg[0].extraSeat ||
    //             arrayCarImg[0].behindExtraSeat ||
    //             arrayCarImg[0].driverSeat ||
    //             arrayCarImg[0].behindDriverSeat ||
    //             arrayCarImg[0].registrationStamp ||
    //             arrayCarImg[0].frontCarImg ||
    //             arrayCarImg[0].backCarImg
    //         );
    //     } else {
    //         return (arrayCarImg[0]?.saleAvoidPaper);
    //     }
    // }

    // const sendLink = async () => {
    //     if (contractCarId) {
    //         let dataContract = await callApiGet({ url: `${URL}/api/contract/v1/contracts/${contractCarId?.id}` });
    //         if (dataContract?.paymentMethod) {
    //             createContract();
    //         } else {
    //             new Store().getSession(Const.TOKEN).then(async (token) => {
    //                 const dataToken = jwt_decode(token);
    //                 let url = `${URL}/api/contract/v1/car-contracts/physical/${contractCarId?.id}`;
    //                 let urlTNDS = `${URL}/api/contract/v1/car-contracts/liability/${contractCarId?.idLiability}`;
    //                 let bodyTNDS = dataSubmitTNDS({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, organizationId: dataToken?.organizationId || '', codeSelected });
    //                 let body = dataSubmitCarPhysical({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, amount: dataStep2?.dataPackage?.fee, codeSelected });
    //                 let data = await callApiContract({ body: body, url: url }, true, 'PUT')
    //                 let dataTNDS, urlImage, bodyImage, dataImage;
    //                 if (checkImg()) {
    //                     urlImage = `${URL}/api/contract/v1/car-contracts/${contractCarId?.id}/images`;
    //                     bodyImage = dataSubmitCarPhysicalImage({ ...infoCar, ...arrayCarImg[0] });
    //                     dataImage = await callApiContract({ body: bodyImage, url: urlImage }, true, 'PUT', 'image')
    //                 }
    //                 if (dataStep2?.checkTNDS) {
    //                     dataTNDS = await callApiContract({ body: bodyTNDS, url: urlTNDS });
    //                 }
    //                 if (
    //                     (!dataStep2?.checkTNDS && data.status == 'success' && checkImg() && dataImage?.status == 'success') ||
    //                     (dataStep2?.checkTNDS && (data.status == 'success' && checkImg() && dataImage?.status == 'success') && dataTNDS.status == 'success')
    //                     (!dataStep2?.checkTNDS && data.status == 'success') ||
    //                     (dataStep2?.checkTNDS && data.status == 'success' && dataTNDS.status == 'success')
    //                 ) {
    //                     setLoading(false);
    //                     const link = `${linkWeb}/bao-hiem-vat-chat-xe-oto?contractId=${contractCarId?.id}${dataStep2?.checkTNDS ? `&contractIdTNDS=${contractCarId?.idLiability}` : ''}`;
    //                     SimpleToast.show('Đã sao chép', 0.5);
    //                     Clipboard.setString(link);
    //                 } else {
    //                     setLoading(false);
    //                 }
    //             })
    //         }
    //     } else {
    //         createContract();
    //     }
    // }

    const createContract = (show) => {
        new Store().getSession(Const.TOKEN).then(async (token) => {
            const dataToken = jwt_decode(dataTokenInsur?.token || token);
            let url, urlTNDS, bodyTNDS;
            if (codeSelected === 'VNI') {
                url = `${URL}/api/contract/v1/car-contracts/create?type=physical`;
                urlTNDS = `${URL}/api/contract/v1/car-contracts/create?type=liability`;
                bodyTNDS = dataSubmitTNDSVNI({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, organizationId: dataToken?.organizationId || '', codeSelected, idComSelected });
            } else {
                url = `${URL}/api/contract/v1/car-contracts/physical`;
                urlTNDS = `${URL}/api/contract/v1/car-contracts/liability`;
                bodyTNDS = dataSubmitTNDS({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, organizationId: dataToken?.organizationId || '', codeSelected, idComSelected });
            }
            let body = dataSubmitCarPhysical({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, ...arrayCarImg[0], amount: dataStep2?.dataPackage?.fee, codeSelected, idComSelected, imageConfirm: show });
            console.log('Urll -:', url)
            console.log('Bodyyy -:', body)
            let data = await callApiContract({ body: body, url: url }, true, null, null, dataTokenInsur?.token)
            let dataTNDS;
            if (dataStep2?.checkTNDS) {
                dataTNDS = await callApiContract({ body: bodyTNDS, url: urlTNDS }, null, null, null, dataTokenInsur?.token);
            }
            if ((!dataStep2?.checkTNDS && data.status == 'success') || (dataStep2?.checkTNDS && data.status == 'success' && dataTNDS.status == 'success')) {
                setLoading(false);
                if (show) {
                    setShowModal(true);
                } else {
                    const link = `${linkWeb}/bao-hiem-vat-chat-xe-oto?contractId=${data.data.contractId?.toString()}${dataStep2?.checkTNDS ? `&contractIdTNDS=${dataTNDS.data.id?.toString()}` : ''}`;
                    SimpleToast.show('Đã sao chép', 0.5);
                    Clipboard.setString(link);
                }
                // saveContractCarId({id: data.data.contractId?.toString(), idLiability: dataStep2?.checkTNDS ? dataTNDS.data.id : ''});
                saveLogContract('C2', null);
            } else {
                setLoading(false);
            }
        })
    }
    return (
        <>
            {/* <FooterButton>
                <Button
                    label={'GỬI LINK CHỤP ẢNH'}
                    onPress={() => {
                        setLoading(true);
                        createContract();
                    }}
                />
            </FooterButton> */}
            <FooterButton>
                <Button
                    disabled={disabledBtn}
                    label={'GỬI DUYỆT'}
                    marginTop={10}
                    marginBottom={16}
                    onPress={() => {
                        setLoading(true);
                        createContract(true);
                    }}
                />
            </FooterButton>
            <TouchableOpacity
                disabled={!disabledBtn}
                style={{ marginTop: 8, alignItems: 'center' }}
                onPress={() => {
                    setLoading(true);
                    createContract();
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
                            saveCarImage({ name: 'IMG_RESET' });
                            onResetCarPhysical();
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
    const listCompany = state.selectCompany.listCompany['C2'];
    const idComSelected = state.selectCompany.idComSelected['C2'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return ({
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        buyerInfo: state?.carPhysical?.buyerPhysical?.infoBuyer,
        buyerAddress: state?.carPhysical?.buyerPhysical,
        infoCar: state?.carPhysical?.infoCarPhysical,
        dataStep2: state?.carPhysical?.dataPackage,
        arrayCarImg: state.carBuy.arrayCarImg,
        contractCarId: state?.carPhysical?.contractCarId,
        dataTokenInsur: state.insurance.tokenInsur['C2'],
    })
};

const mapDispatchToProps = dispatch => {
    return {
        saveContractCarId: (data) => dispatch(saveContractCarId(data)),
        saveLogContract: (id, data) => dispatch(saveLogContract(id, data)),
        saveCarImage: body => dispatch(saveCarImage(body)),
        onResetCarPhysical: () => dispatch({ type: 'RESET_DATA_CAR_PHYSICAL' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendLinkContract);

