
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { renderVND } from '../components/Functions';
import { ScaledSheet } from 'react-native-size-matters';
import AppText from '../components/AppText';
import { Color } from '../config/System';

const InfoCar = ({
    data,
}) => (
    // <View>
    //   <CtLabel label='B. Thông tin xe'/>
    //   <View style={css.ctContent}>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Hãng xe</Text>
    //       <Text style={css.value}>{data.vehicle_producer_name}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Dòng xe</Text>
    //       <Text style={css.value}>{data.vehicle_model_code}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Năm sản xuất</Text>
    //       <Text style={css.value}>{data.manufacture_year}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Biển số xe</Text>
    //       <Text style={css.value}>{data.number_plates}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Màu xe</Text>
    //       <Text style={css.value}>{data.color}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Chỗ ngồi</Text>
    //       <Text style={css.value}>{data.number_seats}</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Giá trị xe</Text>
    //       <Text style={css.value}>{renderVND(Number(data.insurance_amount ? data.insurance_amount : 0))}đ</Text>
    //     </View>
    //     <View style={css.ctItem}>
    //       <Text style={css.label}>Xe cá nhân không kinh doanh</Text>
    //     </View>
    //   </View>
    // </View>
    <View style={styles.wrapperSection}>
							<View style={styles.containSection}>
								<AppText style={styles.txtTitle}>B. Thông tin xe</AppText>
							</View>
							<View style={styles.formContent1}>
								<View style={styles.conSubFormContent1}>
									<AppText style={styles.txtSubConntent1}>Hãng xe</AppText>
									<AppText style={styles.txtSubConntent2}>{data.vehicle_producer_name}</AppText>
								</View>
								{
									data.number_plates ?
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}>Biển số xe</AppText>
										<AppText style={styles.txtSubConntent2}>{data.number_plates}</AppText>
									</View> :
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}></AppText>
										<AppText style={styles.txtSubConntent2}></AppText>
									</View>
								}

							</View>
							{
								data.chassis_number ?
								<View style={styles.formContent1}>
									<View style={styles.conSubFormContent1}>
										<AppText style={styles.txtSubConntent1}>Số khung</AppText>
										<AppText style={styles.txtSubConntent2}>{data.chassis_number}</AppText>
									</View>
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}></AppText>
										<AppText style={styles.txtSubConntent2}></AppText>
									</View>
								</View> : null
							}
							{
								data.engine_id_number ?
								<View style={styles.formContent1}>
									<View style={styles.conSubFormContent1}>
										<AppText style={styles.txtSubConntent1}>Số máy</AppText>
										<AppText style={styles.txtSubConntent2}>{data.engine_id_number}</AppText>
									</View>
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}></AppText>
										<AppText style={styles.txtSubConntent2}></AppText>
									</View>
								</View> : null
							}

							<View style={styles.formContent1}>
								<View style={styles.conSubFormContent1}>
									<AppText style={styles.txtSubConntent1}>Dòng xe</AppText>
									<AppText style={styles.txtSubConntent2}>{data.vehicle_model_code}</AppText>
								</View>
								{
									data.color ?
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}>Màu xe</AppText>
										<AppText style={styles.txtSubConntent2}>{data.color}</AppText>
									</View> :
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}></AppText>
										<AppText style={styles.txtSubConntent2}></AppText>
									</View>
								}

							</View>
							<View style={styles.formContent1}>
								<View style={styles.conSubFormContent1}>
									<AppText style={styles.txtSubConntent1}>Năm sản xuất</AppText>
									<AppText style={styles.txtSubConntent2}>{data.manufacture_year}</AppText>
								</View>
								<View style={styles.conSubFormContent2}>
									<AppText style={styles.txtSubConntent1}>Chỗ ngồi</AppText>
									<AppText style={styles.txtSubConntent2}>{data.number_seats}</AppText>
								</View>
							</View>
							{
								data.weight ?
								<View style={styles.formContent1}>
									<View style={styles.conSubFormContent1}>
										<AppText style={styles.txtSubConntent1}>Trọng tải</AppText>
										<AppText style={styles.txtSubConntent2}>{data.weight}</AppText>
									</View>
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}></AppText>
										<AppText style={styles.txtSubConntent2}></AppText>
									</View>
								</View> : <View style={styles.formContent1}>
									<View style={styles.conSubFormContent1}>
										<AppText style={styles.txtSubConntent1}></AppText>
										<AppText style={styles.txtSubConntent2}></AppText>
									</View>
									<View style={styles.conSubFormContent2}>
										<AppText style={styles.txtSubConntent1}></AppText>
										<AppText style={styles.txtSubConntent2}></AppText>
									</View>
								</View>
							}

        <View style={styles.formContent1}>
            <View style={styles.conSubFormContent1}>
                <AppText style={styles.txtSubConntent1}>Giá trị xe</AppText>
                <AppText style={styles.txtSubConntent3}>{renderVND(Number(data.insurance_amount ? data.insurance_amount : 0))}đ</AppText>
            </View>
            <View style={[styles.conSubFormContent2,{flex:0.9}]}>
                <AppText style={styles.txtSubConntent1}></AppText>
            </View>
        </View>
							{/*<View style={styles.formContent1}>*/}
								{/*<View style={[styles.conSubFormContent1, { flex: 1 }]}>*/}
									{/*<AppText style={styles.txtSubConntent1}>Giá trị xe</AppText>*/}
									{/*<AppText style={styles.txtSubConntent3}>{renderVND(Number(data.insurance_amount ? data.insurance_amount : 0))}đ</AppText>*/}
								{/*</View>*/}
								{/*<View style={[styles.conSubFormContent2, { flex: 0.45 }]}>*/}
									{/*<AppText style={styles.txtSubConntent1}></AppText>*/}
									{/*<AppText style={styles.txtSubConntent2}></AppText>*/}
								{/*</View>*/}
							{/*</View>*/}
							<Text style={styles.txtPersonalBusiness}>{data.vehicle_purpose_name}</Text>
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
	formContent1: {
		paddingVertical: '7.5@vs',
		flexDirection: 'row',
		marginHorizontal: '20@s'
	},
	txtPersonalBusiness: {
		color: '#999999',
		fontSize: '14@s',
		paddingHorizontal: '20@s',
		paddingVertical: '10@vs'
	},
	conSubFormContent1: {
		flexDirection: 'row',
		flex: 1.3
	},
	conSubFormContent2: {
		flex: 1,
		flexDirection: 'row',
	},
	txtSubConntent1: {
		flex: 1,
		color: '#999999',
		fontSize: '14@s'
	},
	txtSubConntent2: {
		flex: 0.9,
		color: '#333333',
		fontSize: '14@s',
		textAlign: 'left',
		marginLeft: '5@s'
	},
	txtSubConntent3: {
		fontSize: '14@s',
		marginLeft: '5@s',
		color: '#000000',
		fontWeight: 'bold',
        textAlign: 'left',
	},

})

export default InfoCar;
