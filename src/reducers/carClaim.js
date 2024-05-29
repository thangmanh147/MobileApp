

import {
	CLAIM_TARGET_SUCCESS,
	CAR_CLAIM_REQUIREMENT_SUCCESS,
	CAR_CLAIM_CITY_SUCCESS,
	CAR_CLAIM_GARAGE_SUCCESS,
	CAR_CLAIM_GET_PROFILE_SUCCESS,
	CAR_CLAIM_LIST_TYPE_SUCCESS,
	CAR_CLAIM_UPDATE_IMAGE,
	CAR_CLAIM_SET_PATH_CORNER,
	CAR_CLAIM_MODAL_REQUIREMENT,
	CAR_CLAIM_CONTRACT_SUCCESS,
	CAR_CLAIM_REQUEST,
	CAR_CLAIM_FAIL,
	CAR_CLAIM_MODAL_BOOK_GARA,
	CAR_CLAIM_UPDATE_URI_DAMAGE,
	CAR_CLAIM_GET_DAMAGE_SUCCESS,
    LOAD_OWN_IMAGE
} from '../config/types';

const initialState = {
	listType: null,
	loading: null,
	targets: null,
	requirements: null,
	cities: null,
	garages: null,
	damages: null,
	contractInfo: null,
    ownContractImage:null,
	modalRequirement: null,
	modalBookGara: null,

	profile: {},
	fields: {},
	paths: {},

	uriDamage: [],
	uriScene: [],
	  
}

