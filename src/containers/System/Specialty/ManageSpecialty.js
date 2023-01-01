import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import userService from "../../../services/userService";
import { toast } from "react-toastify";
import TableManagerSpecialty from "./TableManagerSpecialty";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            previewImageURL: "",
            listSpecialty: [],
            isOpen: false,
            typeUpdate: false,
        };
    }

    async componentDidMount() {
        this.reloadListSpecialty();
    }

    reloadListSpecialty = async () => {
        let res = await userService.getAllSpecialty("ALL");
        if (res && res.errCode === 0) {
            this.setState({ ...this.state, listSpecialty: res.data });
        }
    };

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

    handleSaveSpecialty = async () => {
        let { name, imageBase64, descriptionHTML, descriptionMarkdown } =
            this.state;
        let res = await userService.createNewSpecialty({
            name,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
        });
        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Create a new specialty success !", {
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
        } else {
            toast.error("🤟🏻 Create a new specialty fail !", {
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

    handleClearData = () => {
        this.setState({
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            previewImageURL: "",
            isOpen: false,
        });
    };

    renderSpecialtyForEdit = async (data) => {
        this.handleClearData();
        console.log(data);
        this.setState({
            ...this.state,
            id: data.id,
            name: data.name,
            descriptionMarkdown: data.descriptionMarkDown,
            previewImageURL: data.image,
            typeUpdate: true,
        });
    };

    deleteSpecialtyById = async (id) => {
        let res = await userService.deleteDetailSpecialtyById(id);
        if (res && res.errCode === 0) {
            toast.info("🤟🏻 Delete specialty success !", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            this.reloadListSpecialty();
        } else {
            toast.error("🤟🏻 Delete specialty fail !", {
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

    handleUpdateSpecialty = async () => {
        let {
            id,
            name,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
            selectedSpecialties,
        } = this.state;
        let res = await userService.updateDetailSpecialtyById({
            id,
            name,
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
            this.reloadListSpecialty();
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
    render() {
        let { listSpecialty, typeUpdate } = this.state;
        return (
            <div className="manager-specialty-container">
                <div className="ms-title">Quản ly chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group mt-2">
                        <label>Ten chuyen khoa</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(e) =>
                                this.handleOnChangeInput(e, "name")
                            }
                        />
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
                                onClick={this.handleUpdateSpecialty}
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary flex-end"
                                onClick={this.handleSaveSpecialty}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
                <div className="list-clinic">
                    <TableManagerSpecialty
                        listSpecialty={listSpecialty}
                        renderSpecialtyForEdit={this.renderSpecialtyForEdit}
                        deleteSpecialtyById={this.deleteSpecialtyById}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
