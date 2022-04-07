import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Redirect, Route, Switch } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment';
import './ManageSchedule.scss';
import { LANGUAGES, dateFormat } from '../../../utils';
import { userService } from '../../../services';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import { ListGroup } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDoctor: [],
            selectedDoctor: '',
            currentDate: new Date().setHours(0, 0, 0, 0),
            listTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                allDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                allDoctor: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelect: false }))
            }

            this.setState({
                listTime: data
            })
        }
    }
    buildDataInputSelect = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {

                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = ` ${item.firstName} ${item.lastName}`
                object.label = LANGUAGES.VI === language ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }



    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () => console.log(this.state.selectedDoctor));

    };

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    handleClickBtnTime = (time) => {
        let { listTime } = this.state
        if (listTime && listTime.length > 0) {
            listTime = listTime.map(item => {
                if (item.id === time.id) {
                    item.isSelect = !item.isSelect
                }
                return item
            })
            this.setState({
                listTime: listTime
            })
        }

    }

    handleSaveSchedule = async ()=>{
        let {listTime,selectedDoctor, currentDate } = this.state
        let result = []
        if(!currentDate){
            toast.error(`🦄 invalid date`)
            return;
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("invalid doctor")
            return;
        }
        let formattedDate = new Date(currentDate).getTime()

        if(listTime && listTime.length > 0){
            let selectedTime = listTime.filter(item => item.isSelect === true)
           

            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(time =>{
                    let object = {}
                    object.doctorId = selectedDoctor.value 
                    object.date = formattedDate
                    object.timeType = time.keyMap
                    result.push(object)
                })
            }else{
                toast.error("invalid selected time")
                return;
            }
        }
        await this.props.bulkCreateSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value, 
            date: formattedDate
        })
       
        
    }

    render() {
        
        let { listTime } = this.state
        let { language } = this.props
       
        return (
            <div className="manage-schedule">
                <div className="manage-schedule__header">
                    <div className="m-s-heading">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                </div>

                <div className="manage-schedule__content">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-6 form-group">
                                <label className="title-input"><FormattedMessage id="manage-schedule.chosse-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.allDoctor}
                                    className="form-input"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className="title-input"><FormattedMessage id="manage-schedule.chosse-date" /></label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control form-date"
                                    value={this.state.currentDate}
                                    minDate='today'
                                />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-12 pick-time-container">
                                {listTime && listTime.length > 0 &&
                                    listTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelect ? "btn time-btn active" : "btn time-btn"}
                                                key={index}
                                                onClick={() => this.handleClickBtnTime(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <button
                            className="btn schedule-btn"
                            onClick={()=>this.handleSaveSchedule()}
                        ><FormattedMessage id="manage-schedule.save" /></button>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.addmin.allDoctor,
        language: state.app.language,
        allScheduleTime: state.addmin.allScheduleTime,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
        bulkCreateSchedule: (data) => dispatch(actions.bulkCreateSchedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
