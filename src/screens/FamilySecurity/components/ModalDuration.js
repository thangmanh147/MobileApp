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
import {screen, TxtBlack, Color, TxtColor} from '../../../config/System';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalMotorType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex:[
        {
          value: 12,
          name: '12 tháng'
        },
        {
          value: 6,
          name: '06 tháng'
        },
      ],
    };
  }

  setSex = data => {
    this.props.setSex(data);
    this.props.onClosed();
  };

  render() {
    const {sex} = this.state;
    const {onClosed, open, nameSelected} = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={false}
        onClosed={onClosed}
        style={css.ctModal}
        coverScreen={true}>
        <View style={{flex: 1}}>
        <View style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 16,
            paddingHorizontal: 24,
            backgroundColor: '#F6F5F6'
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Hiệu lực bảo hiểm *</Text>
          </View>
        <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
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
              }}>
                {
                  nameSelected === item.value ? (
                      <IconRadioBtnActiveSvg width={15} height={15} />
                  ) : (
                      <IconRadioBtnSvg width={15} height={15} />
                  )
                }
                <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>{item.value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
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

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(ModalMotorType);
