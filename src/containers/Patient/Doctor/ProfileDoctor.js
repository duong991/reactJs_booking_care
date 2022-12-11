import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";

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
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorId !== prevState.doctorId) {
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

    render() {
        console.log("check state: ", this.state);
        let { dataProfile } = this.state;
        let { language } = this.props;

        console.log(dataProfile);
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
                        <div className="title">
                            <span className="name-doctor">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </span>
                        </div>
                        <div className="info">
                            <div>Cơ sở: {nameClinic}</div>
                            <div>Địa chỉ: {addressClinic}</div>
                        </div>
                    </div>
                </div>
                <div className="content-down">
                    <div className="price">
                        Giá khám:{" "}
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
                </div>
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
