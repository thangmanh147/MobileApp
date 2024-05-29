'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Linking,
    ImageBackground,
    AsyncStorage,
    SafeAreaView,
    Share,
    StatusBar, Keyboard, BackHandler,
    TouchableWithoutFeedback,
    Dimensions,
    FlatList, ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import { widthPercentageToDP } from '../../config/ConfigResponsive';
import FooterButton from '../../components/FooterButton';

const screen = Dimensions.get('window');


class TNDSIntroduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: '1. Bảo hiểm trách nhiệm dân sự là gì',
                    content: `Nguyên lý của bảo hiểm đó là “Lấy số đông bù cho số ít kém may mắn”, trong trường hợp có tai nạn xảy ra, các công ty bảo hiểm sẽ sử dụng số tiền bảo hiểm thu được từ số đông để bồi thường cho số ít người bị tai nạn. Điều đó giúp cho một số người vì một lý do nào đó gây tai nạn không phải bỏ trốn, có trách nhiệm với tai nạn đã xảy ra theo mức trách nhiệm của bảo hiểm đã tham gia, và không bị truy cứu hình sự vì mất khả năng bồi thường cho chủ thể khác. ${'\n'}Tuy nhiên, với bảo hiểm trách nhiệm dân sự xe ôtô,các công ty bảo hiểm sẽ không chi trả theo sự dàn xếp của 2 bên mà phải có đối tượng phân rõ trách nhiệm ai gây ra lỗi cho ai để biết bảo hiểm bên nào phải trả tiền cho những thiệt hại đã xảy ra. Đó là cảnh sát giao thông.`
                }
            ]
        };

    }
    renderItem = (item, index) => {
        return (
            <View>
                <Text style={{ fontWeight: 'bold' }}>
                    {item.item.name}
                </Text>
                <Text style={{ marginTop: 5, marginBottom: 10, lineHeight: 18 }}>
                    {item.item.content}
                </Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <FastImage source={require('../../icons/iconAgent/ic_TNDS_intro.png')} style={{ width: widthPercentageToDP('100'), height: 300 }}>
                        { Actions.currentScene == 'FlightIntroduction' ? <StatusBar translucent backgroundColor='transparent' /> : null}
                        <TouchableOpacity onPress={() => Actions.pop()} style={styles.ctBack}>
                            <FastImage style={styles.icBack} source={require('../../icons/ic_back.png')} resizeMode='contain' />
                        </TouchableOpacity>
                        <View style={styles.title}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffff', textAlign: 'left' }}>BẢO HIỂM{'\n'}TRÁCH NHIỆM DÂN SỰ</Text>
                            <View style={{ backgroundColor: Color, width: 103, height: 4, borderRadius: 35, marginTop: 4 }} />
                        </View>
                    </FastImage>
                    <View style={styles.contentContainer}>
                        <FlatList
                            style={{ padding: 25 }}
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item, index) => this.renderItem(item, index)}
                        />
                    </View>
                </ScrollView>
                <FooterButton>
                    <Button
                        label={'MUA BẢO HIỂM'}
                        marginTop={10}
                        onPress={() => Actions.CarInfomationTNDS()}
                    />
                </FooterButton>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    ctBack: {
        marginTop: 25,
        padding: 24,
        left: 0,
        position: 'absolute'
    },
    icBack: {
        height: 15,
        width: 15 * 21 / 39
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        width: 180,
        height: 38,
        marginLeft: 30,
        marginBottom: 40
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    }
});


import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FastImage from 'react-native-fast-image';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default (TNDSIntroduction);
