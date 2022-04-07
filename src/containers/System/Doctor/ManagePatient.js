import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { Redirect, Route, Switch } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment';
import './ManagePatient.scss';
import { LANGUAGES, dateFormat } from '../../../utils';
import { userService } from '../../../services';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import { ListGroup } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import RemenyModal from './RemenyMModal'
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataPatient: [],
            currentDate: new Date().setHours(0, 0, 0, 0),
            isOpen: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {

        await this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formattedDate = new Date(currentDate).getTime()
        let res = await userService.getListPatientforDoctor({
            doctorId: user.id,
            date: formattedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {

        }
        if (prevState.currentDate !== this.state.currentDate) {

            await this.getDataPatient()
        }


    }


    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleConfirm = (item) => {
        // console.log('check item :', item)
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            date: item.date,
            timeType: item.timeType,
            patientName: item.patientData.firstName

        }
        this.setState({
            isOpen: true,
            dataModal: data
        })

    }

    closeRemedyModal = () => {
        this.setState({
            isOpen: false
        })
    }

    sendRemedy = async (dataFromModalChild) => {

        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
      
        let res = await userService.sendRemedy({
            email: dataFromModalChild.email,
            image: dataFromModalChild.imageBase64,
            doctorId: dataModal.doctorId,
            date: dataModal.date,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            statusId: dataModal.statusId,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            toast.success('Send remedy success!!')
            this.closeRemedyModal()
            this.setState({
                isShowLoading: false
            })
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Somthing wrong')
        }
    }



    render() {

        let { language } = this.props
        let { dataPatient, isOpen, dataModal, isShowLoading } = this.state
        return (
            <>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text='Loading...'
                    styles={{
                        spinner: (base) => ({
                          ...base,
                          width: '60px',
                          '& svg circle': {
                            stroke: 'linear-gradient(to right, orange , yellow)'
                          }
                        })
                      }}
                >
                    <div className="manage-patient">
                        <div className="title">
                            Quản lý lịch khám cho bệnh nhân
                        </div>
                        <div className="manage-patient__body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <label className="title-input">
                                            Chọn ngày
                                        </label>

                                        <DatePicker
                                            onChange={this.handleChangeDatePicker}
                                            className="form-control form-date"
                                            value={this.state.currentDate}

                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="user-table mt-3 mx-1">
                                            <table id="customers">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Thời gian</th>
                                                        <th>Họ tên</th>
                                                        <th>Địa chỉ</th>
                                                        <th>Giới tính</th>
                                                        <th style={{ width: '100px' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataPatient && dataPatient.length > 0 ?

                                                        dataPatient.map((item, index) => (

                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}</td>
                                                                <td>{item.patientData.firstName}</td>
                                                                <td>{item.patientData.address}</td>
                                                                <td>{language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                                                <td>
                                                                    <button className="btn btn-confirm" onClick={() => this.handleConfirm(item)} > Xác nhận</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td colSpan="6" style={{ textAlign: 'center' }}> No data...</td>
                                                        </tr>
                                                    }

                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RemenyModal
                        isOpenModal={isOpen}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                    
                </LoadingOverlay>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
