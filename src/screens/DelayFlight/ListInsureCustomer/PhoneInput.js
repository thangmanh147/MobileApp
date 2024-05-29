import React, {Component} from 'react';
import Input from '../../CarInsurance/components/Input';
import {ERROR_PHONE_FORMAT, ERROR_PHONE_REQUIRED} from '../../../config/ErrorMessage';
import {
  isPhoneAccident,
} from '../../../components/Functions';

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
        const {name} = this.state;
        this.validateName();
        onChange(name);
    };

    validateName = () => {
        let validate = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        // required
        if (this.state.name?.trim() === '') {
            this.setState({
                errorName: ERROR_PHONE_REQUIRED,
            });
            return false;
        }
        // validate tên có ký tự đặc biệt và chữ số
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
        const {name, errorName} = this.state;
        return (
            <Input
                value={name}
                onChangeText={this.onChangeText}
                error={errorName}
                onBlur={this.onCheck}
                keyboardType={'number-pad'}
                maxLength={12}
            />
        );
    }
}

export default PhoneInput;
