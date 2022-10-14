import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
        };
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value,
        });
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    handleLogin = async () => {
        console.log(this.state);
        await handleLoginAPI(this.state.username, this.state.password);
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-center text-login">Login</div>
                    <div className="col-12 form-group login-input">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={this.state.username}
                            onChange={(event) =>
                                this.handleOnChangeUserName(event)
                            }
                        />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password</label>
                        <div className="custom-input-password">
                            <input
                                type={
                                    this.state.isShowPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={(event) =>
                                    this.handleOnChangePassword(event)
                                }
                            />
                            <span onClick={() => this.handleShowHidePassword()}>
                                <i
                                    class={
                                        this.state.isShowPassword
                                            ? "fas fa-eye changeHiddenPassword"
                                            : "fas fa-eye-slash changeHiddenPassword"
                                    }
                                ></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 login-submit">
                        <button
                            className="btn-login"
                            onClick={() => this.handleLogin()}
                        >
                            Log in
                        </button>
                    </div>
                    <div className="col-12 forgot-password text-center">
                        <span>
                            <a href="#">Forgot your password?</a>
                        </span>
                    </div>
                    <div className="col-12 text-center mt-5">
                        <span className="text-other-login">
                            <a href="#" className="signup">
                                Sign up?
                            </a>
                            Or login in with
                        </span>
                    </div>
                    <div className="col-12 social-login mt-2 ">
                        <i class="fab fa-facebook-square facebook"></i>
                        <i class="fab fa-google-plus-g google"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
