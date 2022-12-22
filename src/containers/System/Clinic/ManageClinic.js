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
        };
    }

    async componentDidMount() {}

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

    handleSaveClinic = async () => {
        let {
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
        } = this.state;
        let res = await userService.createNewClinic({
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
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
    handleClearData = () => {
        this.setState({
            name: "",
            imageBase64: "",
            address: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            previewImageURL: "",
            isOpen: false,
        });
    };
    render() {
        return (
            <div className="manager-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>
                <div className="btn-add-new-specialty"></div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group mb-3">
                        <label>Ten phòng khám</label>
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
                        <label>Địa chỉ phòng khám</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.address}
                            onChange={(e) =>
                                this.handleOnChangeInput(e, "address")
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
                        <button
                            className="btn btn-primary flex-end"
                            onClick={this.handleSaveClinic}
                        >
                            Submit
                        </button>
                    </div>
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
