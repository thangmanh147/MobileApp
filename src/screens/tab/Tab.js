

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home';
import KPI from './KPI';

import Support from './Support';
import { Color, nameApp, URL } from '../../config/System';
import Wallet from "./Wallet";
import Account from "./Account";
import CustomerContract from "../../screens/CustomerContract/CustomerContract";
import jwt_decode from "jwt-decode";
import { infoOrg } from '../../components/assets';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { isIPhoneX } from '../../utils/Util';
import IconHomeSvg from '../../config/images/tabbar/IconHomeSvg';
import IconListSvg from '../../config/images/tabbar/IconListSvg';
import IconSupportSvg from '../../config/images/tabbar/IconSupportSvg';
import IconUserSvg from '../../config/images/tabbar/IconUserSvg';

const height = 20;

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: props.tab || 'home',
      isLogin: null,
      data: [],
      orgCode: '',
    };
  }

  componentDidMount() {
    new Store().getSession(Const.TOKEN).then(token => {
        if (token) {
            const dataToken = jwt_decode(token);
            this.setState({
                orgCode: dataToken?.organizationCode,
            });
        }
    })
  }

  render() {
    const {orgCode} = this.state;
    return (
      <TabNavigator
        tabBarStyle={{height: isIPhoneX ? 83 : 61, backgroundColor: '#fff', shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3}}
      >
        <TabNavigator.Item
          tabStyle={[styles.ctItem]}
          selected={this.state.tab === 'home'}
          title="Trang chủ"
          titleStyle={styles.title}
          selectedTitleStyle={[styles.titleActive, {color: infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab}]}
          renderIcon={() => <IconHomeSvg width={20} height={20} color={'#8D8C8D'} />}
          renderSelectedIcon={() => <IconHomeSvg width={20} height={20} color={infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab} />}
          onPress={() => this.setState({ tab: 'home' })}>
          <Home/>
        </TabNavigator.Item>
        {/* <TabNavigator.Item
          tabStyle={[styles.ctItem]}
          selected={this.state.tab === 'kpi'}
          title="KPI"
          titleStyle={styles.title}
          selectedTitleStyle={[styles.titleActive, {color: infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab}]}
          renderIcon={() => <FastImage resizeMode="contain" style={{height, width: 20}} source={require('../../icons/iconAgent/ic_KPI.png')} />}
          renderSelectedIcon={() => <FastImage resizeMode="contain" style={{height, width: 20}} source={require('../../icons/iconAgent/ic_KPI_active.png')} />}
          onPress={() => this.setState({tab: 'kpi'})}>
          <KPI/>
        </TabNavigator.Item> */}

          {/* <TabNavigator.Item
          tabStyle={[styles.ctItem]}
          selected={this.state.tab === 'wallet'}
          title="Ví"
          titleStyle={styles.title}
          selectedTitleStyle={[styles.titleActive, {color: infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab}]}
          renderIcon={() => <FastImage resizeMode="contain" style={{height:19, width: 15}} source={require('../../icons/iconAgent/ic_wallet.png')} />}
          renderSelectedIcon={() => <FastImage resizeMode="contain" style={{height:19, width: 15}} source={require('../../icons/iconAgent/ic_wallet_active.png')} />}
          onPress={() => this.setState({tab: 'wallet'})}>
          <Wallet/>
        </TabNavigator.Item> */}
        {
          nameApp.includes('INSO') ? null : (
            <TabNavigator.Item
              tabStyle={[styles.ctItem]}
              selected={this.state.tab === 'wallet'}
              title="Quản lý HĐ"
              titleStyle={styles.title}
              selectedTitleStyle={[styles.titleActive, {color: infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab}]}
              renderIcon={() => <IconListSvg width={20} height={20} color={'#8D8C8D'} />}
              renderSelectedIcon={() => <IconListSvg width={20} height={20} color={infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab} />}
              onPress={() => this.setState({tab: 'wallet'})}>
              <CustomerContract hideBack />
            </TabNavigator.Item>
          )
        }

        <TabNavigator.Item
              tabStyle={[styles.ctItem]}
              selected={this.state.tab === 'help'}
              title="Hỗ trợ"
              titleStyle={styles.title}
              selectedTitleStyle={[styles.titleActive, {color: infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab}]}
              renderIcon={() => <IconSupportSvg width={20} height={20} color={'#8D8C8D'} />}
              renderSelectedIcon={() => <IconSupportSvg width={20} height={20} color={infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab} />}
              onPress={() => this.setState({tab: 'help'})}>
              <Support/>
          </TabNavigator.Item>
        {
          nameApp.includes('INSO') ? null : (
            <TabNavigator.Item
              tabStyle={[styles.ctItem]}
              selected={this.state.tab === 'account'}
              title="Tài khoản"
              titleStyle={styles.title}
              selectedTitleStyle={[styles.titleActive, {color: infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab}]}
              renderIcon={() => <IconUserSvg width={20} height={20} color={'#8D8C8D'} />}
              renderSelectedIcon={() => <IconUserSvg width={20} height={20} color={infoOrg[orgCode] ? infoOrg[orgCode].colorTab : infoOrg.default.colorTab} />}
              onPress={() => this.setState({tab: 'account'})}>
              <Account hideBack />
              {/* <Claim/> */}
            </TabNavigator.Item>
          )
        }
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  ctItem: {
    paddingTop: isIPhoneX ? 0 : 3,
    paddingBottom: isIPhoneX ? 20 : 0,
    backgroundColor:'#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#999',
    fontSize: 13,
  },
  titleActive: {
    fontSize: 13,
  },

})

export default (Tab);
