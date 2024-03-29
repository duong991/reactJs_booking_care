import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
    userIsAuthenticated,
    userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login fr"om "../routes/Login";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";

import DoctorRoutes from "../routes/DoctorRoutes";
import AdminHospital from "../routes/AdminHospital";
import VerifyEmail from "./Patient/VerifyEmail";
import CancelEmail from "./Patient/CancelEmail";

import { CustomToastCloseButton } from "../components/CustomToast";
import CustomScrollbars from "../components/CustomScrollbars";
class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars
                                style={{ height: "100vh", width: "100%" }}
                            >
                                <Switch>
                                    <Route
                                        path={path.HOME}
                                        component={Home}
                                        exact
                                    />
                                    <Route
                                        path={path.HOMEPAGE}
                                        component={HomePage}
                                    />
                                    <Route
                                        path={path.LOGIN}
                                        component={userIsNotAuthenticated(
                                            Login
                                        )}
                                    />
                                    <Route
                                        path={path.SYSTEM}
                                        component={userIsAuthenticated(System)}
                                    />
                                    <Route
                                        path={path.DOCTOR_SYSTEM}
                                        component={userIsAuthenticated(
                                            DoctorRoutes
                                        )}
                                    />

                                    <Route
                                        path={path.ADMIN_HOSPITAL_SYSTEM}
                                        component={userIsAuthenticated(
                                            AdminHospital
                                        )}
                                    />
                                    <Route
                                        path={path.DETAIL_DOCTOR}
                                        component={DetailDoctor}
                                    />
                                    <Route
                                        path={path.DETAIL_SPECIALTY}
                                        component={DetailSpecialty}
                                    />
                                    <Route
                                        path={path.DETAIL_CLINIC}
                                        component={DetailClinic}
                                    />
                                    <Route
                                        path={path.VERIFY_EMAIL_BOOKING}
                                        component={VerifyEmail}
                                    />
                                    <Route
                                        path={path.CANCEL_EMAIL_BOOKING}
                                        component={CancelEmail}
                                    />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
