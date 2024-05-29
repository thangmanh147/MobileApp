
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AppText from '../components/AppText';
import { Color } from '../config/System';

const InfoBuyer = ({
    data,
}) => (
    // <View>
    //   <CtLabel label='A. Người mua bảo hiểm'/>
    //   <View style={css.ctContent}>
    //     <Text style={css.name}>{data.fullname}</Text>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Điện thoại</Text>
    //       <Text style={css.value}>{data.mobile}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Tỉnh/Thành phố</Text>
    //       <Text style={css.value}>{data.city_name}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Quận huyện/Thị xã</Text>
    //       <Text style={css.value}>{data.district_name}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Địa chỉ</Text>
    //       <Text style={css.value}>{data.address}</Text>
    //     </View>
    //   </View>
    // </View>
    <View style={styles.wrapperSection}>
      <View style={styles.containSection}>
        <AppText style={styles.txtTitle}>A. Người mua bảo hiểm</AppText>
      </View>
      <AppText style={styles.txtNameUser}>{data.fullname}</AppText>
      <View style={styles.formContent1}>
        <AppText style={styles.txtContent1}>Điện thoại</AppText>
        <AppText style={styles.txtContent2}>{data.mobile}</AppText>
      </View>
      <View style={styles.formContent1}>
        <AppText style={styles.txtContent1}>Tỉnh/Thành phố</AppText>
        <AppText style={styles.txtContent2}>{data.city_name}</AppText>
      </View>
      <View style={styles.formContent1}>
        <AppText style={styles.txtContent1}>Quận huyện/Thị xã</AppText>
        <AppText style={styles.txtContent2}>{data.district_name}</AppText>
      </View>
      <View style={styles.formContent1}>
        <AppText style={styles.txtContent1}>Địa chỉ</AppText>
        <AppText style={styles.txtContent2}>{data.address}</AppText>
      </View>
    </View>
);

// const css = StyleSheet.create({
//   ctItem: {
//     flexDirection: 'row',
//     paddingTop: 3,
//     paddingBottom: 3,
//     alignItems: 'center',
//   },
//   label: {
//     color: '#999',
//     flex: 1,
//   },
//   value: {
//     color: '#333',
//     flex: 1
//   },
//   name: {
//     color: '#000',
//     fontWeight: 'bold',
//     fontSize: 16
//   },
//   ctContent:  {
//     padding: 20,
//     paddingTop: 5,
//     paddingBottom: 5
//   }
// })
const styles = ScaledSheet.create({
	containBody: {
		flex: 1
	},
	wrapperSection: {
        backgroundColor:'#ffffff'
	},
	containSection: {
		paddingVertical: '15@vs',
		backgroundColor: '#FAFAFA',
		paddingHorizontal: '20@s'
	},
	txtTitle: {
		fontSize: '14@s',
		color: Color,
		fontWeight: 'bold'
	},
	txtNameUser: {
		fontSize: '15@s',
		color: '#000000',
		fontWeight: '500',
		paddingVertical: '10@vs',
		paddingHorizontal: '20@s'
	},
	formContent1: {
		paddingVertical: '7.5@vs',
		flexDirection: 'row',
		marginHorizontal: '20@s'
	},
	txtContent1: {
		color: '#999999',
		fontSize: '14@s',
		flex: 1.2
	},
	txtContent2: {
		flex: 1.5,
		paddingLeft: '15@s',
		color: '#333333'
	}
})

export default InfoBuyer;
