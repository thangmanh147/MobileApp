
import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
    ImageBackground,
    ScrollView,
    TouchableHighlight,
    TextInput, Modal,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { ScaledSheet } from 'react-native-size-matters';
const { height, width } = Dimensions.get('window');
export default class DropDownRN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // value: ''
        };
    }

    _onSelectDropdown = (idx, value) => {
        const { onSelect, type } = this.props;
        if (onSelect) onSelect(idx, value, type);
    };

    _renderButtonText = rowData => {
        const name = typeof rowData == 'string' ? rowData : rowData.name;
        return `${name}`;
    };

    _renderRow(rowData, rowID, highlighted) {
        const name = typeof rowData == 'string' ? rowData : rowData.name;
        return (
            <TouchableHighlight underlayColor="cornflowerblue">
                <Text
                    style={[styles.rowText, highlighted && { color: 'yellow' }]}
                >
                    {`${name}`}
                </Text>
            </TouchableHighlight>
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
                        style={[styles.modal]}
                        {...this.props}
                        onSelect={this._onSelectDropdown}
                    />
                    <View
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
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    picker: {
        paddingRight: '3@s'
    },
    title: { fontSize: '16@ms0.3', color: 'red' },
    textStyle: { color: 'grey', fontSize: '16@ms0.3' },
    modal: {
    },
    rowText: {
        fontSize: '13@ms0.3',
        color: 'blue'
    },
    icon: { width: 6, height: 4 },
    borderPicker: {
        borderBottomColor: 'green',
        borderBottomWidth: 1,
    },
    itemDropdown: {
        right: 0, left: 0,
        borderRadius: 3
    }
});