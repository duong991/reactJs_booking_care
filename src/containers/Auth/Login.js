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
            errorMessage: "",
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
        this.setState({
            errorMessage: "",
        });
        try {
            let data = await handleLoginAPI(
                this.state.username,
                this.state.password
            );
            if (data && data.errCode !== 0) {
                this.setState({ errorMessage: data.message });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.userInfo);
            }
        } catch (error) {
            console.log(error.response);
            this.setState({ errorMessage: error.response.data.message });
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.charCode === 13) {
            this.handleLogin();
        }
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
                            onKeyPress={this.handleKeypress}
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
                                onKeyPress={this.handleKeypress}
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
                    <div
                        className=""
                        style={{ color: "red", marginLeft: "45px" }}
                    >
                        {this.state.errorMessage}
                    </div>
                    <div className="col-12 login-submit">
                        <button
                            id="btnLogin"
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

        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
