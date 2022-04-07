import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl'
import * as actions from '../../store/actions'
import { LANGUAGES } from '../../utils'
import { Redirect, Route, Switch } from 'react-router-dom';
import { userService } from '../../services'
import HomeHeader from '../HomePage/HomeHeader'
import './VerifyEmail.scss'
class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVeryfi: false,
            errCode: 0
        }
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await userService.postVeryfyBookAppointment({
                token: token,
                doctorId: doctorId,
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVeryfi: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVeryfi: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { statusVeryfi, errCode } = this.state
        return (
            <>
                <HomeHeader />
                <div className="veryfy-email">

                    {statusVeryfi === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className="info-booking"><FormattedMessage id="patient.veryfi-booking.success" /></div>
                                :
                                <div className="info-booking"><FormattedMessage id="patient.veryfi-booking.failed" /></div>

                            }
                        </div>

                    }
                </div>

            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
