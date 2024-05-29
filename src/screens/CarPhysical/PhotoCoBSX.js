import React, { useState, useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
    ScrollView,
    Platform,
    PermissionsAndroid,
    Linking,
    Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { nameApp, colorTitle, TxtColor, Color } from '../../config/System';
import { connect } from 'react-redux';
import { isIPhoneX } from '../../utils/Util';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import SendLinkContract from './SendLinkContract';
import { saveLogContract } from '../../actions/logContract';
import IconCarCircleSvg from '../../config/images/tab_carPhysical/IconCarCircleSvg';
import IconCerPaperSvg from '../../config/images/tab_carPhysical/IconCerPaperSvg';
import IconRegisPaperSvg from '../../config/images/tab_carPhysical/IconRegisPaperSvg';
import IconArrowRightSvg from '../../config/images/icons/IconArrowRightSvg';

const keyMap = 'AIzaSyBs0-2m17teRiKtqfqGIsBXSlYVySjTufU';

function PhotoCarY({ 
    saveLogContract, 
    contractLog, 
    arrayCarImg,
    contractCarId,
}) {
    const [showModal,setShowModal] = useState(false);
    const [titleSelected,setTitleSelected] = useState('');
    const [address,setAddress] = useState('');
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0);
    const [timer, setTimer] = useState('');
    const [list, setList] = useState([
        {
            action: 'FORM_IMAGE_CAR',
            name: "Chụp ảnh xe của bạn"
        },
        {
            action: 'FORM_CERTIFICATE_CAR',
            name: "Chụp ảnh giấy đăng kiểm"
        },
        {
            action: 'FORM_REGISTRATION_CERTIFICATE_CAR',
            name: "Chụp ảnh đăng ký xe"
        },
    ])
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getLocation();
    }, []);

    const hasPermissionIOS = async () => {
        const openSetting = () => {
          Linking.openSettings().catch(() => {
            Alert.alert('Không thể mở cài đặt');
          });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');
    
        if (status === 'granted') {
          return true;
        }
    
        if (status === 'denied') {
          Alert.alert('Quyền vị trí bị từ chối.');
        }
    
        if (status === 'disabled') {
          Alert.alert(
            `Bật dịch vụ vị trí để cho phép ứng dụng xác định vị trí của bạn.`,
            '',
            [
              { text: 'Đi tới Cài đặt', onPress: openSetting },
              { text: "Không sử dụng vị trí", onPress: () => { } },
            ],
          );
        }
    
        return false;
      };
    
    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          const hasPermission = await hasPermissionIOS();
          return hasPermission;
        }
        return true;
      };
    
    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();
    
        if (!hasPermission) {
          setTimer(moment().format('HH:mm DD/MM/YYYY'));
          return;
        }
    
        Geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            axios.get(`https://gw.capdon.vn/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${keyMap}`)
              .then((res) => {
                if (res?.data?.results?.length > 0) {
                  const address = res?.data?.results[0]?.formatted_address;
                  setLatitude(latitude);
                  setLongitude(longitude);
                  setTimer(moment().format('HH:mm DD/MM/YYYY'));
                  setAddress(address);
                } else {
                    setLatitude(latitude);
                    setLongitude(longitude);
                    setTimer(moment().format('HH:mm DD/MM/YYYY'));
                }
              })
              .catch(error => {
                console.log(error)
                setLatitude(latitude);
                setLongitude(longitude);
                setTimer(moment().format('HH:mm DD/MM/YYYY'));
              })
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            setTimer(moment().format('HH:mm DD/MM/YYYY'));
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };
    
    const disabledButton = () => {
        if (arrayCarImg) {
            if (arrayCarImg[0].cetificateCar &&
                arrayCarImg[0].regisCertificateCar &&
                arrayCarImg[0].extraSeat &&
                arrayCarImg[0].behindExtraSeat &&
                arrayCarImg[0].driverSeat &&
                arrayCarImg[0].behindDriverSeat &&
                arrayCarImg[0].registrationStamp &&
                arrayCarImg[0].frontCarImg &&
                arrayCarImg[0].backCarImg
            ) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    const renderStatus = (action, index) => {
        switch (action) {
            case 'FORM_IMAGE_CAR':
                if (arrayCarImg[0]?.extraSeat &&
                    arrayCarImg[0]?.behindExtraSeat &&
                    arrayCarImg[0]?.driverSeat &&
                    arrayCarImg[0]?.behindDriverSeat &&
                    arrayCarImg[0]?.registrationStamp &&
                    arrayCarImg[0]?.frontCarImg &&
                    arrayCarImg[0]?.backCarImg) {
                    return 'Đã chụp ảnh'
                } else {
                    return 'Chưa chụp ảnh'
                }
            case 'FORM_CERTIFICATE_CAR':
                if (arrayCarImg[0]?.cetificateCar) {
                    return 'Đã chụp ảnh'
                } else {
                    return 'Chưa chụp ảnh'
                }
            case 'FORM_REGISTRATION_CERTIFICATE_CAR':
                if (arrayCarImg[0]?.regisCertificateCar) {
                    return 'Đã chụp ảnh'
                } else {
                    return 'Chưa chụp ảnh'
                }
            default:
                return;
        }
    }

    const renderColor = (action, index) => {
        switch (action) {
            case 'FORM_IMAGE_CAR':
                if (arrayCarImg[0]?.extraSeat &&
                    arrayCarImg[0]?.behindExtraSeat &&
                    arrayCarImg[0]?.driverSeat &&
                    arrayCarImg[0]?.behindDriverSeat &&
                    arrayCarImg[0]?.registrationStamp &&
                    arrayCarImg[0]?.frontCarImg &&
                    arrayCarImg[0]?.backCarImg) {
                    return '#00A651'
                } else {
                    return '#ED1C24'
                }
            case 'FORM_CERTIFICATE_CAR':
                if (arrayCarImg[0]?.cetificateCar) {
                    return '#00A651'
                } else {
                    return '#ED1C24'
                }
            case 'FORM_REGISTRATION_CERTIFICATE_CAR':
                if (arrayCarImg[0]?.regisCertificateCar) {
                    return '#00A651'
                } else {
                    return '#ED1C24'
                }
            default:
                return;
        }
    }

    const renderIcon = (item) => {
        switch (item?.action) {
            case 'FORM_IMAGE_CAR':
                if (arrayCarImg[0]?.extraSeat &&
                    arrayCarImg[0]?.behindExtraSeat &&
                    arrayCarImg[0]?.driverSeat &&
                    arrayCarImg[0]?.behindDriverSeat &&
                    arrayCarImg[0]?.registrationStamp &&
                    arrayCarImg[0]?.frontCarImg &&
                    arrayCarImg[0]?.backCarImg) {
                    return (
                        <Image 
                            source={{ uri: arrayCarImg[0]?.extraSeat }} 
                            style={{
                                resizeMode: 'cover',
                                height: '100%',
                                width: '100%',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                        }} />
                    );
                } else {
                    return <IconCarCircleSvg width={50} height={50} />
                }
            case 'FORM_CERTIFICATE_CAR':
                if (arrayCarImg[0]?.cetificateCar) {
                    return (
                        <Image 
                            source={{ uri: arrayCarImg[0]?.cetificateCar }} 
                            style={{
                                resizeMode: 'cover',
                                height: '100%',
                                width: '100%',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                        }} />
                    );
                } else {
                    return <IconCerPaperSvg width={50} height={50} />
                }
            case 'FORM_REGISTRATION_CERTIFICATE_CAR':
                if (arrayCarImg[0]?.regisCertificateCar) {
                    return (
                        <Image 
                            source={{ uri: arrayCarImg[0]?.regisCertificateCar }} 
                            style={{
                                resizeMode: 'cover',
                                height: '100%',
                                width: '100%',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                        }} />
                    );
                } else {
                    return <IconRegisPaperSvg width={50} height={50} />
                }
            default:
                return;
        }
    }

    const requireLocation = (item) => {
      if (Platform.OS === 'android') {
        requestLocationPermission(item.action).then(() => {});
      } else {
        onSelect(item.action);
      }
    };
  
    const requestLocationPermission = async (action) => {
      try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            onSelect(action);
          } else {
            onSelect(action);
          }
      } catch (err) {
          // console.log('err', err);
      }
    };
  
    const onSelect = (action) => {
        if (nameApp.includes('YCHI')) {
            setTitleSelected(action);
            setShowModal(true);
        } else {
            onOpenCamera(action);
        }
      }
    
    const onCamera = () => {
        setShowModal(false);
        onOpenCamera(titleSelected);
      };
    
    const onLibrary = () => {
        selectPicture();
      };

    const renderCase = title => {
        switch (title) {
          case 'FORM_CERTIFICATE_CAR':
            return 9;
          case 'FORM_REGISTRATION_CERTIFICATE_CAR':
            return 10;
          default:
            return;
        }
      };
    
    const selectPicture = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            cropperCircleOverlay: false,
            sortOrder: 'none',
            compressImageMaxWidth: 720,
            compressImageMaxHeight: 720,
            compressImageQuality: Platform.OS === 'ios' ? 0.2 : 0.4,
            includeExif: true,
        })
            .then(image => {
              setShowModal(false);
              Actions.ConfirmImage({
                nameHeader: 'IMAGE_' + renderCase(titleSelected),
                uri: image.path,
                infoImg: {
                  location: { latitude: latitude, longitude: longitude, address: address },
                  timePhoto: timer,
                }
              });
            })
            .catch();
      };
        
    const onOpenCamera = (title) => {
        Actions.execute('replace', 'TakePhotoPhysical', { action: title })
      };
    
    return (
        <View style={styles.container}>
            <View style={{ zIndex: 100 }}>
                <Nav show={true} isInfo={false} title={'CHỤP ẢNH GIẤY TỜ'}
                    onPress={() => Actions.BuyerCarPhysical()}
                />
            </View>
            <ScrollView style={{ marginTop: -25, flex: 1, zIndex: 100 }}>
                {list.map((item, index) => {
                    return (
                        <TouchableOpacity style={{
                            backgroundColor: '#fff',
                            marginHorizontal: 24,
                            flexDirection: 'row',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                            borderRadius: 10,
                            marginBottom: 16,
                            height: 100
                        }}
                            onPress={() => item.action == "FORM_IMAGE_CAR" ? Actions.CarPhotoPhysical() : requireLocation(item)}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {renderIcon(item)}
                            </View>
                            <View style={{ flex: 2.2, justifyContent: 'center', marginLeft: 16 }}>
                                <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{item.name}</Text>
                                <Text style={{ marginTop: 4, fontSize: 14, color: arrayCarImg && renderColor(item.action) }}>{arrayCarImg && renderStatus(item.action)}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 16 }}>
                                <IconArrowRightSvg width={15} height={15} color={Color} />
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <Modal
                isVisible={showModal}
                style={{ margin: 0, justifyContent: 'flex-end' }}
                onBackButtonPress={() => setShowModal(false)}
                onBackdropPress={() => setShowModal(false)}
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
                    }}>
                        <TouchableOpacity onPress={() => onCamera()}>
                        <Text style={{ fontSize: 15, color: TxtColor }}>
                            Chụp ảnh
                        </Text>
                        </TouchableOpacity>
                        <View style={{marginVertical: 16, height: 1, backgroundColor: '#D9D9D9'}} />
                        <TouchableOpacity onPress={() => onLibrary()}>
                        <Text style={{ fontSize: 15, color: TxtColor }}>
                            Chọn ảnh từ thư viện
                        </Text>
                        </TouchableOpacity>
                </View>
            </Modal>
            <View style={{ marginVertical: 32 }}>
                {/* <FooterButton>
                    <Button
                        disabled={disabledButton()}
                        label={'TIẾP TỤC'}
                        marginTop={10}
                        marginBottom={16}
                        onPress={() => {
                            if (!contractCarId) {
                                contractLog.key = 'PreviewCarPhysical';
                                saveLogContract('C2', contractLog);
                            }
                            Actions.PreviewCarPhysical();
                        }}
                    />
                </FooterButton> */}
                {
                    nameApp.includes('IAGENT') ? (
                        <SendLinkContract setLoading={(value) => setLoading(value)} disabledBtn={disabledButton()} />  
                    ) : (
                        <FooterButton>
                            <Button
                                disabled={disabledButton()}
                                label={'TIẾP TỤC'}
                                marginTop={10}
                                marginBottom={16}
                                onPress={() => {
                                    if (!contractCarId) {
                                        contractLog.key = 'PreviewCarPhysical';
                                        saveLogContract('C2', contractLog);
                                    }
                                    Actions.PreviewCarPhysical();
                                }}
                            />
                        </FooterButton>
                    )
                }
            </View>
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
                        zIndex: 2200,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        marginTop: isIPhoneX ? 15 : 5,
        padding: 24,
        position: 'absolute',
        left: 0,
        zIndex: 2012,
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: 38,
        marginLeft: 30,
        marginBottom: 40,
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
    viewTable: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1, backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        color: colorTitle,
        fontWeight: 'bold',
    },
    boxStyle: {
        paddingVertical: 10
    }
});


const mapStateToProps = (state) => ({
    arrayCarImg: state.carBuy.arrayCarImg,
    contractLog: state.logContract.logContract['C2'] || {},
    contractCarId: state?.carPhysical?.contractCarId,
});

export default connect(mapStateToProps, {saveLogContract})(PhotoCarY);

