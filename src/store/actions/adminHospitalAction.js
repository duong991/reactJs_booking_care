import actionTypes from "./actionTypes";
import userService from "../../services/userService";

export const getAllDoctorOfClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllDoctorByClinicId(clinicId);
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorOfClinicSuccess(res.data));
            } else {
                dispatch(getAllDoctorOfClinicFail());
            }
        } catch (error) {
            dispatch(getAllDoctorOfClinicFail());
            console.log("get Required Doctor Info state error : ", error);
        }
    };
};
export const getAllDoctorOfClinicSuccess = (data) => ({
    type: actionTypes.GET_ALL_DOCTOR_OF_CLINIC_SUCCESS,
    data: data,
});
export const getAllDoctorOfClinicFail = () => ({
    type: actionTypes.GET_ALL_DOCTOR_OF_CLINIC_FAIL,
});
