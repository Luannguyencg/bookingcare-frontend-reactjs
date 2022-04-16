import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss'

class HomeFooter extends Component {

    render() {

        return (

            <div className="footer">
                <div className="container">
                    <div className=" row footer__mobile">

                        <div className="col-lg-3 col-sm-4 col-6">
                            <h3 className="footer__heading">Giới thiệu</h3>
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a className="footer__item-link">Giới thiệu</a>
                                </li>
                                <li className="footer__item">
                                    <a className="footer__item-link">Tuyển dụng</a>
                                </li>
                                <li className="footer__item">
                                    <a className="footer__item-link">Điều khoản</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-sm-4 col-6">
                            <h3 className="footer__heading">chăm sóc khách hàng</h3>
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a className="footer__item-link">Trung tâm trợ giúp</a>
                                </li>
                                <li className="footer__item">
                                    <a className="footer__item-link">Booking care</a>
                                </li>
                                <li className="footer__item">
                                    <a className="footer__item-link">Hướng dẫn mua hàng</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-sm-4 col-6">
                            <h3 className="footer__heading">Theo dõi</h3>
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a className="footer__item-link">
                                        <i className="footer__item-icon fab fa-facebook-square"></i>
                                        Facebook
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a className="footer__item-link">
                                        <i className="footer__item-icon fab fa-instagram"></i>
                                        instagram
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a className="footer__item-link">
                                        <i className="footer__item-icon fab fa-linkedin"></i>
                                        Linkedin
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col col-lg-3 col-sm-4 col-12">
                            <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
                            <div className="footer__dowload">
                                {/* <img src="./assets/img/code.shoppee.png" alt="Dowload-QR" className="footer__dowload-qr"/>
                            <div className="footer__dowload-app">
                                <a className="footer__dowload-app-link">
                                    <img src="./assets/img/gg_play.png" alt="gg play" className="footer__dowload-app-img"/>
                                </a>
                                <a className="footer__dowload-app-link">
                                    <img src="./assets/img/app_store.png" alt="app_store" className="footer__dowload-app-img"/>
                                </a>

                            </div> */}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="contaoner">
                        <p className="footer__text">2022 - Bản Quyền Thuộc Về Công Ty MyCv MLuan</p>
                    </div>

                </div>
            </div>

            // <div className="home-footer text-center">
            //     <p>&copy; 2022 Nguyễn Minh Luân. More infomation, please visit my github
            //         <a target="_blank" href="https://github.com/">
            //             &#8594; Click here &#8594;   
            //         </a>
            //     </p>

            // </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
