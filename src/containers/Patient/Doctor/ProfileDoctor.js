import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils'
import moment from 'moment'
import localization from 'moment/locale/vi'
import './ProfileDoctor.scss'


class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}

        }
    }




    async componentDidMount() {
        if (this.props.doctorId) {
            let doctorId = this.props.doctorId
            await this.getProfileDoctor(doctorId)

            this.setState({
                dataProfile: this.props.profileDoctor
            })
        }

    }
    getProfileDoctor = async (id) => {
        if (id) {
            await this.props.getProfileDoctorById(id)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let doctorId = this.props.doctorId;
            await this.getProfileDoctor(doctorId)
            this.setState({
                dataProfile: this.props.profileDoctor
            })
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{`${time} , ${date}`}</div>
                    <div><FormattedMessage id="patient.booking-modal.freeBooking" /></div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { language, isShowDescription, dataTime, isShowLinkDetail, doctorId } = this.props
        let { dataProfile } = this.state
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`

        }

        return (
            <div className="profile-doctor">
                <div className="intro-doctor row">
                    <div className=" col-lg-3 col-md-4 col-sm-4">
                        <div className="content-left">

                            <div
                                className="content-image"
                                style={dataProfile && dataProfile.image && { backgroundImage: `url(${dataProfile.image})` }}
                            >

                            </div>
                        </div>
                        {isShowLinkDetail &&
                            <div className="see-more-profile">
                                <Link
                                    to={`/detail-doctor/${doctorId}`}
                                    className="see-more-profile__link"
                                >
                                    <FormattedMessage id="homepage.more-info" />
                                </Link>
                            </div>
                        }
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-8 ">
                        <div className="content-right">
                            <div className="content-title">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="content-sub">
                                {isShowDescription ?
                                    <>
                                        {dataProfile && dataProfile.Markdown
                                            && dataProfile.Markdown.description
                                            &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
        profileDoctor: state.addmin.profileDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfileDoctorById: (doctorId) => dispatch(actions.getProfileDoctorById(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
