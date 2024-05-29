import React, {useState, useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,TextInput,Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import { nameApp } from '../../config/System';

import Success from './components/Success';

const { width, height } = Dimensions.get('window');


function ChangePassSuccess({hideBackBut}) {
    return (
        <Success
            content1={nameApp.includes('IAGENT') || nameApp.includes('INSO') ?
                'Bạn đã đổi mật khẩu thành công. Vui lòng đăng nhập lại với mật khẩu mới.' :
                'Bạn đã đổi mật khẩu thành công.'
            }
            title={'ĐỔI MẬT KHẨU THÀNH CÔNG'}
            labelButton={'ĐĂNG NHẬP'}
            hideBackBut={hideBackBut}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        marginTop: 15,
        padding: 24,
        position: 'absolute',
        left: 0,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: 38,
        marginLeft: 30,
        marginBottom: 40,
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop:-30,
        backgroundColor: '#ffff',
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
    viewTable: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1, backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
});


const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(ChangePassSuccess);

