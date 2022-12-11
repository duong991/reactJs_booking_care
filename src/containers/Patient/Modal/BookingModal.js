import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";

import "./BookingModal.scss";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}
    render() {
        let { closeBookingModal, isOpenModal, dataTime } = this.props;
        let doctorId = "";
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        return (
            <Modal isOpen={isOpenModal} centered={true} size={"lg"}>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="modal-header-left">
                            Thông tin đặt lịch khám bệnh
                        </span>
                        <span
                            className="modal-header-right"
                            onClick={() => closeBookingModal()}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body container">
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group mt-4">
                                <label>Ho ten</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>So dien thoai</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>Email</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>Dia chi</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>Dat cho ai</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group mt-4">
                                <label>Gioi tinh</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-12 form-group mt-4">
                                <label>Ly do kham</label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn btn-success btn-booking">
                            Xác nhận
                        </button>
                        <button
                            className="btn btn-secondary btn-booking"
                            onClick={() => closeBookingModal()}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
