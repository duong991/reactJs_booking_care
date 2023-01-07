import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import { LANGUAGES, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser.js";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { SyncLoader } from "react-spinners";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageURL: "",
            isOpen: false,

            isCheckedRadioGender: false,

            id: "",
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
            address: "",
            gender: "M",
            position: "",
            positionDefaultDoctor: "",
            role: "",
            image: "",

            clinic: "",
            listClinic: {},

            isCreateForm: true,

            loading: true,
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        let resClinic = await userService.getAllClinic("Name");
        let clinicArr = resClinic.data;
        if (resClinic && resClinic.errCode === 0) {
            this.setState({
                ...this.state,
                listClinic: clinicArr,
                clinic:
                    clinicArr && clinicArr.length > 0 ? clinicArr[0].id : "",
                loading: false,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        let arrPosition = this.props.positionRedux;
        let arrRole = this.props.roleRedux;
        let { listClinic } = this.state;
        // set default key value of gender arr (M, F , O)
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({ genderArr: this.props.genderRedux });
        }
        // set default key value of position arr ()
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: arrPosition,
                positionDefaultDoctor:
                    arrPosition && arrPosition.length > 0
                        ? arrPosition[0].keyMap
                        : "",
            });
        }
        // set default key value of role arr ()
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
            });
        }
        // clear input when add or update user
        if (prevProps.allUsers !== this.props.allUsers) {
            this.setState({
                ...this.state,
                email: "",
                password: "",
                fullName: "",
                phoneNumber: "",
                address: "",
                gender: "M",
                position: "",
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
                image: "",
                previewImageURL: "",
                clinic:
                    listClinic && listClinic.length > 0 ? listClinic[0].id : "",
            });
        }
    }

    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objUrl = URL.createObjectURL(file);
            this.setState({
                ...this.state,
                previewImageURL: objUrl,
                image: base64,
            });
        }
    };

    openPrevViewImage = () => {
        if (this.state.previewImageURL) {
            this.setState({ isOpen: true });
        }
    };

    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };

        copyState[type] = event.target.value;

        this.setState({ ...copyState });
    };

    handleSaveUser = async () => {
        this.setState({ ...this.state, loading: true });
        let isValid = this.checkValidInput();
        if (!isValid) {
            return;
        }
        let data = {
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            position:
                this.state.role === "R2"
                    ? this.state.positionDefaultDoctor
                    : "",
            gender: this.state.gender,
            role: this.state.role,
            image: this.state.image,
            clinic: this.state.role === "R4" ? this.state.clinic : "",
        };
        // fire redux action

        await this.props.createNewUser(data);
        this.setState({ ...this.state, loading: false });
    };

    checkValidInput = () => {
        // regx js
        let isValid = true;
        let arrCheck = [
            "email",
            "password",
            "fullName",
            "phoneNumber",
            "address",
            "gender",
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (this.state[arrCheck[i]] === "") {
                alert("This input is required: " + arrCheck[i]);
                isValid = false;
                break;
            }
        }
        return isValid;
    };

    renderInfoUserForEdit = (data) => {
        let imageBase64 = "";
        if (data.image) {
            imageBase64 = new Buffer(data.image, "base64").toString("binary");
        }
        this.setState({
            ...this.state,
            id: data.id,
            email: data.email,
            password: "HARDPASSWORD",
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            gender: data.gender,
            position: data.positionId,
            role: data.roleId,
            previewImageURL: imageBase64,
            image: "",
            isCreateForm: false,
            clinic: data.clinic ? data.clinic : "",
        });
    };

    handleUpdateUser = async () => {
        this.setState({ ...this.state, loading: true });

        let isValid = this.checkValidInput();
        if (!isValid) {
            return;
        }
        let data = {
            id: this.state.id,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            gender: this.state.gender,
            role: this.state.role,
            position: "",
            image: this.state.image,
            clinic: this.state.clinic,
        };
        if (data.role === "R2") {
            data.position = this.state.positionDefaultDoctor;
        }

        await this.props.editUser(data);
        this.setState({ ...this.state, isCreateForm: true, loading: false });
    };
    handleOnchangeSelect = async (e) => {
        this.setState({ ...this.state, loading: true });

        let result = await userService.getAllUser(e.target.value);

        if (result && result.errCode === 0 && result.users) {
            let arrAccount = result.users;
            let newState = { ...this.state };
            newState.arrAccount = arrAccount;
            this.setState({
                ...newState,
            });
        }
        this.setState({ ...this.state, loading: false });
    };

    render() {
        let language = this.props.language;
        let {
            email,
            password,
            fullName,
            phoneNumber,
            address,
            position,
            gender,
            role,
            image,
            genderArr,
            positionArr,
            roleArr,
            positionDefaultDoctor,

            listClinic,
            clinic,
            loading,
        } = this.state;
        let isCreateForm = this.state.isCreateForm;

        return (
            <div className="wrapper-container">
                <div className="container">
                    <SyncLoader
                        color="black"
                        cssOverride={{}}
                        loading={loading}
                    />
                    <div className="user-redux-body">
                        <div className="row g-3">
                            <div className="col-12 my-3 fs-3">
                                {isCreateForm ? (
                                    <FormattedMessage id="manage-user.add" />
                                ) : (
                                    <FormattedMessage id="manage-user.edit" />
                                )}
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
                                    value={email}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "email")
                                    }
                                    disabled={!isCreateForm}
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
                                    value={password}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "password")
                                    }
                                    disabled={!isCreateForm}
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="inputFullName"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.full-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputFullName"
                                    value={fullName}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "fullName")
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="inputPhoneNumber"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputPhoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(
                                            e,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="inputAddress"
                                    className="form-label"
                                >
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    value={address}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "address")
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <div>
                                    <label className="form-label">
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                </div>
                                <select
                                    id="inputState"
                                    className="form-select"
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "gender")
                                    }
                                    value={gender}
                                >
                                    {genderArr &&
                                        genderArr.length > 0 &&
                                        genderArr.map((gender) => {
                                            return (
                                                <option value={gender.keyMap}>
                                                    {language === LANGUAGES.VI
                                                        ? gender.valueVi
                                                        : gender.valueEn}
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
                                <select
                                    id="inputState"
                                    className="form-select"
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "role")
                                    }
                                    value={role}
                                >
                                    {roleArr &&
                                        roleArr.length > 0 &&
                                        roleArr.map((role) => {
                                            return (
                                                <option value={role.keyMap}>
                                                    {language === LANGUAGES.VI
                                                        ? role.valueVi
                                                        : role.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            {role === "R4" ? (
                                <div className="col-md-6">
                                    <label
                                        htmlFor="inputState"
                                        className="form-label"
                                    >
                                        <FormattedMessage id="manage-user.clinic" />
                                    </label>
                                    <select
                                        id="inputState"
                                        className="form-select"
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "clinic"
                                            )
                                        }
                                        value={clinic}
                                    >
                                        {listClinic &&
                                            listClinic.length > 0 &&
                                            listClinic.map((item) => {
                                                return (
                                                    <option value={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            ) : (
                                <div className="col-md-6">
                                    <label
                                        htmlFor="inputState"
                                        className="form-label"
                                    >
                                        <FormattedMessage id="manage-user.position" />
                                    </label>
                                    {role === "R2" ? (
                                        <select
                                            id="inputState"
                                            className="form-select"
                                            onChange={(e) =>
                                                this.handleOnChangeInput(
                                                    e,
                                                    "positionDefaultDoctor"
                                                )
                                            }
                                            value={positionDefaultDoctor}
                                        >
                                            {positionArr &&
                                                positionArr.length > 0 &&
                                                positionArr.map((position) => {
                                                    return (
                                                        <option
                                                            value={
                                                                position.keyMap
                                                            }
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? position.valueVi
                                                                : position.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            disabled={true}
                                            className="form-control"
                                            id="inputAddress"
                                            placeholder="Không"
                                            value=""
                                            onChange={(e) =>
                                                this.handleOnChangeInput(
                                                    e,
                                                    "position"
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            )}

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
                                        onChange={(event) => {
                                            this.handleOnChangeImage(event);
                                        }}
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

                            <div className="col-6 p-5 text-end">
                                <button
                                    type="submit"
                                    className={
                                        isCreateForm
                                            ? "btn btn-primary"
                                            : "btn btn-success"
                                    }
                                    onClick={
                                        isCreateForm
                                            ? () => this.handleSaveUser()
                                            : () => this.handleUpdateUser()
                                    }
                                >
                                    {isCreateForm ? (
                                        <FormattedMessage id="manage-user.save" />
                                    ) : (
                                        <FormattedMessage id="manage-user.update" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableManageUser
                    getInfoUserForEdit={this.renderInfoUserForEdit}
                />
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

        allUsers: state.admin.allUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUser: () => {
            dispatch(actions.fetchAllUser("All"));
        },

        editUser: (data) => {
            dispatch(actions.editUser(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
