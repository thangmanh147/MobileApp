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
import {screen, TxtBlack, Color} from '../../../config/System';
import FastImage from 'react-native-fast-image';

class ModalRelation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [
        {
          name: 'Vợ'
        },
        {
          name: 'Chồng'
        },
        {
          name: 'Con'
        },
      ],
    };
  }

  setRelation = data => {
    this.props.setRelation(data);
    this.props.onClosed();
  };

  render() {
    const {type} = this.state;
    const {onClosed, open} = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={false}
        onClosed={onClosed}
        style={css.ctModal}
        coverScreen={true}>
        <ScrollView style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
          {type.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => this.setRelation(item)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <FastImage
                  source={require('../../../icons/iconAgent/single_select.png')}
                  style={{width: 15, height: 15}}
                  resizeMode={'contain'}
                />
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderTopWidth: 0,
                    borderColor: '#efefef',
                    paddingVertical: 10,
                    paddingLeft: 0,
                    marginHorizontal: 10,
                    paddingRight: 15,
                  }}
                  key={index}>
                  <View>
                    <Text>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ModalBox>
    );
  }
}

const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.5,
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

export default ModalRelation;
