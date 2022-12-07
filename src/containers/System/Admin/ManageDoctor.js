import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { LANGUAGES } from "../../../utils";

import Select from "react-select";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            description: "",

            selectedDoctor: null,
            listDoctor: [],

            selectedPrice: null,
            listPrice: [],

            selectedPayment: null,
            listPayment: [],

            selectedProvince: null,
            listProvince: [],

            nameClinic: "",
            addressClinic: "",
            note: "",
        };
    }

    async componentDidMount() {
        await this.props.getAllDoctorRedux();
        await this.props.getRequiredDoctorInfoRedux();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataDoctorSelect(this.props.allDoctors);
            this.setState({
                ...this.state,
                listDoctor: dataSelect,
            });
        }

        if (
            prevProps.allRequirementDoctorInfo !==
                this.props.allRequirementDoctorInfo ||
            prevProps.language !== this.props.language
        ) {
            let data = this.props.allRequirementDoctorInfo;
            let dataSelectPrice = this.buildDataRequiredDoctorSelect(
                data.resPrice
            );
            let dataSelectPayment = this.buildDataRequiredDoctorSelect(
                data.resPayment
            );
            let dataSelectProvince = this.buildDataRequiredDoctorSelect(
                data.resProvince
            );
            this.setState({
                ...this.state,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }

    buildDataDoctorSelect = (data) => {
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

    buildDataRequiredDoctorSelect = (data) => {
        let result = [];
        let { language } = this.props;
        data &&
            data.length > 0 &&
            data.map((item, index) => {
                let object = {};
                if (language === LANGUAGES.VI) {
                    object.label = item.valueVi;
                } else {
                    object.label = item.valueEn;
                }
                object.value = item.keyMap;
                result.push(object);
            });

        return result;
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({ contentHTML: html, contentMarkdown: text });
    };

    handleSaveContentMarkDown = () => {
        if (!this.state.selectedDoctor) {
            toast.error("🤟🏻 Please choose doctor!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
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
        const {
            selectedDoctor,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            listDoctor,
            listPrice,
            listPayment,
            listProvince,
        } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.title" />
                </div>
                <div className="more-info mb-3 row">
                    <div className="content-left col-4">
                        <label className="mb-1">
                            <FormattedMessage id="admin.choose-doctor" />
                        </label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={listDoctor}
                            placeholder={
                                <FormattedMessage id="admin.choose-doctor" />
                            }
                        />
                    </div>
                    <div className="content-right col-8">
                        <label className="mb-1">
                            <FormattedMessage id="admin.intro-info" />
                        </label>
                        <textarea
                            className="form-control w-100"
                            rows="4"
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        />
                    </div>
                </div>

                <div className="more-info-extra row mb-3">
                    <div className="col-4 mb-3 form-group">
                        <label>Chọn giá</label>
                        <Select
                            options={listPrice}
                            value={selectedPrice}
                            // onChange={this.handleChange}
                            // placeholder={
                            //     <FormattedMessage id="admin.choose-doctor" />
                            // }
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>Chọn phuong thuc thanh toan</label>
                        <Select
                            options={listPayment}
                            value={selectedPayment}
                            // onChange={this.handleChange}
                            // placeholder={
                            //     <FormattedMessage id="admin.choose-doctor" />
                            // }
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>Chọn tinh thanh</label>
                        <Select
                            options={listProvince}
                            value={selectedProvince}
                            // onChange={this.handleChange}
                            // placeholder={
                            //     <FormattedMessage id="admin.choose-doctor" />
                            // }
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>Ten phong kham</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>Dia chi phong kham</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>Note</label>
                        <input className="form-control" />
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
                    <FormattedMessage id="admin.save" />
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequirementDoctorInfo: state.admin.allRequirementDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
        getRequiredDoctorInfoRedux: () =>
            dispatch(actions.getRequiredDoctorInfo()),
        updateDetailDoctorRedux: (data) =>
            dispatch(actions.updateDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
