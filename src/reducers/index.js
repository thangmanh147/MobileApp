

import app from './app';
import auth from './auth';
import carBuy from './carBuy';
import carClaim from './carClaim';
import notify from './notify';
import buy from './buy';
import claim from './claim';
import loveBuy from './loveBuy';
import loveClaim from './loveClaim';
import profile from './profile';
import flightBuy from './flightBuy';
import flightClaim from './flightClaim';
import tndsBuy from './tndsBuy';
import travelBuy from './travelBuy';
import houseBuy from './houseBuy';
import accidentBuy from './accidentBuy';
import acare from '../screens/VBIACare/reducer/acare';
import insurance24h from '../screens/24hInsurance/reducer/insurance24h';
import commissions from './commissions';
import revenues from '../screens/Revenue/reducer/revenues';
import referralAcc from '../components/listReferralAcc/reducer/referralAcc';
import userInfo from '../screens/Account/reducer/userInfo';
import compensation from '../screens/CompensationContract/reducer/compensation';
import notifyInfo from '../screens/ListNotify/reducer/notify';
import paymentMethod from './paymentMethod';
import promotion from './promotion';
import logContract from './logContract';
import insurance from './insurance';
import kpi from './kpi';
import contracts from './contracts';
import paramsContract from './paramsContractReducer';
import { combineReducers } from 'redux';
import motor from '../screens/Motorbike/reducers/reducerMotor'
import motorPhysical from '../screens/MotorPhysical/reducers/reducerMotor'
import houseInsurance from '../screens/HouseInsurance/reducers/reducerHouse'
import travelInsurance from '../screens/Travel/reducers/reducerTravel'
import selectCompany from '../components/listCompanySelect/reducers/selectCompany'
import delayFlight from '../screens/DelayFlight/reducers/reducerDelayFlight'
import tndsCar from '../screens/TNDSCAR/reducers/reducertndsCar'
import carPhysical from '../screens/CarPhysical/reducers/reducerCarPhysical'
import VTAContract from '../screens/VungTamAn/reducers/reducerVTA'
const appReducer = combineReducers({
  app,
  auth,
  carBuy,
  notify,
  notifyInfo,
  buy,
  claim,
  carClaim,
  loveBuy,
  loveClaim,
  profile,
  flightBuy,
  flightClaim,
  tndsBuy,
  travelBuy,
  houseBuy,
  accidentBuy,
  acare,
  insurance24h,
  commissions,
  revenues,
  referralAcc,
  compensation,
  paymentMethod,
  promotion,
  insurance,
  kpi,
  contracts,
  motor,
  motorPhysical,
  houseInsurance,
  travelInsurance,
  selectCompany,
  delayFlight,
  tndsCar,
  carPhysical,
  paramsContract,
  VTAContract,
  logContract,
  userInfo,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;
