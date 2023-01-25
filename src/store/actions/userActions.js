import actionTypes from "./actionTypes";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => {
    history.push("/login");
    console.log(history);
    return {
        type: actionTypes.PROCESS_LOGOUT,
    };
};
