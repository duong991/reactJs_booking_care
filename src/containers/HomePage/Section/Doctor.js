import React, { Component } from "react";
import { connect } from "react-redux";
import "./Doctor.scss";
import "./customSlide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctor();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                ...this.state,
                topDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    handleDetailDoctor = (data) => {
        let idDoctor = data.id;
        this.props.history.push(`/detail-doctor/${idDoctor}`);
    };

    render() {
        let { language } = this.props;
        let topDoctors = this.state.topDoctors;
        var settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div className="doctor-wrapper">
                <div className="doctor-container">
                    <div className="doctor-header">
                        <span className="main">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                    </div>
                    <Slider {...settings}>
                        {topDoctors &&
                            topDoctors.length > 0 &&
                            topDoctors.map((item, index) => {
                                let nameVi = `${item.positionData.valueVi} ${item.fullName}`;
                                let nameEn = `${item.positionData.valueEn} ${item.fullName}`;
                                let imageBase64 = "";
                                if (item.image) {
                                    imageBase64 = new Buffer(
                                        item.image,
                                        "base64"
                                    ).toString("binary");
                                }
                                return (
                                    <div
                                        key={index}
                                        className="doctor-custom"
                                        onClick={() =>
                                            this.handleDetailDoctor(item)
                                        }
                                    >
                                        <div className="doctor-wrapper">
                                            <div
                                                className="doctor-img"
                                                style={{
                                                    backgroundImage: `url(${imageBase64})`,
                                                }}
                                            />
                                            <div className="doctor-title">
                                                <span className="main-title">
                                                    {language === LANGUAGES.VI
                                                        ? nameVi
                                                        : nameEn}
                                                </span>
                                                <span className="sub-title">
                                                    Cơ xương khớp
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
