import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../../services";
import "./TableManageSchedule.scss";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "../modal.scss";

class TableManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorOfClinic: [],
            checkDoctors: [],
            listDoctor: [],
        };
    }

    async componentDidMount() {
        // if (this.props.currentDate) {
        //     console.log(this.props.currentDate);
        //     let res = await userService.checkDoctors({
        //         doctors: this.props.doctorOfClinic.map((item) => item.doctorId),
        //         clinicId: this.props.clinicId,
        //         currentDate: this.props.currentDate,
        //     });
        //     console.log(res);
        // }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (
            this.props.currentDate !== prevProps.currentDate &&
            this.props.currentDate &&
            this.props.doctorOfClinic
        ) {
            let res = await userService.checkDoctors({
                doctors: this.props.doctorOfClinic.map((item) => item.doctorId),
                clinicId: this.props.clinicId,
                currentDate: this.props.currentDate,
            });
            this.setState({ checkDoctors: res.data });
        }
    }

    openModal(item, value) {
        if (value) {
            this.setState({
                ...this.state,
                isOpenModal: true,
                itemSelected: item,
            });
        } else {
            alert("Bác sĩ chưa có lịch hẹn");
        }
    }

    closeModal() {
        this.setState({
            isOpenModal: false,
        });
    }

    handleDelete = async (doctorId) => {
        let currentDate = this.props.currentDate;
        let res = await userService.deleteSchedule({ doctorId, currentDate });
        if (res && res.errCode === 0) {
            let res = await userService.checkDoctors({
                doctors: this.props.doctorOfClinic.map((item) => item.doctorId),
                clinicId: this.props.clinicId,
                currentDate: this.props.currentDate,
            });
            toast.info("🤟🏻 Xóa thành công", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            this.setState({ checkDoctors: res.data });
        } else {
            toast.error("🤟🏻 Có lỗi xảy ra", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        this.closeModal();
    };
    handleEditSpecialty = (data) => {};

    buildListDoctor = (arr2, arr1) => {
        // arr3 chứa các phần tử có value = true
        arr2.map((item) => (item.value = false));
        let arr3 = arr1.filter((item) => item.value === true);
        for (let i = 0; i < arr3.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr3[i].id === arr2[j].doctorId) {
                    arr2[j].value = arr3[i].value;
                }
            }
        }
        return arr2;
    };

    render() {
        let { doctorOfClinic, currentDate } = this.props;
        let { isOpenModal, itemSelected, checkDoctors } = this.state;
        let listDoctor = this.buildListDoctor(doctorOfClinic, checkDoctors);
        return (
            <React.Fragment>
                <div id="TableManageSchedule" className="wrapper">
                    <table className="table table-bordered">
                        <thead className="table-success">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listDoctor &&
                                listDoctor.length > 0 &&
                                listDoctor.map((doctor, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{doctor.User.fullName}</td>
                                            <td>
                                                {currentDate
                                                    ? doctor.value
                                                        ? "Đã có lịch hẹn"
                                                        : "Chưa có lịch hẹn"
                                                    : "Chưa xác định"}
                                            </td>
                                            <td>
                                                <div className="wrapper-btn">
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            this.openModal(
                                                                doctor.doctorId,
                                                                doctor.value
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash button-delete"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                <Modal
                    isOpen={isOpenModal}
                    onRequestClose={() => this.closeModal()}
                >
                    <h4>Xóa toàn bộ lịch hẹn của bác sĩ?</h4>
                    <div className="wrap-btn">
                        <button
                            className="btn btn-danger"
                            onClick={() => this.handleDelete(itemSelected)}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => this.closeModal()}
                        >
                            No
                        </button>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctorOfClinic: state.adminHospital.doctorOfClinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableManageSchedule);
