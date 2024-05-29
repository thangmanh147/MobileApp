

import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    StatusBar,
    Platform,
    Linking
} from 'react-native';
import {app_version, Color, primaryColor} from '../config/System';
import { Actions } from 'react-native-router-flux';
import Gradient from './Gradient';
import AppText from './AppText';
import StBarIos from './StBarIos';

class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Giới thiệu',
                    type: '',
                    screen: 'intro'
                },
                {
                    name: 'Quy tắc bảo hiểm',
                    type: 'download',
                    screen: 'download1'

                },
                {
                    name: 'Thông tư 22',
                    type: 'download',
                    screen: 'download2'
                },
                {
                    name: 'Các điểm loại trừ',
                    type: '',
                    screen: 'exclusion'
                },
                {
                    name: 'Hướng dẫn yêu cầu bồi thường',
                    type: '',
                    screen: 'guide'
                },
            ]
        }
    }

    onPress = screen => {
        switch(screen) {
            case 'intro':
                Actions.infoCar();
                return;
            case 'exclusion':
                Actions.infoCarExclusion();
                return;
            case 'guide':
                Actions.infoGuideClaim();
                return;
            case 'download1':
                Linking.openURL('http://inso.vn/images/app/quy-tac-82-bao-hiem-vat-chat-xe.pdf')
                return;
            case 'download2':
                Linking.openURL('http://inso.vn/images/app/thong-tu-22.pdf')
                return;
            default:
                return;
        }
    }

    render() {
        const {data} = this.state;
        return(
            <View style={css.ct}>
                <StatusBar
                    backgroundColor={Color}
                    barStyle='light-content'
                />
                {
                    Platform.OS === 'ios' ?
                    <StBarIos backgroundColor={Color}/>
                    : null
                }
                <View
                    borderRadius={0}
                    style={{
                        backgroundColor: Color
                    }}
                >
                    <View style={css.header}>
                        <AppText style={css.intro}>Chi tiết gói bảo hiểm</AppText>
                        <AppText style={css.name}>Bảo hiểm xe ô tô</AppText>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    {
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => this.onPress(item.screen)} key={index} style={css.ctItem}>
                                    <Image style={css.iconArrow} source={require('../icons/iconAgent/ic_arrow_right.png')}/>
                                    <AppText style={css.title}>{item.name}</AppText>
                                    {
                                        item.type === 'download' && (
                                            <AppText style={{color: primaryColor, marginRight: 5}}>Tải tài liệu</AppText>
                                        )
                                    }

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const css = StyleSheet.create({
    iconDownload: {
        width: 20,
        resizeMode: 'contain'
    },
    iconArrow: {
        width: 5,
        height: 5*15/8,
        marginRight: 10,
    },
    title: {
        color: '#333',
        fontSize: 18,
        flex: 1
    },
    ct: {
        flex: 1,
        backgroundColor:'#fff'
    },
    name: {
        marginTop: 5,
        color: '#fff',
        fontSize: 20,
        marginRight: 5
    },
    ctItem: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        alignItems: 'center',
    },
    intro: {
        color: '#fff',
        marginTop: 10,
    },
    header: {
        padding: 20,
        paddingTop: 5
    },
})


export default (Information);
