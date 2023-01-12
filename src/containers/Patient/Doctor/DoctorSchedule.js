import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import BookingModal from "../Modal/BookingModal";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: [],
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        // gắn lại mảng lịch hẹn theo ngày dựa trên ngôn ngữ
        let arrDate = [];
        if (language === LANGUAGES.VI) {
            arrDate = await this.setSelectedDateVI();
        } else {
            arrDate = await this.setSelectedDateEN();
        }
        // Thực hiện lấy dự liệu lịch hẹn trong ngày hôm nay
        if (
            arrDate &&
            arrDate.length > 0 &&
            this.props.doctorId &&
            this.props.doctorId !== -1
        ) {
            let doctorId = this.props.doctorId;
            let today = arrDate[0].value;
            let res = await userService.getScheduleDoctorByDate(
                doctorId,
                today
            );
            if (res && res.errCode === 0) {
                this.buildEndTime(res.data);
            }
        }
        this.setState({ allDay: arrDate });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.language !== this.props.language ||
            this.props.doctorId !== prevProps.doctorId
        ) {
            let { language } = this.props;
            let arrDate = [];
            if (language === LANGUAGES.VI) {
                arrDate = this.setSelectedDateVI();
            } else {
                arrDate = this.setSelectedDateEN();
            }
            this.setState({ allDay: arrDate });

            let doctorId = this.props.doctorId;
            let today = arrDate[0].value;
            let res = await userService.getScheduleDoctorByDate(
                doctorId,
                today
            );
            if (res && res.errCode === 0) {
                this.buildEndTime(res.data);
            }
        }
    }

    setSelectedDateVI = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format("DD/MM");
                let today = `Hôm nay - ${ddMM}`;
                obj.label = today;
            } else {
                obj.label = moment(new Date())
                    .add(i, "days")
                    .format("dddd - DD/MM");
            }
            obj.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf();
            arrDate.push(obj);
        }
        return arrDate;
    };

    setSelectedDateEN = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (i === 0) {
                let ddMM = moment(new Date()).locale("en").format("DD/MM");
                let today = `Today - ${ddMM}`;
                obj.label = today;
            } else {
                obj.label = moment(new Date())
                    .add(i, "days")
                    .locale("en")
                    .format("ddd - DD/MM");
            }

            obj.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf();
            arrDate.push(obj);
        }
        return arrDate;
    };

    onChangeSelectTime = async (e) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let date = e.target.value;
            let { doctorId } = this.props;
            let res = await userService.getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.buildEndTime(res.data);
            }
        }
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            ...this.state,
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    };
    closeBookingModal = () => {
        this.setState({ ...this.state, isOpenModalBooking: false });
    };

    buildEndTime = (allAvailableTime) => {
        const sixtyMinutesInMs = 60 * 60 * 1000;
        if (allAvailableTime && allAvailableTime.length > 0) {
            // Lấy ra thời gian hiện tại bắt đầu từ 0h
            let currentTimeOfDate = +allAvailableTime[0].date;
            // lặp qua các phần tử lịch hẹn
            for (let i = 0; i < allAvailableTime.length; i++) {
                //Tạo ra bước nhảy thời gian với mỗi lịch hẹn
                //eg: timeType: T1 -> valueStep = 1
                let valueStep = +allAvailableTime[i].timeType[1];
                // tạo giá trị endTime cho mỗi lịch hẹn
                allAvailableTime[i].endTime =
                    currentTimeOfDate +
                    8 * sixtyMinutesInMs +
                    valueStep * sixtyMinutesInMs;
            }
        }
        this.setState({ allAvailableTime: allAvailableTime });
    };
    render() {
        let {
            allDay,
            allAvailableTime,
            dataScheduleTimeModal,
            isOpenModalBooking,
        } = this.state;

        let currentTime = new Date().getTime();

        let { language } = this.props;

        return (
            <React.Fragment>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    dataTime={dataScheduleTimeModal}
                    closeBookingModal={this.closeBookingModal}
                />
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.onChangeSelectTime(e)}>
                            {allDay &&
                                allDay.map((item, index) => (
                                    <option value={item.value} key={index}>
                                        {this.capitalizeFirstLetter(item.label)}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i class="fas fa-calendar-alt"></i>
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content">
                            <React.Fragment>
                                {allAvailableTime &&
                                    allAvailableTime.length > 0 &&
                                    allAvailableTime[0].endTime &&
                                    allAvailableTime.map((item, index) => (
                                        <button
                                            class="btn btn-info btn-schedule-custom"
                                            key={index}
                                            onClick={() =>
                                                this.handleClickScheduleTime(
                                                    item
                                                )
                                            }
                                            hidden={
                                                item.endTime > currentTime &&
                                                item.currentNumber !== 5
                                                    ? false
                                                    : true
                                            }
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn}
                                        </button>
                                    ))}
                                {allAvailableTime &&
                                    allAvailableTime.length > 0 && (
                                        <div className="text-content">
                                            <span>
                                                <FormattedMessage id="patient.detail-doctor.choose" />
                                            </span>
                                            <i class="fas fa-hand-point-up"></i>
                                            <span>
                                                <FormattedMessage id="patient.detail-doctor.book-free" />
                                            </span>
                                        </div>
                                    )}
                            </React.Fragment>
                            {allAvailableTime &&
                            allAvailableTime.length === 0 ? (
                                <span class="notify-content">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
