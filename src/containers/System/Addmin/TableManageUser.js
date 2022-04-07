import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageUser.scss'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
           userRedux: [],
           
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate (prevProps,prevState,snapshot)  {
        if(prevProps.users !== this.props.users){
            this.setState({
                userRedux: this.props.users
            })
        }
    }

    handleDeleteUser = (userId)=>{
        this.props.deleteUserRedux(userId)

    }

    handleEditUser =(user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let users = this.state.userRedux
        return (
            <div className="user-container mb-5">

                

                <div className="title text-center">Manager users with luan</div>
               
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
                                        <button className="btn-edit" onClick={()=>this.handleEditUser(item)} ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={()=>this.handleDeleteUser(item.id)} ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                             ))}

                        </tbody>

                    </table>
                </div>

                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.addmin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
