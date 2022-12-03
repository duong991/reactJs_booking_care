import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            fullName: "",
            positionData: {},
            contentHTML: "",
            description: "",
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            this.getInfoDoctor();
        }
    }

    getInfoDoctor = async () => {
        let idDoctor = this.props.match.params.id;
        let result = await userService.getDetailDoctorById(idDoctor);
        console.log(result);
        if (result && result.errCode === 0 && result.data.Markdown) {
            this.setState({
                image: result.data.image,
                fullName: result.data.fullName,
                positionData: result.data.positionData,
                contentHTML: result.data.Markdown.contentHTML,
                description: result.data.Markdown.description,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState) {}

    render() {
        let { positionData, fullName, description, contentHTML } = this.state;
        console.log(description);
        return (
            <div className="detail-doctor-wrapper">
                <HomeHeader isShowBanner={false} />
                <div className="detail-doctor-container">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <div
                                className="doctor-img"
                                style={{
                                    backgroundImage: `url(${this.state.image})`,
                                }}
                            />
                        </div>
                        <div className="content-right">
                            <div className="content-title">
                                <h2>
                                    {this.props.language === LANGUAGES.VI
                                        ? positionData.valueVi
                                        : positionData.valueEn}{" "}
                                    {fullName}
                                </h2>
                            </div>
                            <div className="content-info">
                                <div style={{ whiteSpace: "pre-line" }}>
                                    {description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor"></div>
                    <div
                        className="detail-info-doctor"
                        dangerouslySetInnerHTML={{ __html: contentHTML }}
                    />
                    <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
