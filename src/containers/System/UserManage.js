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
        console.log(">>Mount");
        let response = await userService.getAllUser("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        });
    };
    ToggleUserModal = () => {
        this.setState({
            isOpenModal: false,
        });
    };

    // chua hoan thien
    handleDelete = async (user) => {
        try {
            let data = await userService.deleteUser(user.id);
            console.log(data, "---", this.state.arrUsers);
            console.log(user.id);
            if (data && data.message.errCode === 0) {
            }
        } catch (error) {}
    };

    render() {
        console.log(">>render", this.state.arrUsers);
        return (
            <div className="wrapper">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    ToggleFromParent={this.ToggleUserModal}
                    test="abc"
                />
                <button
                    className="btn btn-primary m-3 px-4"
                    onClick={this.handleAddNewUser}
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
                            console.log(user);
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
