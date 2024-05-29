import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TxtColor, Color, URL } from '../../config/System';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import WebView from 'react-native-webview';
import Pdf from 'react-native-pdf';
import IconSearchSvg from '../../config/images/icons/IconSearchSvg';

class BenefitInsurance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: [
                {
                    status: '',
                    name: '1. Trợ cấp viện phí hàng ngày từ ngày nằm viện thứ 2',
                    content: '100.000đ/ngày nằm viện (tối đa 20 ngày mỗi lần nằm viện, tối đa 50 ngày mỗi năm)',
                },
                {
                    status: '',
                    name: '2. Hỗ trợ chi phí phẫu thuật',
                    content: '1.000.000đ/lần/năm',
                },
                {
                    status: '',
                    name: '3. Tử vong do tai nạn trong thời gian điều trị tại bệnh viện',
                    content: '10.000.000đ',
                }
            ]
        };
    }

    onSelectStatus = (index, value) => {
        const { list } = this.state;
        list[index].status = value;
        this.setState({ list: list });
    };

    onChangeText = (text) => {
        this.setState({ value: text });
    }

    render() {
        const { idContract, status } = this.props;
        // const { value, list } = this.state;
        // const arr = list.filter(item => item?.name?.toUpperCase().indexOf(value.toUpperCase()) > -1)
        let yourPDFURI = {uri: `${URL}/api/contract/v1/contracts/certificate/${idContract}`, cache: true};
        return (
            <View style={styles.container}>
                <View>
                    <Nav isInfo={false} title={'CHI TIẾT HỢP ĐỒNG'}
                        onPress={() => Actions.pop()} />
                </View>
                {
                    status !== 'da-ky-so' ? (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{
                                marginTop: 24,
                                fontSize: 16,
                                color: Color,
                            }}>Hợp đồng chưa có ký số!</Text>
                        </View>
                    ) : (
                        <Pdf
                            source={yourPDFURI}
                            style={{flex: 1, backgroundColor: 'white'}}
                            onError={(error)=>{console.log(error);}} />
                    )
                }
                {/* <View style={styles.textBox}>
                    <IconSearchSvg width={18} height={18} style={{marginRight: 3}} />
                    <TextInput
                        style={styles.textInput}
                        value={value}
                        placeholder={'Tìm kiếm'}
                        onChangeText={this.onChangeText}
                        multiline
                        scrollEnabled={false}
                    />
                </View>
                <ScrollView
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 24 }}
                >
                    {
                        arr.map((item, index) => {
                            return (
                                <View
                                    style={styles.contractItem}
                                    key={index}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.title}>{item.name}</Text>
                                        {
                                            item.status === 'active' ? (
                                                <Text style={styles.text}>{item.content}</Text>
                                            ) : null
                                        }
                                    </View>
                                    <TouchableOpacity
                                        style={{ paddingLeft: 10, paddingVertical: 10, justifyContent: 'center' }}
                                        onPress={() => this.onSelectStatus(index, item.status === 'active' ? '' : 'active')}
                                    >
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={{ marginHorizontal: 24, marginBottom: 10 }}>
                    <FooterButton>
                        <Button
                            label={'YÊU CẦU BỒI THƯỜNG'}
                            marginTop={26}
                            width={'100%'}
                            onPress={this.handleNext}
                        />
                    </FooterButton>
                </View> */}
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textBox: {
        marginTop: -30,
        marginHorizontal: 24,
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    fullName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginHorizontal: 8,
        paddingVertical: 5,
        flex: 1,
        color: TxtColor,
        fontSize: 14,
    },
    contractItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: {
        fontSize: 14,
        color: TxtColor,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        color: TxtColor,
    },
    itemStyle: {
        // backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 40,
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#efefef',
        marginHorizontal: 24,
    },
    textStyle: {
        color: '#414042',
        fontSize: 14,
    },
});

const mapStateToProps = (state, ownProps) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BenefitInsurance);
