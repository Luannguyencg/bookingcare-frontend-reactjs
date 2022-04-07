import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { emitter, CommonUtils, LANGUAGES, CRUD_ACTION } from '../../..//utils'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions'
import './ManageClinic.scss'
import { userService } from '../../../services'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            previewImage: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            allClinic: [],
            clinicId: ''
        };

    }




    async componentDidMount() {
        await this.props.getAllClinic()
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinic !== this.props.allClinic) {

            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                previewImage: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                action: '',
                allClinic: this.props.allClinic
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

    handleSaveNewClinic = async () => {

        if (this.state.action === CRUD_ACTION.EDIT) {
            let res = await userService.updateClinic({
                id: this.state.clinicId,
                name: this.state.name,
                address: this.state.address,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success(' update clinic success')
                await this.props.getAllClinic()
            } else {
                toast.error('update clinic err')

            }

        } else {

            await this.props.createNewClinic({
                name: this.state.name,
                address: this.state.address,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            await this.props.getAllClinic()
        }
    }

    handleDeleteClinic = async (id) => {
        try {
            let res = await userService.deleteClinic(id)
            if (res && res.errCode === 0) {
                toast.success('delete clinic success!!')
                await this.props.getAllClinic()
            }
            else {
                toast.error('delete clinic err!!')
            }
        } catch (err) {
            return;
        }

    }
    handleEditClinic = (item) => {
        let imageBase64B = ''
        
        if (item.image) {
            imageBase64B =Buffer.from(item.image, 'base64').toString('binary')
        }

        this.setState({
            descriptionMarkdown: item.descriptionMarkdown,
            descriptionHTML: item.descriptionHTML,
            name: item.name,
            address: item.address,
            imageBase64: imageBase64B,
            action: CRUD_ACTION.EDIT,
            clinicId: item.id
        })
    }


    render() {
        let { allClinic } = this.state
       
        return (
            <div className="manage-clinic container">
                <div className="manage-specialty__header title">
                    Quản lý Phòng khám
                </div>

                <div className="form-clinic">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label className="title-input">Tên phòng khám</label>
                            <input
                                className="form-control form-input"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label className="title-input">Ảnh phòng khám</label>
                            <input
                                className="form-control form-input"
                                type="file"
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label className="title-input">Địa chỉ phòng khám</label>
                            <input
                                className="form-control form-input"
                                name="address"
                                value={this.state.address}
                                onChange={(e) => this.handleOnchangeInput(e)}
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
                    className={this.state.action === CRUD_ACTION.EDIT ? "btn clinic-btn edit-btn" : "btn clinic-btn"}
                    onClick={() => this.handleSaveNewClinic()}
                >
                    {this.state.action === CRUD_ACTION.EDIT ?
                        'save'
                        :
                        'Create'
                    }
                </button>
                {allClinic && allClinic.length > 0 &&
                    <div className="user-table mt-3 mx-1">
                        <table id="customers">
                            <thead>

                                <tr>
                                    <th>Name</th>
                                    <th className="th-decription">Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allClinic && allClinic.length > 0 && allClinic.map((item) => (

                                    <tr className="" key={item.id}>
                                        <td >{item.name}</td>
                                        <td className="td-decription">{item.address}</td>

                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditClinic(item)} ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => this.handleDeleteClinic(item.id)}
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
        allClinic: state.addmin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {

        createNewClinic: (data) => dispatch(actions.createNewClinic(data)),
        getAllClinic: () => dispatch(actions.getAllClinic())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
