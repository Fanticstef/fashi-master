import { Link } from 'react-router-dom';
import Slider from 'react-slick';


const ManBanner = ({ data, isLoading }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="man-banner spad">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 position-relative">
                        <div className="filter-control">
                            <ul>
                                <li className="active">Clothings</li>
                                <li>HandBag</li>
                                <li>Shoes</li>
                                <li>Accessories</li>
                            </ul>
                        </div>

                        {/* React Slick Carousel */}
                        <Slider {...settings}>
                            {/* Show loading spinner while data is being fetched */}
                            {isLoading ? (
                                <div className="loading-spinner">Loading...</div>
                            ) : data?.length > 0 ? (
                                data?.map(item => (
                                    <div key={item._id} className="product-item">
                                        <div className="pi-pic">
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}/${item.pic[0]}`}
                                                width={260}
                                                height={360}
                                                alt={item.name}
                                            />
                                            <div className="sale">Sale</div>
                                            <div className="icon">
                                                <i className="icon_heart_alt"></i>
                                            </div>
                                            <ul>
                                                <li className="w-icon active">
                                                    <a href="#"><i className="icon_bag_alt"></i></a>
                                                </li>
                                                <li className="quick-view"><Link to={`/product/${item._id}`}>+ Quick View</Link></li>
                                                <li className="w-icon"><a href="#"><i className="fa fa-random"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="pi-text">
                                            <div className="catagory-name">{item.maincategory?.name}</div>
                                            <a href="#">
                                                <h5>{item.name}</h5>
                                            </a>
                                            <div className="product-price">
                                                ${item.finalPrice}&nbsp;
                                                <span>${item.basePrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="product-item">
                                    <div className="pi-pic">
                                        <div className="sale">Sale</div>
                                        <div className="icon">
                                            <i className="icon_heart_alt"></i>
                                        </div>
                                        <ul>
                                            <li className="w-icon active"><a href="#"><i className="icon_bag_alt"></i></a></li>
                                            <li className="quick-view"><a href="#">+ Quick View</a></li>
                                            <li className="w-icon"><a href="#"><i className="fa fa-random"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="pi-text">
                                        <div className="catagory-name">Coat</div>
                                        <a href="#">
                                            <h5>Pure Pineapple</h5>
                                        </a>
                                        <div className="product-price">
                                            $14.00
                                            <span>$35.00</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="col-lg-3 offset-lg-1">
                        <div
                            className="product-large set-bg"
                            style={{ backgroundImage: "url('/img/products/man-large.jpg')" }}>
                            <h2>Men’s</h2>
                            <a href="#">Discover More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ManBanner

