import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import WebView from 'react-native-webview';
import Nav from '../../../components/Nav';
import Config from 'react-native-config';

const PaymentView = ({
    url,
}) => {
    return (
        <View style={{ backgroundColor: '#7b35bb', flex: 1 }}>
            {/* <Nav isInfo={false} titleLeft={Config.APP_NAME}
                onPress={() => Actions.pop()}
            /> */}
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={(event) => {
                    console.log('---------event TPBank: ', event)
                    if (
                        event.url.includes('https://tpb.vn')
                    ) {
                        Actions.execute('replace', 'TPBankFace', { confirmSuccess: 'Y' });
                    }
                }}
            />
        </View>
    );
}

export default PaymentView;
