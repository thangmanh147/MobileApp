import React, {Component} from 'react';
import moment from 'moment';
import {ERROR_16_YEARS} from '../../../config/ErrorMessage';
import DateFill from '../../../components/dateTimeFill/DateFill';

class BirthdayInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birthday: props.value,
        };
    }

    onPicker = (text, err) => {
        const {onChange, onSetErr} = this.props;
        this.setState({birthday: text});
        onChange(text);
        onSetErr(err);
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {value} = this.props;
        if(value !== prevProps.value) {
            this.setState({birthday: value});
        }
    }

    render() {
        const {birthday} = this.state;
        return (
            <DateFill
                value={birthday}
                onChange={this.onPicker}
                maximumDate={moment().subtract(16, 'years').format('DD/MM/YYYY')}
                errMaximum={ERROR_16_YEARS}
                requireFill
            />
        );
    }
}

export default BirthdayInput;
