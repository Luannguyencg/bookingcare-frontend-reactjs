import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'

import * as actions from '../../../store/actions'
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils'
import { userService } from '../../../services'
import noAvata from '../../../assets/images/no_avata.png'
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            rolesArr: [],
            image: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avata: '',
            formError: {},
            action:'',
            userEditId: ''


        }
    }

    componentDidMount() {

        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''

            })
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            let arrRole = this.props.rolesRedux
            this.setState({
                rolesArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            let arrGender = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            let arrRole = this.props.rolesRedux
            this.setState({
                image: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avata: '',
                formError: {},
                action: '',
            })
        }
    }


    validate = (values) => {
        const errors = {};
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(this.state.action === CRUD_ACTION.EDIT){
            if (!values.email) {
                errors.email = 'Email is required!'
            } else if (!regex.test(values.email)) {
                errors.email = 'This is not a valid email format!'
            }
            if (!values.firstName) {
                errors.firstName = 'FirstName is required!'
            }
            if (!values.lastName) {
                errors.lastName = 'Last name is required!'
            }
            if (!values.address) {
                errors.address = 'Address is required!'
            }
        }else{

            if (!values.avata) {
                errors.avata = 'Avata is required!'
            }
    
            if (!values.email) {
                errors.email = 'Email is required!'
            } else if (!regex.test(values.email)) {
                errors.email = 'This is not a valid email format!'
            }
            if (!values.firstName) {
                errors.firstName = 'FirstName is required!'
            }
            if (!values.lastName) {
                errors.lastName = 'Last name is required!'
            }
            //
            if (!values.password) {
                errors.password = 'Password is required!'
            } else if (values.password.length < 6) {
                errors.password = 'Password must be more than 6 characters!'
            } else if (values.password.length > 12) {
                errors.password = 'Password cannot exceed more than 12 characters!'
            }
            //
            if (!values.address) {
                errors.address = 'Address is required!'
            }
            if (!values.phonenumber) {
                errors.phonenumber = 'Phonenumber is required!'
            } else if (values.phonenumber.length < 9) {
                errors.phonenumber = 'Phonenumber must be more than 9 characters!'
            } else if (values.phonenumber.length > 11) {
                errors.phonenumber = 'Phonenumber cannot exceed more than 11 characters!'
            }
        }

        return errors
    }
    checkValidateInput = () => {
        let isValid
        this.setState({
            formError: this.validate(this.state),
        })
        if (Object.keys(this.validate(this.state)).length === 0) {
            isValid = true

        } else {
            isValid = false
        }
        return isValid

    }


    handleImage = async(e) => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log('base64 check',base64)
            let previewImage = URL.createObjectURL(file)
            this.setState({
                image: previewImage,
                avata: base64
            })

        }
    }

    handleOnchangeInput = (e) => {
        let updateValues = { ...this.state }
        updateValues[e.target.name] = e.target.value
        updateValues.formError[e.target.name] = ''
        this.setState(updateValues)
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
       
        if (isValid === true) {
            // create user
            
            if (this.state.action === CRUD_ACTION.EDIT) {
               
                this.props.editUserRedux({
                    id: this.state.userEditId,
                    address: this.state.address,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender,
                    role: this.state.role,
                    position: this.state.position,
                    avata: this.state.avata
                })
            }else{
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender,
                    role: this.state.role,
                    position: this.state.position,
                    avata: this.state.avata
                })
            }


        } else {
            return;
        }


    }


    handleEditUserFromParent = (user) => {
        let imageBase64 = ""
        if(user.image){
           
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary')
        }
        this.setState({
            image:imageBase64,
            email: user.email,

            firstName: user.firstName,
            lastName: user.lastName,

            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avata: imageBase64,
            userEditId: user.id,
            action: CRUD_ACTION.EDIT,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let position = this.state.positionArr;
        let roles = this.state.rolesArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let isLoadingPosition = this.props.isLoadingPosition;
        let isLoadingRoles = this.props.isLoadingRoles;

        return (
            <div className="user-redux-container">
                <div className="user-redux-header title">
                    User using redux
                </div>
                <div>{isLoadingGender && isLoadingPosition && isLoadingRoles ? "Loading...." : ''}</div>
                <div className="user-redux-body">
                    <div className="container">

                        <div className="row">
                            <h3 className="form-heading"><FormattedMessage id="manage-user.add" /></h3>
                            <div className="col-lg-4 col-md-4 col-sm-12 text-center">

                                <label htmlFor="input-image">
                                    <span className="label-title"><FormattedMessage id="manage-user.choose-avatar" /></span>
                                    <input
                                        id="input-image"
                                        type="file"
                                        name="input-image"
                                        className="input-image"
                                        onChange={(e) => this.handleImage(e)}
                                    />
                                    <div className="box-photo" style={this.state.image ? { backgroundImage: `url(${this.state.image})` } : { backgroundImage: `url(${noAvata})` }}></div>
                                </label>
                                <p className="text-danger mt-1 mb-0 text-center">{this.state.formError.avata}</p>


                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="row">

                                    <div className="form-group mb-3  col-lg-6 col-md-6 col-sm-12">
                                        <label ><FormattedMessage id="manage-user.email" /></label>
                                        {this.state.action === CRUD_ACTION.EDIT ?
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control form-input"
                                                placeholder="Email"
                                                value={this.state.email}
                                                disabled
                                                onChange={(e) => this.handleOnchangeInput(e)}
                                            />
                                            :
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control form-input"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={(e) => this.handleOnchangeInput(e)}
                                            />
                                        }
                                        <span className="text-danger mt-1 mb-0 text-center">{this.state.formError.email}</span>
                                    </div>
                                    {this.state.action === CRUD_ACTION.EDIT ?
                                        undefined
                                        :
                                        <div className="form-group mb-3 col-lg-6 col-md-6 col-sm-12">
                                            <label ><FormattedMessage id="manage-user.password" /></label>
                                            <input
                                                name="password"
                                                type="password"
                                                className="form-control form-input"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={(e) => this.handleOnchangeInput(e)}
                                            />
                                            <span className="text-danger mt-1 mb-0 text-center">{this.state.formError.password}</span>
                                        </div>

                                    }
                                    <div className="form-group mb-3 col-lg-6 col-md-6 col-sm-12">
                                        <label ><FormattedMessage id="manage-user.first-name" /></label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            className="form-control form-input"
                                            placeholder="First name"
                                            value={this.state.firstName}
                                            onChange={(e) => this.handleOnchangeInput(e)}
                                        />
                                        <span className="text-danger mt-1 mb-0 text-center">{this.state.formError.firstName}</span>
                                    </div>
                                    <div className="form-group mb-3 col-lg-6 col-md-6 col-sm-12">
                                        <label ><FormattedMessage id="manage-user.last-name" /></label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            className="form-control form-input"
                                            placeholder="Last name"
                                            value={this.state.lastName}
                                            onChange={(e) => this.handleOnchangeInput(e)}
                                        />
                                        <span className="text-danger mt-1 mb-0 text-center">{this.state.formError.lastName}</span>
                                    </div>

                                    <div className="form-group mb-3 col-12">
                                        <label><FormattedMessage id="manage-user.address" /></label>
                                        <input
                                            name="address"
                                            type="text"
                                            className="form-control form-input"
                                            placeholder="1234 Main St"
                                            value={this.state.address}
                                            onChange={(e) => this.handleOnchangeInput(e)}
                                        />
                                        <span className="text-danger mt-1 mb-0 text-center">{this.state.formError.address}</span>
                                    </div>

                                    {this.state.action === CRUD_ACTION.EDIT ?
                                        undefined
                                        :
                                        <div className="form-group mb-3 col-lg-6 col-md-6 col-sm-12">
                                            <label htmlFor="inputAddress2"><FormattedMessage id="manage-user.phone-number" /></label>
                                            <input
                                                name="phonenumber"
                                                type="text"
                                                className="form-control form-input"
                                                placeholder="Phone number"
                                                value={this.state.phonenumber}
                                                onChange={(e) => this.handleOnchangeInput(e)}
                                            />
                                            <span className="text-danger mt-1 mb-0 text-center">{this.state.formError.phonenumber}</span>
                                        </div>
                                    }


                                    <div className="form-group mb-3 col-3">
                                        <label ><FormattedMessage id="manage-user.gender" /></label>
                                        <select
                                            name="gender"
                                            className="form-select form-input"
                                            value={this.state.gender}
                                            onChange={(e) => this.handleOnchangeInput(e)}
                                        >
                                            {genders.map((item, index) => (

                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            ))}


                                        </select>
                                    </div>
                                    <div className="form-group mb-3 col-3">
                                        <label ><FormattedMessage id="manage-user.position" /></label>
                                        <select
                                            name="position"
                                            className="form-select form-input"
                                            value={this.state.position}
                                            onChange={(e) => this.handleOnchangeInput(e)}
                                        >
                                            {position.map((item, index) => (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label ><FormattedMessage id="manage-user.role" /></label>
                                        <select
                                            name="role"
                                            className="form-select form-input"
                                            value={this.state.role}
                                            onChange={(e) => this.handleOnchangeInput(e)}
                                        >
                                            {roles.map((item, index) => (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            ))}

                                        </select>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.handleSaveUser()}
                                    >
                                        {this.state.action === CRUD_ACTION.EDIT ?
                                            <FormattedMessage id="manage-user.save" />
                                            :
                                            <FormattedMessage id="manage-user.create-user" />
                                        }
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container">
                    <TableManageUser
                        handleEditUserFromParent={this.handleEditUserFromParent}
                    />
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.addmin.genders,
        positionRedux: state.addmin.position,
        rolesRedux: state.addmin.roles,
        isLoadingGender: state.addmin.isLoadingGender,
        isLoadingPosition: state.addmin.isLoadingPosition,
        isLoadingRoles: state.addmin.isLoadingRoles,
        users: state.addmin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
