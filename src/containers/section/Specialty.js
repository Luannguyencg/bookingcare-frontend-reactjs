import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom'
import './Section.scss';
import { withRouter } from 'react-router'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    async componentDidMount() {
        await this.props.getAllSpecialty()
    }

    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() {
        let { allSpecialty } = this.props

        return (

            <div className="section-content">

                <div className="section-content__box">
                    <div className="content-header">
                        <h2 className="content-header__heading"><FormattedMessage id="homepage.popular-medical-specialties" /></h2>
                        <button className="see-more-btn"><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <Slider {...this.props.settings}>

                        {allSpecialty && allSpecialty.length > 0 &&
                            allSpecialty.map((item, index) => {
                                return (

                                    <div key={index} className="content-slider__box">
                                        <div
                                            //  to={`/detail-specialty/${item.id}`}
                                            className="content-slider__link"
                                            onClick={() => this.handleViewDetailSpecialty(item)}
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
        allSpecialty: state.addmin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialty: () => dispatch(actions.getAllSpecialty()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
