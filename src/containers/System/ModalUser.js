import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils'
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '1',
            role: '1,',
            formError: {},

        };
        this.listenToEmitter()
    }

    listenToEmitter = ()=>{
        emitter.on('EVENT_CLEAR_MODAL_DATA', () =>{
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '1',
                role: '1,',
                formError: {},
            })
        })
    }
    // componentWillUnmount (){
    //     this.listenToEmitter.removeEventListener('EVENT_CLEAR_MODAL_DATA')
    // }

    componentDidMount() {

        // if (Object.keys(this.state.formError).length === 0 && this.state.isSubmit) {
        //     console.log(this.state)
        // }

    }


    validate = (values) => {
        const errors = {};
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
        return errors
    }


    toggle = () => {
        this.props.toggleFromParent()
        this.clearInput()
    }

    handleOnchangeIput = (e) => {
        let updateValues = { ...this.state }
        updateValues[e.target.name] = e.target.value
        updateValues.formError[e.target.name] = ''
        this.setState(updateValues)
    }

    handleAddNewUser = () => {
        this.checkValidateInput()
        let isValid = this.checkValidateInput()

        if (isValid === true) {

            this.props.createNewUser(this.state)
        }
       
        
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

    clearInput= ()=>{
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '1',
            role: '1,',
            formError: {},
        })
    }



    render() {


        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                size="lg"
                centered
            >
                <ModalHeader toggle={this.toggle}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label className="title-input">Email</label>
                                <input
                                    type="test"
                                    className="form-control form-input"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.email}</p>
                            </div>
                            <div className="col-6 form-group">
                                <label  className="title-input">First name</label>
                                <input
                                    type="test"
                                    className="form-control form-input"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.firstName}</p>
                            </div>
                            <div className="col-6 form-group">
                                <label  className="title-input">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-input"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.password}</p>
                            </div>
                            <div className="col-6 form-group">
                                <label  className="title-input">Last name</label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.lastName}</p>
                            </div>
                            <div className="col-12 form-group">
                                <label  className="title-input">Address</label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    name="address"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.address}</p>
                            </div>
                            <div className="col-6 form-group">
                                <label  className="title-input">Phone number</label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    name="phonenumber"
                                    value={this.state.phonenumber}
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.phonenumber}</p>
                            </div>
                            <div className="col-3 form-group">
                                <label  className="title-input">Gender</label>
                                <select
                                    name="gender"
                                    className="form-select form-input"
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                >

                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div className="col-3 form-group">
                                <label  className="title-input">Role</label>

                                <select
                                    name="role"
                                    className="form-select form-input"
                                    onChange={(e) => this.handleOnchangeIput(e)}
                                >
                                    <option value="1">Addmin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleAddNewUser()
                            
                        }}
                        className="px-5"
                    >
                        Create
                    </Button>
                    {' '}
                    <Button
                        onClick={() => this.toggle()}
                        className="px-5"

                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
