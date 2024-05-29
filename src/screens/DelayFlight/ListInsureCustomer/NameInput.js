import React, {Component} from 'react';
import Input from '../../CarInsurance/components/Input';
import {
  isFullNameExpand
} from '../../../components/Functions';
import {ERROR_NAME_FORMAT, ERROR_NAME_REQUIRED} from '../../../config/ErrorMessage';

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
        this.setState({name: text});
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
        if (this.state.name?.trim() === '') {
            this.setState({
                errorName: ERROR_NAME_REQUIRED,
            });
            return false;
        }
        if (!isFullNameExpand(this.state.name)) {
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
        const {name, errorName} = this.state;
        return (
            <Input
                value={name}
                onChangeText={this.onChangeText}
                error={errorName}
                onBlur={this.onCheck}
                autoUpperCase
            />
        );
    }
}

export default NameInput;
