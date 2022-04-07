import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import './Section.scss';
import './Handbook.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Handbook extends Component {

    render() {

        let settings = {
            ...this.props.settings,
            slidesToShow: 2,

        }
        
        return (

            <div className="section-content">
                    
                <div className="section-content__box">
                    <div className="content-header">
                        <h2 className="content-header__heading">Cẩm nang</h2>
                        <button className="see-more-btn">Tất cả bài viết</button>
                    </div>
                    <Slider {...settings}>
                        <div className="content-slider__box">
                            <Link to="/home" className="content-slider__link handbook-slider__link">
                                <div
                                    className="content-slider__img handbook-slider__img"
                                    style={{ backgroundImage: `url(https://cdn.bookingcare.vn/fr/w300/2019/01/05/113459noi-soi-tieu-hoa.jpg)` }}
                                ></div>
                                <h3 className="handbook-slider__text">9 địa chỉ khám chữa bệnh Tiêu hóa uy tín ở TP.HCM</h3>
                            </Link>
                        </div>
                        <div className="content-slider__box">
                            <Link to="/home" className="content-slider__link handbook-slider__link">
                                <div
                                    className="content-slider__img handbook-slider__img"
                                    style={{ backgroundImage: `url(https://cdn.bookingcare.vn/fr/w300/2019/01/05/113459noi-soi-tieu-hoa.jpg)` }}
                                ></div>
                                <h3 className="handbook-slider__text">9 địa chỉ khám chữa bệnh Tiêu hóa uy tín ở TP.HCM</h3>
                            </Link>
                        </div>
                        <div className="content-slider__box">
                            <Link to="/home" className="content-slider__link handbook-slider__link">
                                <div
                                    className="content-slider__img handbook-slider__img"
                                    style={{ backgroundImage: `url(https://cdn.bookingcare.vn/fr/w300/2019/01/05/113459noi-soi-tieu-hoa.jpg)` }}
                                ></div>
                                <h3 className="handbook-slider__text">9 địa chỉ khám chữa bệnh Tiêu hóa uy tín ở TP.HCM</h3>
                            </Link>
                        </div>
                        <div className="content-slider__box">
                            <Link to="/home" className="content-slider__link handbook-slider__link">
                                <div
                                    className="content-slider__img handbook-slider__img"
                                    style={{ backgroundImage: `url(https://cdn.bookingcare.vn/fr/w300/2019/01/05/113459noi-soi-tieu-hoa.jpg)` }}
                                ></div>
                                <h3 className="handbook-slider__text">9 địa chỉ khám chữa bệnh Tiêu hóa uy tín ở TP.HCM</h3>
                            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
