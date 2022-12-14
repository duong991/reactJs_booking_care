import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";

import "./ModalUser.scss";
import { emitter } from "../../utils";
import _ from "lodash";

const optionsGender = [
    {
        label: "Male",
        value: "1",
    },
    {
        label: "Female",
        value: "0",
    },
];

const optionsRoleId = [
    {
        label: "Option 1",
        value: "1",
    },
    {
        label: "Option 2",
        value: "2",
    },
    {
        label: "Option 3",
        value: "3",
    },
];

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "1",
            email: "",
            fullName: "",
            phoneNumber: "",
            address: "",
            gender: "1",
            roleId: "1",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {
        let { currentUser } = this.props;
        if (prevState.email !== currentUser.email) {
            this.setState({
                id: currentUser.id,
                email: currentUser.email,
                password: currentUser.password,
                fullName: currentUser.fullName,
                phoneNumber: currentUser.phoneNumber,
                address: currentUser.address,
                gender: currentUser.gender,
                roleId: currentUser.roleId,
            });
        }
    }

    handleToggle = () => {
        this.props.ToggleFromParent();
    };

    handleOnChangeInput = (e, id) => {
        /**
         * BAD CODE HERE
        this.state[id] = e.target.value;
        this.setState({
            ...this.state,
        }) 
        */
        // GOOD CODE HERE
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({ ...copyState });
    };

    checkValidInput = () => {
        let arrInput = [
            "email",
            "fullName",
            "phoneNumber",
            "address",
            "gender",
            "roleId",
        ];
        let isValid = true;

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handleEditUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            let data = this.state;
            this.props.doEditUser(data);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                centered={true}
                size={"lg"}
                toggle={() => this.handleToggle()}
            >
                <div className="container">
                    <h3 className="mb-5">Form edit user</h3>
                    <form>
                        <div className="row">
                            <div className="col-md-6 mb-4 col-md-6 mb-4">
                                <div className="form-outline">
                                    <label
                                        className="form-label"
                                        htmlFor="emailAddress"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="emailAddress"
                                        className="form-control form-control-lg"
                                        onChange={(e) =>
                                            this.handleOnChangeInput(e, "email")
                                        }
                                        value={this.state.email}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label
                                        className="form-label"
                                        htmlFor="fname"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        id="fname"
                                        className="form-control form-control-lg"
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "fullName"
                                            )
                                        }
                                        value={this.state.fullName}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4 ">
                                <div className="form-outline">
                                    <label
                                        className="form-label"
                                        htmlFor="phoneNumber"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        className="form-control form-control-lg"
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "phoneNumber"
                                            )
                                        }
                                        value={this.state.phoneNumber}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4 d-flex align-items-center">
                                <div className="form-outline datepicker w-100">
                                    <label
                                        htmlFor="address"
                                        className="form-label"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="address"
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "address"
                                            )
                                        }
                                        value={this.state.address}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 mb-4">
                                <h6 className="mb-2 pb-1 mt-2">Gender</h6>

                                <select
                                    className="select form-control-lg w-100"
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "gender")
                                    }
                                    value={this.state.gender}
                                >
                                    {optionsGender.map((option, index) => (
                                        <option
                                            value={option.value}
                                            key={index}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3 mb-4">
                                <h6 className="mb-2 pb-1 mt-2">Role id</h6>

                                <select
                                    className="select form-control-lg w-100"
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "roleId")
                                    }
                                    value={this.state.roleId}
                                >
                                    {optionsRoleId.map((option, index) => (
                                        <option
                                            value={option.value}
                                            key={index}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row wrapBtn">
                            <div className="wrapBtn">
                                <button
                                    type="button"
                                    className="btn btn-success btn-custom"
                                    onClick={this.handleEditUser}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-custom"
                                    onClick={() => this.handleToggle()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
