
import { Dimensions } from 'react-native';
import moment from "moment";
import Config from 'react-native-config';

// export const URL = 'https://gw.epti.vn';
// export const domain = 'inso.vn';
// export const nameApp = 'IAGENT';
// export const tokenDefault = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsSWQiOiI2MWI4NDUyZjA5N2RiYTAwNWUzYThmNjAiLCJjaGFubmVsQ29kZSI6IklOU08iLCJjaGFubmVsTmFtZSI6IklOU08iLCJvcmdhbml6YXRpb25JZCI6IjVmMmMxODFmOTc5N2FmMDAxYzA3YzkxNiIsIm9yZ2FuaXphdGlvbkNvZGUiOiJJTlNPIiwib3JnYW5pemF0aW9uTmFtZSI6IkPDtG5nIHR5IEPhu5UgcGjhuqduIElOU08gVmnhu4d0IE5hbSIsInN1YiI6IjYyMmIyMmQwYjRiZmVkMDAzYTQ4ZGNlMSIsInByZWZlcnJlZF91c2VybmFtZSI6Imd1ZXN0IiwiZW1haWwiOiJndWVzdEBpbnNvLnZuIiwiZnVsbE5hbWUiOiJHdWVzdC1JTlNPIiwiaXNBZG1pbiI6ZmFsc2UsIm9yZ2FuaXphdGlvblR5cGUiOiJBR0VOVCIsImlhdCI6MTY0Njk5NDc2MSwiZXhwIjoyNjQ2OTk0NzYwfQ.ZR1QMDjQukpdMMux8eVllBwEisrhII3OeDyYMbsJyIw';
// export const linkWeb = 'https://capdon.inso.vn';

export const URL = Config.URL;
export const domain = Config.DOMAIN;
export const nameApp = Config.NAME_APP;
export const tokenDefault = Config.TOKEN_DEFAULT;
export const linkWeb = Config.LINK_WEB;

export const os_version = '16.4';
export const app_version = '0.1';
export const deviceId = 'f8498429420942';
export const screen = Dimensions.get('window');
export const primaryColor = '#30BEBC';
export const Color = '#30BEBC';
export const NewColor = '#30BEBC';
export const ColorSelect = '#F58220';
export const NewColorDisable = '#D9D9D9';
export const subColor = '#30BEBC';
export const ColorStatusBar = '#30BEBC';
export const Background = '#e4faf3';
export const TxtBlack = '#161313';
export const TxtColor = '#414042';
export const ErrTxtColor = '#f44336';
export const TxtGrey = '#8a8989';
export const colorText = '#B3B2B3';
export const colorBackground = '#F6F5F6';
export const colorTitle = '#414042';
export const errValidColor = '#ED1C24';
export const textDisable = '#D9D9D9';
export const tintColorInput = '#8D8C8D';
export const colorPlaceholder = '#8D8C8D';
export const colorNote = '#414042';
export const colorNote2 = '#30BEBC';
export const colorPass = '#8D8C8D';
export const colorIcon = '#414042';
export const colorCam = '#fff';
export const colorBkgCam = '#414042';
export const colorIconCar = '#30BEBC';
export const colorBoxBlur = '#D9D9D9';
export const colorBoxBorder = '#30BEBC';
export const colorBoxBorder1 = '#fff';
export const colorDown = '#8D8C8D';
export const colorRegis = '#30BEBC';
export const colorCancel = '#BE3030';
export const colorEffect = '#30BEBC';
export const colorPaid = '#ACE5E4';
export const colorUnPay = '#FEC336';
export const colorGetMore = '#ACE5E4';
export const colorTitleAlert = '#ED1C24';

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
    // {
    //     code: 'HC10',
    //     title: 'BH ACare',
    //     title2: 'BH ACare\n '
    // }
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
        codes: '',
        type: 'HOUSE',
    },
    {
        id: '12',
        status: 'active',
        name: 'BH Chung cư',
        code: 'H2',
        codes: '',
        type: 'HOUSE',
    },
    {
        id: '13',
        status: 'active',
        name: 'BH Du lịch trong nước',
        code: 'T1',
        codes: '',
        type: 'TRAVEL',
    },
    {
        id: '14',
        status: 'active',
        name: 'BH Du lịch quốc tế',
        code: 'T2',
        codes: '',
        type: 'TRAVEL_INTERNATIONAL',
    },
    {
        id: '15',
        status: 'active',
        name: 'BH Trễ chuyến bay',
        code: 'DF1',
        codes: '',
        type: 'FLIGHT_DELAY',
    },
    {
        id: '16',
        status: 'active',
        name: 'BH ACare',
        code: 'HC10',
        codes: '',
        type: 'HEALTH_CARE',
    },
];