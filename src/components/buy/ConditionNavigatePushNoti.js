import {Actions} from "react-native-router-flux";

const onPress = (data) => {
    switch (data.screen) {
        // -----reject_
        case 'PARTNER_SALES_REJECT':
            Actions.InformationIdNumber({status_code: 'STATUS_REJECT'});
            return;
        // -----app
        case 'MY_VOUCHER':
            Actions.UserListVoucher({index:1});
            return;
        // -----love
        case 'CONTRACT_LOVE_UPDATE_BENEFIT':
            Actions.loveBuyPackage({contract_id: data.id});
            return;
        case 'CONTRACT_LOVE_UPDATE_TARGET':
            Actions.loveBuyFormOther({contract_id: data.id, status_code: data.status_code});
            return
        case 'CONTRACT_LOVE_DETAIL':
            Actions.loveBuyPackage({contract_id: data.id,sale_order_id:data.sale_order_id, status_code: data.status_code, payment_amount: data.payment_amount});
            return;
        case 'CONTRACT_LOVE_PAYMENT':
            Actions.payList({
                payment_amount: data.payment_amount,
                contract_id: data.id,
                typePay: 'love',
                sale_order_id:data.sale_order_id
            });
            return;

        // -----car
        case "CONTRACT_DETAIL":
            Actions.contractInfo({contract_id: data.id, sale_order_id:data.sale_order_id,load: 'CONTRACT_DETAIL'});
            return;
        case "CONTRACT_UPDATE_DATA":
            Actions.carRequirement({contract_id: data.id});
            return;
        case "CONTRACT_PAYMENT":
            Actions.contractInfo({contract_id: data.id, sale_order_id:data.sale_order_id,load: 'CONTRACT_PAYMENT', payment_amount: data.payment_amount});
            return;
        case "CONTRACT_CONFIRM_EXCLUSION":
            Actions.AnnouncePriceCar({
                contract_id: data.id,
                payment_amount: data.payment_amount ? data.payment_amount : 0,
                insurance_amount: data.insurance_amount ? data.insurance_amount : 0,
                sale_order_id:data.sale_order_id
            })
            // Actions.carExclusion({contract_id: data.id, sale_order_id:data.sale_order_id})
            return;
        case 'CONTRACT_CONFIRM_INSURANCE_AMOUNT':
            Actions.carPriceExclusion({
                contract_id: data.id,
                payment_amount: data.payment_amount,
                insurance_amount: data.insurance_amount
            })
            // Actions.AnnouncePriceCar({
            //     contract_id: data.id,
            //     payment_amount: data.payment_amount,
            //     insurance_amount: data.insurance_amount,
            //     sale_order_id:data.sale_order_id
            // })
            return;
        case 'CONTRACT_UPDATE_CUSTOMER':
            // Actions.carUpdateInfo({contract_id: data.id})
            Actions.CarInfomationBuyer({
                contract_id: data.id,
                sale_order_id:data.sale_order_id
            });
            return;

        // -----delay flight
        case 'CONTRACT_FLIGHT_PAYMENT':
            Actions.FlightPayment({
                contract_id: data.id,
                payment_amount:data.payment_amount,
                sale_order_id:data.sale_order_id,
            })
            return;
        //claim flow
        case "CLAIM_DETAIL":
            Actions.contractClaim({claim_id: data.id, load: 'CLAIM_DETAIL', status_code: data.status_code});
            return;
        case "CLAIM_UPDATE_DATA":
            Actions.carClaimRequirement({claim_id: data.id});
            return;
        case 'CLAIM_CONFIRM_DAMAGE':
            Actions.carClaimVerifyDamage({claim_id: data.id});
            return;
        case 'CLAIM_ACCEPT':
            Actions.contractClaim({claim_id: data.id, load: 'CLAIM_ACCEPT', status_code: data.status_code});
            return;
        case 'INSO_AIRLINE':
            Actions.FlightClaimDelay();
            return;
        case 'CLAIM_FLIGHT_UPDATE_BANK_ACCOUNT':
            Actions.FlightClaimGetInfoUser({claim_id:data.id});
            return;
        case 'CLAIM_FLIGHT_UPDATE_IMAGE_TICKET':
            Actions.carClaimRequirement({claim_id:data.id});
            // Actions.carClaimRequirement({claim_id:data.id});
            return;
        case 'CONTRACT_FLIGHT_UPDATE_BENEFIT':
            Actions.FlightInfomationPurchased({claim_id:data.id});
            return;
        case 'CLAIM_FLIGHT_DETAIL':
            Actions.FlightClaimStatus({claim_id:data.id});
            return;
        default:
            Actions.tab({type: 'reset'})
    }
}
export default onPress;
