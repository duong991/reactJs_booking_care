import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../../services";
import "./TableManagerClinic.scss";
import * as actions from "../../../store/actions";

class TableManagerClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: {},
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    handleDelete = (id) => {
        this.props.deleteClinicById(id);
    };
    handleEditClinic = (data) => {
        this.props.renderInfoClinicForEdit(data);
    };

    render() {
        let { listClinic } = this.props;
        return (
            <React.Fragment>
                <div id="TableManagerClinic" className="wrapper">
                    <table className="table table-bordered">
                        <thead className="table-success">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên phòng khám</th>
                                <th scope="col">Địa chỉ phòng khám</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listClinic &&
                                listClinic.length > 0 &&
                                listClinic.map((clinic, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{clinic.name}</td>
                                            <td>{clinic.address}</td>
                                            <td>
                                                <div className="wrapper-btn">
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            this.handleDelete(
                                                                clinic.id
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash button-delete"></i>
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            this.handleEditClinic(
                                                                clinic
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-edit button-edit "></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerClinic);
