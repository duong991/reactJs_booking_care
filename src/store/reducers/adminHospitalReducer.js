import actionTypes from "../actions/actionTypes";

const initialState = {
    doctorOfClinic: [],
};

const adminHospitalReducer = (state = initialState, action) => {
    switch (action.type) {
        // get all doctors
        case actionTypes.GET_ALL_DOCTOR_OF_CLINIC_SUCCESS:
            return {
                ...state,
                doctorOfClinic: action.data,
            };
        case actionTypes.GET_ALL_DOCTOR_OF_CLINIC_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminHospitalReducer;
