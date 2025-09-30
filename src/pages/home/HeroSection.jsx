import OwlCarousel from 'react-owl-carousel';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


const HeroSection = () => {

    const owlRef = useRef();
    return (
        <>
            <div className="position-relative">
                {/* Left Arrow */}
                <button
                    className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-3 owl-prev"
                    style={{ left: '-40px' }}
                    aria-label="Previous"
                    onClick={() => owlRef.current.prev()}
                >
                    <i className="fa fa-chevron-left"></i>
                </button>
                {/* Right Arrow */}
                <button
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-3"
                    style={{ right: '-40px' }}
                    aria-label="Next"
                    onClick={() => owlRef.current.next()}
                >
                    <i className="fa fa-chevron-right"></i>
                </button>

                <OwlCarousel
                    className="product-slider owl-carousel h-100"
                    items={1}
                    loop
                    nav={false}
                    dots={false}
                    autoplay={true}
                    autoplayTimeout={4000}
                    autoplayHoverPause={true}
                    ref={owlRef}
                >
                    <div className="position-relative h-100">
                        {/* Text overlay */}
                        <div className="position-absolute" style={{ top: '8rem', left: '8rem', zIndex: 3 }}>
                            <span className="text-warning fw-bold">NEW SEASON</span>
                            <h1 className="fw-bold">Autumn Arrivals</h1>
                            <p className="mb-5">
                                Discover the latest trends in fashion and enjoy <br />
                                exclusive discounts this season.
                            </p>

                            <Link className="primary-btn">SHOP NOW</Link>
                        </div>

                        {/* Image */}
                        <img
                            src="/img/hero-1.jpg"
                            alt="Woman with flowers"
                            className="d-block w-100 h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    <div className="position-relative h-100">
                        <div className="position-absolute" style={{ top: '8rem', left: '8rem', zIndex: 3 }}>
                            <span className="text-warning fw-bold">BAG, KIDS</span>
                            <h1 className="fw-bold">Black friday</h1>
                            <p className="mb-5">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed <br />
                                do eiusmod tempor incididunt ut labore et dolore
                            </p>
                            <Link className="primary-btn">SHOP NOW</Link>
                        </div>

                        <img
                            src="/img/hero-2.jpg"
                            alt="Woman with flowers"
                            className="d-block w-100 h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </OwlCarousel>
            </div>
        </>
    )
}

export default HeroSection
