import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailSpecialty.scss";
import { userService } from "../../../services";
import { LANGUAGES } from "../../../utils";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            description: "",
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            this.getInfoSpecialty();
        }
    }
    getInfoSpecialty = async () => {
        let idSpecialty = this.props.match.params.id;
        let result = await userService.getDetailSpecialtyById(
            idSpecialty,
            "All"
        );
        let resProvince = await userService.getAllCodeServices("PROVINCE");
        if (
            resProvince &&
            resProvince.errCode === 0 &&
            resProvince.data.length > 0
        ) {
            this.setState({ ...this.state, listProvince: resProvince.data });
        }
        if (result && result.errCode === 0 && result.data) {
            this.setState({
                description: result.data.descriptionHTML,
                arrDoctor: result.data.doctorSpecialty
                    ? result.data.doctorSpecialty.map((item) => item.doctorId)
                    : [],
            });
        }
    };

    async componentDidUpdate(prevProps, prevState) {}

    handleOnchangeSelect = async (e) => {
        let idSpecialty = this.props.match.params.id;
        let result = await userService.getDetailSpecialtyById(
            idSpecialty,
            e.target.value
        );

        if (result && result.errCode === 0 && result.data) {
            this.setState({
                arrDoctor: result.data.doctorSpecialty
                    ? result.data.doctorSpecialty.map((item) => item.doctorId)
                    : [],
            });
        }
    };

    render() {
        let { arrDoctor, description, listProvince } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="detail-specialty-wrapper">
                    <div className="description-specialty">
                        <div
                            className="description-specialty-content"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </div>

                    <div className="search-sp-doctor">
                        <select onChange={(e) => this.handleOnchangeSelect(e)}>
                            <option value="All" key="All">
                                {language === LANGUAGES.VI ? "Tất cả" : "All"}
                            </option>

                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => (
                                    <option value={item.keyMap} key={index}>
                                        {language === LANGUAGES.VI
                                            ? item.valueVi
                                            : item.valueEn}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {arrDoctor &&
                        arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="content-left-parent">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescription={true}
                                        />
                                    </div>
                                    <div className="content-right-parent">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorId={item} />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo doctorId={item} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
