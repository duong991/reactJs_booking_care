import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import "./customSlide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Specialty extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-container">
                <div className="section-header">
                    <span className="main">
                        Đặt hẹn để được tư vấn tại phòng khám
                    </span>
                    <span className="sub">
                        Tìm bác sĩ có kinh nghiệm trong tất cả các chuyên khoa
                    </span>
                </div>
                <Slider {...settings}>
                    <div className="section-custom">
                        <div className="section-wrapper specialty-wrapper">
                            <div className="section-img specialty-img"></div>
                            <div className="section-title ">
                                <span className="main-title">Nha khoa</span>
                                <span className="sub-title">
                                    Bạn gặp vấn đề về răng miệng? Lên lịch khám
                                    nha khoa
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-custom">
                        <div className="section-wrapper specialty-wrapper">
                            <div className="section-img specialty-img"></div>
                            <div className="section-title ">
                                <span className="main-title">Nha khoa</span>
                                <span className="sub-title">
                                    Bạn gặp vấn đề về răng miệng? Lên lịch khám
                                    nha khoa
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-custom">
                        <div className="section-wrapper specialty-wrapper">
                            <div className="section-img specialty-img"></div>
                            <div className="section-title ">
                                <span className="main-title">Nha khoa</span>
                                <span className="sub-title">
                                    Bạn gặp vấn đề về răng miệng? Lên lịch khám
                                    nha khoa
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-custom">
                        <div className="section-wrapper specialty-wrapper">
                            <div className="section-img specialty-img"></div>
                            <div className="section-title ">
                                <span className="main-title">Nha khoa</span>
                                <span className="sub-title">
                                    Bạn gặp vấn đề về răng miệng? Lên lịch khám
                                    nha khoa
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-custom">
                        <div className="section-wrapper specialty-wrapper">
                            <div className="section-img specialty-img"></div>
                            <div className="section-title ">
                                <span className="main-title">Nha khoa</span>
                                <span className="sub-title">
                                    Bạn gặp vấn đề về răng miệng? Lên lịch khám
                                    nha khoa
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-custom">
                        <div className="section-wrapper specialty-wrapper">
                            <div className="section-img specialty-img"></div>
                            <div className="section-title ">
                                <span className="main-title">Nha khoa</span>
                                <span className="sub-title">
                                    Bạn gặp vấn đề về răng miệng? Lên lịch khám
                                    nha khoa
                                </span>
                            </div>
                        </div>
                    </div>
                </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
