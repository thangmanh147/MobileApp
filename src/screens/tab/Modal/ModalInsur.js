import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import ModalBox from 'react-native-modalbox';
import { TxtColor } from '../../../config/System';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalInsur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insureSelected: [
        {
          name: 'BH Trách nhiệm dân sự ô tô',
          code: 'C1',
        },
        {
          name: 'BH Vật chất xe ô tô',
          code: 'C2',
        },
        {
          name: 'BH Trách nhiệm dân sự xe máy',
          code: 'M1',
        },
        {
          name: 'BH Tai nạn',
          code: 'A1',
          codes: 'A2',
        },
        {
          name: 'BH Vật chất xe máy',
          code: 'M3',
        },
        {
          name: 'BH Nhà tư nhân',
          code: 'H1',
        },
        {
          name: 'BH Du lịch',
          code: 'T1',
          codes: 'T2',
        },
        {
          name: 'BH Trễ chuyến bay',
          code: 'DF1',
        },
      ],
    };
  }

  // componentDidMount() {
  //   const { insuranceInfo } = this.props;
  //   const arrInsur = [
  //     {
  //       name: 'BH Trách nhiệm dân sự ô tô',
  //       code: 'C1',
  //     },
  //     {
  //       name: 'BH Vật chất xe ô tô',
  //       code: 'C2',
  //     },
  //     {
  //       name: 'BH Trách nhiệm dân sự xe máy',
  //       code: 'M1',
  //     },
  //     {
  //       name: 'BH Tai nạn',
  //       code: 'A1',
  //       codes: 'A2',
  //     },
  //     {
  //       name: 'BH Vật chất xe máy',
  //       code: 'M3',
  //     },
  //     {
  //       name: 'BH Nhà tư nhân',
  //       code: 'H1',
  //     },
  //     {
  //       name: 'BH Du lịch',
  //       code: 'T1',
  //       codes: 'T2',
  //     },
  //     {
  //       name: 'BH Trễ chuyến bay',
  //       code: 'DF1',
  //     },
  //   ];
  //   const _arrInsur = arrInsur.filter(item => {
  //     if (insuranceInfo && insuranceInfo.find(i => i.code === item.code || i.code === item.codes)) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   this.setState({ insureSelected: _arrInsur });
  // }

  setInsur = data => {
    this.props.setInsur(data);
    this.props.onClosed();
  };

  render() {
    const { insureSelected } = this.state;
    const { onClosed, open, nameSelected } = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={true}
        onClosed={onClosed}
        coverScreen={true}
        style={css.ctModal}
      >
        <View style={{ flex: 1 }}>
          <View style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 16,
            paddingHorizontal: 24,
            backgroundColor: '#F6F5F6'
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Sản phẩm quan tâm</Text>
          </View>
          <ScrollView>
            <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
              {insureSelected.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.setInsur(item)}
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: index === insureSelected.length - 1 ? 0 : 1,
                      borderTopWidth: 0,
                      borderColor: '#F6F5F6',
                      alignItems: 'center',
                      paddingVertical: 8
                    }}>
                    {
                      nameSelected === item.name ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                      ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                      )
                    }
                    <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ModalBox>
    );
  }
}
const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    insuranceInfo: state.insurance.insuranceInfo,
  };
};

export default connect(
  mapStateToProps,
)(ModalInsur);
