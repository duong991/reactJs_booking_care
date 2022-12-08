import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    toggleDetailInfo = () => {
        this.setState({ isShowDetailInfo: !this.state.isShowDetailInfo });
    };

    render() {
        let { isShowDetailInfo } = this.state;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">
                        Phòng khám Chuyên khoa Da Liễu
                    </div>
                    <div className="detail-address">
                        207 Phố Huế - Hai Bà Trưng - Hà Nội
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfo ? (
                        <React.Fragment>
                            <div className="title-price">GIÁ KHÁM: </div>
                            <div className="detail-price">
                                <div className="detail-price-header">
                                    <span className="left">Giá khám</span>
                                    <span className="right">250.000đ</span>
                                </div>
                                <div className="detail-price-note">
                                    Được ưu tiên khám trước khi đật khám qua
                                    BookingCare. Giá khám cho người nước ngoài
                                    là 30 USD
                                </div>
                                <div className="detail-price-payment">
                                    Người bệnh có thể thanh toán chi phí bằng
                                    hình thức tiền mặt và quẹt thẻ
                                </div>
                                <span
                                    className="btn-toggle hide"
                                    onClick={this.toggleDetailInfo}
                                >
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div>
                            <span className="title-price">
                                GIÁ KHÁM: <span>300.000đ.</span>
                            </span>

                            <span
                                className="btn-toggle show"
                                onClick={this.toggleDetailInfo}
                            >
                                Xem chi tiết
                            </span>
                        </div>
                    )}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
