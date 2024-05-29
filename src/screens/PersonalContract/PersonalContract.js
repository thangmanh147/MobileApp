import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import Nav from '../../components/Nav';
import {connect} from 'react-redux';

class PersonalContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Nav isInfo={false} title={'HỢP ĐỒNG CỦA BẠN'}
                         onPress={() => Actions.pop()}/>
                </View>

            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PersonalContract);
