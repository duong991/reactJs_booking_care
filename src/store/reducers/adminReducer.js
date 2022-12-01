import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingPosition: false,
    positions: [],
    isLoadingRole: false,
    roles: [],
    allUser: [],
    topDoctors: [],
    allDoctors: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //fetch gender

        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false,
            };
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                genders: [],
                isLoadingGender: false,
            };
        // fetch position

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingPosition: true,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
                isLoadingPosition: false,
            };
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                positions: [],
                isLoadingPosition: false,
            };
        // fetch role

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingRole: true,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
                isLoadingRole: false,
            };
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
                roles: [],
                isLoadingRole: false,
            };

        // create new user
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state,
            };

        // fetch all user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            return {
                ...state,
                allUser: action.data,
            };
        case actionTypes.FETCH_ALL_USER_FAIL:
            return {
                ...state,
            };
        // delete user
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_FAIL:
            return {
                ...state,
            };
        // edit user
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.EDIT_USER_FAIL:
            return {
                ...state,
            };
        // fetch top doctors
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.data,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state,
            };
        // get all doctors
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctors: action.data,
            };
        case actionTypes.GET_ALL_DOCTOR_FAIL:
            return {
                ...state,
            };

        // update detail doctor
        case actionTypes.UPDATE_DETAIL_DOCTOR_SUCCESS:
            console.log("UPDATE_DETAIL_DOCTOR_SUCCESS");
            return {
                ...state,
            };
        case actionTypes.UPDATE_DETAIL_DOCTOR_FAIL:
            console.log("UPDATE_DETAIL_DOCTOR_FAIL");
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
