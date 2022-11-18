import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     const res = await userService.getAllCodeServices("gender");
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (error) {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            this.setState({ genderArr: this.props.gendersRedux });
        }
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className="container w-50">
                <div className="user-redux-body">
                    <div className="container mt-5">
                        <form className="row g-3">
                            <div className="col-12 my-3 fs-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputEmail4"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail4"
                                />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputPassword4"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword4"
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="inputAddress"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.full-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="inputAddress"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="inputAddress2"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress2"
                                />
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <label
                                        htmlFor="inputCity"
                                        className="form-label"
                                    >
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                </div>

                                {genders &&
                                    genders.length > 0 &&
                                    genders.map((gender, index) => {
                                        return (
                                            <div
                                                className="form-check form-check-inline col-md-2"
                                                key={gender.id}
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id={gender.id}
                                                    value={gender.key}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={gender.id}
                                                >
                                                    {language &&
                                                    language === LANGUAGES.VI
                                                        ? gender.valueVi
                                                        : gender.valueEn}
                                                </label>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="formFile"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputState"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select id="inputState" className="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="inputState"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select id="inputState" className="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>

                            <div className="col-12 mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary "
                                >
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        gendersRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguage(language)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
