import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";

import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
class AdminHospital extends Component {
    render() {
        const { isLoggedIn, userInfo } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="System-container">
                    <div className="System-list">
                        <Switch>
                            <Route
                                path="/admin-hospital/manage-schedule"
                                component={ManageSchedule}
                            />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHospital);
