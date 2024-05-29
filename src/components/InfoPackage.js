
import React from 'react';
import {
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	Image
} from 'react-native';
import { renderVND} from '../components/Functions';
import { ScaledSheet } from 'react-native-size-matters';
import AppText from '../components/AppText';
import {Actions} from "react-native-router-flux";
import { Color } from '../config/System';

// const renderView = () => {
// 	var a = [];
// 	for(let i = 0; i < screen.width/5;i++ ) {
// 		a.push(
// 		<View key={i} style={{height: 1, width: 5,backgroundColor: '#bdbdbd', marginRight: 5}}></View>
// 		)
// 	}
// 	return a
// }

const InfoPackage = ({
    dataTarget,
    discount_amount,
	total_fee,
	data,
	dataGroupProducts,
	data2,
	arrayListInputDiscountCode,
	discountCodeCollaborator,
	sale_order_id,
	totalDiscountCollaboratorCode,
	total,
	screen,
	user
}) =>

(
    // <View>
	// 	<CtLabel label='C. Thông tin gói và phí bảo hiểm'/>
	// 	{
	// 		data.map((item, index) => {
	// 		return (
	// 			<View key={index} style={css.ctContent}>
	// 			<Text style={css.name}>{index+1}. {item.name}</Text>
	// 			{
	// 				item.products.map((i, index1) => {
	// 					return (
	// 						<View key={index1} >
	// 							<View style={css.ctItem}>
	// 								<Text style={css.label}>{i.name}</Text>
	// 								<Text style={css.value}>{renderVND(i.fee)} đ</Text>
	// 							</View>
	// 							{
	// 								i.benefits.map((itemBen, iBen) => {
	// 									return (
	// 										<View key={iBen} style={css.ctItem}>
	// 											<Text style={css.label}>{itemBen.name}</Text>
	// 											<Text style={css.value}>{renderVND(itemBen.fee)} đ</Text>
	// 										</View>
	// 									)
	// 								})
	// 							}
	// 						</View>

	// 					)
	// 				})
	// 			}
	// 			</View>
	// 		)
	// 		})
	// 	}

	// 	<View style={css.ctBottom}>
	// 		<View style={css.ctItem}>
	// 		<Text style={css.label}>Số tiền tạm tính</Text>
	// 		<Text style={css.value}>{renderVND(total_fee)} đ</Text>
	// 		</View>
	// 		<View style={css.ctItem}>
	// 		<Text style={css.label}>Khuyến mãi</Text>
	// 		<Text style={css.value}>{renderVND(discount_amount)} đ</Text>
	// 		</View>
	// 		<View style={{flexDirection: 'row',marginTop:5, marginBottom: 5, backgroundColor: '#ececec',}}>
	// 		{renderView()}
	// 		</View>
	// 		<View style={css.ctItem}>
	// 		<Text style={{color: '#000',fontWeight: 'bold',fontSize: 16, flex: 1}}>Số tiền thanh toán</Text>
	// 		<Text style={{color: '#000', fontWeight: 'bold'}}>{renderVND(total_fee - discount_amount)} đ</Text>
	// 		</View>
	// 	</View>
	// </View>
	<View>
		<View style={styles.wrapperSection}>
			<View style={styles.containSection}>
				<AppText style={styles.txtTitle}>C. Mua bảo hiểm cho ô tô</AppText>
			</View>
			<AppText style={styles.txtValueSectionC}>Giá trị xe tạm tính</AppText>
			<AppText style={styles.txtMoneyValueSectionC}>{renderVND(Number(dataTarget.insurance_amount ? dataTarget.insurance_amount : 0))}đ</AppText>
			<AppText style={styles.txtMaxInsuranceSectionC}>Chọn mức bảo hiểm tối đa</AppText>
			<AppText style={styles.txtMoneyInsuranceSectionC}>{renderVND(Number(dataTarget.insurance_amount ? dataTarget.insurance_amount : 0))}đ</AppText>
		</View>

		<View style={styles.wrapperSection}>
			<View style={[styles.containSection, { flexDirection: 'row', justifyContent: 'space-between' }]}>
				<AppText style={styles.txtTitle}>D. Thông tin gói và phí bảo hiểm</AppText>
			</View>
			<View style={styles.containBodySectionD}>
				{/* <AppText style={styles.txtTitleSectionD}>1. {dataGroupProducts.length > 0 ? dataGroupProducts[0].name : ''}</AppText> */}
				{
					dataGroupProducts.length > 0  && dataGroupProducts[0].products.length > 0 ?
					dataGroupProducts[0].products.map((item, index) => {
						return (
							<View key={index} style={styles.containTextSectionD}>
								<AppText style={styles.txtText1SectionD}><Text style={{fontSize: 15, fontWeight: 'bold', color: '#000000',}}>{index+1}. </Text>{item.name}</AppText>
								<AppText style={styles.txtText2SectionD2}>{renderVND(Number(item.product_fee))}đ</AppText>
							</View>
						)
					}) : null
				}

				{/* <AppText style={styles.txtTitleSectionD}>2. {dataGroupProducts.length > 0 ? dataGroupProducts[1].name : ''}</AppText> */}
				{
					dataGroupProducts.length > 0 && dataGroupProducts[1].products.length > 0 ?
					dataGroupProducts[1].products.map((item, index) => {
						return (
							<View key={index} style={styles.containTextSectionD}>
								<AppText style={styles.txtText1SectionD}><Text style={{fontSize: 15, fontWeight: 'bold', color: '#000000',}}>{index+1}. </Text>{item.name}</AppText>
								<AppText style={styles.txtText2SectionD}>{renderVND(Number(item.fee))}đ</AppText>
							</View>
						)
					}) : null
				}
				{
					dataGroupProducts.length > 0 && dataGroupProducts[1].products.length > 0  && dataGroupProducts[1].products[0].benefits.length > 0 ? dataGroupProducts[1].products[0].benefits.map((item, index) => {
						return (
							<View key={index} style={styles.containTextSectionD}>
								<AppText style={styles.txtText1SectionD}>{item.name}</AppText>
								<AppText style={styles.txtText2SectionD}>{renderVND(Number(item.fee))}đ</AppText>
							</View>
						)
					}) : null
				}
			</View>
			{
				discount_amount !== 0 && arrayListInputDiscountCode && arrayListInputDiscountCode.length == 0 ?
				<View style={styles.formValue2}>
					<AppText style={styles.txt3Formvalue}>Ưu đãi</AppText>
					<AppText style={styles.txt4Formvalue}>{renderVND(Number(discount_amount))} đ</AppText>
				</View> : null
			}

			{/*{*/}
			{/*	(arrayListInputDiscountCode && arrayListInputDiscountCode.length > 0) || discountCodeCollaborator  ?*/}
			{/*	<TouchableOpacity*/}
			{/*	disabled={screen && screen == 'CONTRACT_DETAIL' ? true : false }*/}
            {/*    onPress={() => Actions.DiscountCode({sale_order_id})}*/}
            {/*    style={styles.containDiscountCodeForm}>*/}
            {/*    <View style={{justifyContent: 'center'}}>*/}
            {/*        <Text>Mã giảm giá</Text>*/}
            {/*    </View>*/}
            {/*    <View style={{flex: 1,flexDirection:'row',flexWrap:'wrap'}}>*/}
            {/*        {*/}
            {/*          arrayListInputDiscountCode.length > 0 ? arrayListInputDiscountCode.map((item,index) => {*/}
            {/*                return (*/}
            {/*                    <View key={index} style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>*/}
            {/*                        <View style={{flex:1,paddingLeft:20,flexDirection:'row',alignItems:'center', justifyContent: 'center'}}>*/}
            {/*                            <Image resizeMode={'contain'} style={{width: 6, height: 6,justifyContent:'flex-end',alignItems:'flex-end'}}*/}
            {/*                                source={require('../icons/ic_dot.png')}/>*/}
            {/*                            <Text style={{ fontSize: 13,textAlign:'left',flex:1}}> {item.code}</Text>*/}
            {/*                        </View>*/}
            {/*                        <Text style={{color:'#F97C7C', fontSize: 13, flex:1}}>- {renderVND(item.discount_amount)+ 'đ'}</Text>*/}
			{/*					</View>*/}
			{/*				)*/}
			{/*						}) : null*/}
			{/*		}*/}
			{/*		{*/}
			{/*			discountCodeCollaborator ?*/}
			{/*			<View style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>*/}
			{/*				<View style={{flex:1,paddingLeft:20,flexDirection:'row',alignItems:'center', justifyContent: 'center'}}>*/}
			{/*					<Image resizeMode={'contain'} style={{width: 6, height: 6,justifyContent:'flex-end',alignItems:'flex-end'}}*/}
			{/*						source={require('../icons/ic_dot.png')}/>*/}
			{/*					<Text style={{ fontSize: 13,textAlign:'left',flex:1}}> {discountCodeCollaborator}</Text>*/}
			{/*				</View>*/}
			{/*				<Text style={{color:'#F97C7C', fontSize: 13, flex:1}}>- {renderVND(totalDiscountCollaboratorCode)+ 'đ'}</Text>*/}
			{/*			</View> : null*/}
			{/*		}*/}
			{/*	</View>*/}
			{/*	{*/}
			{/*		screen && screen == 'CONTRACT_DETAIL' ? null :*/}
			{/*		<View style={{justifyContent:'center',alignItems:'center'}}>*/}
			{/*			/!*<Image resizeMode={'contain'} style={{width: 20, height: 18,}}*!/*/}
			{/*			/!*	source={require('../../icons/collaborator/car/next.png')}/>*!/*/}
			{/*		</View>*/}
			{/*	}*/}

			{/*	</TouchableOpacity> :*/}

			{/*		screen && screen == 'CONTRACT_DETAIL' ? null :*/}
			{/*		user && user == '6' ? null :*/}
			{/*		<TouchableOpacity disabled={screen && screen == 'CONTRACT_DETAIL' ? true : false }*/}
			{/*			onPress={() => Actions.DiscountCode({sale_order_id})} style={styles.ctBgPrice}>*/}
			{/*				<View style={{flex: 1.5, justifyContent: 'center'}}>*/}
			{/*					<Text style={{paddingLeft: 15}}>Ưu đãi</Text>*/}
			{/*				</View>*/}
			{/*				<View style={{flex: 3,flexDirection:'row',}}>*/}
			{/*					<View style={styles.buttonDiscountCode}>*/}
			{/*						<Text style={{}}>Chọn mã giảm*/}
			{/*							giá</Text>*/}
			{/*					</View>*/}
			{/*				</View>*/}
			{/*				<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>*/}
			{/*						/!*<Image resizeMode={'contain'} style={{width: 23, height: 18,}}*!/*/}
			{/*						/!*		source={require('../../icons/collaborator/car/next.png')}/>*!/*/}
			{/*				</View>*/}
			{/*		</TouchableOpacity>*/}


			{/*}*/}

			<View style={styles.formValue3}>
				<View style={styles.containTextFormValu3}>
					<AppText style={styles.txt5Formvalue}>Phí bảo hiểm</AppText>
					{/* <AppText style={styles.txt5Formvalue}>{renderVND(Number(data.payment_amount) ? (data.payment_amount - ((data.payment_amount/110)*10)).toFixed(0) : 0)} đ</AppText> */}
					<AppText style={styles.txt5Formvalue}>{renderVND(Number(data.total_fee) ? (data.total_fee - (data.total_vat)).toFixed(0) : 0)} đ</AppText>
				</View>
				<View style={styles.containTextFormValu3}>
					<AppText style={styles.txt5Formvalue}>Tăng phí</AppText>
					{/* <AppText style={styles.txt5Formvalue}>{renderVND(Number(data.payment_amount) ? ((data.payment_amount/110)*10).toFixed(0) : 0)} đ</AppText> */}
					<AppText style={styles.txt5Formvalue}>{renderVND(Number(data.total_vat) ? (data.total_vat) : 0)} đ</AppText>
				</View>
                <View style={styles.containTextFormValu3}>
					<AppText style={styles.txt5Formvalue}>Thuế VAT</AppText>
					{/* <AppText style={styles.txt5Formvalue}>{renderVND(Number(data.payment_amount) ? ((data.payment_amount/110)*10).toFixed(0) : 0)} đ</AppText> */}
					<AppText style={styles.txt5Formvalue}>{renderVND(Number(data.total_vat) ? (data.total_vat) : 0)} đ</AppText>
				</View>
				<View style={styles.line} />
				<View style={styles.containTextFormValu3}>
					<AppText style={styles.txt6Formvalue}>Tổng phí bảo hiểm</AppText>
					{/* <AppText style={styles.txt6Formvalue}>{renderVND(Number(data.payment_amount) ? data.payment_amount.toFixed(0) : 0)} đ</AppText> */}
					{
						user && user == '6' ?
                            <AppText style={styles.txt6Formvalue}>{renderVND(Number(data.payment_amount-total > 0 ? data.payment_amount-total : 0))} đ</AppText> :
                            <AppText style={styles.txt6Formvalue}>{renderVND(Number(data.payment_amount-discount_amount > 0 ? data.payment_amount-discount_amount : 0))} đ</AppText>
					}

				</View>

			</View>
		</View>
	</View>
);

