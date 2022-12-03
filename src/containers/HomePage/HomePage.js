import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import Doctor from "./Section/Doctor";
import About from "./Section/About";
import HandBook from "./Section/HandBook";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty />
                <MedicalFacility />
                <Doctor />
                <HandBook />
                <About />
                <HomeFooter />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
