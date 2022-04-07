import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss'
import { userService } from '../../services';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUser();

    }

    getAllUser = async () => {
        let response = await userService.getAllUser('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.user,

            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal =() =>{
        this.setState({
            isOpenModalEditUser: false
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUser(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUser()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'})
            }
           
        } catch (err) {

        }
    }

    handleDeletaUser = async (user) => {
        try {
            let response = await userService.deleteUser(user.id);
            if(response && response.errCode === 0){
                await this.getAllUser()
            }
            else{
                alert(response.errMessage)
            }
        } catch (err) {
            return;
        }
    }

    handleEditUser =(user)=>{
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser =async(user)=>{
        try{
            let response = await userService.editUser(user)
            if(response&& response.errCode === 0 ){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUser()
            }
        }catch(err){
            console.log(err)
        }
    }

    render() {
        let users = this.state.arrUser
        return (
            <div className="user-container">

                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && 
                
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        userEdit={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className="title text-center">Manager users with luan</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3 add-new-btn"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <thead>

                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((item) => (

                                <tr key={item.id}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={()=>this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={() => { this.handleDeletaUser(item) }}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
