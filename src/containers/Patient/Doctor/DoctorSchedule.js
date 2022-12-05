import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
        };
    }

    async componentDidMount() {
        let { language } = this.props;

        // console.log("moment vi: ", moment(new Date()).format("dddd - DD/MM"));
        // console.log(
        //     "moment en: ",
        //     moment(new Date()).locale("en").format("ddd - DD/MM")
        // );
        if (language === LANGUAGES.VI) {
            this.setSelectedDateVI();
        } else {
            this.setSelectedDateEN();
        }
    }

    setSelectedDateVI = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            obj.label = moment(new Date())
                .add(i, "days")
                .format("dddd - DD/MM");
            obj.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf();
            arrDate.push(obj);
        }

        this.setState({ allDay: arrDate });
    };

    setSelectedDateEN = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            obj.label = moment(new Date())
                .add(i, "days")
                .locale("en")
                .format("ddd - DD/MM");
            obj.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf();
            arrDate.push(obj);
        }

        this.setState({ allDay: arrDate });
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            let { language } = this.props;
            if (language === LANGUAGES.VI) {
                this.setSelectedDateVI();
            } else {
                this.setSelectedDateEN();
            }
        }
    }

    onChangeSelectTime = async (e, doctorId) => {
        let date = e.target.value;
        let res = await userService.getScheduleDoctorByDate(doctorId, date);
        console.log(res);
    };

    render() {
        let { doctorId } = this.props;
        let { allDay } = this.state;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select
                        onChange={(e) => this.onChangeSelectTime(e, doctorId)}
                    >
                        {allDay &&
                            allDay.map((item, index) => (
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            ))}
                    </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
