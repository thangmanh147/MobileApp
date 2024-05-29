import React, { useState, useEffect, useRef, Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";
import Store from '../../services/Store';
import Const from '../../services/Const';
import { roundNumber } from '../../utils/Util';
import { nameApp, NewColor, TxtColor, URL } from '../../config/System';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.92);

class CommissionACare extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            valueCom: 0,
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { totalFee } = this.props;
        if (totalFee !== prevProps.totalFee) {
            this.getValueCom(totalFee);
        }
    }

    getValueCom = (totalFee) => {
        const {idComSelected, orgCodeUser, callBack} = this.props;
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            let url;
            if (nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') {
                url = `${URL}/api/commission/v2/commissions/value`;
            } else {
                url = `${URL}/api/commission/v3/commissions/saler`;
            }
            let body = {
                "channelId": dataToken?.channelId || '',
                "supplierId": idComSelected || '',
                "agentId": dataToken?.organizationId || '',
                "userId": dataToken?.sub || '',
                "contractValue": totalFee || 0,
                "product": "HC10",
                "B": `${totalFee || 0}`,
                "V": "0",
                "D": "0"
            }
            console.log('======URL Commission', url)
            console.log('======BODY Commission', body)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log('======res Commission', res)
                    if (res.status == 200 || res.status == 'success') {
                        this.setState({valueCom: res?.data?.commission || 0}, () => {
                            callBack(res?.data?.commission || 0);
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    };

    render() {
        const {
            valueCom,
        } = this.state;
        return (
            !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    paddingHorizontal: 12,
                    marginTop: 24,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#D9D9D9',
                    borderStyle: 'dashed',
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Điểm</Text>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        {roundNumber(valueCom) / 1000}
                    </Text>
                </View>
            ) : null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#ffff',
        paddingTop: 10,
    },
    viewTable: {
        shadowColor: '#F4F4F4',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7.00,

        elevation: 3, backgroundColor: '#F6F5F6', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
    itemContainer: {
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: NewColor,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
});

const mapStateToProps = state => {
    const listCompany = state.selectCompany.listCompany['HC10'];
    const idComSelected = state.selectCompany.idComSelected['HC10'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        orgCodeUser: state.userInfo.orgCodeUser,
    };
};

export default connect(mapStateToProps)(CommissionACare);


