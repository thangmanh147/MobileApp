import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TxtColor, Color, NewColor } from '../../config/System';
import Input from '../CarInsurance/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';

function DetailCompensation({ benefitType, fullName, phone, note, listImage }) {
    return (
        <View style={styles.container}>
            <View>
                <Nav isInfo={false} title={'CHI TIẾT YÊU CẦU BỒI THƯỜNG'}
                    onPress={() => Actions.pop()} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 24 }}>
                <ScrollView
                    style={{ marginTop: 16 }}
                >
                    <InputSelect
                        label={'Quyền lợi bảo hiểm yêu cầu bồi thường'}
                        value={benefitType}
                        checkDisabled
                        textColor={'#8D8C8D'}
                    />
                    <Input
                        label={'Họ và tên người yêu cầu/Người bảo hộ'}
                        value={fullName}
                        editable={false}
                        textUnableColor={'#8D8C8D'}
                    />
                    <Input
                        label={'Số điện thoại liên hệ'}
                        value={phone}
                        editable={false}
                        textUnableColor={'#8D8C8D'}
                    />
                    <Input
                        label={'Ghi chú'}
                        value={note}
                        editable={false}
                        textUnableColor={'#8D8C8D'}
                    />
                    <View style={{
                        marginTop: 20,
                        marginBottom: 10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        {
                            listImage.map((item, index) => (
                                <View
                                    style={{
                                        marginRight: 15,
                                        marginBottom: 15,
                                        alignItems: 'center'
                                    }}>
                                    <FastImage
                                        source={{ uri: item.url }}
                                        style={{ height: 68, width: 95, borderRadius: 10 }}
                                    />
                                    <Text style={{ fontSize: 14, color: TxtColor, marginTop: 10 }}>
                                        {item.title}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Trạng thái yêu cầu bồi thường: <Text style={{ color: NewColor }}>Đang xử lý</Text>
                    </Text>
                </ScrollView>
                <FooterButton>
                    <Button
                        label={'TRANG CHỦ'}
                        width={'100%'}
                        onPress={() => {
                            // Actions.tab()
                            Actions.InsuranceType()
                        }}
                    />
                </FooterButton>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    butPdf: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center'
    },
    txtPdf: {
        textDecorationLine: 'underline',
        fontSize: 14,
        color: TxtColor,
        marginLeft: 12,
    },
    containerSubmit: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    butSubmit: {
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: NewColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSubmit: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default DetailCompensation;
