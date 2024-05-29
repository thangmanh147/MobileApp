import React, {Component} from 'react';
import {
  Text,
} from 'react-native';
import moment from 'moment';
import {ERROR_30_DAYS, ERROR_70_YEARS} from '../../../config/ErrorMessage';
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
        const {value, relationFamily, dateBuyer} = this.props;
        const {birthday} = this.state;
        if(value !== prevProps.value) {
            this.setState({birthday: value});
        }
        if (
            (birthday?.length > 0 &&
            (
                relationFamily !== prevProps.relationFamily ||
                dateBuyer !== prevProps.dateBuyer
            )) ||
            (birthday !== prevState.birthday)
        ) {
            this.checkValidate(birthday);
        }
    }

    checkValidate = (text) => {
        const {dateBuyer, relationFamily, onSetErr} = this.props;
        if (
            relationFamily === 'Con' &&
            (
                text === dateBuyer ||
                moment(text, 'DD/MM/YYYY').valueOf() < moment(dateBuyer, 'DD/MM/YYYY').valueOf()
            )
        ) {
            console.log('AAAAA');
            this.setState({
                errorBirthday: 'Phải nhỏ hơn ngày sinh người mua',
            });
            onSetErr(true);
            return false;
        } else if (
            (relationFamily === 'Bố' || relationFamily === 'Mẹ') &&
            (
                text === dateBuyer ||
                moment(text, 'DD/MM/YYYY').valueOf() > moment(dateBuyer, 'DD/MM/YYYY').valueOf()
            )
        ) {
            console.log('BBBBBB');
            this.setState({
                errorBirthday: 'Phải lớn hơn ngày sinh người mua',
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
        const {editable} = this.props;
        const {birthday, errorBirthday} = this.state;
        return (
            <>
                <DateFill
                    value={birthday}
                    onChange={this.onPicker}
                    label={'Ngày sinh *'}
                    maximumDate={moment().subtract(30, 'days').format('DD/MM/YYYY')}
                    errMaximum={ERROR_30_DAYS}
                    minimumDate={moment().subtract(70, 'years').format('DD/MM/YYYY')}
                    errMinimum={ERROR_70_YEARS}
                    editable={editable}
                    requireFill
                />
                <Text style={{color: errValidColor, fontSize: 14}}>{errorBirthday}</Text>
            </>
        );
    }
}

export default BirthdayInput;
