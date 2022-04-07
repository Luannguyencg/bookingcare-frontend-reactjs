import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import * as actions from '../../store/actions'
import { withRouter } from 'react-router'

import './Section.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        await this.props.getAllClinic()
    }


    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    render() {

        let { allClinic } = this.props

        return (

            <div className="section-content">

                <div className="section-content__box">
                    <div className="content-header">
                        <h2 className="content-header__heading"><FormattedMessage id="homepage.outstanding-medical-facility" /></h2>
                        <button className="see-more-btn"><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <Slider {...this.props.settings}>
                        {allClinic && allClinic.length > 0 &&
                            allClinic.map((item, index) => {
                                return (

                                    <div key={index} className="content-slider__box">
                                        <div
                                        //  to="/home" 
                                         className="content-slider__link"
                                         onClick={() => this.handleViewDetailClinic(item)}
                                         >
                                             
                                            <div
                                                className="content-slider__img"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <h3 className="content-slider__text">{item.name}</h3>
                                        </div>
                                    </div>
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
        isLoggedIn: state.user.isLoggedIn,
        allClinic: state.addmin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinic: () => dispatch(actions.getAllClinic())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
