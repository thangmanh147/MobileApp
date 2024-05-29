import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Keyboard,
    Alert,
    BackHandler,
    Dimensions,
    TouchableOpacity, ImageBackground, Image
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import InputProducer from '../../components/buy/InputProducer';
import InputYear from '../../components/buy/InputYear';
import Button from "../../components/buy/Button";
import InputModel from '../../components/buy/InputModel';
import InputSeat from '../../components/buy/InputSeat';
import InputPurpose from '../../components/buy/InputPurpose';
import FooterButton from '../../components/FooterButton';
import Drawer from 'react-native-drawer';
import Information from '../../components/Information';
import { ScaledSheet } from 'react-native-size-matters';
import {renderVND} from '../../components/Functions';
import FastImage from 'react-native-fast-image'
// import {renderVND} from '../../../components/Functions';
let HTTP = require('../../services/HTTP');
const { height, width } = Dimensions.get('window');
class CarCorner extends Component {
    constructor(props) {
        super(props);
        this.state = {
           listCorner : [
               {
                   image:'',
                   title:'Góc sau ghế phụ'
               }, {
                   image:'',
                   title:'Góc sau ghế lái'
               }, {
                   image:'',
                   title:'Góc sau ghế lái'
               },{
                   image:'',
                   title:'Góc sau ghế lái'
               },{
                   image:'',
                   title:'Góc sau ghế lái'
               },
           ]
        };
    }


    render() {
        return (
            <View style={Css.container}>
                    {/* {
                        this.props.carBuy.loading ?
                            <Loading/>
                            : null
                    } */}
                    <Nav isInfo={false} show={true} title={'HOÀN THIỆN HỒ SƠ XE'}
                            onPress={() => Actions.pop()}/>
                    <View style={{padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <FastImage style={{height: height- 100,width}} resizeMode={'center'} source={require('../../icons/car.png')}/>
                        {
                            this.state.listCorner && this.state.listCorner.length > 0 ?
                                this.state.listCorner.map((item,index) => {
                                    let a = index
                                    let b = parseInt(a)

                                    if (b % 2 == 0) {

                                        return (
                                            <View style={styles.ct}>
                                                <TouchableOpacity onPress={() => this.onPress()} style={styles.ctImage}>

                                                </TouchableOpacity>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text style={styles.txt}>{item.title}</Text>
                                                </View>
                                            </View>
                                        )
                                    } else {
                                        return (
                                            <View style={styles.ct1}>
                                                <TouchableOpacity onPress={() => this.onPress()} style={styles.ctImage}>

                                                </TouchableOpacity>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text style={styles.txt}>{item.title}</Text>
                                                </View>
                                            </View>
                                        )
                                    }

                                }) : null
                        }


                    </View>

                    <FooterButton>
                        <Button
                            label='XÁC NHẬN'
                            marginTop={0}
                            onPress={this.next}
                        />
                    </FooterButton>
                    {/*<ModalFlightNew*/}
                    {/*    label2={'Hủy'}*/}
                    {/*    button={true}*/}
                    {/*    forceUpdate={true}*/}
                    {/*    onPress={() => this.gobackAndReset()}*/}
                    {/*    text='Nếu quay lại bạn sẽ phải điền lại thông tin xe?'*/}
                    {/*    onPressButtonNo={() => this.setState({ modalBackHome: false })}*/}
                    {/*/>*/}
                </View>

        );
    }
}

const styles = ScaledSheet.create({
    textError: {
        color: '#F97C7C',
        fontSize: 12
    },
    txt: {
        color: '#333',
        marginTop: 5,
    },
    icCamera: {
        height: 15,
        width: 15*48/38,
        position: 'absolute'
    },
    ctImage: {
        width: 60,
        height: 60*3/4,
        borderRadius: 4,
        backgroundColor: '#e4e4e4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ct: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        left: 20
    },
    ct1: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        right: 20
    },
    ct2: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        right: 20
    },
    ct3: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        right: 20
    },ct4: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        right: 20
    },ct5: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        right: 20
    },ct6: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        right: 20
    },
})

import {connect} from 'react-redux';
import ModalFlightNew from "../../components/buy/ModalFlightNew";
import SimpleToast from 'react-native-simple-toast';
import NewModalProducer from '../../components/buy/NewModalProducer';
import NewModalBrandCar from '../../components/buy/NewModalBrandCar';
import NewModalGetPurpose from '../../components/buy/NewModalGetPurpose';
import NewModalYear from '../../components/buy/NewModalYear';
import NewModalModel from '../../components/buy/NewModalModel';
import NewModalSeat from '../../components/buy/NewModalSeat';
import {Actions} from 'react-native-router-flux';
import Input from "../../components/buy/Input";
import InputBrandCar from "../../components/buy/InputBrandCar";

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {

}
export default (CarCorner);





