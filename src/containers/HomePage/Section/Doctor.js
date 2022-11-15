import React, { Component } from "react";
import { connect } from "react-redux";
import "./Doctor.scss";
import "./customSlide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Doctor extends Component {
    render() {
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
                        <span className="main">Bác sĩ tiêu biểu tuần qua</span>
                    </div>
                    <Slider {...settings}>
                        <div className="doctor-custom">
                            <div className="doctor-wrapper">
                                <div className="doctor-img"></div>
                                <div className="doctor-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-custom">
                            <div className="doctor-wrapper">
                                <div className="doctor-img"></div>
                                <div className="doctor-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-custom">
                            <div className="doctor-wrapper">
                                <div className="doctor-img"></div>
                                <div className="doctor-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-custom">
                            <div className="doctor-wrapper">
                                <div className="doctor-img"></div>
                                <div className="doctor-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-custom">
                            <div className="doctor-wrapper">
                                <div className="doctor-img"></div>
                                <div className="doctor-title">
                                    <span className="main-title">Nha khoa</span>
                                    <span className="sub-title">
                                        Bạn gặp vấn đề về răng miệng? Lên lịch
                                        khám nha khoa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-custom">
                            <div className="doctor-wrapper">
                                <div className="doctor-img"></div>
                                <div className="doctor-title">
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
