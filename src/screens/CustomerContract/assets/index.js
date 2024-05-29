import {nameApp} from '../../../config/System';
import React from 'react';
import Icon24hSvg from '../../../config/images/icon_contracts/Icon24hSvg';
import MotorIconSvg from '../../../config/images/icon_contracts/MotorIconSvg';
import TravelIconSvg from '../../../config/images/icon_contracts/TravelIconSvg';
import HomeIconSvg from '../../../config/images/icon_contracts/HomeIconSvg';
import FlightIconSvg from '../../../config/images/icon_contracts/FlightIconSvg';
import CarPhysicalIconSvg from '../../../config/images/icon_contracts/CarPhysicalIconSvg';
import CarIconSvg from '../../../config/images/icon_contracts/CarIconSvg';
import AccidentIconSvg from '../../../config/images/icon_contracts/AccidentIconSvg';

export const dateImages = {
    'A1': {
        icon: <AccidentIconSvg height={40} width={40} />,
        name: 'Tai nạn cá nhân'
    },
    'A2': {
        icon: <AccidentIconSvg height={40} width={40} />,
        name: 'Tai nạn hộ gia đình'
    },
    'A3': {
        icon: <Icon24hSvg height={40} width={40} />,
        name: nameApp.includes('YCHI') ? 'An Sinh Y Chi' : 'An Sinh Mai Linh'
    },
    'A4': {
        icon: <AccidentIconSvg height={40} width={40} />,
        name: 'Vững Tâm An'
    },
    'A8': {
        icon: <Icon24hSvg height={40} width={40} />,
        name: 'An Sinh Gia Đình'
    },
    'C1': {
        icon: <CarIconSvg height={40} width={40} />,
        name: 'TNDS ô tô'
    },
    'C2': {
        icon: <CarPhysicalIconSvg height={40} width={40} />,
        name: 'Vật chất xe ô tô'
    },
    'C3': {
        icon: <CarIconSvg height={40} width={40} />,
        name: 'TNDS bắt buộc (kèm TNLXPX và NNTX)',
    },
    'DF1': {
        icon: <FlightIconSvg height={40} width={40} />,
        name: 'Trễ chuyến bay'
    },
    'H1': {
        icon: <HomeIconSvg height={40} width={40} />,
        name: 'Nhà tư nhân'
    },
    'H2': {
        icon: <HomeIconSvg height={40} width={40} />,
        name: 'Nhà tư nhân'
    },
    'M1': {
        icon: <MotorIconSvg height={40} width={40} />,
        name: 'TNDS xe máy'
    },
    'M2': {
        icon: <MotorIconSvg height={40} width={40} />,
        name: 'TNDS bắt buộc (kèm người ngồi trên xe)'
    },
    'M3': {
        icon: <MotorIconSvg height={40} width={40} />,
        name: 'Vật chất xe máy'
    },
    'T1': {
        icon: <TravelIconSvg height={40} width={40} />,
        name: 'Du lịch trong nước'
    },
    'T2': {
        icon: <TravelIconSvg height={40} width={40} />,
        name: 'Du lịch quốc tế'
    },
    'HC10': {
        icon: <Icon24hSvg height={40} width={40} />,
        name: 'ACare'
    },
    'default': {
        icon: <CarPhysicalIconSvg height={40} width={40} />,
        name: ''
    },
}