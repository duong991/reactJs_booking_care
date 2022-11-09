import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
class HomeHeader extends Component {
    render() {
        return (
            <header className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <ul>
                            <li className="item">
                                <a href="#" className="">
                                    <b>Chuyên khoa</b>
                                    <span>Tìm bác sĩ theo chuyên khoa</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="">
                                    <b>Cơ sở y tế</b>
                                    <span>Chọn bệnh viện phòng khám</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="">
                                    <b>Bác sĩ</b>
                                    <span>Chọn bác sĩ giỏi</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="">
                                    <b>Gói khám </b>
                                    <span>Khám sức khỏe tổng quát</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="right-content">
                        <a href="#">
                            <i class="fas fa-question-circle"></i>
                            <span>Hỗ trợ</span>
                        </a>
                        <div className="language">
                            <i class="fas fa-globe"></i>
                            <span>VN</span>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
