import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu, AdminHospitalMenu } from "./menuApp";
import "./Header.scss";
import { FormattedMessage } from "react-intl";

import { LANGUAGES, USER_ROLE } from "../../utils";
import _ from "lodash";
import AdminHospital from "./../../routes/AdminHospital";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event: actions
    };
    componentDidMount = () => {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN_SYSTEM) {
                menu = adminMenu;
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            } else if (role === USER_ROLE.ADMIN_HOSPITAL) {
                menu = AdminHospitalMenu;
            }
        }

        this.setState({ menuApp: menu });
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
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
