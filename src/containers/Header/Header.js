import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import _ from 'lodash';
import {LANGUAGES, USER_ROLE} from "../../utils"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state ={
            menuApp: []
        }
    }

    componentDidMount() {
        let {userInfo} = this.props
        let menu =[]
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId
            if(role === USER_ROLE.ADDMIN){
                menu= adminMenu
            }
            if(role === USER_ROLE.DOCTOR){
                menu= doctorMenu
            }
        }

        this.setState({
            menuApp : menu
        })
    }

    handleChangeLanguage =(laguage)=>{
        this.props.changeLanguageAppRedux(laguage)
    }

    render() {
        const { processLogout } = this.props;
        const language = this.props.language
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="header-manager-language">
                    <span className="welcome-user"><FormattedMessage id="homeHeader.welcome"/>, {this.props.userInfo &&this.props.userInfo.firstName? this.props.userInfo.firstName: ''} {this.props.userInfo &&this.props.userInfo.lastName? this.props.userInfo.lastName: ''}</span>
                    <span className={language ===LANGUAGES.VI ? "action": ""} onClick={()=> this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={language ===LANGUAGES.EN ? "action": ""} onClick={()=> this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                </div>

                    {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout} title="log out">
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)) 

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
