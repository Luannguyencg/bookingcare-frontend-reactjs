import  React, { Component } from 'react';
import { connect } from 'react-redux';
import Specialty from '../section/Specialty'
import MedicalFacility from '../section/MedicalFacility'
import OutStandingDoctor from '../section/OutStandingDoctor'
import Handbook from '../section/Handbook'
import About from '../section/About'
class HomeContent extends Component {

    render() {
        const ArrowLeft = ({ currentSlide, slideCount, ...props }) => (
            <button
                {...props}
                className={'slick-btn prev-btn' + (currentSlide === 0 ? " slick-disabled" : "") }
                aria-hidden="true"
                aria-disabled={currentSlide === 0 ? true : false}
            >
                <i className="fas fa-angle-left slick-icon"></i>
            </button>
        );
        const ArrowRight = ({ currentSlide, slideCount, ...props }) => (
            <button
                {...props}
                className={'slick-btn next-btn' + (currentSlide === slideCount - 1 ? " slick-disabled" : "")}
                aria-hidden="true"
                aria-disabled={currentSlide === slideCount - 1 ? true : false}
            >
                <i className="fas fa-angle-right slick-icon"></i>
            </button>
        );
        let settings = {
            arrows: true,
            rows: 1,
            className: 'section-slider',
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow:4,
            slidesToScroll: 1,
            lazyLoad: false,
            autoplay: false,
            autoplaySpeed: 2000,
            cssEase: "linear",
            prevArrow: <ArrowLeft />,
            nextArrow: <ArrowRight />,

        };
        return (

            <div className="home-content">
                
                <Specialty 
                    settings={settings}
                />
                <MedicalFacility
                    settings={settings}
                />
                <OutStandingDoctor
                    settings={settings}
                />
                <Handbook 
                    settings={settings}
                />
                <About 
                    settings={settings}
                />
                
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
