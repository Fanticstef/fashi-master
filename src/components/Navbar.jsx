import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { deleteCartRequest, fetchCartsRequest } from "../redux/slice/cart/cartSlice"
import { useEffect, useMemo } from "react"
import { fetchWishlistsRequest } from "../redux/slice/wishlist/wishlistSlice"
import { GiEmptyHourglass } from "react-icons/gi";


const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { carts } = useSelector(state => state.cart)
    const { wishlists } = useSelector(state => state.wishlist)

    const currentUserId = localStorage.getItem('user_id')

    const cartItems = useMemo(() => {
        if (!currentUserId || !Array.isArray(carts)) return []
        return carts.filter(cart => cart.user?._id === currentUserId)
    }, [carts, currentUserId])

    const wishlistCount = useMemo(() => {
        if (!currentUserId || !Array.isArray(wishlists)) return 0;
        return wishlists.reduce((count, item) => (
            item.user?._id === currentUserId ? count + 1 : count
        ), 0);
    }, [wishlists, currentUserId]);

    const removeCartItem = (id) => {
        if (id) {
            dispatch(deleteCartRequest(id))
        }
    }

    const calculateSubTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item?.product?.finalPrice || 0) * (item?.qty || 1)
        }, 0).toFixed(2)
    }

    useEffect(() => {
        dispatch(fetchCartsRequest())
        dispatch(fetchWishlistsRequest())
    }, [dispatch])

    const logout = () => {
        localStorage.removeItem("login")
        localStorage.removeItem("username")
        localStorage.removeItem("user_id")
        localStorage.removeItem("role")
        navigate("/login")
    }
    return (
        <>
            <header className="header-section">
                <div className="header-top">
                    <div className="container">
                        <div className="ht-left">
                            <div className="mail-service">
                                <i className=" fa fa-envelope"></i>
                                ris147200@gmail.com
                            </div>
                            <div className="phone-service">
                                <i className=" fa fa-phone"></i>
                                (+91) 8368797483
                            </div>
                        </div>
                        <div className="ht-right">
                            {localStorage.getItem("login") ?
                                <>
                                    <div className="login-panel dropdown" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                        <h5
                                            className="fw-bold border rounded-circle dropdown-toggle no-caret text-capitalize"
                                            style={{ padding: '7px 14px', cursor: 'pointer' }}
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            {localStorage.getItem("username").slice(0, 1)}
                                        </h5>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={`${localStorage.getItem('role') === 'admin' ? '/admin' : '/profile'}`}>Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                                            <li><Link className="dropdown-item" to="/checkout">Checkout</Link></li>
                                            <li>
                                                <div
                                                    className="dropdown-item"
                                                    onClick={logout}
                                                    style={{ cursor: 'pointer' }}>Logout</div>
                                            </li>
                                        </ul>
                                    </div>
                                </> :
                                <>
                                    <Link to="/login" className="login-panel">
                                        <i className="fa fa-user"></i>
                                        Login
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="inner-header">
                        <div className="row">
                            <div className="col-lg-2 col-md-2">
                                <div className="logo">
                                    <Link to="/">
                                        <img src="/img/logo.png" alt="Logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="advanced-search" style={{ border: 'none' }}>
                                    <div className="input-group advanced-search">
                                        <input type="text" placeholder="What do you need?" />
                                        <button type="button"><i className="ti-search"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 text-right col-md-3">
                                <ul className="nav-right">
                                    <li className="heart-icon">
                                        <Link to="/wishlist">
                                            <i className="icon_heart_alt"></i>
                                            <span>{wishlistCount}</span>
                                        </Link>
                                    </li>
                                    <li className="cart-icon">
                                        <Link to="/cart">
                                            <i className="icon_bag_alt"></i>
                                            <span>{cartItems.length}</span>
                                        </Link>
                                        <div className="cart-hover">
                                            <div className="select-items">
                                                <table>
                                                    <tbody>
                                                        {cartItems.length > 0 ? (
                                                            cartItems.slice(0, 2).map(cart => (
                                                                <tr key={cart._id}>
                                                                    <td className="si-pic">
                                                                        <img
                                                                            src={`${import.meta.env.VITE_API_BASE_URL}/${cart?.product?.pic[0]}`}
                                                                            alt={cart?.product?.name}
                                                                            width={80} />
                                                                    </td>
                                                                    <td className="si-text">
                                                                        <div className="product-selected">
                                                                            <p>&#8377; {cart?.product?.finalPrice} x {cart.qty}</p>
                                                                            <h6>{cart?.product?.name}</h6>
                                                                        </div>
                                                                    </td>
                                                                    <td
                                                                        className="si-close"
                                                                        onClick={() => removeCartItem(cart._id)}>
                                                                        <i className="ti-close"></i>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr className="text-center">
                                                                <td>
                                                                    <div className="mb-3">
                                                                        <GiEmptyHourglass style={{ width: '3rem', height: '3rem', color: 'grey' }} />
                                                                    </div>
                                                                    <p>Not any product in cart</p>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {cartItems.length > 0 ? (
                                                <>
                                                    <div className="select-total">
                                                        <span>total:</span>
                                                        <h5>&#8377; {calculateSubTotal()}</h5>
                                                    </div>
                                                    <div className="select-button">
                                                        <Link
                                                            to="/cart"
                                                            className="primary-btn checkout-btn">
                                                            CHECK OUT
                                                        </Link>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="select-button">
                                                    <Link
                                                        to="/product"
                                                        className="primary-btn checkout-btn">
                                                        SHOP NOW
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                    <li className="cart-price">&#8377; {calculateSubTotal()}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-item">
                    <div className="container">
                        <div className="nav-depart">
                            <div className="depart-btn">
                                <i className="ti-menu"></i>
                                <span>All departments</span>
                                <ul className="depart-hover">
                                    <li className="active"><Link to="#">Women’s Clothing</Link></li>
                                    <li><Link to="#">Men’s Clothing</Link></li>
                                    <li><Link to="#">Underwear</Link></li>
                                    <li><Link to="#">Kid's Clothing</Link></li>
                                    <li><Link to="#">Brand Fashion</Link></li>
                                    <li><Link to="#">Accessories/Shoes</Link></li>
                                    <li><Link to="#">Luxury Brands</Link></li>
                                </ul>
                            </div>
                        </div>
                        <nav className="nav-menu mobile-menu">
                            <ul>
                                <li className="active"><Link to="/">Home</Link></li>
                                <li><Link to="/product">Shop</Link></li>
                                <li><Link to="#">Collection</Link>
                                    <ul className="dropdown">
                                        <li><Link to="#">Men's</Link></li>
                                        <li><Link to="#">Women's</Link></li>
                                        <li><Link to="#">Kid's</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/faq">Faq</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </nav>
                        <div id="mobile-menu-wrap"></div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
