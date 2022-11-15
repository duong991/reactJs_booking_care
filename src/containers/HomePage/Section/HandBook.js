import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
class HandBook extends Component {
    render() {
        return (
            <div className="handBook-container">
                <div className="handBook-content">
                    <div className="handBook-header">
                        <div className="header-main">
                            <span>
                                Đọc các bài báo hàng đầu từ các chuyên gia sức
                                khỏe
                            </span>
                        </div>
                        <div className="header-sub">
                            <span>
                                Các bài báo về sức khỏe cung cấp cho bạn thông
                                tin về các phương pháp chăm sóc sức khỏe tốt và
                                đạt được mục tiêu của bạn.
                            </span>
                        </div>
                        <button className="btn btn-primary">
                            Xem tất cả các bài báo
                        </button>
                    </div>
                    <div className="handBook-topics">
                        <div className="item">
                            <div className="item-content">
                                <div className="item-img"></div>
                                <div className="item-text">
                                    <div className="text-label">
                                        CORONAVIRUS
                                    </div>
                                    <div className="text-title">
                                        12 lầm tưởng và sự thật về virus corona
                                        mà bạn nên biết
                                    </div>
                                    <div className="author">
                                        Dr. Diana Borgio
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-content">
                                <div className="item-img"></div>
                                <div className="item-text">
                                    <div className="text-label">
                                        CORONAVIRUS
                                    </div>
                                    <div className="text-title">
                                        12 lầm tưởng và sự thật về virus corona
                                        mà bạn nên biết
                                    </div>
                                    <div className="author">
                                        Dr. Diana Borgio
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
