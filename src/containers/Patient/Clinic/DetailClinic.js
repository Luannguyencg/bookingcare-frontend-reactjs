import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import _ from 'lodash';
import './DetailClinic.scss'
import { userService } from '../../../services'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'


class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},

        };
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await userService.getDetailClinicById({
                id: id,
            })
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []

                if (data && !_.isEmpty(data)) {

                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }


                this.setState({
                    dataDetailClinic: data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }



    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }



    render() {
        let { language } = this.props
        let { arrDoctorId, dataDetailClinic } = this.state
     
        return (
            <>
                <HomeHeader />
                <div className="specialty-container">

                    <div
                        className="specialty-description"
                        style={{ backgroundImage: `url(https://cdn.bookingcare.vn/fo/2019/12/13/121232-y-hoc-co-truyen.jpg)` }}
                    >
                        <div className="specialty-description__box">
                        <h2 className="title">
                            {dataDetailClinic.name}
                        </h2>

                            {dataDetailClinic && Object.keys(dataDetailClinic).length > 0 &&

                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                            }
                        </div>
                    </div>


                    <div className="container">


                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {

                                return (
                                    <div key={index} className="row specialty-row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
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
                <HomeFooter />
            </>



        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        DetailClinic: state.addmin.DetailClinic

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctorById: (id) => dispatch(actions.getDetailDoctorById(id)),
        getDetailSpecialtyById: (data) => dispatch(actions.getDetailSpecialtyById(data))


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
