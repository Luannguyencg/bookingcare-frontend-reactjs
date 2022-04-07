import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import Select from 'react-select'
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl'
import BookingModal from './Modal/BookingModal'
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectDate: {
                label: this.props.language === LANGUAGES.VI ? `Hôm nay - ${this.capitalizeFirstLetter(moment(new Date()).format('DD/MM'))}` : `Today - ${moment(new Date()).locale('en').format("DD/MM")}`,
                value: moment(new Date()).add(0, 'days').startOf('day').valueOf()
            },
            allDays: [],
            isOpenModal: false,
            dataScheduleTimeModal: {},
            allAvailableTime: [],
            // doctorId: ''

        }
    }


    async componentDidMount() {
        let { language } = this.props
        this.buildArrDay(language)
        if(this.props.doctorIdFromParent){

            let doctorId = this.props.doctorIdFromParent
            let date = this.state.selectDate.value
            await this.props.getScheduleDoctorByDate(date, doctorId)

            this.setState({
                allAvailableTime: this.props.arrSchedule
            })
        }





    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.buildArrDay(this.props.language)

        }
        
        if (prevState.selectDate.value !== this.state.selectDate.value) {
            
            let doctorId = this.props.doctorIdFromParent
            let date = this.state.selectDate.value
            await this.props.getScheduleDoctorByDate(date, doctorId)
            this.setState({
                allAvailableTime: this.props.arrSchedule
            })

            
        }
        
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let doctorId = this.props.doctorIdFromParent
            let date = this.state.selectDate.value
            await this.props.getScheduleDoctorByDate(date, doctorId)
            this.setState({
                allAvailableTime: this.props.arrSchedule
            })
        }
    }
    buildArrDay = (language) => {
        let arrDay = []
        for (let i = 0; i < 6; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {

                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {

                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDay.push(object);
        }

        this.setState({
            allDays: arrDay,
            selectDate: arrDay[0]
        })
    }



    handleChangeSelect = async (selectDate) => {
        this.setState({ selectDate })
        
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    handlClickScheduleTime = (time) => {

        this.setState({
            isOpenModal: true,
            dataScheduleTimeModal: time
        })

    }

    closeBookingModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    render() {
        let { allDays, isOpenModal, dataScheduleTimeModal, allAvailableTime } = this.state
      
        let { language, doctorIdFromParent } = this.props
       
        return (
            <>
                <div className="doctor-schedule">
                    <div className="all-schedule">
                        <Select
                            value={this.state.selectDate}
                            onChange={this.handleChangeSelect}
                            options={allDays}
                            className="select-time-input"
                        />
                    </div>
                    <div className="all-available-time">
                        <div className="calendar">
                            <div className="calendar__heading">
                                <span><i className="fas fa-calendar-alt calendar-icon"></i><FormattedMessage id="patient.home-schedule.medical-examination-schedule" /></span>
                            </div>
                            <div className="calendar__content">
                                <div className="row">
                                    <div className="col-12">
                                        {allAvailableTime && allAvailableTime.length > 0 ?
                                            <>
                                                {allAvailableTime.map((item, index) => {
                                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                    return (

                                                        <button
                                                            key={index}
                                                            className="btn calendar-time__btn"
                                                            onClick={() => this.handlClickScheduleTime(item)}
                                                        >
                                                            {timeDisplay}
                                                        </button>
                                                    )
                                                })}
                                                <span className='book-free-text'><FormattedMessage id="patient.home-schedule.book-free" /></span>
                                            </>
                                            :
                                            <span className="text-sub"><FormattedMessage id="patient.home-schedule.schedule-text" /></span>
                                        }

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModal}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                    doctorIdFromParent={doctorIdFromParent}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        detailDoctor: state.addmin.detailDoctor,
        language: state.app.language,
        arrSchedule: state.addmin.arrSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctorById: (id) => dispatch(actions.getDetailDoctorById(id)),
        getScheduleDoctorByDate: (date, doctorId) => dispatch(actions.getScheduleDoctorByDate(date, doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
