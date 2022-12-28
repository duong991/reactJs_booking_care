import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailClinic.scss";
import { userService } from "../../../services";
import { LANGUAGES } from "../../../utils";

import Specialty from "../../HomePage/Section/Specialty";

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],
            description: "",
            listProvince: [],
            hidden: true,
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            this.getInfoClinic();
        }
    }
    getInfoClinic = async () => {
        let idClinic = this.props.match.params.id;
        let result = await userService.getDetailClinicById(idClinic);
        let resProvince = await userService.getAllCodeServices("PROVINCE");
        if (
            resProvince &&
            resProvince.errCode === 0 &&
            resProvince.data.length > 0
        ) {
            this.setState({ ...this.state, listProvince: resProvince.data });
        }
        if (result && result.errCode === 0 && result.data) {
            // lấy danh sách các chuyên khoa thuộc bệnh viện
            let { specialtyOfClinic } = result.data;
            console.log(specialtyOfClinic);
            this.setState({
                description: result.data.descriptionHTML,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState) {}

    handleOnchangeSelect = async (e) => {
        let idClinic = this.props.match.params.id;
        let result = await userService.getDetailClinicById(
            idClinic,
            e.target.value
        );

        if (result && result.errCode === 0 && result.data) {
            this.setState({
                arrDoctor: result.data.doctorClinic
                    ? result.data.doctorClinic.map((item) => item.doctorId)
                    : [],
            });
        }
    };
    handleChangeHidden = () => {
        this.setState({
            hidden: !this.state.hidden,
        });
    };

    render() {
        let { arrDoctor, description, listProvince, hidden } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="detail-clinic-wrapper">
                    <div
                        className="description-clinic"
                        style={
                            hidden
                                ? { overflow: "hidden", height: "254px" }
                                : { overflow: "none" }
                        }
                    >
                        <div
                            className="description-clinic-content"
                            dangerouslySetInnerHTML={{ __html: description }}
                            // style={hidden ? { height: "244px" } : {}}
                        />
                    </div>
                    <div className="hidden-button-wrapper">
                        <button
                            type="button"
                            onClick={this.handleChangeHidden}
                            className="hidden-button"
                        >
                            {hidden ? "Xem thêm" : "Ẩn bớt"}
                        </button>
                    </div>

                    <div className="specialty-of-clinic">
                        <Specialty specialOfClinic={true} />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
