import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils'
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '1',
            role: '1',
            formError: {},

        };
      
    }

   
    

    componentDidMount() {
        let user = this.props.userEdit;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender,
                role: user.role,
                
            })
        }
        console.log(this.props.userEdit)
       
    }

    componentDidUpdate(){

    }


    validate = (values) => {
        const errors = {};
        
        if (!values.firstName) {
            errors.firstName = 'FirstName is required!'
        }
        if (!values.lastName) {
            errors.lastName = 'Last name is required!'
        }
       
        if (!values.address) {
            errors.address = 'Address is required!'
        }
        
        return errors
    }


    
    toggle = () => {
        this.props.toggleFromParent()
    //     this.clearInput()
    }

    handleOnchangeInput = (e) => {
        let updateValues = { ...this.state }
        updateValues[e.target.name] = e.target.value
        updateValues.formError[e.target.name] = ''
        this.setState(updateValues)
    }

    handleSaveUser = () => {
        this.checkValidateInput()
        let isValid = this.checkValidateInput()

        if (isValid === true) {

            this.props.editUser(this.state)
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

    // clearInput= ()=>{
    //     this.setState({
    //         email: '',
    //         password: '',
    //         firstName: '',
    //         lastName: '',
    //         address: '',
    //         phonenumber: '',
    //         gender: '1',
    //         role: '1,',
    //         formError: {},
    //     })
    // }



    render() {


        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                size="lg"
                centered
            >
                <ModalHeader toggle={this.toggle}>
                   Edit a user
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label  className="title-input">Email</label>
                                <input
                                    type="test"
                                    className="form-control form-input"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                    disabled
                                />
                                <p className="text-danger mt-1">{this.state.formError.email}</p>
                            </div>
                            <div className="col-6 form-group ">
                                <label  className="title-input">Phone number</label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    name="phonenumber"
                                    value={this.state.phonenumber}
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                    disabled
                                />
                                <p className="text-danger mt-1">{this.state.formError.phonenumber}</p>
                            </div>
                            <div className="col-6 form-group">
                                <label  className="title-input">First name</label>
                                <input
                                    type="test"
                                    className="form-control form-input"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.firstName}</p>
                            </div>
                           
                            <div className="col-6 form-group">
                                <label  className="title-input">Last name</label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={(e) => this.handleOnchangeInput(e)}
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
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.address}</p>
                            </div>
                            <div className="col-3 form-group ">
                                <label  className="title-input">Gender</label>
                                <select
                                    name="gender"
                                    className="form-select form-input"
                                    onChange={(e) => this.handleOnchangeInput(e)}
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
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                    disabled
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
                            this.handleSaveUser()
                            
                        }}
                        className="px-4"
                    >
                        Save
                    </Button>
                    {' '}
                    <Button
                        onClick={() => this.toggle()}
                        className="px-4"

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
