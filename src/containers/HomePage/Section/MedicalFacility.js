import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import "./customSlide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="medicalFacility-wrapper">
                <div className="section-container">
                    <div className="section-header">
                        <span className="main">Cơ sở y tế nổi bật</span>
                    </div>
                    <Slider {...settings}>
                        <div className="section-custom">
                            <div className="section-wrapper">
                                <div className="section-img medicalFacility-img"></div>
                                <div className="section-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="section-custom">
                            <div className="section-wrapper">
                                <div className="section-img medicalFacility-img"></div>
                                <div className="section-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="section-custom">
                            <div className="section-wrapper">
                                <div className="section-img medicalFacility-img"></div>
                                <div className="section-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="section-custom">
                            <div className="section-wrapper">
                                <div className="section-img medicalFacility-img"></div>
                                <div className="section-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="section-custom">
                            <div className="section-wrapper">
                                <div className="section-img medicalFacility-img"></div>
                                <div className="section-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="section-custom">
                            <div className="section-wrapper">
                                <div className="section-img medicalFacility-img"></div>
                                <div className="section-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
