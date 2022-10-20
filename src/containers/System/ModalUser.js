import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    FormText,
} from "reactstrap";

import "./ModalUser.scss";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    handleToggle = () => {
        this.props.ToggleFromParent();
    };

    render() {
        console.log(">>>Child props: ", this.props);
        return (
            <Modal
                isOpen={this.props.isOpen}
                centered={true}
                size={"lg"}
                toggle={() => this.handleToggle()}
            >
                <div className="container">
                    <h3 className="">Registration Form</h3>
                    <form>
                        <div className="row">
                            <div className="col-md-6 mb-4 col-md-6 mb-4">
                                <div className="form-outline">
                                    <label
                                        className="form-label"
                                        for="emailAddress"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="emailAddress"
                                        className="form-control form-control-lg"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4col-md-6 mb-4">
                                <div className="form-outline">
                                    <label
                                        className="form-label"
                                        for="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control form-control-lg"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label
                                        className="form-label"
                                        for="firstName"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="form-control form-control-lg"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4 ">
                                <div className="form-outline">
                                    <label
                                        className="form-label"
                                        for="phoneNumber"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        className="form-control form-control-lg"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4 d-flex align-items-center">
                                <div className="form-outline datepicker w-100">
                                    <label
                                        for="birthdayDate"
                                        className="form-label"
                                    >
                                        Birthday
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="birthdayDate"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <h6 className="mb-2 pb-1 mt-2">Gender:</h6>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="femaleGender"
                                        value="0"
                                        checked
                                    />
                                    <label
                                        className="form-check-label"
                                        for="femaleGender"
                                    >
                                        Female
                                    </label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="maleGender"
                                        value="1"
                                    />
                                    <label
                                        className="form-check-label"
                                        for="maleGender"
                                    >
                                        Male
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <h6 className="mb-2 pb-1 mt-2">Role id</h6>

                                <select className="select form-control-lg">
                                    <option value="1">Subject 1</option>
                                    <option value="2">Subject 2</option>
                                    <option value="3">Subject 3</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="wrapBtn">
                                <button
                                    type="button"
                                    className="btn btn-success btn-custom"
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
