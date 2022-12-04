import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import { toast } from "react-toastify";

// fetch gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await userService.getAllCodeServices("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log("fetch gender state error : ", error);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
});

// fetch position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            let res = await userService.getAllCodeServices("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log("fetch position state error: ", error);
        }
    };
};
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data,
});
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
});

// fetch roles
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START,
            });
            let res = await userService.getAllCodeServices("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log("fetch role state error : ", error);
        }
    };
};
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data,
});
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
});

// create new user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUser(data);
            if (res && res.errCode === 0) {
                toast.info("🤟🏻 Create a new user success !", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                await dispatch(createNewUserSuccess);
                dispatch(fetchAllUser("All"));
            } else {
                dispatch(createNewUserFail);
            }
        } catch (error) {
            dispatch(createNewUserFail());
            console.log("save user failed :", error);
        }
    };
};
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const createNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
});

// fetch all user
export const fetchAllUser = (key) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUser(key);
            let data = res.users;
            let users = data.reverse();
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(users));
            } else {
                dispatch(fetchAllUserFail);
            }
        } catch (error) {
            dispatch(fetchAllUserFail());
            console.log("fetch all user failed :", error);
        }
    };
};
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: data,
});
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL,
});

// delete user
export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUser(id);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUser("All"));
                dispatch(deleteUserSuccess());
            } else {
                dispatch(deleteUserFail());
            }
        } catch (error) {
            dispatch(deleteUserFail());
            console.log("delete user failed :", error);
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
});

// edit user
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.updateUser(data);
            if (res && res.errCode === 0) {
                await dispatch(editUserSuccess());
                toast.info("🤟🏻 Update user success !", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(fetchAllUser("All"));
            } else {
                dispatch(editUserFail());
            }
        } catch (error) {
            dispatch(editUserFail());
            console.log("update user failed :", error);
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
});

// fetch top doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getTopDoctorServices(6);
            console.log(res.data);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFail());
            }
        } catch (error) {
            console.log("fetch top doctor error: ", error);
            dispatch(fetchTopDoctorFail());
        }
    };
};

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data,
});
export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
});

// get all doctor
export const getAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllDoctorServices();
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorSuccess(res.data));
            } else {
                dispatch(getAllDoctorFail());
            }
        } catch (error) {
            console.log("get all doctor error: ", error);
            dispatch(getAllDoctorFail());
        }
    };
};

export const getAllDoctorSuccess = (data) => ({
    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
    data: data,
});
export const getAllDoctorFail = () => ({
    type: actionTypes.GET_ALL_DOCTOR_FAIL,
});

// update detail doctor
export const updateDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.updateDetailDoctorService(data);
            if (res && res.errCode === 0) {
                dispatch(updateDetailDoctorSuccess());
                toast.info("🤟🏻 Update detail doctor success !", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error("🤟🏻 Update detail doctor fail !", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(updateDetailDoctorSuccess());
            }
        } catch (error) {
            toast.error("🤟🏻 Update detail doctor fail !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("get all doctor error: ", error);
            dispatch(updateDetailDoctorFail());
        }
    };
};

export const updateDetailDoctorSuccess = () => ({
    type: actionTypes.UPDATE_DETAIL_DOCTOR_SUCCESS,
});
export const updateDetailDoctorFail = () => ({
    type: actionTypes.UPDATE_DETAIL_DOCTOR_FAIL,
});

// fetch all schedule hours
export const fetchAllCodeScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeServices("TIME");

            if (res && res.errCode === 0) {
                dispatch(fetchAllCodeScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllCodeScheduleTimeFail());
            }
        } catch (error) {
            console.log("get all doctor error: ", error);
            dispatch(fetchAllCodeScheduleTimeFail());
        }
    };
};

export const fetchAllCodeScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    data: data,
});
export const fetchAllCodeScheduleTimeFail = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
});
