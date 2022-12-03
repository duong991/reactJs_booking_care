import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import userService from "../../../services/userService";

import Select from "react-select";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: null,
            description: "",
            listDoctor: [],
        };
    }

    async componentDidMount() {
        this.props.getAllDoctorRedux();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                ...this.state,
                listDoctor: dataSelect,
            });
            console.log("hello");
        }
    }

    buildDataInputSelect = (data) => {
        let result = [];
        data &&
            data.length > 0 &&
            data.map((item, index) => {
                let object = {};
                object.label = item.fullName;
                object.value = item.id;
                result.push(object);
            });

        return result;
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({ contentHTML: html, contentMarkdown: text });
    };

    handleSaveContentMarkDown = () => {
        let data = {
            doctorId: this.state.selectedDoctor.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
        };
        this.props.updateDetailDoctorRedux(data);
        this.setState({
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedDoctor: {},
        });
    };

    // xử lý get dữ liệu markdown mỗi lần chọn bác sĩ mới
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, async () => {
            let idDoctor = this.state.selectedDoctor.value;
            let res = await userService.getMarkdownByIdDoctor(idDoctor);
            console.log(res);
            if (res && res.errCode === 0 && res.data) {
                this.setState({
                    ...this.state,
                    contentHTML: res.data.contentHTML,
                    contentMarkdown: res.data.contentMarkdown,
                    description: res.data.description,
                });
            }
        });
    };

    handleOnChangeDesc = (e) => {
        this.setState({ description: e.target.value });
    };

    render() {
        const { selectedDoctor, listDoctor } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    Tao them thong tin bac si
                </div>
                <div className="more-info mb-3">
                    <div className="content-left">
                        <label className="mb-1">Chon bac si</label>
                        <Select
                            className=""
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={listDoctor}
                        />
                    </div>
                    <div className="content-right">
                        <label className="mb-1">Thong tin gioi thieu</label>
                        <textarea
                            className="form-control w-100"
                            rows="4"
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "70vh" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    class="btn btn-primary save-content-doctor mt-3 mb-4 float-end"
                    onClick={() => this.handleSaveContentMarkDown()}
                >
                    Luu thong tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
        updateDetailDoctorRedux: (data) =>
            dispatch(actions.updateDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
