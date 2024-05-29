import React, {Component} from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

class ModalTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.dateDefault,
            isVisible: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {maximumDate, minimumDate, checkDate} = this.props;
        if(checkDate && maximumDate && maximumDate !== prevProps.maximumDate) {
            this.setState({
                date: maximumDate,
            });
        }
        if(checkDate && minimumDate && minimumDate !== prevProps.minimumDate) {
            this.setState({
                date: minimumDate,
            });
        }
    }

    confirmPicker = (date) => {
        const {onPicker} = this.props;
        this.setState({
            date: date,
            isVisible: false,
        });
        onPicker(moment(date).format('DD/MM/YYYY'), date);
    };

    onCancel = () => {
        const {onCancelPicker} = this.props;
        this.setState({isVisible: false});
        onCancelPicker && onCancelPicker();
    };

    onFocus = () => {
        this.setState({isVisible: true});
    };
    render() {
        const {children, editable, maximumDate, minimumDate} = this.props;
        const {isVisible, date} = this.state;
        return (
            <TouchableOpacity onPress={this.onFocus} disabled={!editable}>
                {children}
                <DateTimePickerModal
                    isVisible={isVisible}
                    mode="date"
                    onConfirm={this.confirmPicker}
                    onCancel={this.onCancel}
                    date={date}
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                    locale={'vi'}
                    headerTextIOS={'Chọn ngày'}
                    cancelTextIOS={'Hủy'}
                    confirmTextIOS={'Chọn'}
                />
            </TouchableOpacity>
        );
    }
}

ModalTimePicker.defaultProps = {
    editable: true,
    checkDate: false,
}

export default ModalTimePicker;
