import  React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import HomeFooter from './HomeFooter'

class HomePage extends Component {

    render() {
       
        return (

            <div>
                <HomeHeader isShowBanner={true}/>
                <HomeContent/>
                <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
