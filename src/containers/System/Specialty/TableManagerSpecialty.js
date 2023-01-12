import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../../services";
import "./TableManagerSpecialty.scss";
import * as actions from "../../../store/actions";

import Modal from "react-modal";
import "../modal.scss";

class TableManagerSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            itemSelected: "",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    openModal(item) {
        this.setState({
            ...this.state,
            isOpenModal: true,
            itemSelected: item,
        });
    }

    closeModal() {
        this.setState({
            isOpenModal: false,
        });
    }

    handleDelete = (id) => {
        this.closeModal();
        this.props.deleteSpecialtyById(id);
    };
    handleEditSpecialty = (data) => {
        this.props.renderSpecialtyForEdit(data);
    };

    render() {
        let { listSpecialty } = this.props;
        let { isOpenModal, itemSelected } = this.state;
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
                                                            this.openModal(
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
                <Modal
                    isOpen={isOpenModal}
                    onRequestClose={() => this.closeModal()}
                >
                    <h4>Are you sure you want to delete this item?</h4>
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableManagerSpecialty);
