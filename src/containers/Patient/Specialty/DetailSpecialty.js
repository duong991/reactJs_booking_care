import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";

import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    render() {
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="detail-specialty-container">Hekllascas</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
