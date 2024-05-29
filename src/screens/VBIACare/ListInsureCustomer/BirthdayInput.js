import React, {Component} from 'react';
import moment from 'moment';
import Input from '../../CarInsurance/components/Input';
import {ERROR_BIRTHDAY_REQUIRED} from '../../../config/ErrorMessage';
import {Color} from '../../../config/System';
import ModalTimePicker from '../../../components/datepicker/ModalTimePicker';

class BirthdayInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birthday: props.value,
            errorBirthday: '',
        };
    }

    onPicker = (text, dataDate) => {
        const {onChange} = this.props;
        this.setState({birthday: text, dataBirthday: dataDate})
        this.checkValidate(text, dataDate);
        onChange(text);
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {value, errorFormat, relationFamily, dateBuyer} = this.props;
        const {birthday, dataBirthday} = this.state;
        if(value !== prevProps.value) {
            this.setState({birthday: value});
        }
        if (
            birthday?.length > 0 &&
            (
                relationFamily !== prevProps.relationFamily ||
                dateBuyer !== prevProps.dateBuyer
            )
        ) {
            console.log('111', relationFamily, prevProps.relationFamily);
            this.checkValidate(birthday, dataBirthday);
        }
    }

    checkValidate = (text, dataDate) => {
        const {dateBuyer, dataDateBuyer, relationFamily, onSetErr} = this.props;
        console.log(text, dateBuyer);
        console.log(moment(dataDate).valueOf(), moment(dataDateBuyer).valueOf());
        if (
            relationFamily === 'Con' &&
            (
                text === dateBuyer ||
                moment(dataDate).valueOf() < moment(dataDateBuyer).valueOf()
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
                moment(dataDate).valueOf() > moment(dataDateBuyer).valueOf()
            )
        ) {
            console.log('BBBBBB');
            this.setState({
                errorBirthday: 'Phải lớn hơn ngày sinh người mua',
            });
            onSetErr(true);
            return false;
        } else if (text === '') {
            this.setState({
                errorBirthday: ERROR_BIRTHDAY_REQUIRED,
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
            <ModalTimePicker
                dateDefault={new Date(moment().subtract(16, 'years').valueOf())}
                maximumDate={new Date(moment().subtract(16, 'years').valueOf())}
                editable={editable}
                onPicker={this.onPicker}
                onCancelPicker={() => this.checkValidate(birthday)}
            >
                <Input
                    value={birthday}
                    error={errorBirthday}
                    editable={false}
                    textUnableColor={editable ? '#414042' : null}
                    keyboardType={'number-pad'}
                />
            </ModalTimePicker>
        );
    }
}

export default BirthdayInput;
