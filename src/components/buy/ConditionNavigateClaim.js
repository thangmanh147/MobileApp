import {Actions} from "react-native-router-flux";

const onPressConditionNavigateClaim = (data) => {
    switch(data.screen) {
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
            // Actions.FlightClaimTakePhoto({claim_id:data.id});
            return;
        case 'CONTRACT_FLIGHT_UPDATE_BENEFIT':
            Actions.FlightInfomationPurchased({claim_id:data.id});
            return;
        case 'CLAIM_FLIGHT_DETAIL':
            Actions.FlightClaimStatus({claim_id:data.id});
            return;
        default:
            return;
    }
}
export default onPressConditionNavigateClaim;
