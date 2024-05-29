import React, {Component} from 'react';
import Input from '../../screens/CarInsurance/components/Input';
import {ERROR_NAME_FORMAT, ERROR_NAME_REQUIRED} from '../../config/ErrorMessage';
import { colorPlaceholder, colorText, textDisable } from '../../config/System';
import SimpleToast from 'react-native-simple-toast';
import { checkLeapYear, checkMonth } from '../Functions';
import moment from 'moment';

class DateFill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.value,
            errorDate: '',
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {value} = this.props;
        // const {date} = this.state;
        if(value !== prevProps.value) {
            this.setState({date: value}, () => {
                this.validate();
            });
        }
        // if(date !== prevState.date) {
        //     this.validateDate();
        // }
    }

    onChangeText = (text) => {
        const {date} = this.state;
        const str = text.replace(/\//gi, "")
        if (text.length === 2 && !text.includes('/') && date.charAt(2) !== '/') {
            this.setState({date: text += '/', errorDate: ''});
        } else if (text.length === 5 && text.indexOf('/') === 2 && date.charAt(5) !== '/') {
            this.setState({date: text += '/', errorDate: ''});
        } else if (str.length === 3 && date.charAt(2) !== '/') {
            const day = str.slice(0, 2) ? `${str.slice(0, 2)}/` : '';
            const month = str.slice(2) ? `${str.slice(2)}` : '';
            this.setState({date: day + month, errorDate: ''});
        } else if ((str.length === 8 || str.length === 5) && (date.charAt(2) !== '/' || date.charAt(5) !== '/')) {
            const day = str.slice(0, 2) ? `${str.slice(0, 2)}/` : '';
            const month = str.slice(2, 4) ? `${str.slice(2, 4)}/` : '';
            const year = str.slice(4) ? `${str.slice(4)}` : '';
            this.setState({date: day + month + year, errorDate: ''});
        } else this.setState({date: text, errorDate: ''});
    };

    onCheck = () => {
        const {onChange} = this.props;
        const {date} = this.state;
        const err = this.validate();
        onChange(date, err);
    };

    validate = () => {
        const {
            minimumDate, 
            errMinimum, 
            maximumDate, 
            errMaximum,
            requireFill
        } = this.props;
        const {date} = this.state;
        const _date = date.split('/');
        if (date === '' && requireFill) {
            this.setState({
                errorDate: 'Không được bỏ trống',
            });
            return true;
        } else if (_date?.length > 0 && _date[0].length > 0 && (_date[0] > 31 || _date[0] == 0)) {
            this.setState({
                errorDate: 'Ngày không hợp lệ',
            });
            return true;
        } else if (_date?.length > 1 && _date[1].length > 0 && (_date[1] > 12 || _date[1] == 0)) {
            this.setState({
                errorDate: 'Tháng không hợp lệ',
            });
            return true;
        } else if (_date?.length > 2 && _date[2].length > 0 && _date[2] == 0) {
            this.setState({
                errorDate: 'Năm không hợp lệ',
            });
            return true;
        } else if (date?.length > 0 && _date?.length > 0 && (
            _date[0]?.length < 2 ||
            !_date[1] || _date[1]?.length < 2 ||
            !_date[2] || _date[2]?.length < 4
        )) {
            this.setState({
                errorDate: 'Định dạng đúng là: dd/mm/yyyy',
            });
            return true;
        } else if (date?.length > 0 && (!checkMonth(date) || !checkLeapYear(date))) {
            this.setState({
                errorDate: 'Bạn đã nhập quá số ngày trong tháng',
            });
            return true;
        } else if (date?.length > 0 && errMinimum && moment(date, 'DD/MM/YYYY').diff(moment(minimumDate, 'DD/MM/YYYY'), 'days') < 0) {
            this.setState({
                errorDate: errMinimum,
            });
            return true;
        } else if (date?.length > 0 && errMaximum && moment(maximumDate, 'DD/MM/YYYY').diff(moment(date, 'DD/MM/YYYY'), 'days') < 0) {
            this.setState({
                errorDate: errMaximum,
            });
            return true;
        } else {
            this.setState({errorDate: ''});
            return false;
        }
    };

    render() {
        const {editable, label, hideLine, colorHolder, showTitle, hidePlaceHolder} = this.props;
        const {date, errorDate} = this.state;
        return (
            <Input
                label={label}
                value={date}
                onChangeText={this.onChangeText}
                error={errorDate}
                onBlur={this.onCheck}
                editable={editable}
                placeholderTextColor={editable ? colorHolder || colorPlaceholder : textDisable}
                baseColor={editable ? colorText : textDisable}
                keyboardType={'number-pad'}
                placeholder={hidePlaceHolder ? '' : 'dd/mm/yyyy'}
                maxLength={10}
                hideLine={hideLine}
                showTitle={showTitle}
            />
        );
    }
}

DateFill.defaultProps = {
    editable: true,
    hideLine: false,
    hidePlaceHolder: false,
};

export default DateFill;
