import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await userService.getAllUser("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    openModalAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        });
    };
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };
    ToggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

    ToggleEditUserModal = () => [
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        }),
    ];

    handleAddNewUser = async (data) => {
        try {
            let response = await userService.createNewUser(data);
            if (response && response.message.errCode !== 0) {
                alert(response.message.errMessage);
            } else {
                this.setState({
                    isOpenModal: false,
                });
                this.getAllUserFromReact();
                emitter.emit("CLEAR_INPUT_AFTER_CLOSE_MODAL");
            }
        } catch (error) {
            console.log(error);
        }
    };
    doEditUser = async (data) => {
        try {
            let response = await userService.updateUser(data);
            if (response && response.message.errCode !== 0) {
                alert(response.message.errMessage);
            } else {
                this.setState({
                    isOpenModalEditUser: false,
                });
                this.getAllUserFromReact();
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async (user) => {
        try {
            let data = await userService.deleteUser(user.id);
            if (data && data.message.errCode === 0) {
                this.getAllUserFromReact();
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="text-center "> MANAGER USER</div>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    ToggleFromParent={this.ToggleUserModal}
                    handleAddNewUser={this.handleAddNewUser}
                />
                <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    ToggleFromParent={this.ToggleEditUserModal}
                    handleEditUser={this.handleEditUser}
                    doEditUser={this.doEditUser}
                    currentUser={this.state.userEdit}
                />
                <button
                    className="btn btn-primary m-3 px-4"
                    onClick={this.openModalAddNewUser}
                >
                    Add new user
                </button>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">FullName</th>
                            <th scope="col">Address</th>
                            <th scope="col">PhoneNumber</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.arrUsers.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{user.email}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        {user.gender === "1"
                                            ? "Male"
                                            : "Female"}
                                    </td>
                                    <td>
                                        <div className="wrapper-btn">
                                            <button
                                                className="btn"
                                                onClick={() =>
                                                    this.handleDelete(user)
                                                }
                                            >
                                                <i className="fas fa-trash button-delete"></i>
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={() =>
                                                    this.handleEditUser(user)
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
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
