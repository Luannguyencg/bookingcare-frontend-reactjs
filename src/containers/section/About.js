import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import './Section.scss';
import './About.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class About extends Component {

    render() {

        let settings = {
            ...this.props.settings,
            slidesToShow: 2,

        }
        
        return (

            <div className="section-content">
                    
                <div className="section-content__box">
                    <div className="content-header">
                        <h2 className="content-header__heading">Truyền thông nói về BookingCare</h2>
                        
                    </div>
                    <Slider {...settings}>
                        <div className="content-slider__box">
                            <div className="About-slider__video">
                                <iframe style={{width:'100%', height:'100%'}} src="https://www.youtube.com/embed/2sg1yNl1WvE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="content-slider__box">
                            <div className="About-slider__video">
                                <iframe style={{width:'100%', height:'100%'}} src="https://www.youtube.com/embed/2sg1yNl1WvE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                      
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
