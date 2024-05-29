import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import jwt_decode from "jwt-decode";
import Store from '../../services/Store';
import Const from '../../services/Const';
import {getListReferralAcc} from './actions';
import Nav from '../Nav';
import { connect } from 'react-redux';
import { Color, TxtColor } from '../../config/System';
import ItemReferralAcc from './ItemReferralAcc';

class ListReferralAcc extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            const {getListReferralAcc} = this.props;
            const dataToken = jwt_decode(token);
            console.log('Token: ', dataToken);
            getListReferralAcc(dataToken?.userId, dataToken?.organizationId);
        })
    }

    render() {
        const {listReferralAcc, dataUser, userLevels} = this.props;
        const referralDefault = dataUser?.referrals ?
            (
                dataUser?.referrals?.length === 1 ? dataUser?.referrals[0] : dataUser?.referrals?.find((item) => item?.isDefault)
            ) : {};
        const arr = [];
        for (i = referralDefault?.referralLevel + 1; i < userLevels; i++) {
            arr.push(i);
        }
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 2201 }}>
                    <Nav isInfo={false} title={'DANH SÁCH NGƯỜI DÙNG CẤP DƯỚI'}
                        onPress={() => Actions.pop()}
                    />
                </View>
                <ScrollView
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 32, paddingHorizontal: 24 }}
                >
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>
                                Tổng số người dùng cấp dưới:
                                <Text style={{color: Color}}> {listReferralAcc?.length > 0 ? listReferralAcc?.length : 0}</Text>
                            </Text>
                    </View>
                    {
                        listReferralAcc ? (
                            listReferralAcc?.length > 0 ? (
                                <>
                                    {
                                        arr.map((item, index) => (
                                            <ItemReferralAcc
                                                listReferralAcc={listReferralAcc}
                                                levelFilter={item}
                                                index={index}
                                            />
                                        ))   
                                    }
                                </>
                            ) : null
                        ) : (
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                                <ActivityIndicator
                                    size="large"
                                    color={Color}
                                />
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

const mapStateToProps = (state) => {
    return {
        listReferralAcc: state.referralAcc.listReferralAcc,
        dataUser: state.userInfo.userInfo,
        userLevels: state.userInfo.userLevels,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListReferralAcc: (userId, orgId) => dispatch(getListReferralAcc(userId, orgId)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListReferralAcc);
