
import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color, TxtColor } from '../../config/System';
import FastImage from 'react-native-fast-image'
import { Actions } from 'react-native-router-flux'
import { URL } from '../../config/System'
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';


class Popup extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const { onClosed, open, content, buttonOK ,button,label,label2,onPress,onPressButtonNo, content1, content2 } = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                onClosed={onClosed}
                style={css.ctModal}
                // isDisabled
                swipeToClose={false}
                backdropPressToClose={false}
            >
                <View>
                    {/*{isLoading ? <Loading /> : null}*/}
                    <View style={{ alignItems: 'center', paddingTop: 25 }}>
                        <NotifyRingSvg width={53} height={60} />
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 18 }}>Thông báo</Text>
                    <View style={{ alignItems: 'center', width: widthPercentageToDP('75'), alignSelf: 'center', marginVertical: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{content}<Text style={{fontWeight: 'bold'}}>{content1}</Text>{content2}</Text>
                    </View>
                   <View style={{paddingVertical:20}}>
                       <FooterButton >
                           {label &&
                           <Button
                               label={label}
                               width={screen.width / 1.5}
                               marginTop={15}
                               borderRadius={10}
                               onPress={onPress}
                           />
                           }
                           {label2 &&
                           <ButtonNoColor
                               label={label2}
                               backgroundColor={'#fff'}
                               width={screen.width/1.5}
                               borderRadius={10}
                               color={TxtColor}
                               fontWeight={'bold'}
                               onPress = {onPressButtonNo}
                           />
                           }
                       </FooterButton>
                   </View>
                </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})
import { connect } from 'react-redux';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Loading from '../../components/Loading';
import {saveBuyerMotor, saveMotorType} from '../Motorbike/actions/motorActions';
import ButtonNoColor from '../../components/ButtonNoColor';

const mapStateToProps = (state) => {
    return {
        orderId: state.buy.orderId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
