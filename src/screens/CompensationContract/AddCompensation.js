import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TxtColor, Color, NewColor, URL } from '../../config/System';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import Input from '../CarInsurance/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import ModalBenefit from './ModalBenefit';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import {
    ERROR_NAME_FORMAT,
    ERROR_NAME_REQUIRED,
    ERROR_PHONE_FORMAT,
    ERROR_PHONE_REQUIRED,
} from '../../config/ErrorMessage';
import {
    validateName,
} from '../../config/Validation';
import {
    isPhoneAccident,
} from '../../components/Functions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import SimpleToast from 'react-native-simple-toast';
import IconDownPdfSvg from '../../config/images/icons/IconDownPdfSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';
import IconTakePhotoSvg from '../../config/images/icons/IconTakePhotoSvg';

class AddCompensation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalBenefit: null,
            showModal: false,
            listImage: [
                {
                    "type": "ANH-1",
                    "title": "Ảnh 1",
                    "url": ""
                },
            ]
        };
    }

    validation = Yup.object().shape({
        benefitType: Yup.string().required('Không được bỏ trống'),
        fullName: Yup.string()
            .strict(false)
            .trim()
            .test(
                'fullName',
                ERROR_NAME_FORMAT,
                values => !validateName.test(values),
            )
            .required(ERROR_NAME_REQUIRED),
        phone: Yup.string()
            .strict(false)
            .required(ERROR_PHONE_REQUIRED)
            .test('phone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)),
    });

    setModalBenefit = (value) => {
        this.setState({ modalBenefit: value });
    };

    setBenefitInsur = (data, props) => {
        props.setFieldValue('benefitType', data.name);
    };

    addListImg = () => {
        const { listImage } = this.state;
        let arrayImg = listImage;
        arrayImg.push({
            url: '',
        });
        this.setState({
            listImage: arrayImg,
        });
    };

    onHideOptionTypes = () => {
        this.setState({ showModal: false });
    };

    handleNext = (props) => {
        const { itemContract } = this.props;
        const { listImage } = this.state;
        console.log('00000 : ', itemContract)
        console.log('11111 : ', listImage)
        let url = `${URL}/api/ticket/v1/quick-claims`;
        let body = {
            "contractCode": itemContract?.code || '',
            "fullName": props.values.fullName || '',
            "phone": props.values.phone || '',
            "email": "",
            "images": listImage,
            "reason": props.values.benefitType || '',
            "note": props.values.note || ''
        };
        console.log('url : ', url)
        console.log('body : ', body)
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            })
                .then((res) => {
                    console.log('RESSSSS : ', res)
                    if (res.status === 200) {
                        return res.json().then(data => {
                            console.log('YCBT - SUCCESS : ', data)
                            this.setState({ showModal: true });
                        });
                    } else {
                        return res.json().then(data => {
                            SimpleToast.show(data.message);
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    };

    onDetailScreen = (props) => {
        const { listImage } = this.state;
        this.setState({ showModal: false }, () => {
            Actions.execute('replace', 'DetailCompensation', {
                benefitType: props.values.benefitType,
                fullName: props.values.fullName,
                phone: props.values.phone,
                note: props.values.note,
                listImage: listImage,
            });
        });
    };

    checkImages = () => {
        const { listImage } = this.state;
        const imgNone = listImage.find((item) => item.url?.length === 0);
        if (imgNone) return false;
        return true;
    };

    takePhoto = (index) => {
        ImagePicker.openCamera({
            cropping: false,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType: 'photo',
        })
            .then(image => {
                // const file = {
                //     group_name: 'DCIM',
                //     image: {
                //         height: image.height,
                //         uri: image.path,
                //         width: image.width,
                //     },
                //     type: image.mime,
                // };
                this.uploadImage(image.path, image.mime, index);
            })
            .catch();
    };

    selectPicture = (index) => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: false,
            cropperCircleOverlay: false,
            sortOrder: 'none',
            compressImageMaxWidth: 720,
            compressImageMaxHeight: 720,
            compressImageQuality: Platform.OS === 'ios' ? 0.2 : 0.4,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        })
            .then(image => {
                // const file = {
                //     group_name: 'DCIM',
                //     image: {
                //         height: image.height,
                //         uri: image.path,
                //         width: image.width,
                //     },
                //     type: image.mime,
                // };
                this.uploadImage(image.path, image.mime, index);
            })
            .catch();
    };

    uploadImage = (uri, type, index) => {
        let url = `${URL}/api/storage/v1/uploads`;
        let form_Data = new FormData();
        form_Data.append('file', {
            uri: uri,
            type: type,
            name: (index + 1).toString(),
        });
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: form_Data,
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json().then(data => {
                        console.log('IMAGE - SUCCESS : ', data)
                        const { listImage } = this.state;
                        listImage[index].url = data.data;
                        listImage[index].title = `Ảnh ${index + 1}`;
                        listImage[index].type = type;
                        this.setState({ listImage: listImage });
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        const { modalBenefit, listImage, showModal } = this.state;
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        return (
            <View style={styles.container}>
                <View>
                    <Nav isInfo={false} title={'YÊU CẦU BỒI THƯỜNG'}
                        onPress={() => Actions.pop()} />
                </View>
                <Formik
                    initialValues={{
                    }}
                    enableReinitialize={true}
                    validationSchema={this.validation}
                    isInitialValid={false}>
                    {props => {
                        return (
                            <View style={{ flex: 1, paddingHorizontal: 24 }}>
                                <ScrollView
                                    style={{ marginTop: 16 }}
                                >
                                    <ModalBenefit
                                        open={modalBenefit}
                                        onClosed={() => this.setModalBenefit(null)}
                                        setSex={(data) => this.setBenefitInsur(data, props)}
                                        onOpened={() => this.setModalBenefit(true)}
                                        nameBenefit={props.values.benefitType}
                                    />
                                    <FormikSelect
                                        label={'Quyền lợi bảo hiểm yêu cầu bồi thường *'}
                                        name={'benefitType'}
                                        openModal={() => this.setModalBenefit(true)}
                                    />
                                    <FormikInput
                                        label={'Họ và tên người yêu cầu/Người bảo hộ *'}
                                        name={'fullName'}
                                        reqUpperCase
                                        autoUpperCase
                                    />
                                    <FormikInput
                                        label={'Số điện thoại liên hệ *'}
                                        name={'phone'}
                                        keyboardType={'number-pad'}
                                        maxLength={12}
                                    />
                                    <FormikInput
                                        label={'Ghi chú'}
                                        name={'note'}
                                    />
                                    <TouchableOpacity
                                        style={styles.butPdf}>
                                        <IconDownPdfSvg width={25} height={25} />
                                        <Text style={styles.txtPdf}>
                                            Tải bộ mẫu đơn yêu cầu bồi thường
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{
                                        marginTop: 20,
                                        marginBottom: 10,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                    }}>
                                        {
                                            listImage.map((item, index) => (
                                                <TouchableOpacity
                                                    onPress={() => this.takePhoto(index)}
                                                    style={{
                                                        marginRight: 15,
                                                        marginBottom: 15,
                                                        alignItems: 'center'
                                                    }}>
                                                    {
                                                        item.url?.length > 0 ? (
                                                            <FastImage
                                                                source={{ uri: item.url }}
                                                                style={{ height: 68, width: 95, borderRadius: 10 }}
                                                            />
                                                        ) : (
                                                            <IconTakePhotoSvg width={95} height={68} style={{opacity: 0.5}} />
                                                        )
                                                    }
                                                    <Text style={{ fontSize: 14, color: TxtColor, marginTop: 10 }}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                        <TouchableOpacity
                                            onPress={this.addListImg}
                                            style={{
                                                marginLeft: 15,
                                                alignItems: 'center',
                                                height: 70,
                                                justifyContent: 'center'
                                            }}>
                                            <IconPlusSvg width={18} height={18} />
                                            <Text style={{ fontSize: 14, color: Color, marginTop: 4 }}>
                                                Thêm ảnh
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                <Modal
                                    isVisible={showModal}
                                    style={{ margin: 0, justifyContent: 'flex-end' }}
                                    onBackButtonPress={this.onHideOptionTypes}
                                    onBackdropPress={this.onHideOptionTypes}
                                    animationInTiming={200}
                                    animationOutTiming={200}
                                    backdropTransitionInTiming={0}
                                    backdropTransitionOutTiming={0}
                                >
                                    <View
                                        style={{
                                            backgroundColor: '#fff',
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20
                                        }}>
                                        <View style={{ padding: 24, alignItems: 'center' }}>
                                            <IconPlusSvg width={60} height={60} />
                                            <Text style={{
                                                fontSize: 14,
                                                color: TxtColor,
                                                marginTop: 16,
                                                textAlign: 'center',
                                                lineHeight: 18.2,
                                            }}>
                                                Bạn đã gửi yêu cầu bồi thường thành công. 15 ngày làm việc sau khi nhận đầy đủ chứng từ hợp lệ về tổn thất hoặc không quá 30 ngày làm việc trong trường hợp PTI phải xác minh hồ sơ.{'\n'}
                                                Mọi thắc mắc vui lòng liên hệ Hotline
                                                <Text style={{ color: Color, fontWeight: 'bold' }}> 1900 5454 75</Text>
                                            </Text>
                                        </View>
                                        <View style={styles.containerSubmit}>
                                            <TouchableOpacity style={styles.butSubmit} onPress={() => this.onDetailScreen(props)}>
                                                <Text style={styles.titleSubmit}>CHI TIẾT YÊU CẦU BỒI THƯỜNG</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                                <FooterButton>
                                    <Button
                                        label={'GỬI YÊU CẦU'}
                                        width={'100%'}
                                        onPress={() => this.handleNext(props)}
                                        disabled={!props.isValid || !this.checkImages()}
                                    />
                                </FooterButton>
                            </View>
                        );
                    }}
                </Formik>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    butPdf: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center'
    },
    txtPdf: {
        textDecorationLine: 'underline',
        fontSize: 14,
        color: TxtColor,
        marginLeft: 12,
    },
    containerSubmit: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    butSubmit: {
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
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCompensation);
