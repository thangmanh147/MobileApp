
import { Dimensions } from 'react-native';
import moment from "moment";
import Config from 'react-native-config';

// export const URL = 'https://gw.capdon.vn';
// export const domain = 'epti.vn';
// export const nameApp = 'MOBILE_EPTI_LIVE';
// export const tokenDefault = '';
// export const linkWeb = 'https://epti.vn';

export const URL = Config.URL;
export const domain = Config.DOMAIN;
export const nameApp = Config.NAME_APP;
export const tokenDefault = Config.TOKEN_DEFAULT;
export const linkWeb = Config.LINK_WEB;

export const os_version = '16.4';
export const app_version = '0.1';
export const deviceId = 'f8498429420942';
export const screen = Dimensions.get('window');
export const primaryColor = '#007CC4';
export const Color = '#007CC4';
export const NewColor = '#F58220';
export const ColorSelect = '#F58220';
export const NewColorDisable = '#D9D9D9';
export const subColor = '#007CC4';
export const ColorStatusBar = '#007CC4';
export const Background = '#e4faf3';
export const TxtBlack = '#161313';
export const TxtColor = '#414042';
export const ErrTxtColor = '#f44336';
export const TxtGrey = '#8a8989';
export const colorText = '#89BBD7';
export const colorBackground = '#CCE8F9';
export const colorTitle = '#007CC4';
export const errValidColor = '#ED1C24';
export const textDisable = '#D9D9D9';
export const tintColorInput = '#007CC4';
export const colorPlaceholder = '#414042';
export const colorNote = '#007CC4';
export const colorNote2 = '#007CC4';
export const colorPass = '#8D8C8D';
export const colorIcon = '#007CC4';
export const colorCam = '#007CC4';
export const colorBkgCam = '#FFF200';
export const colorIconCar = '#086390';
export const colorBoxBlur = '#EBBD96';
export const colorBoxBorder = '#BDBDBD';
export const colorBoxBorder1 = '#F58220';
export const colorDown = '#414042';
export const colorRegis = '#F58220';
export const colorCancel = '#ED1C24';
export const colorEffect = '#00A651';
export const colorPaid = '#89CBA9';
export const colorUnPay = '#FFCC00';
export const colorGetMore = '#89BBD7';
export const colorTitleAlert = '#F58220';

export const nowDate = moment(new Date()).format('DD/MM/YYYY');

export const dataContracts = [
    {
        code: 'C1',
        title: 'BH Trách nhiệm\ndân sự ô tô',
        title2: 'BH TNDS\nô tô'
    },
    {
        code: 'C2',
        title: 'BH Vật chất\nxe ô tô',
        title2: 'BH Vật chất\nxe ô tô'
    },
    {
        code: 'M1',
        title: 'BH Trách nhiệm\ndân sự xe máy',
        title2: 'BH TNDS\nxe máy'
    },
    {
        code: 'A1',
        codes: 'A2',
        title: 'BH Tai nạn',
        title2: 'BH Tai nạn\n '
    },
    {
        code: 'M3',
        title: 'BH Vật chất\nxe máy',
        title2: 'BH Vật chất\nxe máy'
    },
    {
        code: 'H1',
        codes: 'H2',
        title: 'BH Nhà\ntư nhân',
        title2: 'BH Nhà\ntư nhân'
    },
    {
        code: 'T1',
        codes: 'T2',
        title: 'BH Du lịch',
        title2: 'BH Du lịch\n '
    },
    {
        code: 'DF1',
        title: 'BH Trễ\nchuyến bay',
        title2: 'BH Trễ\nchuyến bay'
    },
];

export const contractsFilter = [
    {
        id: '1',
        status: 'active',
        name: 'Tất cả',
    },
    {
        id: '2',
        status: 'active',
        name: 'BH Trách nhiệm dân sự ô tô',
        code: 'C1',
        codes: '',
        type: 'CAR',
    },
    {
        id: '3',
        status: 'active',
        name: 'BH TNDS bắt buộc (kèm TNLXPX và NNTX)',
        code: 'C3',
        codes: '',
        type: 'CAR',
    },
    {
        id: '4',
        status: 'active',
        name: 'BH Vật chất xe ô tô',
        code: 'C2',
        codes: '',
        type: 'CAR',
    },
    {
        id: '5',
        status: 'active',
        name: 'BH Trách nhiệm dân sự xe máy',
        code: 'M1',
        codes: '',
        type: 'MOTORBIKE',
    },
    {
        id: '6',
        status: 'active',
        name: 'BH TNDS bắt buộc (kèm người ngồi trên xe)',
        code: 'M2',
        codes: '',
        type: 'MOTORBIKE',
    },
    {
        id: '7',
        status: 'active',
        name: 'BH Tai nạn cá nhân',
        code: 'A1',
        codes: '',
        type: 'INDIVIDUAL_ACCIDENT',
    },
    {
        id: '8',
        status: 'active',
        name: 'BH Tai nạn hộ gia đình',
        code: 'A2',
        codes: '',
        type: 'FAMILY_ACCIDENT',
    },
    {
        id: '9',
        status: 'active',
        name: 'BH Vật chất xe máy',
        code: 'M3',
        codes: '',
        type: 'MOTORBIKE',
    },
    {
        id: '11',
        status: 'active',
        name: 'BH Nhà tư nhân',
        code: 'H1',
        codes: 'H2',
        type: 'HOUSE',
    },
    {
        id: '12',
        status: 'active',
        name: 'BH Du lịch trong nước',
        code: 'T1',
        codes: '',
        type: 'TRAVEL',
    },
    {
        id: '13',
        status: 'active',
        name: 'BH Du lịch quốc tế',
        code: 'T2',
        codes: '',
        type: 'TRAVEL_INTERNATIONAL',
    },
    {
        id: '14',
        status: 'active',
        name: 'BH Trễ chuyến bay',
        code: 'DF1',
        codes: '',
        type: 'FLIGHT_DELAY',
    },
];
