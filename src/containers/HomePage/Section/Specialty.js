import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import "./customSlide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from "../../../services";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await userService.getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }

    handleDetailSpecialty = (data) => {
        let idSpecialty = data.id;
        this.props.history.push(`/detail-specialty/${idSpecialty}`);
    };

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        let { dataSpecialty } = this.state;
        console.log(dataSpecialty);
        return (
            <div className="section-container">
                <div className="section-header">
                    <span className="main">
                        <FormattedMessage id="homepage.specialty-popular" />
                    </span>
                    <span className="sub">
                        <FormattedMessage id="homepage.sub-specialty" />
                    </span>
                </div>
                <Slider {...settings}>
                    {dataSpecialty &&
                        dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                            let nameSpecialty = item.name;
                            let imageSpecial = item.image;
                            return (
                                <div
                                    className="section-custom"
                                    key={index}
                                    onClick={() =>
                                        this.handleDetailSpecialty(item)
                                    }
                                >
                                    <div className="section-wrapper specialty-wrapper">
                                        <div
                                            className="section-img specialty-img"
                                            style={{
                                                backgroundImage: `url(${imageSpecial})`,
                                            }}
                                        ></div>
                                        <div className="section-title ">
                                            <span className="main-title">
                                                {nameSpecialty}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
