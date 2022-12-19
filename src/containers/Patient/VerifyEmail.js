import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "./../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerified: false,
            errCode: -1,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");

            let res = await userService.postVerifyBookAppointment({
                token,
                doctorId,
            });

            if (res && res.errCode === 0) {
                this.setState({ statusVerified: true, errCode: res.errCode });
            } else {
                this.setState({ statusVerified: true, errCode: -1 });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {}

    render() {
        let { statusVerified, errCode } = this.state;
        console.log(this.state);
        return (
            <React.Fragment>
                <HomeHeader />
                {statusVerified === false ? (
                    <div className="verify-content">Loading...</div>
                ) : (
                    <div className="verify-content">
                        {errCode === 0
                            ? "Xác nhận lịch hẹn thành công!"
                            : "Lịch hẹn không tồn tại hoặc đã được xác nhận"}
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
