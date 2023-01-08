import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";

import "./RemedyModal.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imageBase64: "",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({ email: this.props.dataModal.email });
        }
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };

        let valueInput = e.target.value;
        copyState[id] = valueInput;
        this.setState(copyState);
    };
    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                ...this.state,
                imageBase64: base64,
            });
        }
    };

    handleSendRemedy = () => {
        this.props.closeRemedyModal();
        this.props.sendRemedy(this.state);
    };
    render() {
        let { closeRemedyModal, isOpen, dataModal } = this.props;

        return (
            <Modal isOpen={isOpen} centered={true} size={"bg"}>
                <div className="remedy-modal-content">
                    <div className="remedy-modal-header">
                        <span className="modal-header-left">
                            <FormattedMessage id="manage-patient.remedy-modal.title" />
                        </span>
                        <span
                            className="modal-header-right"
                            onClick={() => closeRemedyModal()}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="remedy-modal-body container">
                        <div className="row">
                            <div className="col-6 form-group mt-4">
                                <label>Email bệnh nhân</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "email")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>Chọn hóa đơn</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleOnChangeImage(e)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="remedy-modal-footer">
                        <button
                            className="btn btn-success btn-booking"
                            onClick={() => this.handleSendRemedy()}
                        >
                            <FormattedMessage id="manage-patient.remedy-modal.submit" />
                        </button>
                        <button
                            className="btn btn-secondary btn-booking"
                            onClick={() => closeRemedyModal()}
                        >
                            <FormattedMessage id="manage-patient.remedy-modal.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
