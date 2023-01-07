import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../../services";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import Modal from "react-modal";
import "../modal.scss";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUserRedux: [],
            type: "All",
            isOpenModal: false,
            itemSelected: "",
        };
    }

    async componentDidMount() {
        this.props.fetchAllUser();
        this.props.getRoleStart();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.allUsers !== prevProps.allUsers) {
            this.setState({
                ...this.state,
                allUserRedux: this.props.allUsers,
            });
        }
    }
    openModal(user) {
        this.setState({
            ...this.state,
            isOpenModal: true,
            itemSelected: user,
        });
    }

    closeModal() {
        this.setState({
            isOpenModal: false,
        });
    }

    handleDelete = (user, type) => {
        this.props.deleteUser(user.id, type);
        this.closeModal();
    };
    handleEditUser = (data) => {
        this.props.getInfoUserForEdit(data);
    };

    handleOnchangeSelect = async (e) => {
        let result = await userService.getAllUser(e.target.value);
        this.setState({ type: e.target.value });

        if (result && result.errCode === 0 && result.users) {
            let arrAccount = result.users;
            let newState = { ...this.state };
            newState.allUserRedux = arrAccount;
            this.setState({
                ...newState,
            });
        }
    };

    render() {
        let allUser = this.state.allUserRedux;

        let { type, isOpenModal, itemSelected } = this.state;
        let { language, roleRedux } = this.props;
        return (
            <React.Fragment>
                <div className="search-type-account">
                    <select onChange={(e) => this.handleOnchangeSelect(e)}>
                        <option value="All" key="All">
                            {language === LANGUAGES.VI ? "Tất cả" : "All"}
                        </option>

                        {roleRedux &&
                            roleRedux.length > 0 &&
                            roleRedux.map((item, index) => (
                                <option value={item.keyMap} key={index}>
                                    {language === LANGUAGES.VI
                                        ? item.valueVi
                                        : item.valueEn}
                                </option>
                            ))}
                    </select>
                </div>
                <div id="TableManageUser" className="wrapper">
                    <table className="table table-bordered">
                        <thead className="table-success">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">FullName</th>
                                <th scope="col">Address</th>
                                <th scope="col">PhoneNumber</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser &&
                                allUser.length > 0 &&
                                allUser.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{user.email}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>
                                                <div className="wrapper-btn">
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            this.openModal(user)
                                                        }
                                                    >
                                                        <i className="fas fa-trash button-delete"></i>
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            this.handleEditUser(
                                                                user
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
                            onClick={() =>
                                this.handleDelete(itemSelected, type)
                            }
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
        language: state.app.language,
        allUsers: state.admin.allUser,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUser: () => {
            dispatch(actions.fetchAllUser("All"));
        },
        deleteUser: (id, type) => {
            dispatch(actions.deleteUser(id, type));
        },
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
