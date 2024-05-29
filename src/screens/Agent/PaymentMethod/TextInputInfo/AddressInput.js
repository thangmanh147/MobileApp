import React, {Component} from 'react';
import Input from '../../../CarInsurance/components/Input';
import {ERROR_ADDRESS_REQUIRED} from '../../../../config/ErrorMessage';
import { Color, colorText, textDisable } from '../../../../config/System';

class AddressInput extends Component {
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
    };

    validateName = () => {
        const {onChange} = this.props;
        const {name} = this.state;
        // required
        if (name.trim() === '') {
            this.setState({
                errorName: ERROR_ADDRESS_REQUIRED,
            });
            onChange(name, ERROR_ADDRESS_REQUIRED);
        } else {
            this.setState({errorName: ''}); // không có lỗi validate
            onChange(name, '');
        }
    };

    render() {
        const {editable} = this.props;
        const {name, errorName} = this.state;
        return (
            <Input
                label={'Địa chỉ *'}
                value={name}
                onChangeText={this.onChangeText}
                error={errorName}
                onBlur={this.onCheck}
                editable={editable}
            />
        );
    }
}

export default AddressInput;
