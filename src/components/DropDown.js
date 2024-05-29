
import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { ScaledSheet } from 'react-native-size-matters';
const { height, width } = Dimensions.get('window');
export default class DropDownRN extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '8888'
      };
    }
  
    _onSelectDropdown = (idx, value) => {
      const { onSelect, type } = this.props;
      if (onSelect) onSelect(idx, value, type);
    };
  
    _renderButtonText = rowData => {
      const name = typeof rowData == 'string' ? rowData : rowData.name;
      return (
          <Text>{name}</Text>
      )
    };

    _renderSeparator() {
      return (
        null
      );
    }
  
    _renderRow(rowData, rowID, highlighted) {
      const name = typeof rowData == 'string' ? rowData : rowData.name;
      return (
        <TouchableOpacity disabled={highlighted ? true : false} 
          style={{
            flexDirection: 'row',
            borderBottomColor: '#fcfbf7',
            borderBottomWidth: 0,
            alignItems:'center', 
            paddingHorizontal: 30, 
            paddingVertical: 10}}
          >
            <Image resizeMode={'contain'} style={styles.ic_image_package} source={require('../icons/ic_category.png')} />
            <Text style={styles.rowText} > {`${name}`}</Text>
        </TouchableOpacity>
      );
    }
  
    render() {
      const {
        data,
        styleContainer,
        title,
        titleStyle,
        widthDropdown
      } = this.props;
      return (
        <View>
          {title ? (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => this.refs.modal.show()}
            style={[styles.borderPicker, styleContainer]}
          >
            <ModalDropdown
              ref="modal"
              options={data}
              dropdownStyle={[
                styles.itemDropdown,
                { width: widthDropdown || width, height: 'auto' }
              ]}
              defaultIndex={-1}
              textStyle={styles.textStyle}
              renderButtonText={this._renderButtonText}
              renderRow={this._renderRow}
              renderSeparator={this._renderSeparator}
              style={[styles.modal]}
              {...this.props}
              onSelect={this._onSelectDropdown}
            />
            {/* <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: styleContainer.padding || 0,
                justifyContent: 'center'
              }}
            >
              <Image
                style={styles.icon}
                source={require('../icons/ic_nodata_morescreen.png')}
              />
            </View> */}
          </TouchableOpacity>
        </View>
      );
    }
  }
  
  const styles = ScaledSheet.create({
    picker: {
      paddingRight: '38@s'
    },
    title: { fontSize: '15@ms0.3', color: 'red' },
    textStyle: { color: 'grey', fontSize: '14@ms0.3' },
    modal: {
      marginBottom: '8@s'
    },
    rowText: {
      fontSize: '13@ms1',
      margin: '10@s'
    },
    icon: { width: 6, height: 4 },
    borderPicker: {
      borderBottomColor: '#CBCBCB',
      borderBottomWidth: 1,
      marginTop: '10@vs'
    },
    itemDropdown: {
      marginTop: Platform.OS === 'ios' ? 3 : 2,
      right: 0, left: 0,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#999',
      shadowOffset: {
          width: 0,
          height: 0
      },
      shadowRadius: Platform.OS === 'ios' ? 5 : 1,
      shadowOpacity:Platform.OS === 'ios' ? 0.3 : 0,
      elevation: Platform.OS === 'ios' ? 5 : 1,
    },
    ic_image_package: {
      height: '13@vs',
      width: '13@s',
      marginRight: '10@s'
    },
  });