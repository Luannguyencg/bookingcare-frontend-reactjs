import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl'
import './HomeHeader.scss'
import logo from '../../assets/images/BookingCare.png'
import banner from '../../assets/images/BookingCare_slider.png'
import {LANGUAGES} from '../../utils'
import {changeLanguageApp} from '../../store/actions'
import './HomeHeaderResponsive.scss'
class HomeHeader extends Component {


    changeLanguage =(language)=>{
        
        //actions
        this.props.changeLanguageAppRedux(language)

    }


    render() {
        let language = this.props.language;
    
        return (
            <>
            <div className="home-header-container ">
                <div className="home-header-content">
                    <div className="content-left">
                        <div className="header-bars">
                            <i className="fas fa-bars header-bars__icon" ></i>
                        </div>

                        <Link to="/home" className="header-logo__link ">
                            <img src={logo} alt="logo-img" className="header-logo__img" />
                        </Link>
                    </div>
                    <div className="content-mid content-mid__hide-on-tablet-mobile">
                        <ul className="header-page__list">
                            <li className="header-page__item">
                                <Link to="/home" className="header-page__item--link">
                                    <h6 className="header-page__heading"><FormattedMessage id="homeHeader.speciality"/></h6>
                                    <span className="header-page__sub-text"><FormattedMessage id="homeHeader.searchdoctor"/></span>
                                </Link>
                            </li>
                            <li className="header-page__item">
                                <Link to="/home" className="header-page__item--link">
                                    <h6 className="header-page__heading"><FormattedMessage id="homeHeader.healthfacilities"/></h6>
                                    <span className="header-page__sub-text"><FormattedMessage id="homeHeader.selectroom"/></span>
                                </Link>
                            </li>
                            <li className="header-page__item">
                                <Link to="/home" className="header-page__item--link">
                                    <h6 className="header-page__heading"><FormattedMessage id="homeHeader.doctor"/></h6>
                                    <span className="header-page__sub-text"><FormattedMessage id="homeHeader.selectdoctor"/></span>
                                </Link>
                            </li>
                            <li className="header-page__item">
                                <Link to="/home" className="header-page__item--link">
                                    <h6 className="header-page__heading"><FormattedMessage id="homeHeader.fee"/></h6>
                                    <span className="header-page__sub-text"><FormattedMessage id="homeHeader.checkhealth"/></span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="content-right">
                        <Link to="/home" className="header-help__link">
                            <i className="fas fa-question-circle header-help__icon"></i>
                            <span className="header-help__text"><FormattedMessage id="homeHeader.help"/></span>    
                        </Link>
                        <span className={language === LANGUAGES.VI ? "header-help__language action":"header-help__language"}onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span>
                        <span className={language === LANGUAGES.EN ? "header-help__language action":"header-help__language"} onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>
                </div>
            </div>

            {this.props.isShowBanner &&
                <div className="home-header-banner" style={{backgroundImage: `url(${banner})`}}>
                    <div className="banner-with-search">
                        <div className="row">
                            <h1 className="banner-with-search__heading">
                                <FormattedMessage id="banner.heading1"/> 
                                <br/>
                                <b><FormattedMessage id="banner.heading2"/> </b>
                            </h1>
                            <div className="banner-with-search__box">
                                <i className="fas fa-search search-icon" ></i> 
                                <input type="search" className="banner-with-search__input" placeholder="Tìm kiếm"/>   
                            
                                <div className="search-result">
                                    <h3 className="search-result-heading">
                                        Chuyên khoa    
                                    </h3>
                                    <Link to="/home" className="search-result__link">
                                        <div className="search-result__link-img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg)`}}></div>
                                        
                                        <h4 className="search-result__link-name">cơ xương khớp</h4>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="banner-care-options">
                        <ul className="banner-care-options__list ">
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png)`}}></div>
                                    <FormattedMessage id="banner.specialityexamination-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.specialityexamination-2"/>
                                </Link>
                            </li>
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png)`}}></div>
                                    <FormattedMessage id="banner.remoteexamination-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.remoteexamination-2"/>
                                </Link>
                            </li>
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png)`}}></div>
                                    <FormattedMessage id="banner.generalexamination-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.generalexamination-2"/>
                                </Link>
                            </li>
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png)`}}></div>
                                    <FormattedMessage id="banner.medicaltest-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.medicaltest-2"/>
                                </Link>
                            </li>
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png)`}}></div>
                                    <FormattedMessage id="banner.mentalhealth-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.mentalhealth-2"/>
                                </Link>
                            </li>
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png)`}}></div>
                                    <FormattedMessage id="banner.dentalexamination-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.dentalexamination-2"/>
                                </Link>
                            </li>
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/134356-goi-phau-thuat.png)`}}></div>
                                    <FormattedMessage id="banner.surgerypackage-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.surgerypackage-2"/>
                                </Link>
                            </li>
                            <li className="banner-care-options__item">
                                <Link to="/home" className="banner-care-options__item--link">
                                    <div className="banner-care-options__img" style={{backgroundImage: `url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png)`}}></div>
                                    <FormattedMessage id="banner.medicalproducts-1"/>
                                    <br/>
                                    <FormattedMessage id="banner.medicalproducts-2"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
