import React, {Component} from 'react';
import Input from '../../CarInsurance/components/Input';
import {ERROR_NAME_FORMAT, ERROR_NAME_REQUIRED} from '../../../config/ErrorMessage';
import { colorText, textDisable } from '../../../config/System';
import { isFullName } from '../../../components/Functions';

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
        const {name} = this.state;
        this.setState({name: name.normalize().toUpperCase()}, () => {
            this.validateName();
            onChange(name.normalize().toUpperCase());
        });
    };

    validateName = () => {
        // required
        if (this.state.name.trim() === '') {
            this.setState({
                errorName: ERROR_NAME_REQUIRED,
            });
            return false;
        }
        // validate tên có ký tự đặc biệt và chữ số
        if (!isFullName(this.state.name)) {
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
                baseColor={editable ? colorText : textDisable}
                autoUpperCase
            />
        );
    }
}

export default NameInput;
