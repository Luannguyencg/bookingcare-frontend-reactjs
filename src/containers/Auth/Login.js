import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import './login.scss';
// import { FormattedMessage } from 'react-intl';

import { adminService, userService } from '../../services';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
        this.btnLogin = React.createRef();
    }


    handleOnChangeInput = (e) => {
        let updateValues = { ...this.state }
        updateValues[e.target.name] = e.target.value
        this.setState(updateValues)
    }

    handleLogin = async () => {

        this.setState({
            errMessage: ''
        })
        try {
            let data = await userService.handleLoginApi(this.state.username, this.state.password)
            console.log(data)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (err) {
            if (err.response) {
                if (err.response.data) {
                    this.setState({ errMessage: err.response.data.message })
                }
            }

            // console.log(err.response)
        }

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }


    handleKeyDown =(e)=>{
        if(e.key === 'Enter'){
            this.handleLogin()
        }
    }

    render() {


        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label className="title-input">Username</label>
                            <input
                                type="text"
                                className="form-control form-input"
                                placeholder="Enter your username"
                                name="username"
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeInput(e)}
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label className="title-input">Password</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control form-input"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangeInput(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                />
                                <span className="eye-icon" onClick={() => this.handleShowHidePassword()}>
                                    {this.state.isShowPassword ?
                                        <i className="fas fa-eye "></i>
                                        :
                                        <i className="fas fa-eye-slash"></i>
                                    }


                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            <span>{this.state.errMessage}</span>
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login

                            </button>
                        </div>
                        <div className="col-12">
                            <span className="text-sub-forgot">Forgot your password ?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
