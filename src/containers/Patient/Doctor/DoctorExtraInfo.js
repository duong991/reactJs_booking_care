import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import NumberFormat from "react-number-format";
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {},
        };
    }

    async componentDidMount() {
        let { doctorId } = this.props;
        let res = await userService.getExtraInfoDoctorById(doctorId);
        if (res && res.errCode === 0) {
            this.setState({
                ...this.state,
                extraInfo: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {}

    toggleDetailInfo = () => {
        this.setState({ isShowDetailInfo: !this.state.isShowDetailInfo });
    };

    render() {
        let { isShowDetailInfo, extraInfo } = this.state;
        let { language } = this.props;
        let priceVi = "",
            priceEn = "",
            paymentVi = "",
            paymentEn = "";

        if (
            extraInfo.priceData &&
            extraInfo.priceData.valueEn &&
            extraInfo.priceData.valueVi &&
            extraInfo.paymentData.valueVi &&
            extraInfo.paymentData.valueEn
        ) {
            priceVi = +extraInfo.priceData.valueVi;
            priceEn = +extraInfo.priceData.valueEn;
            paymentVi = extraInfo.paymentData.valueVi;
            paymentEn = extraInfo.paymentData.valueEn;
        }
        console.log(extraInfo);
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic
                            ? extraInfo.nameClinic
                            : ""}
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic
                            ? extraInfo.addressClinic
                            : ""}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfo ? (
                        <React.Fragment>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </div>
                            <div className="detail-price">
                                <div className="detail-price-header">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-info-doctor.price" />
                                    </span>
                                    <span className="right">
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
                                    </span>
                                </div>
                                <div className="detail-price-note">
                                    {extraInfo && extraInfo.nameClinic
                                        ? extraInfo.note
                                        : ""}
                                </div>
                                <div className="detail-price-payment">
                                    <FormattedMessage id="patient.extra-info-doctor.payment" />

                                    {language === LANGUAGES.VI ? (
                                        <span className="price-payment">
                                            {paymentVi}
                                        </span>
                                    ) : (
                                        <span className="price-payment">
                                            {paymentEn}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className="btn-toggle hide"
                                    onClick={this.toggleDetailInfo}
                                >
                                    <FormattedMessage id="patient.extra-info-doctor.hidePrice" />
                                </span>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div>
                            <span className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                                :{" "}
                                <span>
                                    {language === LANGUAGES.VI ? (
                                        <NumberFormat
                                            value={priceVi}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={" VND"}
                                        />
                                    ) : (
                                        <NumberFormat
                                            value={priceEn}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"$"}
                                        />
                                    )}
                                </span>
                            </span>

                            <span
                                className="btn-toggle show"
                                onClick={this.toggleDetailInfo}
                            >
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
