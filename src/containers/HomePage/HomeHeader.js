import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguage } from "../../store/actions";
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event: actions
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push("/home");
        }
    };
    render() {
        let { language, isShowBanner } = this.props;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div
                                className="header-logo"
                                onClick={() => this.returnToHome()}
                            />
                        </div>
                        <div className="center-content">
                            <ul>
                                <li className="item">
                                    <a href="#" className="">
                                        <b>
                                            <FormattedMessage id="home-header.specialty" />
                                        </b>
                                        <span>
                                            <FormattedMessage id="home-header.search-doctor" />
                                        </span>
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="">
                                        <b>
                                            <FormattedMessage id="home-header.health-facility" />
                                        </b>
                                        <span>
                                            <FormattedMessage id="home-header.select-room" />
                                        </span>
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="">
                                        <b>
                                            <FormattedMessage id="home-header.doctor" />
                                        </b>
                                        <span>
                                            <FormattedMessage id="home-header.select-doctor" />
                                        </span>
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="">
                                        <b>
                                            <FormattedMessage id="home-header.fee" />
                                        </b>
                                        <span>
                                            <FormattedMessage id="home-header.check-health" />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="right-content">
                            <a href="#">
                                <i className="fas fa-question-circle"></i>
                                <span>
                                    <FormattedMessage id="home-header.support" />
                                </span>
                            </a>
                            <div className="language">
                                <i className="fas fa-globe"></i>
                                <span
                                    className={
                                        language === LANGUAGES.VI
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.VI)
                                    }
                                >
                                    VN
                                </span>
                                <span
                                    className={
                                        language === LANGUAGES.EN
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {isShowBanner && (
                    <div className="home-header-banner">
                        <div className="banner-wrapper">
                            <div className="title title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <div className="search-wrapper">
                                    <button className="search-btn">
                                        <i className="fas fa-search"></i>
                                    </button>
                                    <input
                                        placeholder="Tìm gói khám"
                                        className="search-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="banner-options">
                            <div className="options">
                                <a href="#" className="option-child">
                                    <div className="icon icon-child-1"></div>
                                    <div className="text-child">
                                        <FormattedMessage id="options.option1" />
                                    </div>
                                </a>
                                <a href="#" className="option-child">
                                    <div className="icon icon-child-2"></div>
                                    <div className="text-child">
                                        <FormattedMessage id="options.option2" />
                                    </div>
                                </a>
                                <a href="#" className="option-child">
                                    <div className="icon icon-child-3"></div>
                                    <div className="text-child">
                                        <FormattedMessage id="options.option3" />
                                    </div>
                                </a>
                                <a href="#" className="option-child">
                                    <div className="icon icon-child-4"></div>
                                    <div className="text-child">
                                        <FormattedMessage id="options.option4" />
                                    </div>
                                </a>
                                <a href="#" className="option-child">
                                    <div className="icon icon-child-5"></div>
                                    <div className="text-child">
                                        <FormattedMessage id="options.option5" />
                                    </div>
                                </a>
                                <a href="#" className="option-child">
                                    <div className="icon icon-child-6"></div>
                                    <div className="text-child">
                                        <FormattedMessage id="options.option6" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //fire event
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguage(language)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
