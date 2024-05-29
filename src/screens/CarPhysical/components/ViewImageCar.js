import React from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TxtColor } from '../../../config/System';

const { height } = Dimensions.get('window');

function ViewImageCar({ title, uri, address, longitude, latitude, timePhoto, top }) {
    return (
        <View style={{ backgroundColor: TxtColor, borderRadius: 10, marginTop: top || 0, paddingBottom: 16 }}>
            <View style={{ alignItems: 'center' }}>
                <FastImage
                    source={{ uri: uri }}
                    style={{
                      height: height / 2.84,
                      width: '100%',
                      backgroundColor: 'black',
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                    resizeMode={'contain'}
                />
            </View>
            <Text style={{ color: '#FFF', fontSize: 14, marginTop: 12, marginLeft: 12 }}>Ảnh: {title}</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 12, paddingTop: 8 }}>
                {
                    address?.length > 0 ? (
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <FastImage
                                style={{ width: 16, height: 16, marginRight: 4, marginTop: 2, marginLeft: -2 }}
                                source={require('../../../config/images/public/icons/ic_Location.png')}
                                resizeMode="contain"
                            />
                            <Text style={{ color: 'white', fontSize: 14, flex: 1 }}>{address}</Text>
                        </View>
                    ) : null
                }
                {
                    address?.length > 0 && longitude !== 0 && latitude !== 0 ? (
                        <View style={{ width: 24 }} />
                    ) : null
                }
                <View style={{ flex: 1 }}>
                    {
                        longitude !== 0 && latitude !== 0 ? (
                            <View style={{ flexDirection: 'row' }}>
                                <FastImage
                                    style={{ width: 15, height: 15, marginRight: 4, marginTop: 2 }}
                                    source={require('../../../config/images/public/icons/ic_Position.jpg')}
                                    resizeMode="contain"
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>KĐ: {longitude}</Text>
                                    <Text style={{ color: 'white', fontSize: 14 }}>VĐ: {latitude}</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    {
                      timePhoto?.length > 0 ? (
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <FastImage
                                style={{ width: 15, height: 15, marginRight: 4 }}
                                source={require('../../../config/images/public/icons/ic_Time.jpg')}
                                resizeMode="contain"
                            />
                            <Text style={{ color: 'white', fontSize: 14, flex: 1 }}>{timePhoto}</Text>
                        </View>
                      ) : null 
                    }
                </View>
            </View>
        </View>
    );
}

export default ViewImageCar;

