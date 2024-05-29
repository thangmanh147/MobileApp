
import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color, TxtColor } from '../../../config/System';
import {connect} from 'react-redux';
import {saveFeeMotor, saveMotorType} from '../../Motorbike/actions/motorActions';

class ModalCompensation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [
                {
                    name: 'Cá nhân',
                    id: 1
                }, {
                    name: 'Doanh nghiệp',
                    id: 2
                },
            ],
        };
    }
    //
    // componentWillMount() {
    //     let buyerTypeId = this.props.buyerTypeId
    //     let type = this.state.type
    //     if (buyerTypeId) {
    //         type.forEach(i=> {
    //             if (i.id == buyerTypeId) {
    //                 this.props.setBuyerType(i)
    //             }
    //         })
    //     }else {
    //         this.props.setBuyerType(type[0])
    //     }
    // }

    setBuyerType = (data) => {
        this.props.setBuyerType(data)
        this.props.onClosed()
    }

    render() {
        const { type } = this.state
        const { onClosed, open } = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}
            >
                <View style={{flex: 1, marginHorizontal: 24, marginTop: 16}}>
                    {type.map((item, index) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => this.setBuyerType(item)} 
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: index === type.length - 1 ? 0 : 1,
                                    borderTopWidth: 0,
                                    borderColor: '#F6F5F6',
                                    alignItems: 'center',
                                    paddingVertical: 8
                                }} 
                                key={index}>
                                <Text style={{fontSize: 14, color: TxtColor}}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.3,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})

const mapStateToProps = state => ({
    buyerTypeId:state?.tndsCar?.buyer?.buyerTypeId,
});

export default connect(mapStateToProps, {
    saveMotorType,saveFeeMotor
})(ModalCompensation);
