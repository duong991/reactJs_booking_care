import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageURL: "",
            isOpen: false,
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({ genderArr: this.props.genderRedux });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({ positionArr: this.props.positionRedux });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({ roleArr: this.props.roleRedux });
        }
    }

    handleOnChangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            let objUrl = URL.createObjectURL(file);
            this.setState({ previewImageURL: objUrl });
        }
    };

    openPrevViewImage = () => {
        if (this.state.previewImageURL) {
            this.setState({ isOpen: true });
        }
    };

    render() {
        let language = this.props.language;

        let genders = this.state.genderArr;
        let isLoadingGender = this.props.isLoadingGender;

        let positions = this.state.positionArr;
        let isLoadingPosition = this.props.isLoadingPosition;

        let roles = this.state.roleArr;
        let isLoadingRole = this.props.isLoadingRole;
        return (
            <div className="container w-50">
                <div>
                    {isLoadingGender || isLoadingPosition || isLoadingRole
                        ? "Loading"
                        : ""}
                </div>
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
                                    <FormattedMessage id="manage-user.email" />
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
                                    <FormattedMessage id="manage-user.password" />
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
                            <div className="col-6">
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
                                    htmlFor="inputState"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select id="inputState" className="form-select">
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((position) => {
                                            return (
                                                <option>
                                                    {language === LANGUAGES.VI
                                                        ? position.valueVi
                                                        : position.valueEn}
                                                </option>
                                            );
                                        })}
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
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((role) => {
                                            return (
                                                <option>
                                                    {language === LANGUAGES.VI
                                                        ? role.valueVi
                                                        : role.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="formFile"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="col-md-12 preview-image-container">
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFile"
                                        hidden
                                        onChange={(event) =>
                                            this.handleOnChangeImage(event)
                                        }
                                    />
                                    <label
                                        className="label-upload"
                                        htmlFor="formFile"
                                    >
                                        <FormattedMessage id="manage-user.upload" />{" "}
                                        <i class="fas fa-upload"></i>
                                    </label>
                                    <div
                                        onClick={() => this.openPrevViewImage()}
                                        className="preview-image text-center"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImageURL})`,
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "contain",
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="col-12  text-end">
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
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,

        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,

        positionRedux: state.admin.positions,
        isLoadingPosition: state.admin.isLoadingPosition,

        roleRedux: state.admin.roles,
        isLoadingRole: state.admin.isLoadingRole,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
