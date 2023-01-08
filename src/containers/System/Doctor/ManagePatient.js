import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import Select from "react-select";
import userService from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { LANGUAGES, dateFormat } from "../../../utils";
import { toast } from "react-toastify";
import _ from "lodash";
import LoadingOverlay from "react-loading-overlay";

import RemedyModal from "./RemedyModal";
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpen: false,
            dataModal: {},

            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let FormattedDate = new Date(currentDate).getTime();
        let res = await userService.getListPatientsForDoctor(
            user.id,
            FormattedDate
        );
        if (res && res.errCode === 0) {
            this.setState({ dataPatient: res.data });
        }
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
        }
    }

    handleOnChangeDatePicker = async (date) => {
        this.setState({ currentDate: date[0] }, () => {
            this.getDataPatient();
        });
    };

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            fullName: item.patientData.fullName,
        };
        this.setState({
            isOpen: true,
            dataModal: data,
        });
    };
    closeRemedyModal = () => {
        this.setState({
            isOpen: false,
            dataModal: {},
        });
    };

    sendRemedyParent = async (data) => {
        let { dataModal } = this.state;
        this.setState({ isShowLoading: true });

        let res = await userService.sendRemedy({
            ...data,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            fullName: dataModal.fullName,
        });

        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Send remedy success !");
            await this.getDataPatient();
        } else {
            toast.error("🤟🏻 Send remedy fail !");
            console.log(res);
        }
        this.setState({ isShowLoading: false });
    };
    render() {
        let { dataPatient, isOpen, dataModal } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            <FormattedMessage id="manage-patient.title" />
                        </div>
                        <div className="m-p-body row">
                            <div className="col-4 form-group">
                                <label>
                                    <FormattedMessage id="manage-patient.choose-date" />
                                </label>

                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 form-group mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <FormattedMessage id="manage-patient.stt" />
                                            </th>
                                            <th scope="col">
                                                <FormattedMessage id="manage-patient.time" />
                                            </th>
                                            <th scope="col">
                                                <FormattedMessage id="manage-patient.fullName" />
                                            </th>
                                            <th scope="col">
                                                <FormattedMessage id="manage-patient.address" />
                                            </th>
                                            <th scope="col">
                                                <FormattedMessage id="manage-patient.gender" />
                                            </th>
                                            <th scope="col">
                                                <FormattedMessage id="manage-patient.submit" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient &&
                                        dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td scope="row">
                                                            {index + 1}
                                                        </td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .fullName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm btn btn-primary "
                                                                onClick={() =>
                                                                    this.handleBtnConfirm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <FormattedMessage id="manage-patient.submit" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <React.Fragment></React.Fragment>
                                        )}
                                    </tbody>
                                </table>
                                {dataPatient && !(dataPatient.length > 0) && (
                                    <div className="tx-no-data">No data</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpen={isOpen}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedyParent}
                    />
                </LoadingOverlay>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
