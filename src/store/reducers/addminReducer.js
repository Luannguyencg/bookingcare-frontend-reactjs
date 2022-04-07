import actionTypes from '../actions/actionTypes';



const initialState = {
    genders: [],
    position: [],
    roles: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRoles: false,
    detailDoctor: {},
    detailSpecialty: {},
    allScheduleTime: [],
    arrSchedule: [],
    listPrice: [],
    listPayment: [],
    listProvince: [],
    listSpecialty: [],
    listClinic:[],
    doctorInfo: {},

    allSpecialty: [],
    allClinic: [],

   profileDoctor: '',
}

const addminReducer = (state = initialState, action) => {
    let copyState = { ...state }
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState.isLoadingGender = true

            return {
                ...copyState,

            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState.genders = action.data
            copyState.isLoadingGender = false;



            return {
                ...copyState,

            }

        case actionTypes.FETCH_GENDER_FAILED:
            copyState.isLoadingGender = false;
            return {
                ...copyState,

            }
        ////////////////
        case actionTypes.FETCH_POSITION_START:
            copyState.isLoadingPosition = true

            return {
                ...copyState,

            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.position = action.data
            copyState.isLoadingPosition = false;



            return {
                ...copyState,

            }

        case actionTypes.FETCH_POSITION_FAILED:
            copyState.isLoadingPosition = false;
            return {
                ...copyState,

            }

        ////////////////
        case actionTypes.FETCH_ROLE_START:
            copyState.isLoadingRoles = true

            return {
                ...copyState,

            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data
            copyState.isLoadingRoles = false;


            return {
                ...copyState,

            }

        case actionTypes.FETCH_ROLE_FAILED:
            copyState.isLoadingRoles = false;
            return {
                ...copyState,

            }
        ///
        // case actionTypes.CREATE_USER_SUCCESS:
        //     copyState.errMessage = '';

        //     return {
        //         ...copyState,

        //     }
        //     //
        // case actionTypes.CREATE_USER_FAILED:
        //     copyState.errMessage = action.errMessage;

        //     return {
        //         ...copyState,

        //     }
        //
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            copyState.users = action.users
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            copyState.users = []
            return {
                ...copyState,

            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            copyState.topDoctor = action.topDoctor
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            copyState.topDoctor = []
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            copyState.allDoctor = action.allDoctor
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            copyState.topDoctor = []
            return {
                ...copyState,

            }
        case actionTypes.FETCH_DETAIL_DOCTOR_ID_SUCCESS:
            copyState.detailDoctor = action.data
            return {
                ...copyState,

            }
        case actionTypes.FETCH_DETAIL_DOCTOR_ID_FAILED:
            copyState.detailDoctor = {}
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS:
            copyState.allScheduleTime = action.data
            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED:
            copyState.allScheduleTime = []
            return {
                ...copyState,

            }
        case actionTypes.FETCH_SCHEDULE_BY_DATE_SUCCESS:
            copyState.arrSchedule = action.data
            return {
                ...copyState,

            }
        case actionTypes.FETCH_SCHEDULE_BY_DATE_FAILED:
            copyState.arrSchedule = []
            return {
                ...copyState,

            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS:
            copyState.listPrice = action.data.resPrice
            copyState.listPayment = action.data.resPayment
            copyState.listProvince = action.data.resProvince
            copyState.listSpecialty = action.data.resSpecialty
            copyState.listClinic = action.data.resClinic
            return {
                ...copyState,

            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED:
            copyState.listPrice = []
            copyState.listPayment = []
            copyState.listProvince = []
            copyState.listClinic = []
            return {
                ...copyState,

            }

        case actionTypes.FETCH_DOCTOR_INFO_SUCCESS:
            copyState.doctorInfo = action.data

            return {
                ...copyState,

            }
        case actionTypes.FETCH_DOCTOR_INFO_FAILED:
            copyState.doctorInfo = {}

            return {
                ...copyState,

            }
        case actionTypes.FETCH_PROFILE_DOCTOR_SUCCESS:
            copyState.profileDoctor = action.data

            return {
                ...copyState,

            }
        case actionTypes.FETCH_PROFILE_DOCTOR_FAILED:
            copyState.profileDoctor = ''

            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            copyState.allSpecialty = action.data

            return {
                ...copyState,

            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            copyState.allSpecialty = []

            return {
                ...copyState,

            }
        case actionTypes.FETCH_DETAIL_SPECIALTY_SUCCESS:
            copyState.detailSpecialty = action.data

            return {
                ...copyState,

            }
        case actionTypes.FETCH_DETAIL_SPECIALTY_FAILED:
            copyState.detailSpecialty = []

            return {
                ...copyState,

            }
        case actionTypes.GET_ALL_CLINIC_SUCCESS:
            copyState.allClinic = action.data

            return {
                ...copyState,

            }
        case actionTypes.GET_ALL_CLINIC_FAILED:
            copyState.allClinic = []

            return {
                ...copyState,

            }

        default:
            return state;
    }
}

export default addminReducer;