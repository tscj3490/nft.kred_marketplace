import React, { Component } from 'react';
import Slider from "react-slick";

import slick1 from "../../assets/images/slick1.jpg"
import slick2 from "../../assets/images/slick2.jpg"
import slick3 from "../../assets/images/slick3.jpg"
import slick4 from "../../assets/images/slick4.jpg"
import slick5 from "../../assets/images/slick5.jpg"

var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    fade: true,
    cssEase: 'linear',
    speed: 2000,
    arrows: false,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
};
class Slick extends Component {
    
    render() {
        return (
            <section className="breadcrumb-area overlay-dark d-flex align-items-center" style={{height: 'auto'}}>
                <div className="container" style={{paddingTop: 10}}>
                    <div className="col-lg-12 col-md-12 col-sm-12 slider-container">
                        {/* Breamcrumb Content */}
                        <div className="breadcrumb-content d-flex text-center col-lg-4 col-md-4 col-sm-12 align-items-center">
                            <h2 className="m-0 mb-4">Get Your NFT.Kred NFTs Today</h2>
                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-12'>
                            <Slider {...settings}>
                                <div>
                                    <img src={slick1} className='slider-img'/>
                                </div>
                                <div>
                                    <img src={slick2} className='slider-img'/>
                                </div>
                                <div>
                                    <img src={slick3} className='slider-img'/>
                                </div>
                                <div>
                                    <img src={slick4} className='slider-img'/>
                                </div>
                                <div>
                                    <img src={slick5} className='slider-img'/>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Slick;