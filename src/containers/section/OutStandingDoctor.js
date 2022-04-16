import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from "../../utils"
import './Section.scss';
import './OutStandingDoctor.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../store/actions'
import { times } from 'lodash';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTopDoctor: []
        }
    }
    componentDidMount() {
        this.props.getTopDoctor()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrTopDoctor: this.props.topDoctor
            })
        }
    }
    // handleViewDetailDoctor = (doctor)=>{
    //     this.props.history.push(`/detail-doctor/${doctor.id}`)
    // }


    render() {
        let arrTopDoctor = this.state.arrTopDoctor
        console.log(arrTopDoctor)
        let { language } = this.props;

        return (

            <div className="section-content">

                <div className="section-content__box">
                    <div className="content-header">
                        <h2 className="content-header__heading"><FormattedMessage id="homepage.outstanding-doctor" /></h2>
                        <button className="see-more-btn"><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <Slider {...this.props.settings}>
                        {arrTopDoctor && arrTopDoctor.length > 0 &&
                            arrTopDoctor.map((item, index) => {
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                let imageBase64;
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary')
                                }
                                return (

                                    <Link
                                        to={`/detail-doctor/${item.id}`}
                                        key={index}
                                        className="content-slider__box"
                                    // onClick={()=>this.handleViewDetailDoctor(item)}
                                    >
                                        <div className="content-slider__link out-standing-doctor__link">
                                            <div
                                                className="content-slider__img out-standing-doctor__img"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                            <h3 className="content-slider__text out-standing-doctor__text">{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                                            <span className="out-standing-doctor__branch" >{item.Doctor_info.specialtyData.name}</span>
                                        </div>
                                    </Link>
                                )

                            })
                        }

                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.addmin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