const styles = ScaledSheet.create({
	container: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		backgroundColor: 'white',

	},
	containBody: {
		flex: 1
	},
	txtNote: {
		textAlign: 'left',
		lineHeight: 22,
		color: '#323643',
		fontSize: '14@s',
		paddingHorizontal: '20@s',
		paddingVertical: '15@vs',
		// color: '#F97C7C'
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
		flex: 2,
		textAlign: 'center'
	},
	txtValueSectionC: {
		color: '#8D8C8D',
		fontSize: '12@s',
		paddingVertical: '10@vs',
		paddingHorizontal: '20@s'
	},
	txtMoneyValueSectionC: {
		color: '#000000',
		fontWeight: 'bold',
		fontSize: '18@s',
		paddingVertical: '10@vs',
		paddingHorizontal: '20@s'
	},
	txtMaxInsuranceSectionC: {
		// color: '#161313',
		color: '#8D8C8D',
		// fontWeight: 'bold',
		fontSize: '12@s',
		paddingVertical: '10@vs',
		paddingHorizontal: '20@s'
	},
	txtMoneyInsuranceSectionC: {
		color: '#000000',
		fontWeight: 'bold',
		fontSize: '18@s',
		paddingVertical: '10@vs',
		paddingHorizontal: '20@s'
	},
	choosePackageAgain: {
		color: '#F97C7C',
		fontSize: '14@s',
		fontWeight: 'bold'
	},
	containBodySectionD: {
		paddingHorizontal: '20@s'
	},
	containTextSectionD: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	txtTitleSectionD: {
		fontSize: '14@s',
		fontWeight: 'bold',
		color: '#333333',
		paddingVertical: '10@vs'
	},
	txtText1SectionD: {
		fontSize: '14@s',
		flex: 1,
		paddingVertical: '10@vs',
		color: '#333333'
	},
	txtText2SectionD: {
		fontSize: '14@s',
		paddingVertical: '10@vs',
		color: '#333333'
	},
	txtText2SectionD2: {
		fontSize: '14@s',
		paddingVertical: '10@vs',
		color: '#333333',
		flex:0.45,
		textAlign:'right'
	},
	formValue1: {
		marginTop: '5@vs',
		paddingVertical: '10@vs',
		marginHorizontal: '20@s',
		borderRadius: 10,
		backgroundColor: '#FAFAFA',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: '15@s'
	},
	txt1Formvalue: {
		color: '#F97C7C',
		fontSize: '14@s'
	},
	txt2Formvalue: {
		textDecorationLine: 'line-through',
		color: '#F97C7C',
		fontSize: '14@s'
	},
	formValue2: {
		marginTop: '10@vs',
		paddingVertical: '15@vs',
		marginHorizontal: '20@s',
		borderRadius: 10,
		backgroundColor: '#FAFAFA',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: '15@s'
	},
	txt3Formvalue: {
		color: '#333333',
		fontSize: '13@s'
	},
	txt4Formvalue: {
		color: '#F97C7C',
		fontSize: '13@s'
	},
	formValue3: {
		marginVertical: '10@vs',
		paddingVertical: '15@vs',
		marginHorizontal: '20@s',
		borderRadius: 15,
		backgroundColor: '#FAFAFA',
		paddingHorizontal: '15@s'
	},
	containTextFormValu3: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: '5@vs',
	},
	txt5Formvalue: {
		fontSize: '14@s',
		color: '#666666'
	},
	txt6Formvalue: {
		fontSize: '16@s',
		color: Color,
		fontWeight: '500'
	},
	line: {
		height: 2,
		backgroundColor: '#F1F1F1',
		marginVertical: '2.5@vs'
	},
	containImage: {
		marginVertical: '20@vs',
		marginHorizontal: '30@s',
		paddingVertical: '15@vs',
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: 'white'
	},
	txtDescribeImage: {
		textAlign: 'center',
		fontSize: '14@s'
	},
	txtSubDescribeImage: {
		color: '#F97C7C',
		fontSize: '16@s'
	},
	image: {
		height: '160@vs',
	},
	containDiscountCodeForm: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 10,
        marginHorizontal:20,
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        paddingVertical: 15,
        paddingHorizontal: 15
	},
	ctBgPrice: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        flexDirection: 'row',
        height: 70,
        marginTop: 10,
        marginHorizontal:20,
        backgroundColor: '#FFFFFF'
	},
	buttonDiscountCode:{
        marginVertical: 15,
        borderRadius: 15,
        borderWidth: 1,
        flex:1,
        borderColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default InfoPackage;
