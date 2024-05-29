import React, {Component} from 'react';
import Input from '../../CarInsurance/components/Input';
import {ERROR_PHONE_FORMAT, ERROR_PHONE_REQUIRED} from '../../../config/ErrorMessage';
import { colorText, textDisable } from '../../../config/System';
import { isPhoneAccident } from '../../../components/Functions';

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
        this.setState({name: text});
    };

    onCheck = () => {
        const {onChange} = this.props;
        const {name} = this.state;
        this.validateName();
        onChange(name);
    };

    validateName = () => {
        const {name} = this.state;
        // if (name.trim() === '') {
        //     this.setState({
        //         errorName: ERROR_PHONE_REQUIRED,
        //     });
        //     return false;
        // }
        if (name?.length > 0 && !isPhoneAccident(name)) {
            this.setState({
                errorName: ERROR_PHONE_FORMAT,
            });
            return false;
        } else {
            this.setState({errorName: ''});
            return true;
        }
    };

    render() {
        const {editable} = this.props;
        const {name, errorName} = this.state;
        return (
            <Input
                label={'Số điện thoại'}
                value={name}
                onChangeText={this.onChangeText}
                error={errorName}
                onBlur={this.onCheck}
                editable={editable}
                baseColor={editable ? colorText : textDisable}
                keyboardType={'number-pad'}
                maxLength={12}
            />
        );
    }
}

export default PhoneInput;
