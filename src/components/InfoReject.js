
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AppText from '../components/AppText';
import {Actions} from "react-native-router-flux";
import { Color } from '../config/System';

const InfoReject = ({
    data,
    status_code
}) => (
    // <View>
    //   <CtLabel label='D. Điểm loại trừ'/>
    //   <View style={css.ctContent}>
    //     {
    //       data.map((item, index) => {
    //         return <ItemExclusion data={item} key={index}/>
    //       })
    //     }
    //   </View>
    // </View>
    <View style={styles.wrapperSection}>
      <View style={[styles.containSection, { flexDirection: 'row', justifyContent: 'space-between' }]}>
				<AppText style={styles.txtTitle}>E. Điểm loại trừ</AppText>
			</View>
        {
          status_code == 'STATUS_PROFILE_OWE' ?
          <View>
            <TouchableOpacity style={styles.containImage}
                              onPress={()=>Actions.carRequirement({contract_id: data.id})}
            >
              {/*<Image resizeMode={'contain'} style={styles.image} source={require('../../icons/ic_no_anh.png')} />*/}
            </TouchableOpacity>
            <AppText style={styles.txtDescribeImage}>Đang nợ ảnh</AppText>
          </View> :
          data.exclusions.map((item, index) => {
            return (
              <View>
                <Image
                  resizeMode={'contain'}
                  style={[styles.image,{marginVertical: 15,
                  paddingVertical: 15, marginHorizontal: 15}]}
                  source={{uri: item.image}}/>
                <AppText style={styles.txtDescribeImage}>{item.description}</AppText>
              </View>
            )
           })
        }
      </View>
);

// const css = StyleSheet.create({
//   ctImage: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 200,
//     borderRadius: 7
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
    paddingBottom: '20@vs'
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
	containImage: {
		// marginVertical: '20@vs',
		marginHorizontal: '30@s',
		// paddingVertical: '15@vs',
		// borderRadius: 15,
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
	}
})

export default InfoReject;
