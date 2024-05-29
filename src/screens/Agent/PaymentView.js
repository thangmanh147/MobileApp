import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import WebView from 'react-native-webview';

import { screen, domain, linkWeb, TxtColor, Color } from '../../config/System';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { isIPhoneX } from '../../utils/Util';
import Nav from '../../components/Nav';
import Modal from 'react-native-modal';
import TwoButton from '../../components/TwoButton';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import Config from 'react-native-config';

const PaymentView = ({
    insurProductCode,
    url,
    priceInsur,
    priceInsurFull,
}) => {
    const [isCancel, setCancel] = useState(false);

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Nav isInfo={false} titleLeft={Config.APP_NAME}
                onPress={() => setCancel(true)}
            />
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={(event) => {
                    console.log('---------event', event)
                    // new Store().getSession(Const.URL_ORC).then(urlORC => {
                    //     let _domain = domain;
                    //     if (urlORC === 'https://gw.epti.vn') {
                    //         _domain = 'epti.vn';
                    //     } else if (urlORC === 'https://gwuat.capdon.vn') {
                    //         _domain = 'beta.epti.vn';
                    //     } else if (urlORC === 'https://gwdev.inso.vn') {
                    //         _domain = 'eptidev.inso.vn';
                    //     }
                        if (
                            !event.url.includes('ReturnUrl') &&
                            (event.url.includes(`https://${domain}`) || event.url.includes(linkWeb) || event.url.includes('https://dev.epti.vn'))
                        ) {
                            const stringUrl = event.url.split('vnp_ResponseCode=');
                            if (stringUrl && stringUrl[1].substr(0, 2) === '00') {
                                Actions.execute('replace', 'Pay', {insurProductCode: insurProductCode, priceInsur, priceInsurFull, paySuccess: 'Y'});
                            } else {
                                Actions.pop();
                            }
                        }
                    // })
                }}
            />
            <Modal
                isVisible={isCancel}
                style={{margin: 0, justifyContent: 'flex-end'}}
                onBackButtonPress={() => setCancel(false)}
                onBackdropPress={() => setCancel(false)}
                animationInTiming={200}
                animationOutTiming={200}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
            >
                <View style={{ padding: 24, backgroundColor: '#fff', borderTopLeftRadius:20,borderTopRightRadius:20}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <NotifyRingSvg width={53} height={60} />
                        <Text style={{color: TxtColor,fontSize:16,fontWeight:'bold',textAlign:'center', marginTop: 24}}>Bạn muốn hủy thanh toán giao dịch này?</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row', marginTop: 32}}>
                        <TwoButton
                            label={'KHÔNG'}
                            labelConfirm={'CÓ'}
                            backgroundColor={Color}
                            onPressConfirm={() => {
                                setCancel(false);
                                Actions.pop();
                            }}
                            onPress={() => setCancel(false)}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default PaymentView;
