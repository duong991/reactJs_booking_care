import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingPosition: false,
    positions: [],
    isLoadingRole: false,
    roles: [],
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
        default:
            return state;
    }
};

export default adminReducer;
