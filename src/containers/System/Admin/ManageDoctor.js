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

            selectedDoctor: [],
            listDoctor: [],

            selectedPrice: [],
            listPrice: [],

            selectedPayment: [],
            listPayment: [],

            selectedProvince: [],
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
                data.resPrice,
                "PRICE"
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

    buildDataRequiredDoctorSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        data &&
            data.length > 0 &&
            data.map((item, index) => {
                let object = {};
                if (type === "PRICE") {
                    if (language === LANGUAGES.VI) {
                        object.label = item.valueVi + " " + "VND";
                    } else {
                        object.label = item.valueEn + " " + "USD";
                    }
                } else {
                    if (language === LANGUAGES.VI) {
                        object.label = item.valueVi;
                    } else {
                        object.label = item.valueEn;
                    }
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
        if (
            !this.state.selectedDoctor.value ||
            !this.state.selectedPrice.value ||
            !this.state.selectedPayment.value ||
            !this.state.selectedProvince.value ||
            !this.state.addressClinic ||
            !this.state.nameClinic
        ) {
            toast.error("🤟🏻 Missing required parameters !");
            return;
        }
        let data = {
            doctorId: this.state.selectedDoctor.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
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

            let addressClinic = "",
                nameClinic = "",
                note = "",
                paymentId = "",
                priceId = "",
                provinceId = "",
                selectedPrice = "",
                selectedPayment = "",
                selectedProvince = "";

            let { listPrice, listPayment, listProvince } = this.state;
            if (res && res.data && res.data.Doctor_Info) {
                addressClinic = res.data.Doctor_Info.addressClinic;
                nameClinic = res.data.Doctor_Info.nameClinic;
                note = res.data.Doctor_Info.note;
                priceId = res.data.Doctor_Info.priceId;
                paymentId = res.data.Doctor_Info.paymentId;
                provinceId = res.data.Doctor_Info.provinceId;

                // Xử lý data để lấy selected option cho react-select
                selectedPrice = listPrice.find(
                    (item) => item && item.value === priceId
                );
                selectedPayment = listPayment.find(
                    (item) => item && item.value === paymentId
                );
                selectedProvince = listProvince.find(
                    (item) => item && item.value === provinceId
                );
            }

            if (res && res.errCode === 0 && res.data) {
                this.setState({
                    ...this.state,
                    contentHTML: res.data.contentHTML,
                    contentMarkdown: res.data.contentMarkdown,
                    description: res.data.description,
                    addressClinic: addressClinic,
                    nameClinic: nameClinic,
                    note: note,
                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                });
            }
        });
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState(stateCopy);
    };

    handleOnChangeText = (e, type) => {
        let copyState = { ...this.state };
        copyState[type] = e.target.value;
        this.setState(copyState);
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
            nameClinic,
            addressClinic,
            note,
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
                            onChange={(e) =>
                                this.handleOnChangeText(e, "description")
                            }
                            value={this.state.description}
                        />
                    </div>
                </div>

                <div className="more-info-extra row mb-3">
                    <div className="col-4 mb-3 form-group">
                        <label>
                            <FormattedMessage id="admin.price" />
                        </label>
                        <Select
                            options={listPrice}
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedPrice"
                            placeholder={<FormattedMessage id="admin.price" />}
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>
                            <FormattedMessage id="admin.payment" />
                        </label>
                        <Select
                            options={listPayment}
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedPayment"
                            placeholder={
                                <FormattedMessage id="admin.payment" />
                            }
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>
                            <FormattedMessage id="admin.province" />
                        </label>
                        <Select
                            options={listProvince}
                            value={selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedProvince"
                            placeholder={
                                <FormattedMessage id="admin.province" />
                            }
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>
                            <FormattedMessage id="admin.nameClinic" />
                        </label>
                        <input
                            className="form-control"
                            value={nameClinic}
                            onChange={(e) =>
                                this.handleOnChangeText(e, "nameClinic")
                            }
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>
                            <FormattedMessage id="admin.addressClinic" />
                        </label>
                        <input
                            className="form-control"
                            value={addressClinic}
                            onChange={(e) =>
                                this.handleOnChangeText(e, "addressClinic")
                            }
                        />
                    </div>
                    <div className="col-4 mb-3 form-group">
                        <label>
                            <FormattedMessage id="admin.note" />
                        </label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(e) => this.handleOnChangeText(e, "note")}
                            value={note}
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
