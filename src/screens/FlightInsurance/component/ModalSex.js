import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color, TxtColor } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalSex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: [
        {
          name: 'Nam',
          id: 1,
        },
        {
          name: 'Nữ',
          id: 2,
        },
      ],
    };
  }

  setSex = data => {
    this.props.setSex(data);
    this.props.onClosed();
  };

  render() {
    const { sex } = this.state;
    const { onClosed, open, nameSelected } = this.props;

    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={false}
        onClosed={onClosed}
        style={css.ctModal}
        coverScreen={true}>
        <View style={{ flex: 1, marginHorizontal: 24, marginTop: 16 }}>
          {sex.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => this.setSex(item)}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: index === sex.length - 1 ? 0 : 1,
                  borderTopWidth: 0,
                  borderColor: '#F6F5F6',
                  alignItems: 'center',
                  paddingVertical: 8
                }}
                key={index}>
                {
                  nameSelected === item.name ? (
                      <IconRadioBtnActiveSvg width={15} height={15} />
                  ) : (
                      <IconRadioBtnSvg width={15} height={15} />
                  )
                }
                <Text style={{ marginLeft: 8,fontSize: 14, color: TxtColor }}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ModalBox>
    );
  }
}
const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ctInput: {
    borderBottomWidth: 1,
    borderColor: Color,
    marginHorizontal: 25,
    flexDirection: 'row',
  },
});

export default ModalSex;
