import React, { PureComponent } from 'react';

// Components
import {
    Text,
} from 'react-native';
import { errValidColor } from '../../../config/System';


class CountDown extends PureComponent {
    constructor(props) {
        super(props);
        const { timeCountDown } = props;
        this.state = { timer: timeCountDown }
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
    }

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.props.resetTime();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {align, timeCountDown} = this.props;
        return (
            <Text
                style={[{
                    fontSize: 14,
                    color: errValidColor,
                    marginLeft: 3,
                    width: timeCountDown > 60 ? 50 : 28
                },
                align ? {textAlign: 'right'} : {}
            ]}>
                {this.state.timer}s
            </Text>
        )
    }
}

CountDown.defaultProps = {
    resetTime: () => {},
    align: false
}

export default CountDown;