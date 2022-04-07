import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { emitter, CommonUtils, LANGUAGES, CRUD_ACTION } from '../../..//utils'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions'
import './ManageSpecialty.scss'
import { userService } from '../../../services'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            previewImage: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            allSpecialty: [],
        };

    }




    async componentDidMount() {
        await this.props.getAllSpecialty()

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {

            this.setState({
                name: '',
                imageBase64: '',
                previewImage: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                action: '',
                allSpecialty: this.props.allSpecialty
            })
        }
    }

    handleOnchangeInput = (e) => {
        let copyState = { ...this.state }
        copyState[e.target.name] = e.target.value
        this.setState(copyState)
    }
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImage: objectUrl,
                imageBase64: base64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })

    }

    handleSaveNewSpecialty = async () => {

        if (this.state.action === CRUD_ACTION.EDIT) {
            let res = await userService.updateSpecialty({
                id: this.state.specialtyId,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success(' update specialty success')
                await this.props.getAllSpecialty()
            } else {
                toast.error('update specialty err')

            }

        } else {

            let res = await userService.createNewSpecialty({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,

            })
            if (res && res.errCode === 0) {
                toast.success('Add new specialty success')
                await this.props.getAllSpecialty()
            } else {
                toast.error('Add new specialty err')

            }
        }
    }

    handleDeleteSpecialty = async (id) => {
        try {
            let res = await userService.deleteSpecialty(id)
            if (res && res.errCode === 0) {
                toast.success('delete specialty success!!')
                await this.props.getAllSpecialty()
            }
            else {
                toast.error('delete specialty success!!')
            }
        } catch (err) {
            return;
        }

    }
    handleEditSpecialty = (item) => {
        let imageBase64B = ''
        
        if (item.image) {
            imageBase64B = Buffer.from(item.image, 'base64').toString('binary')
        }

        this.setState({
            descriptionMarkdown: item.descriptionMarkdown,
            descriptionHTML: item.descriptionHTML,
            name: item.name,
            imageBase64: imageBase64B,
            action: CRUD_ACTION.EDIT,
            specialtyId: item.id
        })
    }


    render() {
        let { allSpecialty } = this.props
      
        return (
            <div className="manage-specialty container">
                <div className="manage-specialty__header title">
                    Quản lý chuyên khoa
                </div>

                <div className="form-specialty">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label className="title-input">Tên chuyên khoa</label>
                            <input
                                className="form-control form-input"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label className="title-input">Ảnh chuyên khoa</label>
                            <input
                                className="form-control form-input"
                                type="file"
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />
                        </div>

                    </div>

                </div>
                <MdEditor
                    style={{ height: '300px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.descriptionMarkdown}
                />

                <button
                    className={this.state.action === CRUD_ACTION.EDIT ? "btn specialty-btn edit-btn" : "btn specialty-btn"}
                    onClick={() => this.handleSaveNewSpecialty()}
                >
                    {this.state.action === CRUD_ACTION.EDIT ?
                        'save'
                        :
                        'Create'
                    }
                </button>
                {allSpecialty && allSpecialty.length > 0 &&
                    <div className="user-table mt-3 mx-1">
                        <table id="customers">
                            <thead>

                                <tr>
                                    <th>Name</th>
                                    <th className="th-decription">Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSpecialty && allSpecialty.length > 0 && allSpecialty.map((item) => (

                                    <tr className="" key={item.id}>
                                        <td >{item.name}</td>
                                        <td className="td-decription">{item.descriptionHTML}</td>

                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditSpecialty(item)} ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => this.handleDeleteSpecialty(item.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>

                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allSpecialty: state.addmin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialty: () => dispatch(actions.getAllSpecialty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
