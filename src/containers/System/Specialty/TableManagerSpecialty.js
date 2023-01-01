import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../../services";
import "./TableManagerSpecialty.scss";
import * as actions from "../../../store/actions";

class TableManagerSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: {},
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    handleDelete = (id) => {
        this.props.deleteSpecialtyById(id);
    };
    handleEditSpecialty = (data) => {
        this.props.renderSpecialtyForEdit(data);
    };

    render() {
        let { listSpecialty } = this.props;
        return (
            <React.Fragment>
                <div id="TableManagerSpecialty" className="wrapper">
                    <table className="table table-bordered">
                        <thead className="table-success">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên chuyên khoa</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSpecialty &&
                                listSpecialty.length > 0 &&
                                listSpecialty.map((specialty, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{specialty.name}</td>
                                            <td>
                                                <div className="wrapper-btn">
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            this.handleDelete(
                                                                specialty.id
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash button-delete"></i>
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            this.handleEditSpecialty(
                                                                specialty
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableManagerSpecialty);
