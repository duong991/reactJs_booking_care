import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { FormattedMessage } from "react-intl";

import { LANGUAGES } from "../../utils";

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event: actions
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="language">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" />,{" "}
                        {userInfo && userInfo.fullName ? userInfo.fullName : ""}{" "}
                        !
                    </span>
                    <i className="fas fa-globe"></i>
                    <span
                        className={language === LANGUAGES.VI ? "active" : ""}
                        onClick={() => this.changeLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={language === LANGUAGES.EN ? "active" : ""}
                        onClick={() => this.changeLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
