import React, {Component} from 'react';
import {Platform} from 'react-native';
import Input from '../../../CarInsurance/components/Input';
import {ERROR_PHONE_FORMAT, ERROR_PHONE_REQUIRED} from '../../../../config/ErrorMessage';
import {
    isPhoneAccident,
} from '../../../../components/Functions';
import { Color, colorText, textDisable } from '../../../../config/System';

class PhoneInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.value,
            errorName: '',
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {value} = this.props;
        const {name} = this.state;
        if(value !== prevProps.value) {
            this.setState({name: value});
        }
        if(name !== prevState.name) {
            this.validateName();
        }
    }

    onChangeText = (text) => {
        this.setState({name: text})
    };

    onCheck = () => {
        const {onChange} = this.props;
        const {name, errorName} = this.state;
        onChange(name, errorName);
    };

    validateName = () => {
        // required
        if (this.state.name.trim() === '') {
            this.setState({
                errorName: ERROR_PHONE_REQUIRED,
            });
            return false;
        }
        if (!isPhoneAccident(this.state.name)) {
            this.setState({
                errorName: ERROR_PHONE_FORMAT,
            });
            return false;
        } else {
            this.setState({errorName: ''}); // không có lỗi validate
            return true;
        }
    };

    render() {
        const {editable} = this.props;
        const {name, errorName} = this.state;
        return (
            <Input
                label={'Số điện thoại *'}
                value={name}
                onChangeText={this.onChangeText}
                error={errorName}
                onBlur={this.onCheck}
                editable={editable}
                maxLength={12}
                keyboardType={'number-pad'}
            />
        );
    }
}

export default PhoneInput;
