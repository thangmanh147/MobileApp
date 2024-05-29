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
        const {value, cardIdBuyer, onSetErr} = this.props;
        const {name} = this.state;
        if(value !== prevProps.value) {
            this.setState({name: value});
        }
        if (name !== prevState.name) {
            this.validateName();
        }
        if (
            cardIdBuyer?.length > 0 &&
            prevProps.cardIdBuyer?.length > 0 &&
            name.length > 0 && cardIdBuyer !== prevProps.cardIdBuyer
        ) {
            const err = this.validateName();
            onSetErr(err);
        }
    }

    onChangeText = (text) => {
        this.setState({name: text});
    };

    onCheck = () => {
        const { onChange, onSetErr } = this.props;
        const { name } = this.state;
        this.setState({name: name.toUpperCase()}, () => {
            const err = this.validateName();
            onChange(name.toUpperCase());
            onSetErr(err);
        });
    };

    validateName = () => {
        const {isCompany, cardIdBuyer, selectedBuyer, insuredCustomers} = this.props;
        const {name} = this.state;
        const _name = name ? name.trim() : '';
        const arr = insuredCustomers.filter((item) => item.relationFamily !== 'Bản thân' && item.identityNumber === _name);
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
        } else if ((!isCompany && cardIdBuyer === _name && !selectedBuyer) || (arr.length > 0) || (isCompany && arr1.length > 0)) {
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
        const {editable} = this.props;
        const {name, errorName} = this.state;
        return (
            <Input
                value={name}
                onChangeText={this.onChangeText}
                error={editable ? errorName : ''}
                onBlur={this.onCheck}
                maxLength={12}
                editable={editable}
                autoUpperCase
                keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
            />
        );
    }
}

export default IdentityInput;
