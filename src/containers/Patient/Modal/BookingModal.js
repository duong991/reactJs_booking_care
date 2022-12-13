import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";

import "./BookingModal.scss";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import moment from "moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthDay: "",
            genders: "",
            selectedGender: "",
            timeType: "",
        };
    }

    async componentDidMount() {
        this.props.fetchGender();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (prevProps.dataTime !== this.props.dataTime) {
            let dataTime = this.props.dataTime;
            let doctorIdFromProps = "",
                timeType = "";
            if (dataTime && !_.isEmpty(dataTime)) {
                doctorIdFromProps = dataTime.doctorId;
                timeType = dataTime.timeType;
            }
            console.log(dataTime);
            this.setState({
                doctorId: doctorIdFromProps,
                doctorName: this.props.dataTime.doctorName.fullName,
                timeType: timeType,
                date: dataTime.date,
            });
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label =
                    language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };

        if (id === "birthDay") {
            copyState[id] = e[0];
        } else {
            let valueInput = e.target.value;
            copyState[id] = valueInput;
        }
        this.setState(copyState);
    };

    handleChangeGender = (selectedGender) => {
        this.setState({ selectedGender: selectedGender });
    };
    clearInput = () => {
        this.setState({
            ...this.state,
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthDay: "",
            selectedGender: "",
        });
    };

    handleConfirmBooking = async () => {
        // validate input
        let timeString = this.buildTimeBooking(this.props.dataTime);

        let res = await userService.postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthDay: this.state.birthDay,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            doctorName: this.state.doctorName,
            timeType: this.state.timeType,
            date: this.state.date,
            language: this.props.language,
            timeString: timeString,
        });

        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Booking a new appointment success !");
            this.clearInput();
            this.props.closeBookingModal();
        } else {
            toast.error("🤟🏻 Booking a new appointment fail !");
        }
    };

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let hoursVi = dataTime.timeTypeData.valueVi;
            let hoursEn = dataTime.timeTypeData.valueEn;
            let dateVi = moment(new Date(+dataTime.date)).format(
                "dddd - DD/MM/YYYY"
            );
            dateVi = this.capitalizeFirstLetter(dateVi);
            let dateEn = moment(new Date(+dataTime.date))
                .locale("en")
                .format("dddd - MMMM Do YYYY");

            let time = language === LANGUAGES.VI ? hoursVi : hoursEn;
            let date = language === LANGUAGES.VI ? dateVi : dateEn;

            return `${time} , ${date}`;
        }
        return "";
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let { closeBookingModal, isOpenModal, dataTime } = this.props;
        let doctorIdFromProps = "";
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorIdFromProps = dataTime.doctorId;
        }
        let {
            fullName,
            phoneNumber,
            email,
            address,
            reason,
            birthDay,
            genders,
            selectedGender,
        } = this.state;

        if (this.state.doctorName) {
            console.log(this.state.doctorName);
        }

        return (
            <Modal isOpen={isOpenModal} centered={true} size={"lg"}>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="modal-header-left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span
                            className="modal-header-right"
                            onClick={() => closeBookingModal()}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body container">
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorIdFromProps}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group mt-4">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input
                                    className="form-control"
                                    value={fullName}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "fullName")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(
                                            e,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "email")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className="form-control"
                                    value={address}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "address")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthDay" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    value={birthDay}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "birthDay")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>

                                <Select
                                    value={selectedGender}
                                    onChange={this.handleChangeGender}
                                    options={genders}
                                />
                            </div>
                            <div className="col-12 form-group mt-4">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    value={reason}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "reason")
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button
                            className="btn btn-success btn-booking"
                            onClick={this.handleConfirmBooking}
                        >
                            <FormattedMessage id="patient.booking-modal.submit" />
                        </button>
                        <button
                            className="btn btn-secondary btn-booking"
                            onClick={() => closeBookingModal()}
                        >
                            <FormattedMessage id="patient.booking-modal.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        genders: state.admin.genders,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
