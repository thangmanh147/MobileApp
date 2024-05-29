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

    onPicker = (text) => {
        const {onChange} = this.props;
        this.setState({birthday: text})
        this.checkValidate(text);
        onChange(text);
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {value} = this.props;
        if(value !== prevProps.value) {
            this.setState({birthday: value});
        }
    }

    checkValidate = (text) => {
        if (text === '') {
            this.setState({
                errorBirthday: ERROR_BIRTHDAY_REQUIRED,
            });
            return false;
        } else {
            this.setState({errorBirthday: ''}); // không có lỗi validate
            return true;
        }
    };

    render() {
        const {birthday, errorBirthday} = this.state;
        return (
            <ModalTimePicker
                dateDefault={new Date(moment().subtract(16, 'years').valueOf())}
                maximumDate={new Date(moment().subtract(16, 'years').valueOf())}
                onPicker={this.onPicker}
                onCancelPicker={() => this.checkValidate(birthday)}
            >
                <Input
                    value={birthday}
                    error={errorBirthday}
                    baseColor={Color}
                    editable={false}
                    textUnableColor={'#414042'}
                    keyboardType={'number-pad'}
                />
            </ModalTimePicker>
        );
    }
}

export default BirthdayInput;
