import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { Color, NewColor, TxtColor } from '../../../config/System';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';

const { height } = Dimensions.get('window');

const hours = [
    '00', '01', '02', '03', '04', '05',
    '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17',
    '18', '19', '20', '21', '22', '23',
];
const minutes = [
    '00', '05', '10', '15', '20', '25',
    '30', '35', '40', '45', '50', '55',
];

class ModalControlTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hourSelect: '00',
            minuteSelect: '00',
            isVisible: false,
        };
    }

    onFocus = () => {
        this.setState({ isVisible: true, hourSelect: '00', minuteSelect: '00' });
    };

    onHide = () => {
        this.setState({ isVisible: false });
    };

    renderItem = ({ item }) => {
        return (
            <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 18 }}>{item}</Text>
        );
    };

    setItemHour = (index) => {
        this.setState({hourSelect: hours[index]})
    };

    setItemMinute = (index) => {
        this.setState({minuteSelect: minutes[index]})
    };

    onChose = () => {
        const {hourSelect, minuteSelect} = this.state;
        this.onHide();
        this.props.onPickerTime(`${hourSelect}:${minuteSelect}`);
    }

    render() {
        const { children, editable } = this.props;
        const { isVisible } = this.state;
        return (
            <TouchableOpacity onPress={this.onFocus} disabled={!editable}>
                {children}
                <Modal
                    isVisible={isVisible}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={this.onHide}
                    onBackdropPress={this.onHide}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            maxHeight: '60%',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                        <TouchableOpacity onPress={this.onHide} style={{marginRight: 20, marginVertical: 16}}>
                            <Text style={{ color: Color, textAlign: 'right' }}>Đóng</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                            }}>
                            <Carousel
                                layout="default"
                                data={hours}
                                sliderHeight={(height / 22.5) * 5}
                                itemHeight={height / 22.5}
                                swipeThreshold={400}
                                vertical
                                loop
                                // firstItem={12}
                                activeSlideOffset={2}
                                updateCellsBatchingPeriod={0}
                                initialNumToRender={5}
                                slideStyle={{
                                    alignItems: 'center',
                                    marginLeft: 100,
                                    flex: 0.4
                                }}
                                enableMomentum={true}
                                inactiveSlideOpacity={0.3}
                                maxToRenderPerBatch={5}
                                shouldOptimizeUpdates
                                renderItem={this.renderItem}
                                onSnapToItem={(index) => this.setItemHour(index)}
                            />
                            <View style={{ marginHorizontal: 15, flex: 0.2, paddingBottom: 10 }}><Text style={{ fontSize: 18, fontWeight: 'bold', color: TxtColor }}>:</Text></View>
                            <Carousel
                                layout="default"
                                data={minutes}
                                sliderHeight={(height / 22.5) * 5}
                                itemHeight={height / 22.5}
                                swipeThreshold={400}
                                vertical
                                loop
                                // firstItem={6}
                                activeSlideOffset={2}
                                updateCellsBatchingPeriod={0}
                                initialNumToRender={5}
                                slideStyle={{
                                    alignItems: 'center',
                                    marginRight: 100,
                                    flex: 0.4
                                }}
                                enableMomentum={true}
                                inactiveSlideOpacity={0.3}
                                maxToRenderPerBatch={5}
                                shouldOptimizeUpdates
                                renderItem={this.renderItem}
                                onSnapToItem={(index) => this.setItemMinute(index)}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                marginVertical: 10,
                                backgroundColor: NewColor,
                                paddingVertical: 16,
                                alignItems: 'center',
                                marginHorizontal: 20,
                                borderRadius: 10,
                            }}
                            onPress={this.onChose}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>CHỌN</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </TouchableOpacity>
        );
    }
}

ModalControlTimer.defaultProps = {
    editable: true,
}

export default ModalControlTimer;
