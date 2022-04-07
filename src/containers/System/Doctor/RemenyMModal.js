import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Modal } from 'reactstrap';
import * as actions from '../../../store/actions'
import './RemenyModal.scss'
import { userService } from '../../../services';
import { CommonUtils} from '../../../utils'


class RemenyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            email: '',
            imageBase64: '',
        }
    }



    async componentDidMount() {
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if(this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }


    handleOnchangeFile = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
       
            // let previewImage = URL.createObjectURL(file)
            this.setState({
                imageBase64: base64
            })

        }
    }

    handleOnchangeInput = (e) => {
        let copyState = {...this.state}
        copyState[e.target.name]= e.target.value
        this.setState(copyState)
    }

    handleSendRemedy =()=>{
        this.props.sendRemedy(this.state)
    }

    render() {
        // toggle={''}
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props

        return (
            <Modal
                isOpen={isOpenModal}
                className="remedy-modal"
                size="md"
                centered
            >
                <div className="remedy-modal-body">
                    <div className="remedy-modal-header">
                        <div className="remedy-header__heading">
                            {/* <FormattedMessage id="patient.remedy-modal.title" /> */}
                           Gửi hóa đơn khám bệnh 
                        </div>
                        <span
                            className="remedy-header__btn"
                            onClick={closeRemedyModal}
                        >x</span>
                    </div>
                    <div className="remedy-modal-content">
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <label className="title-input">
                                    Email bệnh nhân
                                </label>
                                <input
                                    className="form-control form-input"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>
                            <div className="col-sm-6 col-12">
                                <label className="title-input">
                                    Chọn hóa đơn
                                </label>
                                <input
                                    className="form-control form-input"
                                    type="file"
                                    onChange={(e) => this.handleOnchangeFile(e)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="remedy-modal-footer">
                        <button
                            className="btn remedy-modal__btn"
                            onClick={() => this.handleSendRemedy()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button
                            className="btn remedy-modal__btn"
                            onClick={closeRemedyModal}
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



export default connect(mapStateToProps, mapDispatchToProps)(RemenyModal);
