/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";
import "./customSlide.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {
    render() {
        return (
            <div className="section-about">
                <div className="about-container">
                    <div className="about-header">
                        <span>Truyền thông nói gì về BookingCare</span>
                    </div>
                    <div className="about-content">
                        <div className="content-left">
                            <iframe
                                width="100%"
                                height="350px"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div className="content-right">
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                >
                                    <i className="truyenThong truyenThong_suckhoedoisong"></i>
                                </a>
                            </div>

                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
                                    title="VTV1 - Cà phê khởi nghiệp 14-11-2018"
                                >
                                    <i className="truyenThong truyenThong_vtv1"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://ictnews.vietnamnet.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict"
                                    title="Báo điện tử ictnews giới thiệu BookingCare"
                                >
                                    <i className="truyenThong truyenThong_infonet"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
                                    title="VnExpress nói về BookingCare"
                                >
                                    <i className="truyenThong truyenThong_vnexpress"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html"
                                    title="VTC News nói về BookingCare"
                                >
                                    <i className="truyenThong truyenThong_vtcnews"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://ehealth.gov.vn/?action=News&newsId=46094"
                                    title="Cục công nghệ thông tin - Bộ Y tế nói về BookingCare"
                                >
                                    <i className="truyenThong truyenThong_cnttbyt"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html"
                                    title="Báo điện tử infonet nói về BookingCare"
                                >
                                    <i className="truyenThong truyenThong_infonet"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://vtv.vn/video/ca-phe-khoi-nghiep-16-8-2018-317687.htm"
                                    title="VTV1 - Cà phê khởi nghiệp 16-08-2018"
                                >
                                    <i className="truyenThong truyenThong_vtv1"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://www.youtube.com/watch?v=mstAc81lpMc"
                                    title="VTV1 - Cà phê khởi nghiệp 21-02-2018"
                                >
                                    <i className="truyenThong truyenThong_vtc"></i>
                                </a>
                            </div>
                            <div className="content-wrapper">
                                <a
                                    target="_blank"
                                    href="https://vtv.vn/video/ca-phe-khoi-nghiep-21-02-2018-282723.htm"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                >
                                    <i className="truyenThong truyenThong_vtv1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
