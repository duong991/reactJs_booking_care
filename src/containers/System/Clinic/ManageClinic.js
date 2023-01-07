import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import userService from "../../../services/userService";
import { toast } from "react-toastify";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManagerClinic from "./TableManagerClinic";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            previewImageURL: "",
            isOpen: false,
            listSpecialty: {},
            selectedSpecialties: [],
            listClinic: {},
            typeUpdate: false,
        };
    }

    async componentDidMount() {
        let res = await userService.getAllSpecialty("Name");
        let resClinic = await userService.getAllClinic("ALL");
        if (res && res.errCode === 0 && resClinic && resClinic.errCode === 0) {
            this.setState({
                ...this.state,
                listSpecialty: res.data,
                listClinic: resClinic.data,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({ descriptionHTML: html, descriptionMarkdown: text });
    };

    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];
        console.log(file);
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objUrl = URL.createObjectURL(file);
            this.setState({
                ...this.state,
                previewImageURL: objUrl,
                imageBase64: base64,
            });
        }
    };

    handleOnChangeInput = (e, type) => {
        let copyState = { ...this.state };
        copyState[type] = e.target.value;

        this.setState({ ...copyState });
    };

    openPrevViewImage = () => {
        if (this.state.previewImageURL) {
            this.setState({ isOpen: true });
        }
    };

    renderInfoClinicForEdit = async (data) => {
        this.handleClearData();
        let res = await userService.getDetailClinicById(data.id);
        if (res && res.data && res.data.specialtyOfClinic.length > 0) {
            this.setState({
                ...this.state,
                selectedSpecialties: res.data.specialtyOfClinic,
            });
        }
        this.setState({
            ...this.state,
            id: data.id,
            name: data.name,
            address: data.address,
            descriptionMarkdown: data.descriptionMarkDown,
            previewImageURL: data.image,
            typeUpdate: true,
        });
    };
    deleteClinicById = async (id) => {
        let res = await userService.deleteDetailClinicById(id);
        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Delete clinic success !", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            this.reloadListClinic();
        } else {
            toast.error("🤟🏻 Delete clinic fail !", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("check res:", res);
        }
    };
    handleSaveClinic = async () => {
        let {
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
            selectedSpecialties,
        } = this.state;
        let res = await userService.createNewClinic({
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
            selectedSpecialties,
        });
        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Create a new clinic success !", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            this.handleClearData();
            this.reloadListClinic();
        } else {
            toast.error("🤟🏻 Create a new clinic fail !", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("check res:", res);
        }
    };
    handleUpdateClinic = async () => {
        let {
            id,
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
            selectedSpecialties,
        } = this.state;
        console.log(descriptionHTML);
        let res = await userService.updateDetailClinicById({
            id,
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
            selectedSpecialties,
        });
        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Update clinic success !", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            this.handleClearData();
            this.reloadListClinic();
        } else {
            toast.error("🤟🏻 Update clinic fail !", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("check res:", res);
        }
    };

    reloadListClinic = async () => {
        // Cập nhật lại list Clinic
        let resClinic = await userService.getAllClinic("ALL");
        if (resClinic && resClinic.errCode === 0) {
            this.setState({
                ...this.state,
                listClinic: resClinic.data,
            });
        }
    };
    handleClearData = () => {
        this.setState({
            name: "",
            imageBase64: "",
            address: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            previewImageURL: "",
            selectedSpecialties: [],
            isOpen: false,
        });
        this.unCheck();
    };

    handleChangeCheckBox = (e) => {
        let { selectedSpecialties } = this.state;
        if (e.target.checked) {
            selectedSpecialties.push(e.target.value);
        } else {
            let index = selectedSpecialties.indexOf(+e.target.value);
            if (index !== -1) {
                selectedSpecialties.splice(index, 1);
            }
        }

        this.setState({
            selectedSpecialties: selectedSpecialties.map((item) => +item),
        });
    };
    unCheck() {
        let x = document.getElementsByClassName("checkbox");
        for (let i = 0; i < x.length; i++) {
            x[i].checked = false;
        }
    }
    render() {
        console.log(this.state);
        let { listSpecialty, listClinic, selectedSpecialties, typeUpdate } =
            this.state;
        return (
            <div className="manager-specialty-container">
                <div className="ms-title">
                    <FormattedMessage id="manage-clinic.title" />
                </div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group mb-3">
                        <label>
                            <FormattedMessage id="manage-clinic.name-clinic" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(e) =>
                                this.handleOnChangeInput(e, "name")
                            }
                        />
                    </div>
                    <div className="col-6 form-group mb-3">
                        <label>
                            <FormattedMessage id="manage-clinic.address-clinic" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.address}
                            onChange={(e) =>
                                this.handleOnChangeInput(e, "address")
                            }
                        />
                    </div>

                    <div className="col-6 form-group mb-3">
                        <label>
                            <FormattedMessage id="manage-clinic.special-of-clinic" />
                        </label>
                        {listSpecialty &&
                            listSpecialty.length > 0 &&
                            listSpecialty.map((item) => (
                                <div class="form-check">
                                    <input
                                        class="form-check-input checkbox"
                                        type="checkbox"
                                        value={item.id}
                                        id={item.id}
                                        onChange={(e) =>
                                            this.handleChangeCheckBox(e)
                                        }
                                        checked={selectedSpecialties.includes(
                                            item.id
                                        )}
                                    />
                                    <label
                                        class="form-check-label"
                                        for={item.id}
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                    </div>

                    <div className="col-6">
                        <label htmlFor="formFile" className="form-label">
                            <FormattedMessage id="manage-user.image" />
                        </label>
                        <div className="col-md-12 preview-image-container">
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                hidden
                                onChange={(event) => {
                                    this.handleOnChangeImage(event);
                                }}
                            />
                            <label className="label-upload" htmlFor="formFile">
                                <FormattedMessage id="manage-user.upload" />{" "}
                                <i class="fas fa-upload"></i>
                            </label>
                            <div
                                onClick={() => this.openPrevViewImage()}
                                className="preview-image text-center"
                                style={{
                                    backgroundImage: `url(${this.state.previewImageURL})`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain",
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="col-12 form-group mt-4">
                        <MdEditor
                            style={{ height: "350px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImageURL}
                            onCloseRequest={() =>
                                this.setState({ isOpen: false })
                            }
                        />
                    )}
                    <div className="col-12 form-group mt-4 d-flex justify-content-end">
                        {typeUpdate ? (
                            <button
                                className="btn btn-warning flex-end"
                                onClick={this.handleUpdateClinic}
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary flex-end"
                                onClick={this.handleSaveClinic}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>

                <div className="list-clinic">
                    <TableManagerClinic
                        listClinic={listClinic}
                        renderInfoClinicForEdit={this.renderInfoClinicForEdit}
                        deleteClinicById={this.deleteClinicById}
                    />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
