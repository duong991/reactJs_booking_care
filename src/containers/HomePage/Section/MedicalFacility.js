import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import "./customSlide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from "../../../services";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }

    async componentDidMount() {
        let res = await userService.getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data,
            });
        }
    }

    handleDetailClinic = (data) => {
        let idClinic = data.id;
        console.log(idClinic);
        this.props.history.push(`/detail-clinic/${idClinic}`);
    };

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        let { dataClinic } = this.state;
        return (
            <div className="medicalFacility-wrapper">
                <div className="section-container">
                    <div className="section-header">
                        <span className="main">Cơ sở y tế nổi bật</span>
                    </div>
                    <Slider {...settings}>
                        {dataClinic &&
                            dataClinic.length > 0 &&
                            dataClinic.map((item, index) => {
                                let nameClinic = item.name;
                                let imageClinic = item.image;
                                return (
                                    <div
                                        className="section-custom"
                                        key={index}
                                        onClick={() =>
                                            this.handleDetailClinic(item)
                                        }
                                    >
                                        <div className="section-wrapper section-wrapper-clinic">
                                            <div
                                                className="section-img "
                                                style={{
                                                    backgroundImage: `url(${imageClinic})`,
                                                }}
                                            />
                                            <div className="section-title">
                                                <span className="main-title">
                                                    {nameClinic}
                                                </span>
                                                {/*<span className="sub-title">
                                                Bạn gặp vấn đề về răng miệng?
                                                Lên lịch khám nha khoa
                                            /span>*/}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
