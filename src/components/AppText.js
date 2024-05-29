import React from 'react';
import { Text, View } from 'react-native';

class AppText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text
                onPress={this.props.onPress}
                style={{
                        fontSize: 16,
                        ...this.props.style
                    }}
            >
                {this.props.children}
            </Text>
        )
    }
}

export default AppText;
