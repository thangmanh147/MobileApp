import React, {Component} from 'react';
import {
  Text,
} from 'react-native';
import moment from 'moment';
import {ERROR_16_YEARS, ERROR_6_WEEKS, ERROR_80_YEARS} from '../../../config/ErrorMessage';
import {errValidColor} from '../../../config/System';
import DateFill from '../../../components/dateTimeFill/DateFill';

class BirthdayInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birthday: props.value,
            errorBirthday: '',
        };
    }

    onPicker = (text, err) => {
        const {onChange, onSetErr} = this.props;
        this.setState({birthday: text});
        if (!err) {
            this.checkValidate(text);
            onChange(text);
        } else {
            this.setState({
                errorBirthday: '',
            });
            onSetErr(true);
        }
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {value, relationFamily, dateBuyer, isCompany} = this.props;
        const {birthday} = this.state;
        if(value !== prevProps.value) {
            this.setState({birthday: value});
        }
        if (
            (birthday?.length > 0 &&
            (
                relationFamily !== prevProps.relationFamily ||
                dateBuyer !== prevProps.dateBuyer ||
                isCompany !== prevProps.isCompany
            )) ||
            (birthday !== prevState.birthday)
        ) {
            this.checkValidate(birthday);
        }
    }

    checkValidate = (text) => {
        const {dateBuyer, relationFamily, onSetErr, isCompany} = this.props;
        if (
            relationFamily === 'Con' && !isCompany && dateBuyer?.length > 0 &&
            (
                text === dateBuyer ||
                moment(text, 'DD/MM/YYYY').valueOf() < moment(dateBuyer, 'DD/MM/YYYY').valueOf()
            )
        ) {
            this.setState({
                errorBirthday: 'Phải nhỏ hơn ngày sinh người mua',
            });
            onSetErr(true);
            return false;
        } else if (
            (relationFamily === 'Bố' || relationFamily === 'Mẹ') && !isCompany && dateBuyer?.length > 0 &&
            (
                text === dateBuyer ||
                moment(text, 'DD/MM/YYYY').valueOf() > moment(dateBuyer, 'DD/MM/YYYY').valueOf()
            )
        ) {
            this.setState({
                errorBirthday: 'Phải lớn hơn ngày sinh người mua',
            });
            onSetErr(true);
            return false;
        } else if (isCompany && moment().diff(moment(text, 'DD/MM/YYYY'), 'years') < 18) {
            this.setState({
                errorBirthday: 'Yêu cầu đủ 18 tuổi',
            });
            onSetErr(true);
            return false;
        } else {
            this.setState({errorBirthday: ''}); // không có lỗi validate
            onSetErr(false);
            return true;
        }
    };

    render() {
        const {editable, idTravel} = this.props;
        const {birthday, errorBirthday} = this.state;
        return (
            <>
                <DateFill
                    value={birthday}
                    onChange={this.onPicker}
                    maximumDate={moment().subtract(6, 'weeks').format('DD/MM/YYYY')}
                    errMaximum={ERROR_6_WEEKS}
                    minimumDate={idTravel === 1 ? null : moment().subtract(80, 'years').format('DD/MM/YYYY')}
                    errMinimum={idTravel === 1 ? null : ERROR_80_YEARS}
                    editable={editable}
                    requireFill
                />
                <Text style={{color: errValidColor, fontSize: 14}}>{errorBirthday}</Text>
            </>
        );
    }
}

export default BirthdayInput;
