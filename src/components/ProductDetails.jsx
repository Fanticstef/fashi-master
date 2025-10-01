import { useNavigate, useParams } from "react-router-dom"
import ProductLayout from "../pages/product/ProductLayout"
import Breadcrumb from "./Breadcrumb"
import { fetchProductsRequest } from "../redux/slice/product/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef, useState } from "react"
import Slider from "react-slick"
import { useForm } from "react-hook-form"
import { createCartRequest, fetchCartsRequest } from "../redux/slice/cart/cartSlice"


const ProductDetails = () => {
    // get single products
    const { _id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, isLoading } = useSelector(state => state.product)
    const { carts } = useSelector(state => state.cart)

    // increment or decrement
    const { register, setValue, getValues, watch } = useForm({
        defaultValues: {
            quantity: 0
        }
    })

    const quantity = watch("quantity")

    const increaseQty = () => {
        const currentQty = getValues('quantity')
        setValue('quantity', currentQty + 1)
    }

    const decreaseQty = () => {
        const currentQty = getValues('quantity')
        if (currentQty > 0) {
            setValue('quantity', currentQty - 1)
        }
    }

    // slide others images
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    const slider1 = useRef();
    const slider2 = useRef();

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);


    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(fetchProductsRequest());
        }
        dispatch(fetchCartsRequest());
    }, [dispatch, products]);

    const product = useMemo(() => {
        if (!products || products.length === 0) {
            return null
        }
        return products.find(p => p._id === _id)
    }, [products, _id])

    // addToCart
    const addToCart = () => {
        const loggedInUserId = localStorage.getItem('user_id')
        const isSameProduct = (p) => (typeof p === 'string' ? p === _id : p?._id === _id)
        const isSameUser = (u) => (typeof u === 'string' ? u === loggedInUserId : u?._id === loggedInUserId)

        const alreadyInCart = carts?.some(c => isSameUser(c.user) && isSameProduct(c.product))
        if (!alreadyInCart) {
            const cartItem = {
                user: loggedInUserId,
                product: _id,
                qty: quantity,
                total: quantity * product.finalPrice
            }
            dispatch(createCartRequest(cartItem))
        }
        navigate("/cart")
    }

    const mainSettings = {
        asNavFor: nav2,
        arrows: false,
        fade: true,
        dots: false,
    };

    const thumbSettings = {
        asNavFor: nav1,
        slidesToShow: 4,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
        centerMode: false,
        dots: false,
    };

    if (!product || isLoading) {
        return <div>Loading product...</div>;
    }

    return (
        <>
            <Breadcrumb data={products} />
            <ProductLayout>
                <div className="col-lg-9">
                    <div className="row">
                        <div className="col-lg-6">
                            {/* Main Image Slider */}
                            <div className="product-pic-zoom">
                                <Slider {...mainSettings} ref={slider1}>
                                    {product?.pic?.map((img, i) => (
                                        <div key={i}>
                                            <img
                                                className="product-big-img"
                                                src={`${API_URL}/${img}`}
                                                alt={product?.name}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                <div className="zoom-icon">
                                    <i className="fa fa-search-plus"></i>
                                </div>
                            </div>

                            {/* Thumbnail Slider */}
                            <div className="product-thumbs">
                                <Slider {...thumbSettings} ref={slider2}>
                                    {product.pic?.map((item, i) => (
                                        <div key={i} className="pt">
                                            <img
                                                style={{
                                                    height: "90px",
                                                    cursor: "pointer",
                                                    borderRadius: "4px",
                                                    padding: "2px",
                                                }}
                                                src={`${API_URL}/${item}`}
                                                alt={`product_thumb_${i}`}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product-details">
                                <div className="pd-title">
                                    <span>{product.subcategory?.name}</span>
                                    <h3>{product.name}</h3>
                                    <a href="#" className="heart-icon"><i className="icon_heart_alt"></i></a>
                                </div>
                                <div className="pd-rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-o"></i>
                                    <span>(5)</span>
                                </div>
                                <div className="pd-desc">
                                    <p>Lorem ipsum dolor sit amet, consectetur ing elit, sed do eiusmod tempor sum dolor
                                        sit amet, consectetur adipisicing elit, sed do mod tempor</p>
                                    <h4>&#8377; {product.finalPrice} <span>{product.basePrice}</span></h4>
                                </div>
                                <div className="pd-color">
                                    <h6>Color</h6>
                                    <div className="pd-color-choose">
                                        <div className="cc-item">
                                            <input type="radio" id="cc-black" />
                                            <label htmlFor="cc-black"></label>
                                        </div>
                                        <div className="cc-item">
                                            <input type="radio" id="cc-yellow" />
                                            <label htmlFor="cc-yellow" className="cc-yellow"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="pd-size-choose">
                                    <div className="sc-item">
                                        <input type="radio" id="sm-size" />
                                        <label htmlFor="sm-size">s</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" id="md-size" />
                                        <label htmlFor="md-size">m</label>
                                    </div>
                                </div>
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <span className="dec qtybtn" onClick={decreaseQty}>-</span>
                                        <input
                                            type="number"
                                            {...register("quantity", { valueAsNumber: true })}
                                            value={quantity}
                                            readOnly />
                                        <span className="inc qtybtn" onClick={increaseQty}>+</span>
                                    </div>
                                    <button
                                        className="primary-btn pd-cart border-0"
                                        onClick={addToCart}>Add To Cart</button>
                                </div>
                                <ul className="pd-tags">
                                    <li><span>CATEGORIES</span>: More Accessories, {product.name}</li>
                                    <li><span>TAGS</span>: {product.subcategory?.name}, {product.maincategory?.name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="product-tab">
                        <div className="tab-item">
                            <ul className="nav" role="tablist">
                                <li>
                                    <a className="active" data-toggle="tab" href="#tab-1" role="tab">DESCRIPTION</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#tab-2" role="tab">SPECIFICATIONS</a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-item-content">
                            <div className="tab-content">
                                <div className="tab-pane fade-in active" id="tab-1" role="tabpanel">
                                    <div className="product-content">
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <h5>Introduction</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                                <h5>Features</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                            </div>
                                            <div className="col-lg-5">
                                                <img src="img/product-single/tab-desc.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab-2" role="tabpanel">
                                    <div className="specification-table">
                                        <table>
                                            <tr>
                                                <td className="p-catagory">Customer Rating</td>
                                                <td>
                                                    <div className="pd-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star-o"></i>
                                                        <span>(5)</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Price</td>
                                                <td>
                                                    <div className="p-price">&#8377; {product.finalPrice}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Availability</td>
                                                <td>
                                                    <div className="p-stock">
                                                        <span
                                                            className={product.stockQuantity > 10 ? 'text-success' : 'text-danger'}>
                                                            {product.stockQuantity}
                                                        </span> in stock
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Size</td>
                                                <td>
                                                    <div className="p-size">{product.size}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Color</td>
                                                <td><span className="cs-color"></span></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ProductLayout>
        </>
    )
}

export default ProductDetails
