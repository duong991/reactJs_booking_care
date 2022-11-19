import actionTypes from "./actionTypes";
import userService from "../../services/userService";

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
