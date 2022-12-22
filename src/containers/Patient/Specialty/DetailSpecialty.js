import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [55, 60, 62],
            // arrDoctor: [55],
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    render() {
        let { arrDoctor } = this.state;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="detail-specialty-wrapper">
                    <div className="description-specialty"></div>
                    {arrDoctor &&
                        arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="content-left-parent">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescription={true}
                                            // dataTime={dataTime}
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