export default function carBuy (state = initialState, action) {
	switch(action.type) {
		case CAR_CLAIM_GET_DAMAGE_SUCCESS:
			return {
				...state,
				damages: action.data
			}
		case CAR_CLAIM_MODAL_BOOK_GARA:
			return {
				...state,
				modalBookGara: action.data
			}
		case CAR_CLAIM_REQUEST:
			return {
				...state,
				loading: true
			}
		case CAR_CLAIM_FAIL:
			return {
				...state,
				loading: null
			}
		case CAR_CLAIM_CONTRACT_SUCCESS:
			return {
				...state,
				contractInfo: action.data
			}
		case CAR_CLAIM_MODAL_REQUIREMENT:
			return {
				...state,
				modalRequirement: action.data
			}
        case LOAD_OWN_IMAGE:
            return {
                ...state,
                ownContractImage: action.data
            }
			
		case CAR_CLAIM_SET_PATH_CORNER:
			return {
				...state,
				paths: action.data
			}
	  
		case CAR_CLAIM_UPDATE_IMAGE:
			switch(action.action) {
				case 'FORM_ID_NUMBER':
					switch(action.data.name) {
					case "IMAGE_1":
						var profile = state.profile;
						profile.idNumber.IMAGE_1.value = action.data.value
						return {
							...state,
							profile,
					}
					case "IMAGE_2":
						var profile = state.profile;
						profile.idNumber.IMAGE_2.value = action.data.value
						return {
							...state,
							profile,
						}
				}
                case 'FORM_ID_NUMBER_BENEFICIARY':
                    switch(action.data.name) {
                        case "IMAGE_1":
                            var profile = state.profile;
                            profile.idNumberBeneficiary.IMAGE_1.value = action.data.value
                            return {
                                ...state,
                                profile,
                            }
                        case "IMAGE_2":
                            var profile = state.profile;
                            profile.idNumberBeneficiary.IMAGE_2.value = action.data.value
                            return {
                                ...state,
                                profile,
                            }
                    }
				case 'ADD_IMAGE_TICKET_TO_CLAIM':
					var profile = state.profile;
					ImageTicketClaim = action.data.value
					return {
						...state,
						profile,
						ImageTicketClaim,
					}
				case 'ADD_IMAGE_ID_NUMBERS_TO_CLAIM':
					switch(action.data.name) {
					case "IMAGE_1":
						var profile = state.profile;
						profile['ImageIdNumbers'] = action.data
						uriBeforeImage = action.data.value
						return {
							...state,
							profile,
							uriBeforeImage
						}
					case "IMAGE_2":
						var profile = state.profile;
						profile['ImageIdNumbers'] = action.data
						uriAfterImage = action.data.value
						return {
							...state,
							profile,
							uriAfterImage
						}
				}
				case 'FORM_IMAGE_CAR':
					var profile = state.profile;
					var paths = state.paths;
					var fields = state.fields;
					fields[action.data.name] = action.data.value
					switch(action.data.name) {
					case "IMAGE_1":
						profile.corner.IMAGE_1.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_2":
						profile.corner.IMAGE_2.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_3":
						profile.corner.IMAGE_3.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_4":
						profile.corner.IMAGE_4.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_5":
						profile.corner.IMAGE_5.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					default:
						return {
						...state
						}
				}
				case 'FORM_DRIVER_LICENSE':
					var profile = state.profile;
					profile.driver.IMAGE.value = action.data
					return {
						...state,
						profile,
					}
				case 'UPDATE_FORM_AIR_TICKET':
					var profile = state.profile;
					profile.ticketPlane.IMAGE.value = action.data
					return {
						...state,
						profile,
				}
                case 'UPDATE_FORM_BIRTH_CERTIFICATE_BENEFICIARY':
                    var profile = state.profile;
                    profile.birthCertificate.IMAGE.value = action.data
                    return {
                        ...state,
                        profile,
                    }
                case 'FORM_BIRTH_CERTIFICATE':
                    var profile = state.profile;
                    profile.birthCertificateBuyer.IMAGE.value = action.data
                    return {
                        ...state,
                        profile,
                    }
                case 'FORM_MARRIAGE_CERTIFICATE':
                    var profile = state.profile;
                    profile.marriageCertificate.IMAGE.value = action.data
                    return {
                        ...state,
                        profile,
                    }
				case 'FORM_IMAGE_DAMAGE':
					var profile = state.profile;
					if(action.index !== null) {
						profile.damage[action.index] = {value: action.data}
					}else {
						profile.damage.push({value: action.data})
					}
					return {
						...state,
						profile,
					}
				case 'FORM_IMAGE_SCENE':
					var profile = state.profile;
					if(action.index !== null) {
						profile.scene[action.index] = {value: action.data}
					}else {
						profile.scene.push({value: action.data})
					}
					return {
						...state,
						profile,
					}
				default:
					return {
						...state
					}
		}

		case CAR_CLAIM_UPDATE_URI_DAMAGE:
			if(action.action === 'FORM_IMAGE_DAMAGE') {
				var uriDamage = state.uriDamage;
				if(action.index !== null) {
					uriDamage[action.index] = {value: action.data}
				}else {
					uriDamage.push({
						value: action.data,
						update_status: true
					})
				}
				return {
					...state,
					uriDamage
				}
			}else { //FORM_IMAGE_SCENE
				var uriScene = state.uriScene;
				if(action.index !== null) {
					uriScene[action.index] = {value: action.data}
				}else {
					uriScene.push({
						value: action.data,
						update_status: true
					})
				}
				return {
					...state,
					uriScene
				}
			}
			

		case CAR_CLAIM_LIST_TYPE_SUCCESS:
			return {
				...state,
				listType: action.data
			}
		case CAR_CLAIM_GET_PROFILE_SUCCESS:
			var profile = state.profile;
			switch(action.code) {
				case 'FORM_DRIVER_LICENSE':
					profile['driver'] = action.data
					return {
						...state,
						profile
					}
				case 'FORM_AIR_TICKET':
					profile['ticketPlane'] = action.data
					return {
						...state,
						profile
					}
                case 'FORM_BIRTH_CERTIFICATE_BENEFICIARY':
                    profile['birthCertificate'] = action.data
                    return {
                        ...state,
                        profile
                    }
                case 'FORM_BIRTH_CERTIFICATE':
                    profile['birthCertificateBuyer'] = action.data
                    return {
                        ...state,
                        profile
                    }
                case 'FORM_MARRIAGE_CERTIFICATE':
                    profile['marriageCertificate'] = action.data
                    return {
                        ...state,
                        profile
                    }
				case 'FORM_ID_NUMBER':
					profile['idNumber'] = action.data
					return {
						...state,
						profile
				}
                case 'FORM_ID_NUMBER_BENEFICIARY':
                    profile['idNumberBeneficiary'] = action.data
                    return {
                        ...state,
                        profile
                    }
				case 'FORM_IMAGE_DAMAGE':
					profile['damage'] = action.data;
					var uriDamage = [];
					for(let i of action.data) {
						uriDamage.push(i);
					}
					return {
						...state,
						profile,
						uriDamage
					}
				case 'FORM_IMAGE_CAR':
					profile['corner'] = action.data
					return {
						...state,
						profile
					}
				case 'FORM_IMAGE_SCENE':
					profile['scene'] = action.data;
					var uriScene = [];
					for(let i of action.data) {
						uriScene.push(i);
					}
					return {
						...state,
						profile,
						uriScene
					}
				default:
					return {
						...state,
					}
			}

		case CAR_CLAIM_GARAGE_SUCCESS:
			return {
				...state,
				garages: action.data
			}
		case CAR_CLAIM_CITY_SUCCESS:
			return {
				...state,
				cities: action.data
			}
		case CLAIM_TARGET_SUCCESS:
			return {
				...state,
				targets: action.data
			}
		case CAR_CLAIM_REQUIREMENT_SUCCESS:
			return {
				...state,
				requirements: action.data
			}

	
		default: 
		return state
	}
}