import React, { Component } from 'react';

import { Router, Stack, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import Tab from './screens/tab/Tab';
import Login from './screens/auth/Login';

import FrequentlyQuestion from './screens/information/FrequentlyQuestion';
import Notify from './screens/information/Notify';
import App from './screens/App';
import OtpCode from '../src/screens/auth/OtpCode';
import History from './screens/Agent/History';
import Favors from './screens/Agent/Favors';
import FavorsDetail from './screens/Agent/FavorsDetail';
import Voucher from './screens/Agent/Voucher';
import CustomerManagement from './screens/Agent/CustomerManagement';
import CustomerDetail from './screens/Agent/CustomerDetail';
import ListCustomers from './screens/Agent/ListCustomers';
import InsuredSuggest from './screens/Agent/InsuredSuggest';

import Customer from './screens/Agent/Customer';
import RequestWithDrawal from './screens/Agent/RequestWithDrawal';
import DealSuccess from './screens/Agent/DealSuccess';
import NodataBank from './screens/Bank/NodataBank';
import AddBank from './screens/Bank/AddBank';
import KpiPlan from './screens/Agent/KPI_plan';
import TransactionHistory from './screens/Agent/TransactionHistory';
import InsuranceType from './screens/Agent/InsuranceType';
import OTPconfirm from './screens/Agent/OTPconfirm';
import Pay from './screens/Agent/Pay';
import BanksAcount from './screens/Bank/BanksAcount';
import EditBankAcount from './screens/Bank/EditBankAcount';
import ModalGuideTakeCamera from './components/ModalGuideTakeCamera';
import PaymentView from './screens/Agent/PaymentView'

import User from './screens/Account/User'
import UpdateFullName from './screens/Account/UpdateFullName'
import UpdateEmail from './screens/Account/UpdateEmail'
import Profile from './screens/Account/Profile/Profile'
import UpdateProfile from './screens/Account/Profile/UpdateProfile'
import TPBankAcc from './screens/TPBankAccount/AccountInfo/TPBankAcc'
import TPBankFace from './screens/TPBankAccount/AccountInfo/TPBankFace'
import TPBankIntro from './screens/TPBankAccount/AccountInfo/TPBankIntro'
import TPBankCamera from './screens/TPBankAccount/AccountInfo/TPBankCamera'
import CameraICType from './screens/TPBankAccount/AccountInfo/CameraICType'
import TPBankWebView from './screens/TPBankAccount/AccountInfo/TPBankWebView'
import ElectronicCertificate from './screens/Account/ElectronicCertificate'
import FakeCertificate from './screens/Agent/fake/FakeCertificate'
import FakeChat from './screens/Agent/fake/FakeChat'
import FakeCalender from './screens/Agent/fake/FakeCalender'

//CarInsurance
import CarIntroduction from './screens/CarInsurance/CarIntroduction';
import CarProducer from './screens/CarInsurance/CarProducer';
import CarProducerPreview from './screens/CarInsurance/CarProducerPreview';
import CarInfomation from './screens/CarInsurance/CarInfomation';
import CarRegisterInsuranceInfo from './screens/CarInsurance/CarRegisterInsuranceInfo';
import ListRequestBuyInsurance from './screens/CarInsurance/ListRequestBuyInsurance';
import CarCorner from './screens/CarInsurance/CarCorner';
import TakePhoto from './screens/CarInsurance/TakePhoto';
import CarPhoto from './screens/CarInsurance/CarPhoto';
import CarInfoInsurance from './screens/CarInsurance/CarInfoInsurance'
import CarInfomationBuyer from './screens/CarInsurance/CarInfomationBuyer'
import CarInsuranceRegisterInfo from './screens/CarInsurance/CarInsuranceRegisterInfo'
import CarInsurancePackage from './screens/CarInsurance/CarInsurancePackage'

// CarPhysical
import IntroductionCarPhysical from './screens/CarPhysical/IntroductionCarPhysical';
import InfomationCarPhysical from './screens/CarPhysical/InfomationCarPhysical';
import BuyerCarPhysical from './screens/CarPhysical/Buyer';
import PreviewCarPhysical from './screens/CarPhysical/Preview';
import CameraCarPhysical from './screens/CarPhysical/Camera';
import CarPhotoPhysical from './screens/CarPhysical/CarPhotoPhysical';
import TakePhotoPhysical from './screens/CarPhysical/TakePhotoPhysical';
import ConfirmImage from './screens/CarPhysical/ConfirmImage';
import PackageCarPhysical from './screens/CarPhysical/Package';
import PhotoCar from './screens/CarPhysical/PhotoKhongBSX';
import PhotoCarY from './screens/CarPhysical/PhotoCoBSX';

// MotorPhysical
import IntroductionMotorPhysical from './screens/MotorPhysical/Introduction';
import MotorPhysicalPackage from './screens/MotorPhysical/Package';
import BuyerMotorPhysical from './screens/MotorPhysical/Buyer';
import PreviewMotorPhysical from './screens/MotorPhysical/Preview';
import CameraPhysical from './screens/MotorPhysical/Camera';

// House_Insurance
import IntroductionHouse from './screens/HouseInsurance/Introduction';
import HousePackage from './screens/HouseInsurance/Package';
import BuyerHouse from './screens/HouseInsurance/Buyer';
import PreviewHouse from './screens/HouseInsurance/Preview';

// Travel_Insurance
import IntroductionTravel from './screens/Travel/Introduction';
import InfoScreen from './screens/Travel/InfoScreen';
import TravelPackage from './screens/Travel/TravelPackage';
import BuyerTravel from './screens/Travel/Buyer';
import PreviewTravel from './screens/Travel/Preview';

// Delay_Flight
import IntroductionDelayFlight from './screens/DelayFlight/Introduction';
import InfoScreenDelayFlight from './screens/DelayFlight/InfoScreen';
import PackageDelayFlight from './screens/DelayFlight/Package';
import BuyerDelayFlight from './screens/DelayFlight/Buyer';
import PreviewDelayFlight from './screens/DelayFlight/Preview';

//TNDS
import TNDSIntroduction from './screens/TNDS/TNDSIntroduction';
import CarInfomationTNDS from './screens/TNDS/CarInfomationTNDS';
import TNDSProducerPreview from './screens/TNDS/TNDSProducerPreview';
import CarOwnerInfomation from './screens/TNDS/CarOwnerInfomation';
import AddressGetContract from './screens/TNDS/AddressGetContract';
import CivilDetailBuy from './screens/TNDS/CivilDetailBuy';
import ValuePackageInsurance from './screens/TNDS/ValuePackageInsurance';
import TNDSInsurancePackage from './screens/TNDS/TNDSInsurancePackage'
import TNDSConfirmInfomation from './screens/TNDS/TNDSConfirmInfomation'

//Accident
import AccidentInsuranceIntroduction from './screens/CarAccidentInsurance/AccidentInsuranceIntroduction';
import AccidentConfirmInfomation from './screens/CarAccidentInsurance/AccidentConfirmInfomation';
import AccidentInsurancePackage from './screens/CarAccidentInsurance/AccidentInsurancePackage';
import AccidentInsuranceBuyerInfo from './screens/CarAccidentInsurance/AccidentInsuranceBuyerInfo';
import CarInfomationAccident from './screens/CarAccidentInsurance/CarInfomationAccident'



//FlightInsurance

import FlightInformation from './screens/FlightInsurance/FlightInformation';
import FlightIntroduction from './screens/FlightInsurance/FlightIntroduction';
import CustomerInfo from './screens/FlightInsurance/CustomerInfo'
import InsurancePack from './screens/FlightInsurance/InsurancePack'
import BillExportInfo from './screens/FlightInsurance/BillExportInfo'
import ConfirmInfomation from './screens/FlightInsurance/ConfirmInfomation'

//travel

import TourInfomation from './screens/TravelInsurance/TourInfomation';
import TravelInsurancePackage from './screens/TravelInsurance/TravelInsurancePackage';
import TravelInsuranceBuyerInfo from './screens/TravelInsurance/TravelInsuranceBuyerInfo';
import TravelInsuranceIntro from './screens/TravelInsurance/TravelInsuranceIntro';

//privateHouse
import HouseInfomation from './screens/PrivateHouseInsurance/HouseInfomation';
import HouseInsurancePackage from './screens/PrivateHouseInsurance/HouseInsurancePackage';
import HouseInsuranceBuyerInfo from './screens/PrivateHouseInsurance/HouseInsuranceBuyerInfo';
import ReviewInfomation from './screens/PrivateHouseInsurance/ReviewInfomation';
import HouseInsuranceIntro from './screens/PrivateHouseInsurance/HouseInsuranceIntro';

//Accident
import BuyerAAA from './screens/AccidentInsurance/components/BuyerAAA';
import InsurCustomerAAA from './screens/AccidentInsurance/components/InsurCustomerAAA';
import PreviewAAA from './screens/AccidentInsurance/components/PreviewAAA';
import AccidentPackage from './screens/AccidentInsurance/AccidentPackage';
import AccidentIntroScreen from './screens/AccidentInsurance/AccidentIntroScreen';
import AccidentBuyerInfo from './screens/AccidentInsurance/AccidentBuyerInfo';
import AccidentPreviewInfo from './screens/AccidentInsurance/AccidentPreviewInfo';

//VBIACare
import ACarePackage from './screens/VBIACare/Package';
import ACareIntro from './screens/VBIACare/Intro';
import ACareSurvey from './screens/VBIACare/Survey';
import ACareBuyer from './screens/VBIACare/Buyer';
import ACareListCustomer from './screens/VBIACare/ListCustomer';
import ACareItemCustomer from './screens/VBIACare/ItemCustomer';
import ACarePreview from './screens/VBIACare/Preview';
import ACareCamera from './screens/VBIACare/Camera';

// 24h
import Package24h from './screens/24hInsurance/Package';
import IntroScreen24h from './screens/24hInsurance/IntroScreen';
import Buyer24h from './screens/24hInsurance/Buyer';
import Preview24h from './screens/24hInsurance/Preview';
import Camera24h from './screens/24hInsurance/Camera';

import KPI from './screens/tab/KPI';
import Home from './screens/tab/Home';

//Motorbike

import Introduction from './screens/Motorbike/Introduction';
import Package from './screens/Motorbike/Package';
import Buyer from './screens/Motorbike/Buyer';
import Preview from './screens/Motorbike/Preview';
import Camera from './screens/Motorbike/Camera';

// TNDSCar
import IntroductionTNDSCar from './screens/TNDSCAR/IntroductionTNDSCar';
import InfomationCar from './screens/TNDSCAR/InfomationCar';
import PackageTNDSCar from './screens/TNDSCAR/Package';
import BuyerCar from './screens/TNDSCAR/Buyer';
import PreviewCar from './screens/TNDSCAR/Preview';
import CameraCar from './screens/TNDSCAR/Camera';


//Login
import LoginNew from './screens/Login/Login'
import Register from './screens/Login/Register'
import RegisterSuccess from './screens/Login/RegisterSuccess'
import ForgetPass from './screens/Login/ForgetPass'
import RecoverPasswordSuccess from './screens/Login/RecoverPasswordSuccess'


//User
import ChangePass from './screens/Account/ChangePassWord'
import ChangePassSuccess from './screens/Account/ChangePassSuccess'
import UserNew from './screens/Account/UserNew'

import Commissions from './screens/Commissions'
import IntroCommission from './screens/Commissions/IntroCommission'
import ManageCommission from './screens/Commissions/ManageCommission'
import Benefits from './screens/Benefits'

//Contracts
import CustomerContract from './screens/CustomerContract/CustomerContract'
import DetailContract from './screens/CustomerContract/DetailContract'
import PreviewLog from './screens/CustomerContract/PreviewLog'
import PreviewPhysical from './screens/CustomerContract/PreviewCarPhysical'
import PersonalContract from './screens/PersonalContract/PersonalContract'
import PreviewCarPhotoPhysical from './screens/CustomerContract/components/CarPhysical/CarPhotoPhysical'
import PreviewConfirmImage from './screens/CustomerContract/components/CarPhysical/ConfirmImage'
import PreviewPhotoCoBSX from './screens/CustomerContract/components/CarPhysical/PhotoCoBSX'
import PreviewTakePhotoPhysical from './screens/CustomerContract/components/CarPhysical/TakePhotoPhysical'
import PreviewPhotoKhongBSX from './screens/CustomerContract/components/CarPhysical/PhotoKhongBSX'

//Compensation_Contract
import BenefitInsurance from './screens/CompensationContract/BenefitInsurance'
import AddCompensation from './screens/CompensationContract/AddCompensation'
import DetailCompensation from './screens/CompensationContract/DetailCompensation'
import ListCompensation from './screens/CompensationContract/ListCompensation'
import DetailClaim from './screens/CompensationContract/DetailClaim'

// Notify
import ListNotify from './screens/ListNotify/ListNotify';
import DetailNotify from './screens/ListNotify/DetailNotify';

// Vững Tâm An
import PackageVTA from './screens/VungTamAn/Package';
import IntroScreenVTA from './screens/VungTamAn/IntroScreen';
import BuyerVTA from './screens/VungTamAn/Buyer';
import PreviewVTA from './screens/VungTamAn/Preview';

// An Sinh Gia Đình
import PackageFaSecure from './screens/FamilySecurity/Package';
import IntroScreenFaSecure from './screens/FamilySecurity/IntroScreen';
import BuyerFaSecure from './screens/FamilySecurity/Buyer';
import PreviewFaSecure from './screens/FamilySecurity/Preview';

// Revenue
import ManageRevenue from './screens/Revenue/ManageRevenue'

// ReferralAccount
import ListReferralAcc from './components/listReferralAcc/ListReferralAcc'

// Fmarket
import FmarketIntro from './screens/Fmarket/FmarketIntro'
import FmarketAcc from './screens/Fmarket/FmarketAcc'
import FmarketCamera from './screens/Fmarket/FmarketCamera'
import { nameApp } from './config/System';

const store = createStore(reducer, applyMiddleware(thunk))

const Root = () => (
    <Provider store={store}>
        <Router>
            <Stack key="root">
                 {/* <Scene key="UserNew" hideNavBar={true} component={UserNew} /> */}

                <Scene key="app" hideNavBar={true} component={App} />

                <Scene key="tab" panHandlers={null} hideNavBar={true} component={Tab} />

                <Scene key="Login" hideNavBar={true} component={Login} />

                <Scene key="IntroductionCarPhysical" hideNavBar={true} component={IntroductionCarPhysical} />
                <Scene key="InfomationCarPhysical" hideNavBar={true} component={InfomationCarPhysical} />
                <Scene key="BuyerCarPhysical" hideNavBar={true} component={BuyerCarPhysical} />
                <Scene key="PreviewCarPhysical" hideNavBar={true} component={PreviewCarPhysical} />
                <Scene key="CameraCarPhysical" hideNavBar={true} component={CameraCarPhysical} />
                <Scene key="CarPhotoPhysical" hideNavBar={true} component={CarPhotoPhysical} />
                <Scene key="TakePhotoPhysical" hideNavBar={true} component={TakePhotoPhysical} />
                <Scene key="ConfirmImage" hideNavBar={true} component={ConfirmImage} />
                <Scene key="PackageCarPhysical" hideNavBar={true} component={PackageCarPhysical} />
                <Scene key="PhotoCar" hideNavBar={true} component={PhotoCar} />
                <Scene key="PhotoCarY" hideNavBar={true} component={PhotoCarY} />

                <Scene key="PackageTNDSCar" hideNavBar={true} component={PackageTNDSCar} />
                <Scene key="InfomationCar" hideNavBar={true} component={InfomationCar} />

                <Scene key="BuyerCar" hideNavBar={true} component={BuyerCar} />

                <Scene key="PreviewCar" hideNavBar={true} component={PreviewCar} />
                <Scene key="IntroductionTNDSCar" hideNavBar={true} component={IntroductionTNDSCar} />

                <Scene key="OtpCode" hideNavBar={true} component={OtpCode} />
                <Scene key="History" hideNavBar={true} component={History} />
                <Scene key="Favors" hideNavBar={true} component={Favors} />
                <Scene key="FavorsDetail" hideNavBar={true} component={FavorsDetail} />
                <Scene key="Voucher" hideNavBar={true} component={Voucher} />
                <Scene key="CustomerManagement" hideNavBar={true} component={CustomerManagement} />
                <Scene key="Customer" hideNavBar={true} component={Customer} />
                <Scene key="RequestWithDrawal" hideNavBar={true} component={RequestWithDrawal} />
                <Scene key="DealSuccess" hideNavBar={true} component={DealSuccess} />
                <Scene key="KpiPlan" hideNavBar={true} component={KpiPlan} />
                <Scene key="TransactionHistory" hideNavBar={true} component={TransactionHistory} />
                <Scene key="InsuranceType" panHandlers={null} hideNavBar={true} component={InsuranceType} />
                <Scene key="OTPconfirm" hideNavBar={true} component={OTPconfirm} />
                <Scene key="Pay" panHandlers={null} hideNavBar={true} component={Pay} />
                <Scene key="ModalGuideTakeCamera" hideNavBar={true} component={ModalGuideTakeCamera} />
                <Scene key="PaymentView" hideNavBar={true} component={PaymentView} />
                <Scene key="ListCustomers" hideNavBar={true} component={ListCustomers} />
                <Scene key="Notify" hideNavBar={true} component={Notify} />
                <Scene key="FakeCalender" hideNavBar={true} component={FakeCalender} />

                <Scene key="InsuredSuggest" hideNavBar={true} component={InsuredSuggest} />
                <Scene key="CustomerDetail" hideNavBar={true} component={CustomerDetail} />

                <Scene key="ElectronicCertificate" hideNavBar={true} component={ElectronicCertificate} />
                <Scene key="FakeChat" hideNavBar={true} component={FakeChat} />
                <Scene key="FakeCertificate" hideNavBar={true} component={FakeCertificate} />
                <Scene key="User" hideNavBar={true} component={User} />

                <Scene key="NodataBank" hideNavBar={true} component={NodataBank} />
                <Scene key="AddBank" hideNavBar={true} component={AddBank} />
                <Scene key="BanksAcount" hideNavBar={true} component={BanksAcount} />
                <Scene key="EditBankAcount" hideNavBar={true} component={EditBankAcount} />


                <Scene key="CarIntroduction" hideNavBar={true} component={CarIntroduction} />
                <Scene key="CarProducer" hideNavBar={true} component={CarProducer} />
                <Scene key="CarProducerPreview" hideNavBar={true} component={CarProducerPreview} />
                <Scene key="CarInfomation" hideNavBar={true} component={CarInfomation} />
                <Scene key="CarRegisterInsuranceInfo" hideNavBar={true} component={CarRegisterInsuranceInfo} />
                <Scene key="ListRequestBuyInsurance" hideNavBar={true} component={ListRequestBuyInsurance} />
                <Scene key="CarCorner" hideNavBar={true} component={CarCorner} />
                <Scene key="TakePhoto" hideNavBar={true} component={TakePhoto} />
                <Scene key="CarPhoto" hideNavBar={true} component={CarPhoto} />
                <Scene key="CarInfoInsurance" hideNavBar={true} component={CarInfoInsurance} />
                <Scene key="CarInfomationBuyer" hideNavBar={true} component={CarInfomationBuyer} />
                <Scene key="CarInsuranceRegisterInfo" hideNavBar={true} component={CarInsuranceRegisterInfo} />
                <Scene key="CarInsurancePackage" hideNavBar={true} component={CarInsurancePackage} />

                <Scene key="TNDSIntroduction" hideNavBar={true} component={TNDSIntroduction} />
                <Scene key="CarInfomationTNDS" hideNavBar={true} component={CarInfomationTNDS} />
                <Scene key="TNDSProducerPreview" hideNavBar={true} component={TNDSProducerPreview} />
                <Scene key="CarOwnerInfomation" hideNavBar={true} component={CarOwnerInfomation} />
                <Scene key="AddressGetContract" hideNavBar={true} component={AddressGetContract} />
                <Scene key="CivilDetailBuy" hideNavBar={true} component={CivilDetailBuy} />
                <Scene key="ValuePackageInsurance" hideNavBar={true} component={ValuePackageInsurance} />
                <Scene key="TNDSInsurancePackage" hideNavBar={true} component={TNDSInsurancePackage} />
                <Scene key="TNDSConfirmInfomation" hideNavBar={true} component={TNDSConfirmInfomation} />

                <Scene key="AccidentInsuranceIntroduction" hideNavBar={true} component={AccidentInsuranceIntroduction} />
                <Scene key="AccidentConfirmInfomation" hideNavBar={true} component={AccidentConfirmInfomation} />
                <Scene key="AccidentInsurancePackage" hideNavBar={true} component={AccidentInsurancePackage} />
                <Scene key="AccidentInsuranceBuyerInfo" hideNavBar={true} component={AccidentInsuranceBuyerInfo} />
                <Scene key="CarInfomationAccident" hideNavBar={true} component={CarInfomationAccident} />


                <Scene key="FlightInformation" hideNavBar={true} component={FlightInformation} />
                <Scene key="FlightIntroduction" hideNavBar={true} component={FlightIntroduction} />
                <Scene key="CustomerInfo" hideNavBar={true} component={CustomerInfo} />
                <Scene key="InsurancePack" hideNavBar={true} component={InsurancePack} />
                <Scene key="BillExportInfo" hideNavBar={true} component={BillExportInfo} />
                <Scene key="ConfirmInfomation" hideNavBar={true} component={ConfirmInfomation} />

                <Scene key="TourInfomation" hideNavBar={true} component={TourInfomation} />
                <Scene key="TravelInsurancePackage" hideNavBar={true} component={TravelInsurancePackage} />
                <Scene key="TravelInsuranceBuyerInfo" hideNavBar={true} component={TravelInsuranceBuyerInfo} />
                <Scene key="TravelInsuranceIntro" hideNavBar={true} component={TravelInsuranceIntro} />

                <Scene key="HouseInfomation" hideNavBar={true} component={HouseInfomation} />
                <Scene key="HouseInsuranceIntro" hideNavBar={true} component={HouseInsuranceIntro} />
                <Scene key="HouseInsurancePackage" hideNavBar={true} component={HouseInsurancePackage} />
                <Scene key="HouseInsuranceBuyerInfo" hideNavBar={true} component={HouseInsuranceBuyerInfo} />
                <Scene key="ReviewInfomation" hideNavBar={true} component={ReviewInfomation} />

                <Scene key="BuyerAAA" hideNavBar={true} component={BuyerAAA} />
                <Scene key="InsurCustomerAAA" hideNavBar={true} component={InsurCustomerAAA} />
                <Scene key="PreviewAAA" hideNavBar={true} component={PreviewAAA} />
                <Scene key="AccidentPackage" hideNavBar={true} component={AccidentPackage} />
                <Scene key="AccidentIntroScreen" hideNavBar={true} component={AccidentIntroScreen} />
                <Scene key="AccidentBuyerInfo" hideNavBar={true} component={AccidentBuyerInfo} />
                <Scene key="AccidentPreviewInfo" hideNavBar={true} component={AccidentPreviewInfo} />
                <Scene key="CameraCar" hideNavBar={true} component={CameraCar} />


                {/*Motorbike*/}
                <Scene key="Introduction" hideNavBar={true} component={Introduction} />
                <Scene key="Package" hideNavBar={true} component={Package} />
                <Scene key="Buyer" hideNavBar={true} component={Buyer} />
                <Scene key="Preview" hideNavBar={true} component={Preview} />
                <Scene key="Camera" hideNavBar={true} component={Camera} />

                {/*Login đồng tháp*/}
                <Scene key="LoginNew" panHandlers={null} hideNavBar={true} component={LoginNew} />
                <Scene key="Register" hideNavBar={true} component={Register} />
                <Scene key="RegisterSuccess" hideNavBar={true} component={RegisterSuccess} />
                <Scene key="RecoverPasswordSuccess" hideNavBar={true} component={RecoverPasswordSuccess} />
                <Scene key="ForgetPass" hideNavBar={true} component={ForgetPass} />


                {/* User */}
                <Scene key="ChangePass" hideNavBar={true} component={ChangePass} />
                <Scene key="ChangePassSuccess" panHandlers={null} hideNavBar={true} component={ChangePassSuccess} />
                <Scene key="UserNew" hideNavBar={true} component={UserNew} />
                <Scene key="UpdateFullName" hideNavBar={true} component={UpdateFullName} />
                <Scene key="UpdateEmail" hideNavBar={true} component={UpdateEmail} />
                <Scene key="login" hideNavBar={true} component={Login} />
                <Scene key="Profile" hideNavBar={true} component={Profile} />
                <Scene key="UpdateProfile" hideNavBar={true} component={UpdateProfile} />
                <Scene key="TPBankAcc" hideNavBar={true} component={TPBankAcc} />
                <Scene key="TPBankFace" hideNavBar={true} component={TPBankFace} />
                <Scene key="TPBankIntro" hideNavBar={true} component={TPBankIntro} />
                <Scene key="TPBankCamera" hideNavBar={true} component={TPBankCamera} />
                <Scene key="CameraICType" hideNavBar={true} component={CameraICType} />
                <Scene key="TPBankWebView" panHandlers={null} hideNavBar={true} component={TPBankWebView} />
                
                <Scene key="FrequentlyQuestion" hideNavBar={true} component={FrequentlyQuestion} />

                <Scene key="KPI" hideNavBar={true} component={KPI} />

                <Scene key="Commissions" hideNavBar={true} component={Commissions} />
                <Scene key="IntroCommission" hideNavBar={true} component={IntroCommission} />
                <Scene key="ManageCommission" hideNavBar={true} component={ManageCommission} />

                <Scene key="ManageRevenue" hideNavBar={true} component={ManageRevenue} />
                <Scene key="Benefits" hideNavBar={true} component={Benefits} />

                {/* Contracts */}
                <Scene key="CustomerContract" hideNavBar={true} component={CustomerContract} />
                <Scene key="DetailContract" hideNavBar={true} component={DetailContract} />
                <Scene key="PreviewLog" hideNavBar={true} component={PreviewLog} />
                <Scene key="PreviewPhysical" hideNavBar={true} component={PreviewPhysical} />
                <Scene key="PersonalContract" hideNavBar={true} component={PersonalContract} />
                <Scene key="PreviewCarPhotoPhysical" hideNavBar={true} component={PreviewCarPhotoPhysical} />
                <Scene key="PreviewConfirmImage" hideNavBar={true} component={PreviewConfirmImage} />
                <Scene key="PreviewPhotoCoBSX" hideNavBar={true} component={PreviewPhotoCoBSX} />
                <Scene key="PreviewTakePhotoPhysical" hideNavBar={true} component={PreviewTakePhotoPhysical} />
                <Scene key="PreviewPhotoKhongBSX" hideNavBar={true} component={PreviewPhotoKhongBSX} />

                {/* MotorPhysical */}
                <Scene key="IntroductionMotorPhysical" hideNavBar={true} component={IntroductionMotorPhysical} />
                <Scene key="MotorPhysicalPackage" hideNavBar={true} component={MotorPhysicalPackage} />
                <Scene key="BuyerMotorPhysical" hideNavBar={true} component={BuyerMotorPhysical} />
                <Scene key="PreviewMotorPhysical" hideNavBar={true} component={PreviewMotorPhysical} />
                <Scene key="CameraPhysical" hideNavBar={true} component={CameraPhysical} />

                {/* House_Insurance */}
                <Scene key="IntroductionHouse" hideNavBar={true} component={IntroductionHouse} />
                <Scene key="HousePackage" hideNavBar={true} component={HousePackage} />
                <Scene key="BuyerHouse" hideNavBar={true} component={BuyerHouse} />
                <Scene key="PreviewHouse" hideNavBar={true} component={PreviewHouse} />

                {/* Travel_Insurance */}
                <Scene key="IntroductionTravel" hideNavBar={true} component={IntroductionTravel} />
                <Scene key="InfoScreen" hideNavBar={true} component={InfoScreen} />
                <Scene key="TravelPackage" hideNavBar={true} component={TravelPackage} />
                <Scene key="BuyerTravel" hideNavBar={true} component={BuyerTravel} />
                <Scene key="PreviewTravel" hideNavBar={true} component={PreviewTravel} />

                {/* Delay_Flight */}
                <Scene key="IntroductionDelayFlight" hideNavBar={true} component={IntroductionDelayFlight} />
                <Scene key="InfoScreenDelayFlight" hideNavBar={true} component={InfoScreenDelayFlight} />
                <Scene key="PackageDelayFlight" hideNavBar={true} component={PackageDelayFlight} />
                <Scene key="BuyerDelayFlight" hideNavBar={true} component={BuyerDelayFlight} />
                <Scene key="PreviewDelayFlight" hideNavBar={true} component={PreviewDelayFlight} />

                {/* Compensation_Contract */}
                <Scene key="BenefitInsurance" hideNavBar={true} component={BenefitInsurance} />
                <Scene key="AddCompensation" hideNavBar={true} component={AddCompensation} />
                <Scene key="DetailCompensation" hideNavBar={true} component={DetailCompensation} />
                <Scene key="ListCompensation" hideNavBar={true} component={ListCompensation} />
                <Scene key="DetailClaim" hideNavBar={true} component={DetailClaim} />

                {/* 24hInsurance */}
                <Scene key="Package24h" hideNavBar={true} component={Package24h} />
                <Scene key="IntroScreen24h" hideNavBar={true} component={IntroScreen24h} />
                <Scene key="Buyer24h" hideNavBar={true} component={Buyer24h} />
                <Scene key="Preview24h" hideNavBar={true} component={Preview24h} />
                <Scene key="Camera24h" hideNavBar={true} component={Camera24h} />

                {/* List_Notify */}
                <Scene key="ListNotify" hideNavBar={true} component={ListNotify} />
                <Scene key="DetailNotify" hideNavBar={true} component={DetailNotify} />

                {/* Vững Tâm An */}
                <Scene key="PackageVTA" hideNavBar={true} component={PackageVTA} />
                <Scene key="IntroScreenVTA" hideNavBar={true} component={IntroScreenVTA} />
                <Scene key="BuyerVTA" hideNavBar={true} component={BuyerVTA} />
                <Scene key="PreviewVTA" hideNavBar={true} component={PreviewVTA} />

                {/* An Sinh Gia Đình */}
                <Scene key="PackageFaSecure" hideNavBar={true} component={PackageFaSecure} />
                <Scene key="IntroScreenFaSecure" hideNavBar={true} component={IntroScreenFaSecure} />
                <Scene key="BuyerFaSecure" hideNavBar={true} component={BuyerFaSecure} />
                <Scene key="PreviewFaSecure" hideNavBar={true} component={PreviewFaSecure} />

                {/* VBIACare */}
                <Scene key="ACareIntro" hideNavBar={true} component={ACareIntro} />
                <Scene key="ACarePackage" hideNavBar={true} component={ACarePackage} />
                <Scene key="ACareBuyer" hideNavBar={true} component={ACareBuyer} />
                <Scene key="ACareListCustomer" hideNavBar={true} component={ACareListCustomer} />
                <Scene key="ACareItemCustomer" hideNavBar={true} component={ACareItemCustomer} />
                <Scene key="ACarePreview" hideNavBar={true} component={ACarePreview} />
                <Scene key="ACareSurvey" hideNavBar={true} component={ACareSurvey} />
                <Scene key="ACareCamera" hideNavBar={true} component={ACareCamera} />

                <Scene key="ListReferralAcc" hideNavBar={true} component={ListReferralAcc} />

                {/* VBIACare */}
                <Scene key="FmarketIntro" hideNavBar={true} component={FmarketIntro} />
                <Scene key="FmarketAcc" hideNavBar={true} component={FmarketAcc} />
                <Scene key="FmarketCamera" hideNavBar={true} component={FmarketCamera} />
            </Stack>
        </Router>
    </Provider>
);

export default Root;
