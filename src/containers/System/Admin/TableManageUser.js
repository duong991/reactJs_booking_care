import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../../services";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUserRedux: [],
        };
    }

    async componentDidMount() {
        this.props.fetchAllUser();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.allUsers !== prevProps.allUsers) {
            this.setState({
                allUserRedux: this.props.allUsers,
            });
        }
    }

    handleDelete = (user) => {
        this.props.deleteUser(user.id);
    };
    handleEditUser = (data) => {
        this.props.getScrollTop();
        this.props.getInfoUserForEdit(data);
    };

    render() {
        let allUser = this.state.allUserRedux;
        return (
            <React.Fragment>
                {" "}
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
                                                            this.handleDelete(
                                                                user
                                                            )
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
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.admin.allUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUser: () => {
            dispatch(actions.fetchAllUser("All"));
        },
        deleteUser: (id) => {
            dispatch(actions.deleteUser(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
