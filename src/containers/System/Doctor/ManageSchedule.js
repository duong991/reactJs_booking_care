import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import userService from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { LANGUAGES, dateFormat } from "../../../utils";
import { toast } from "react-toastify";
import _ from "lodash";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            listDoctor: [],
            currentDate: "",
            scheduleTime: [],
            listScheduleTimeType: [],
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
            let data = this.props.scheduleTime;
            if (data && data.length > 0) {
                data = data.map((item, index) => ({
                    ...item,
                    isActive: false,
                }));
            }

            this.setState({
                ...this.state,
                scheduleTime: data,
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

    handleChange = async (selectedDoctor) => {
        let { currentDate, scheduleTime } = this.state;
        let FormatDate = new Date(currentDate).getTime();
        if (FormatDate) {
            let scheduleOld = await userService.getScheduleDoctorByDate(
                selectedDoctor.value,
                FormatDate
            );
            let listScheduleTimeType = scheduleOld.data.map(
                (item) => item.timeType
            );

            scheduleTime.forEach((item) => {
                if (listScheduleTimeType.includes(item.keyMap)) {
                    item.isActive = true;
                }
            });
        }
        this.setState({ selectedDoctor });
    };

    handleOnChangeDatePicker = async (date) => {
        this.setState({ currentDate: date[0] });
        let { currentDate, selectedDoctor, scheduleTime } = this.state;
        let FormatDate = new Date(currentDate).getTime();
        if (selectedDoctor.value) {
            let scheduleOld = await userService.getScheduleDoctorByDate(
                selectedDoctor.value,
                FormatDate
            );
            let listScheduleTimeType = scheduleOld.data.map(
                (item) => item.timeType
            );

            scheduleTime.forEach((item) => {
                if (listScheduleTimeType.includes(item.keyMap)) {
                    item.isActive = true;
                }
            });
        }
    };

    handleClickBtnTime = (time) => {
        let { scheduleTime } = this.state;
        if (scheduleTime && scheduleTime.length > 0) {
            scheduleTime = scheduleTime.map((item) => {
                if (item.id === time.id) item.isActive = !time.isActive;
                return item;
            });
            this.setState({ scheduleTime: scheduleTime });
        }
    };
    clearInput = () => {
        let { scheduleTime } = this.state;
        if (scheduleTime && scheduleTime.length > 0) {
            scheduleTime.map((item) => {
                item.isActive = false;
                return item;
            });
        }
        this.setState({
            ...this.state,
            selectedDoctor: {},
            currentDate: "",
            scheduleTime: scheduleTime,
        });
    };

    handleSaveSchedule = async () => {
        let { scheduleTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("🤟🏻 Invalid current date!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("🤟🏻 Invalid selected doctor!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        let FormatDate = new Date(currentDate).getTime();
        if (scheduleTime && scheduleTime.length > 0) {
            let selectedTime = scheduleTime.filter(
                (item) => item.isActive === true
            );

            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item) => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = FormatDate;
                    obj.timeType = item.keyMap;
                    result.push(obj);
                });
            } else {
                toast.error("🤟🏻 Invalid selected schedule!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
        }

        let res = await userService.saveBulkScheduleDoctor({
            result,
            doctorId: selectedDoctor.value,
            date: FormatDate,
        });

        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Selected schedule success!");
            this.clearInput();
        } else {
            toast.error("🤟🏻 Selected schedule fail!");
        }
    };
    render() {
        const { selectedDoctor, listDoctor, scheduleTime } = this.state;
        const { language } = this.props;
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
                                minDate={
                                    new Date(
                                        new Date().setDate(
                                            new Date().getDate() - 1
                                        )
                                    )
                                }
                            />
                        </div>
                        <div className="col-12 pick-hour-container mt-4">
                            {scheduleTime &&
                                scheduleTime.length > 0 &&
                                scheduleTime.map((item, index) => {
                                    return (
                                        <button
                                            className={
                                                item.isActive === true
                                                    ? "btn btn-time btn-success"
                                                    : "btn btn-time"
                                            }
                                            key={index}
                                            onClick={() =>
                                                this.handleClickBtnTime(item)
                                            }
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={this.handleSaveSchedule}
                    >
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
