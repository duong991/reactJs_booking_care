import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
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
    ToggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

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
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    ToggleFromParent={this.ToggleUserModal}
                    handleAddNewUser={this.handleAddNewUser}
                />
                <button
                    className="btn btn-primary m-3 px-4"
                    onClick={this.openModalAddNewUser}
                >
                    Add new user
                </button>
                <table className="table">
                    <thead>
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
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                this.handleDelete(user)
                                            }
                                        >
                                            <i className="fas fa-trash icon-delete"></i>
                                        </button>
                                        <button className="btn">
                                            <i className="fas fa-edit icon-edit"></i>
                                        </button>
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
