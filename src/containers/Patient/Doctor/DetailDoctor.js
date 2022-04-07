import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment'
class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
           
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            await this.props.getDetailDoctorById(this.props.match.params.id)

        }
        this.setState({
            
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor,
              
            })
        }
    }

    render() {
        let { detailDoctor} = this.state

        let { language } = this.props
        let nameVi = '', nameEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`

        }

        let currentURL = process.env.REACT_APP_IS_LOCALHOST  === 1? 
            "" : window.location.href;
      
        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className="doctor-detail-container">

                    <div className="content-box">
                        <div className="container">

                            <div className="intro-doctor row">
                                <div className=" col-lg-2 col-md-5 col-sm-5">
                                    <div className="content-left">

                                        <div
                                            className="content-image"
                                            style={detailDoctor.image && { backgroundImage: `url(${detailDoctor.image})` }}
                                        >

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-10 col-md-7 col-sm-7 ">
                                    <div className="content-right">
                                        <div className="content-title">
                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                        </div>
                                        <div className="content-sub">
                                            {detailDoctor && detailDoctor.Markdown
                                                && detailDoctor.Markdown.description
                                                &&
                                                <span>
                                                    {detailDoctor.Markdown.description}
                                                </span>
                                            }
                                        </div>
                                        <div className="like-share-plugin">
                                            <LikeAndShare
                                                dataHref= {currentURL}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="content-box">
                        <div className="container">
                            <div className="schedule-doctor row">
                                <div className="col-lg-6 col-md-6 col-sm-12">

                                    {Object.keys(detailDoctor).length > 0 &&
                                        <DoctorSchedule 
                                            doctorIdFromParent = {detailDoctor.id}
                                        />
                                    }
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    {Object.keys(detailDoctor).length > 0 &&
                                        <DoctorExtraInfo 
                                            doctorIdFromParent = {detailDoctor.id} 
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-box">
                        <div className="container">

                            <div className="detail-info-doctor">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                                }
                            </div>
                        </div>

                    </div>
                    <div className="content-box">
                        <div className="container">
                            <div className="comment-doctor">
                                <Comment
                                    dataHref={currentURL}
                                    width={"100%"}
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </>
        );
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
