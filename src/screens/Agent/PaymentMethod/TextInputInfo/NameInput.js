import React, {Component} from 'react';
import {Platform} from 'react-native';
import Input from '../../../CarInsurance/components/Input';
import { Color, colorText, textDisable } from '../../../../config/System';
import {ERROR_NAME_FORMAT, ERROR_NAME_REQUIRED} from '../../../../config/ErrorMessage';

class NameInput extends Component {
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
        let validate = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        // required
        if (this.state.name.trim() === '') {
            this.setState({
                errorName: ERROR_NAME_REQUIRED,
            });
            return false;
        }
        // validate tên có ký tự đặc biệt và chữ số
        if (validate.test(this.state.name)) {
            this.setState({
                errorName: ERROR_NAME_FORMAT,
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
                label={'Họ và tên *'}
                value={name}
                onChangeText={this.onChangeText}
                error={errorName}
                onBlur={this.onCheck}
                editable={editable}
                autoUpperCase
                reqUpperCase
            />
        );
    }
}

export default NameInput;
