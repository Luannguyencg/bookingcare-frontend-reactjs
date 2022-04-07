import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './DetailSpecialty.scss'
import { userService } from '../../../services'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'


class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialy: {},
            listProvince: []
        };
    }

    async componentDidMount() {
        let arrDoctorId = []
        let resProvince = await userService.getAllCodeService('PROVINCE')


        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            await this.props.getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            if (resProvince.errCode === 0) {

                let data = this.props.detailSpecialty
                if (data && Object.keys(data).length > 0) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)

                        })
                    }
                }
                let dataProvince = resProvince.data
               
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc"
                    })
                }
                this.setState({
                    dataDetailSpecialy: this.props.detailSpecialty,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })

            }

        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let arrDoctorId = []
            let id = this.props.match.params.id
            let location = e.target.value

            await this.props.getDetailSpecialtyById({
                id: id,
                location: location
            })

            let data = this.props.detailSpecialty
            if (data && Object.keys(data).length > 0) {
                let arr = data.doctorSpecialty;
                if (arr && arr.length > 0) {
                    arr.map(item => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
                this.setState({
                    dataDetailSpecialy: data,
                    arrDoctorId: arrDoctorId,

                })
            }
        }

    }


    render() {
        let { language } = this.props
        let { arrDoctorId, dataDetailSpecialy, listProvince } = this.state
        return (
            <>
                <HomeHeader />
                <div className="specialty-container">
                    <div
                        className="specialty-description"
                        style={{ backgroundImage: `url(https://cdn.bookingcare.vn/fo/2019/12/13/121232-y-hoc-co-truyen.jpg)` }}
                    >
                        <div className="specialty-description__box">

                            {dataDetailSpecialy && Object.keys(dataDetailSpecialy).length > 0 &&

                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialy.descriptionHTML }}></div>
                            }
                        </div>
                    </div>


                    <div className="container">
                        <div className="search-doctor">
                            <select
                                className="form-select search-doctor_select"
                                onChange={(e) => this.handleOnchangeSelect(e)}
                            >
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (

                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {

                                return (
                                    <div key={index} className="row specialty-row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail = {true}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <DoctorSchedule
                                                        doctorIdFromParent={item}

                                                    />

                                                </div>
                                                <div className="col-12">
                                                    <DoctorExtraInfo
                                                        doctorIdFromParent={item}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>

                </div>
                <HomeFooter/>
            </>



        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailSpecialty: state.addmin.detailSpecialty
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctorById: (id) => dispatch(actions.getDetailDoctorById(id)),
        getDetailSpecialtyById: (data) => dispatch(actions.getDetailSpecialtyById(data))
       
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
