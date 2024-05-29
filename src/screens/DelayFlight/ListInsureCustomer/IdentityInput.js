import React, {Component} from 'react';
import {Platform} from 'react-native';
import Input from '../../CarInsurance/components/Input';
import {
    ERROR_IDENTITY_FORMAT,
    ERROR_IDENTITY_REQUIRED,
} from '../../../config/ErrorMessage';
import {
  isIdentity,
} from '../../../components/Functions';

class IdentityInput extends Component {
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
        const {onChange, onSetErr} = this.props;
        const {name} = this.state;
        this.setState({name: name.toUpperCase()}, () => {
            const err = this.validateName();
            onChange(name.toUpperCase());
            onSetErr(err);
        });
    };

    validateName = () => {
        const {insuredCustomers} = this.props;
        const {name} = this.state;
        const _name = name ? name.trim() : '';
        const arr1 = insuredCustomers.filter((item) => item.identityNumber === _name);
        // required
        if (_name === '') {
            this.setState({
                errorName: ERROR_IDENTITY_REQUIRED,
            });
            return false;
        }
        // check ký tự đặc biẹt
        if (!isIdentity(name)) {
            this.setState({
                errorName: ERROR_IDENTITY_FORMAT,
            });
            return false;
        } else if (arr1.length > 0) {
            this.setState({
                errorName: 'Dữ liệu trùng lặp',
            });
            return false;
        } else {
            this.setState({errorName: ''});
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
                maxLength={12}
                autoUpperCase
                keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
            />
        );
    }
}

export default IdentityInput;
