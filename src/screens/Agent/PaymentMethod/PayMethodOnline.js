import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Linking, ScrollView,
    Animated,
} from 'react-native';
import { NewColor } from '../../../config/System';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

const renderImage = {
    'vnpay': require('../assets/icon/vnpay.jpg'),
    'momo': require('../assets/icon/momo.jpg'),
    'napas': require('../assets/icon/napas.jpg'),
};

function PayMethodOnline({items}) {
    const [indexSelected, setIndexSelected] = useState(0);
    return (
        <View style={styles.container}>
            {
                items.map((obj, index) => (
                    <TouchableOpacity 
                        style={{
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginBottom: 15,
                            backgroundColor: '#ffffff',
                            borderColor: indexSelected === index ? NewColor : 'white',
                            borderWidth: 2,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                        }}
                        key={index}
                        onPress={() => setIndexSelected(index)}
                    >
                        {
                            renderImage[obj.code] ? (
                                <FastImage
                                    source={renderImage[obj.code]}
                                    style={{width: 93, height: 79, borderRadius: 10,}}
                                />
                            ) : null
                        }
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: 10,
        paddingTop: 5,
        backgroundColor: '#FFFFFF',
    },
});

const mapStateToProps = state => {
    return {};
};

export default connect(
    mapStateToProps,
    null,
)(PayMethodOnline);
