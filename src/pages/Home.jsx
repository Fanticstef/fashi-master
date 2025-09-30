import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import HeroSection from './home/HeroSection'
import ManBanner from './home/ManBanner'
import WomenBanner from './home/WomenBanner'
import { fetchProductsRequest } from '../redux/slice/product/productSlice'
import { fetchMainCategorysRequest } from '../redux/slice/maincategory/mainCategorySlice'
import { Link } from 'react-router-dom'


const Home = () => {
    const dispatch = useDispatch()
    const { mainCategorys } = useSelector(state => state.mainCategory)
    const { products, isLoading } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(fetchMainCategorysRequest())
        dispatch(fetchProductsRequest())
    }, [dispatch])

    return (
        <>
            {/* Hero Section Begin */}
            <HeroSection />
            {/* Hero Section End */}

            {/* <!-- Banner Section Begin --> */}
            <div className="banner-section spad">
                <div className="container-fluid">
                    <div className="row">
                        {mainCategorys.length > 0 ? (
                            mainCategorys?.map(mainCategory => (
                                <div key={mainCategory._id} className="col-lg-4">
                                    <Link to={`/product?category=${mainCategory._id}`}>
                                        <div className="single-banner">
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}/${mainCategory.pic}`}
                                                alt={mainCategory.name} />
                                            <div className="inner-text">
                                                <h4>{mainCategory.name}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                </div>))
                        ) : (
                            <li>Not any categories <br /> available</li>
                        )}
                    </div>
                </div>
            </div>
            {/* <!-- Banner Section End --> */}

            {/* <!-- Women Banner Section Begin --> */}
            <WomenBanner
                isLoading={isLoading}
                data={products.filter(x => x.maincategory?.name.toLowerCase() === 'women')} />
            {/* <!-- Women Banner Section End --> */}

            {/* <!-- Deal Of The Week Section Begin--> */}
            <section
                className="deal-of-week set-bg spad"
                style={{ backgroundImage: "url('/img/time-bg.jpg')" }}>
                <div className="container">
                    <div className="col-lg-6 text-center">
                        <div className="section-title">
                            <h2>Deal Of The Week</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed<br /> do ipsum dolor sit amet,
                                consectetur adipisicing elit </p>
                            <div className="product-price">
                                $35.00
                                <span>/ HanBag</span>
                            </div>
                        </div>
                        <div className="countdown-timer" id="countdown">
                            <div className="cd-item">
                                <span>56</span>
                                <p>Days</p>
                            </div>
                            <div className="cd-item">
                                <span>12</span>
                                <p>Hrs</p>
                            </div>
                            <div className="cd-item">
                                <span>40</span>
                                <p>Mins</p>
                            </div>
                            <div className="cd-item">
                                <span>52</span>
                                <p>Secs</p>
                            </div>
                        </div>
                        <a href="#" className="primary-btn">Shop Now</a>
                    </div>
                </div>
            </section>
            {/* <!-- Deal Of The Week Section End --> */}

            {/* <!-- Man Banner Section Begin --> */}
            <ManBanner
                isLoading={isLoading}
                data={products.filter(x => x.maincategory?.name.toLowerCase() === 'men')} />
            {/* <!-- Man Banner Section End --> */}

            <div className="container mb-5">
                <div className="benefit-items">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="single-benefit">
                                <div className="sb-icon">
                                    <img src="/img/icon-1.png" alt="" />
                                </div>
                                <div className="sb-text">
                                    <h6>Free Shipping</h6>
                                    <p>For all order over 99$</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-benefit">
                                <div className="sb-icon">
                                    <img src="/img/icon-2.png" alt="" />
                                </div>
                                <div className="sb-text">
                                    <h6>Delivery On Time</h6>
                                    <p>If good have prolems</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-benefit">
                                <div className="sb-icon">
                                    <img src="/img/icon-1.png" alt="" />
                                </div>
                                <div className="sb-text">
                                    <h6>Secure Payment</h6>
                                    <p>100% secure payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
