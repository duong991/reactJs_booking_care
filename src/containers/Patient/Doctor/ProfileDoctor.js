import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import moment from "moment";
import _ from "lodash";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: [],
        };
    }

    async componentDidMount() {
        let result = await this.getInfoDoctorById(this.props.doctorId);
        this.setState({ ...this.state, dataProfile: result });
        if (this.props.isShowDescription) {
            let res = await userService.getMarkdownByIdDoctor(
                this.props.doctorId
            );
            this.setState({ ...this.state, description: res.data.description });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let result = await this.getInfoDoctorById(this.props.doctorId);
            this.setState({ ...this.state, dataProfile: result });
            if (this.props.isShowDescription) {
                let res = await userService.getMarkdownByIdDoctor(
                    this.props.doctorId
                );
                this.setState({
                    ...this.state,
                    description: res.data.description,
                });
            }
        }
    }

    getInfoDoctorById = async (id) => {
        let result = {};
        if (id) {
            let res = await userService.getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTimeBooking = (dataTime) => {
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
            return (
                <React.Fragment>
                    <div className="time-wrapper">
                        <div className="label">
                            <FormattedMessage id="patient.profile-doctor.time" />
                        </div>
                        <div className="time">
                            <div>
                                {language === LANGUAGES.VI ? hoursVi : hoursEn}
                            </div>
                            <div>
                                {language === LANGUAGES.VI ? dateVi : dateEn}
                            </div>
                        </div>
                    </div>
                    <div className="text-free">
                        (
                        <FormattedMessage id="patient.profile-doctor.text-free" />
                        )
                    </div>
                </React.Fragment>
            );
        }
        return <React.Fragment></React.Fragment>;
    };

    render() {
        let { dataProfile } = this.state;
        let { language, dataTime, doctorId } = this.props;

        let nameVi = "",
            nameEn = "",
            nameClinic = "",
            addressClinic = "",
            priceVi = "",
            priceEn = "";
        // doctor's name
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.fullName}`;
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.fullName}`;
        }
        if (
            dataProfile &&
            dataProfile.Doctor_Info &&
            dataProfile.Doctor_Info.nameClinic &&
            dataProfile.Doctor_Info.addressClinic
        ) {
            nameClinic = dataProfile.Doctor_Info.nameClinic;
            addressClinic = dataProfile.Doctor_Info.addressClinic;
        }

        // price
        if (
            dataProfile &&
            dataProfile.Doctor_Info &&
            dataProfile.Doctor_Info.priceData
        ) {
            priceVi = +dataProfile.Doctor_Info.priceData.valueVi;
            priceEn = +dataProfile.Doctor_Info.priceData.valueEn;
        }
        return (
            <div className="profile-wrapper">
                <div className="intro-doctor">
                    <div className="content-left">
                        <div
                            className="doctor-img"
                            style={{
                                backgroundImage: `url(${
                                    dataProfile && dataProfile.image
                                        ? dataProfile.image
                                        : ""
                                })`,
                            }}
                        />
                    </div>
                    <div className="content-right">
                        <div className="title-profile-doctor">
                            <span className="name-doctor">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </span>
                        </div>
                        {this.props.isShowDescription ? (
                            <div className="content-description">
                                {this.state.description}
                            </div>
                        ) : (
                            <React.Fragment>
                                <div className="info">
                                    <div>
                                        <span className="label">
                                            <FormattedMessage id="patient.profile-doctor.medical-facility" />
                                        </span>{" "}
                                        {nameClinic}
                                    </div>
                                    <div>
                                        <span className="label">
                                            <FormattedMessage id="patient.profile-doctor.address" />
                                        </span>{" "}
                                        {addressClinic}
                                    </div>
                                    {this.renderTimeBooking(dataTime)}
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                {this.props.isShowDescription ? (
                    <div className="content-down-more">
                        <span>
                            <Link to={`/detail-doctor/${doctorId}`}>
                                Xem thêm
                            </Link>
                        </span>
                    </div>
                ) : (
                    <div className="price">
                        <FormattedMessage id="patient.profile-doctor.price" />{" "}
                        {language === LANGUAGES.VI ? (
                            <NumberFormat
                                value={priceVi}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" VNĐ"}
                            />
                        ) : (
                            <NumberFormat
                                value={priceEn}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        )}
                    </div>
                )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
