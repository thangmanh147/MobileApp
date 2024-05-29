/**
 * @format
 */
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import codePush from 'react-native-code-push';
import  Spinner from 'react-native-spinkit';

import MainApp from './src/Main';
import { Color, TxtColor } from './src/config/System';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      number: 0
    };
  }
  componentDidMount() {
    codePush.sync({
      updateDialog: {
        optionalInstallButtonLabel: 'Cài đặt',
        optionalIgnoreButtonLabel: 'Bỏ qua',
        optionalUpdateMessage: 'Đã có bản cập nhật, bạn có muốn cài đặt nó?',
        title: 'Cập nhật có sẵn',
        mandatoryUpdateMessage: 'Bản cập nhật có sẵn phải được cài đặt.',
        mandatoryContinueButtonLabel: 'Cập nhật'
      },
      installMode: codePush.InstallMode.IMMEDIATE
    }, (status) => {
      switch (status) {
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.setState({ isVisible: true });
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          this.setState({ isVisible: false });
          break;
      }
    },
      ({ receivedBytes, totalBytes, }) => {
        this.setState({ number: receivedBytes / totalBytes });
      }
    );
  }

  render() {
    const { isVisible, number } = this.state;
    return (
      <>
        {
          isVisible ? (
            <View style={{flex: 1, backgroundColor: '#B3B2B3', justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  width: '70%',
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  padding: 24,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                  Đang cập nhật
                </Text>
                <View style={
                  Platform.OS === 'ios' ?
                    { paddingRight: 10, marginTop: 12, marginBottom: 20} :
                    { marginVertical: 12}
                }>
                  <Spinner
                    type={'FadingCircleAlt'}
                    color={Color}
                  />
                  {/* <ActivityIndicator
                      size="large"
                      color={Color}
                  /> */}
                </View>
                <Text style={{ fontSize: 16, color: TxtColor }}>
                  {Math.floor(number * 100)}%
                </Text>
              </View>
            </View>
          ) : (
            <MainApp />
          )
        }
      </>
    );
  }
}

export default codePush(codePushOptions)(App);
