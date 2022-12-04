import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import userService from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            listDoctor: [],
            currentDate: "",
            scheduleTime: [],
        };
    }

    async componentDidMount() {
        await this.props.getAllDoctorRedux();
        await this.props.fetchAllCodeScheduleTimeRedux();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                ...this.state,
                listDoctor: dataSelect,
            });
        }

        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            this.setState({
                ...this.state,
                scheduleTime: this.props.scheduleTime,
            });
        }
    }
    buildDataInputSelect = (data) => {
        let result = [];
        data &&
            data.length > 0 &&
            data.map((item, index) => {
                let object = {};
                object.label = item.fullName;
                object.value = item.id;
                result.push(object);
            });

        return result;
    };

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, async () => {
            let idDoctor = this.state.selectedDoctor.value;
            let res = await userService.getMarkdownByIdDoctor(idDoctor);
            console.log(res);
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0] });
    };
    render() {
        const { selectedDoctor, listDoctor, scheduleTime } = this.state;
        const { language } = this.props;

        console.log(language);
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChange}
                                options={listDoctor}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container mt-4">
                            {scheduleTime &&
                                scheduleTime.length > 0 &&
                                scheduleTime.map((item, index) => {
                                    return (
                                        <button
                                            className="btn btn-time"
                                            key={index}
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3">
                        <FormattedMessage id="manage-schedule.save" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        scheduleTime: state.admin.scheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
        fetchAllCodeScheduleTimeRedux: () =>
            dispatch(actions.fetchAllCodeScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
