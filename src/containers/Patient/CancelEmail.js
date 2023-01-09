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
            statusCancel: false,
            errCode: -1,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let tokenRemove = urlParams.get("tokenRemove");
            let doctorId = urlParams.get("doctorId");

            let res = await userService.postCancelBookAppointment({
                tokenRemove,
                doctorId,
            });

            if (res && res.errCode === 0) {
                this.setState({ statusCancel: true, errCode: res.errCode });
            } else {
                this.setState({ statusCancel: true, errCode: -1 });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {}

    render() {
        let { statusCancel, errCode } = this.state;
        return (
            <React.Fragment>
                <HomeHeader />
                {statusCancel === false ? (
                    <div className="verify-content">Loading...</div>
                ) : (
                    <div className="verify-content">
                        {errCode === 0
                            ? "Hủy lịch hẹn thành công!"
                            : "Lịch hẹn không tồn tại hoặc đã được hủy"}
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
