import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ViewDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    } 

    renderView = (width) => {
        var view = [];
        for(i = 0; i < width/6; i ++ ) {
            view.push(
                <View key={i} style={{width: 3, height: 1,marginRight: 3, backgroundColor: '#E2E2E2',}}></View>
            )
        }
        return view
    }

    render() {

        return (
            <View style={{
                flexDirection: 'row',
                ...this.props.style
                }}>
            {
                this.renderView(this.props.width)
            }
             </View>
        );
    } 
}
