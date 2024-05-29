import React, {Component} from 'react';
import Input from '../../../CarInsurance/components/Input';
import {ERROR_EMAIL_FORMAT, ERROR_EMAIL_REQUIRED} from '../../../../config/ErrorMessage';
import {
    isEmailAccident,
} from '../../../../components/Functions';
import { Color, colorText, textDisable } from '../../../../config/System';

class EmailInput extends Component {
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
        onChange(name?.trim(), errorName);
    };

    validateName = () => {
        // required
        if (this.state.name.trim() === '') {
            this.setState({
                errorName: ERROR_EMAIL_REQUIRED,
            });
            return false;
        }
        if (!isEmailAccident(this.state.name?.trim())) {
            this.setState({
                errorName: ERROR_EMAIL_FORMAT,
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
                label={'Email *'}
                value={name}
                onChangeText={this.onChangeText}
                error={errorName}
                onBlur={this.onCheck}
                editable={editable}
            />
        );
    }
}

export default EmailInput;
