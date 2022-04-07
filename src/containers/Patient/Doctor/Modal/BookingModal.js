import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment'
import localization from 'moment/locale/vi'
import { toast } from 'react-toastify';
import { Modal } from 'reactstrap';
import Select from 'react-select'
import * as actions from '../../../../store/actions'
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor'
import { LANGUAGES } from '../../../../utils'
import DatePicker from '../../../../components/Input/DatePicker'
import { userService } from '../../../../services';


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',

            genders: '',
            formError: {},
            doctorInfo: {}
        }
    }



    async componentDidMount() {
        await this.props.fetchGender();
        if(this.props.doctorIdFromParent){
            let doctorId= this.props.doctorIdFromParent
            await this.props.getDoctorInfoById(doctorId)
            this.setState({
                doctorInfo: this.props.doctorInfo
            })
            await this.props.getProfileDoctorById(doctorId)
           
        }

    }

    buildataGender = (data) => {
        let result = [];
        let { language } = this.props
      

        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }

        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                gender: this.buildataGender(this.props.genders)
            })
        }
        if (prevProps.genders !== this.props.genders) {

            this.setState({
                genders: this.buildataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })

            }
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let doctorId= this.props.doctorIdFromParent
            await this.props.getDoctorInfoById(doctorId)
            this.setState({
                doctorInfo: this.props.doctorInfo
            })
            await this.props.getProfileDoctorById(doctorId)
        }
    }


    handleOnchangeInput = (e) => {
        let copyState = { ...this.state }
        copyState[e.target.name] = e.target.value
        copyState.formError[e.target.name] = ''
        this.setState(copyState)


    }

    handleChangeDatePicker = (date) => {
        let copyState = { ...this.state }
        copyState.formError.birthday = ''
        copyState.birthday = date[0]
        this.setState(copyState)
    }

    handleChangeSelect = (selectedGender) => {
        let copyState = { ...this.state }
        copyState.formError.selectedGender = ''
        copyState.selectedGender = selectedGender
        this.setState(copyState)

    };

    validate = (values) => {
        const errors = {};
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!values.email) {
            errors.email = 'Email is required!'
        } else if (!regex.test(values.email)) {
            errors.email = 'This is not a valid email format!'
        }
        if (!values.fullName) {
            errors.fullName = 'Full name is required!'
        }

        if (!values.address) {
            errors.address = 'Address is required!'
        }
        if (!values.birthday) {
            errors.birthday = 'Please enter your birth date!'
        }
        if (!values.reason) {
            errors.reason = 'Please enter medical examination reason'
        }
        if (!values.selectedGender) {
            errors.selectedGender = 'please chosse your gender!'
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

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return `${time} , ${date}`

        }
        return ``
    }
    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let doctorName = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return doctorName
        }
        return ``
    }


    /////////////////////////////////////
    handleConfirmBooking = async () => {
        //validate
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            let timeString = this.buildTimeBooking(this.props.dataTime)
            let birthdayFormat = new Date(this.state.birthday).getTime()
            let doctorName = this.buildDoctorName(this.props.dataTime)
            let res = await userService.postPatientBookAppointment({
                fullName: this.state.fullName,
                phonenumber: this.state.phonenumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: this.props.dataTime.date,
                birthday: birthdayFormat,
                selectedGender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                doctorName: doctorName,
                timeString: timeString,
                language: this.props.language,
                doctorEmail: this.props.profileDoctor.email
            })
            if (res && res.errCode === 0) {
                toast.success('Booking a new appoinment success!!')
                this.props.closeBookingModal()
            } else {
                toast.error('Booking a new appoinment error')
            }
        }
    }

    render() {
        // toggle={''}
        let { isOpenModal, closeBookingModal, dataTime, language } = this.props
        let {doctorInfo} = this.state
        let doctorId = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
       
       
        return (
            <Modal
                isOpen={isOpenModal}
                className="booking-modal"
                size="lg"
                centered
            >
                <div className="booking-modal-body">

                    <div className="booking-modal-header">
                        <div className="booking-header__heading">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </div>
                        <span
                            className="booking-header__btn"
                            onClick={closeBookingModal}
                        >x</span>
                    </div>
                    <div className="booking-modal-content">
                        {/* { JSON.stringify(dataTime)} */}
                        <div className="doctor-info">

                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataTime={dataTime}
                            />


                        </div>
                        <div className="price-box">
                            <div className="price">
                                <FormattedMessage id="patient.extra-info.price" /> :
                                {language === LANGUAGES.VI ?
                                    Object.keys(doctorInfo).length > 0 &&
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
                                    <NumberFormat
                                        value={doctorInfo.priceData.valueEn}
                                        className="foo"
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                    />

                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <label className="title-input"><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input
                                    className="form-input form-control"
                                    type="text"
                                    value={this.state.fullName}
                                    name='fullName'
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.fullName}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <label className="title-input"><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input
                                    className="form-input form-control"
                                    type="text"
                                    name='phonenumber'
                                    value={this.state.phonenumber}
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.phonenumber}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <label className="title-input"><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input
                                    className="form-input form-control"
                                    type="email"
                                    value={this.state.email}
                                    name='email'
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.email}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <label className="title-input"><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input
                                    className="form-input form-control"
                                    type="text"
                                    value={this.state.address}
                                    name='address'
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.address}</p>
                            </div>
                            <div className="col-12">
                                <label className="title-input"><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input
                                    className="form-input form-control"
                                    type="text"
                                    value={this.state.reason}
                                    name='reason'
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                                <p className="text-danger mt-1">{this.state.formError.reason}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <label className="title-input"><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control form-date"
                                    value={this.state.birthday}
                                    placeholder={language === LANGUAGES.VI ? 'Chọn ngày sinh' : 'Choose your date of birth'}
                                // minDate='today'
                                />
                                <p className="text-danger mt-1">{this.state.formError.birthday}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <label className="title-input"><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                    className="select-gender-input"
                                    placeholder={<FormattedMessage id="patient.booking-modal.chosseGender" />}
                                />
                                <p className="text-danger mt-1">{this.state.formError.selectedGender}</p>
                            </div>


                        </div>

                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn booking-modal__btn"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button
                            className="btn booking-modal__btn"
                            onClick={closeBookingModal}
                        >
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorInfo: state.addmin.doctorInfo,
        profileDoctor: state.addmin.profileDoctor,
        isLoggedIn: state.user.isLoggedIn,
        genders: state.addmin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
        getDoctorInfoById: (id) => dispatch(actions.getDoctorInfoById(id)),
        getProfileDoctorById: (id) => dispatch(actions.getProfileDoctorById(id))
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
