import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import Select from 'react-select'
import './DoctorExtraInfo.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl'
class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetaiInfo: false,
            doctorInfo: {}
        }
    }


    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let doctorId = this.props.doctorIdFromParent
            await this.props.getDoctorInfoById(this.props.doctorIdFromParent)
            this.setState({
                doctorInfo: this.props.doctorInfo
            })
        }


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            await this.props.getDoctorInfoById(this.props.doctorIdFromParent)

            this.setState({
                doctorInfo: this.props.doctorInfo
            })
        }
    }


    showHideDetaiInfo = (status) => {
        this.setState({
            isShowDetaiInfo: status
        })
    }

    render() {

        let { language } = this.props

        let { isShowDetaiInfo, doctorInfo } = this.state
        return (
            <div className="doctor-extra-info">
                <div className="content-info row">
                    <div className="col-12">
                        <h2 className="address-title"><FormattedMessage id="patient.extra-info.address-title" /></h2>
                        <div className="clinic-name">{doctorInfo.clinicName}</div>
                        <div className="clinic-address">{doctorInfo.clinicAddress}</div>
                    </div>
                    <div className="col-12">
                        {isShowDetaiInfo === false ?
                            <div className="price-title">
                                <FormattedMessage id="patient.extra-info.price" /> :
                                {language === LANGUAGES.VI ?
                                    Object.keys(doctorInfo).length > 0 &&
                                    Object.keys(doctorInfo.priceData).length > 0
                                    &&
                                    <NumberFormat
                                        value={doctorInfo.priceData.valueVi}
                                        className="foo"
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                    />
                                    :
                                    Object.keys(doctorInfo).length > 0 &&
                                    Object.keys(doctorInfo.priceData).length > 0
                                    &&
                                    <NumberFormat
                                        value={doctorInfo.priceData.valueEn}
                                        className="foo"
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                    />

                                }
                                <span
                                    className="show-info"
                                    onClick={() => this.showHideDetaiInfo(true)}
                                >
                                    <FormattedMessage id="patient.extra-info.see-price-list" />
                                </span>
                            </div>
                            :
                            <>
                                <div className="price-title">
                                    <FormattedMessage id="patient.extra-info.price" />
                                </div>
                                <div className="price-box">

                                    <div className="price-info">
                                        <span className="left"><FormattedMessage id="patient.extra-info.price" /></span>
                                        <span className="right">
                                            {language === LANGUAGES.VI ?
                                                Object.keys(doctorInfo).length > 0 &&
                                                Object.keys(doctorInfo.priceData).length > 0
                                                &&
                                                <NumberFormat
                                                    value={doctorInfo.priceData.valueVi}
                                                    className="foo"
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                    renderText={(value, props) => <div {...props}>{value}</div>}
                                                />
                                                :
                                                Object.keys(doctorInfo).length > 0 &&
                                                Object.keys(doctorInfo.priceData).length > 0
                                                &&
                                                <NumberFormat
                                                    value={doctorInfo.priceData.valueEn}
                                                    className="foo"
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                    renderText={(value, props) => <div {...props}>{value}</div>}
                                                />

                                            }
                                        </span>
                                    </div>
                                    <div className="payment">
                                        {doctorInfo.note}
                                    </div>
                                </div>
                                <div className="note">
                                    <FormattedMessage id="patient.extra-info.pay-method" />
                                    {language === LANGUAGES.VI ?
                                        Object.keys(doctorInfo).length > 0
                                        &&
                                        Object.keys(doctorInfo.paymentData).length > 0 &&
                                        doctorInfo.paymentData.valueVi
                                        :
                                        Object.keys(doctorInfo).length > 0
                                        &&
                                        Object.keys(doctorInfo.paymentData).length > 0 &&
                                        doctorInfo.paymentData.valueEn}
                                </div>
                                <span
                                    className="hide-info"
                                    onClick={() => this.showHideDetaiInfo(false)}
                                >
                                    <FormattedMessage id="patient.extra-info.hide-price-list" />
                                </span>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        doctorInfo: state.addmin.doctorInfo,
        detailDoctor: state.addmin.detailDoctor,
        language: state.app.language,
        arrSchedule: state.addmin.arrSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorInfoById: (doctorId) => dispatch(actions.getDoctorInfoById(doctorId)),
        getScheduleDoctorByDate: (date, doctorId) => dispatch(actions.getScheduleDoctorByDate(date, doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
