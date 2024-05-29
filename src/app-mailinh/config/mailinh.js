
import { Dimensions } from 'react-native';
import moment from "moment";
import Config from 'react-native-config';

// export const URL = 'https://gw.epti.vn';
// export const domain = 'epti.vn';
// export const nameApp = 'MOBILE_MAILINH_LIVE';
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
export const primaryColor = '#00A651';
export const Color = '#00A651';
export const NewColor = '#00A651';
export const ColorSelect = '#F58220';
export const NewColorDisable = '#D9D9D9';
export const subColor = '#00A651';
export const ColorStatusBar = '#00A651';
export const Background = '#e4faf3';
export const TxtBlack = '#161313';
export const TxtColor = '#414042';
export const ErrTxtColor = '#f44336';
export const TxtGrey = '#8a8989';
export const colorText = '#89CBA9';
export const colorBackground = '#F6F5F6';
export const colorTitle = '#414042';
export const errValidColor = '#ED1C24';
export const textDisable = '#D9D9D9';
export const tintColorInput = '#00A651';
export const colorPlaceholder = '#414042';
export const colorNote = '#00A651';
export const colorNote2 = '#00A651';
export const colorPass = '#00A651';
export const colorIcon = '#00A651';
export const colorCam = '#00A651';
export const colorBkgCam = '#FFF200';
export const colorIconCar = '#018837';
export const colorBoxBlur = '#D9D9D9';
export const colorBoxBorder = '#00A651';
export const colorBoxBorder1 = '#fff';
export const colorDown = '#00A651';
export const colorRegis = '#FFF200';
export const colorCancel = '#ED1C24';
export const colorEffect = '#00A651';
export const colorPaid = '#89CBA9';
export const colorUnPay = '#FFCC00';
export const colorGetMore = '#89CBA9';
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
    // {
    //     code: 'A3',
    //     title: 'An Sinh\nMai Linh',
    //     title2: 'An Sinh\nMai Linh'
    // },
    // {
    //     code: 'A4',
    //     title: 'BH Vững Tâm An',
    //     title2: 'BH Vững Tâm\nAn'
    // },
    {
        code: 'A8',
        title: 'An Sinh\nGia Đình',
        title2: 'An Sinh\nGia Đình'
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
        name: 'An Sinh Gia Đình',
        code: 'A8',
        codes: '',
        type: 'INDIVIDUAL_ACCIDENT',
    },
    {
        id: '8',
        status: 'active',
        name: 'An Sinh Mai Linh',
        code: 'A3',
        codes: '',
        type: 'INDIVIDUAL_ACCIDENT',
    },
    {
        id: '9',
        status: 'active',
        name: 'BH Vững Tâm An',
        code: 'A4',
        codes: '',
        type: 'INDIVIDUAL_ACCIDENT',
    },
];