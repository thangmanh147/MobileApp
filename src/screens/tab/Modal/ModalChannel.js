import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import {Color, TxtColor} from '../../../config/System';
import {connect} from 'react-redux';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalMotorType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setSex = data => {
    this.props.setSex(data);
    this.props.onClosed();
  };

  render() {
    const {onClosed, open, nameSelected, listChannel} = this.props;
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
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Kênh bảo hiểm</Text>
          </View>
        <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
        {listChannel.map((item, index) => {
            return (
              <TouchableOpacity 
                onPress={() => this.setSex(item)}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: index === listChannel.length - 1 ? 0 : 1,
                  borderTopWidth: 0,
                  borderColor: '#F6F5F6',
                  alignItems: 'center',
                  paddingVertical: 8
              }}>
                {
                  nameSelected === item.code ? (
                      <IconRadioBtnActiveSvg width={15} height={15} />
                  ) : (
                      <IconRadioBtnSvg width={15} height={15} />
                  )
                }
                <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>{item.code}</Text>
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
