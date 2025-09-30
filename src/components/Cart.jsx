import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MdProductionQuantityLimits } from "react-icons/md";
import { deleteCartRequest, fetchCartsRequest, updateCartRequest } from '../redux/slice/cart/cartSlice';


const Cart = () => {
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)

    const currentUserId = localStorage.getItem('user_id')

    const cartItems = useMemo(() => {
        if (!currentUserId || !Array.isArray(carts)) return []
        return carts.filter(cart => cart.user?._id === currentUserId)
    }, [carts, currentUserId])

    const removeCateItem = (id) => {
        if (id) {
            dispatch(deleteCartRequest(id))
        }
    }

    const handleQuantityChange = (_id, newQty, price) => {
        if (newQty < 1) return;

        dispatch(updateCartRequest({ _id, qty: newQty, total: newQty * price }))
    }

    const calculateSubTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item?.product?.finalPrice || 0) * (item?.qty || 1)
        }, 0).toFixed(2)
    }

    const getShippingCharge = () => {
        const subTotal = parseInt(calculateSubTotal())

        if (subTotal <= 0 || subTotal > 1000) {
            return 0
        }

        return 250
    }

    const calculateShippingChange = () => {
        const subTotal = parseInt(calculateSubTotal())
        const shipping = getShippingCharge()
        return subTotal + shipping
    }

    useEffect(() => {
        dispatch(fetchCartsRequest())
    }, [dispatch])

    return (
        <>
            <section className={`${cartItems.length > 0 ? 'shopping-cart spad' : 'pb-5'}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-table">
                                <table>
                                    <thead>
                                        {cartItems.length > 0 && (
                                            <tr>
                                                <th>Image</th>
                                                <th className="p-name">Product Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                        )}
                                    </thead>
                                    <tbody>
                                        {cartItems.length > 0 ? (
                                            cartItems.map(cart => (
                                                <tr key={cart._id}>
                                                    <td className="cart-pic first-row">
                                                        <img
                                                            src={`${import.meta.env.VITE_API_URL}/${cart?.product?.pic[0]}`}
                                                            alt={cart?.product?.name}
                                                            width={140} />
                                                    </td>
                                                    <td className="cart-title first-row">
                                                        <h5>{cart?.product?.name}</h5>
                                                    </td>
                                                    <td className="p-price first-row">&#8377; {cart?.product?.finalPrice}</td>
                                                    <td className="qua-col first-row">
                                                        <div className="quantity">
                                                            <div className="pro-qty">
                                                                <span
                                                                    className="dec qtybtn"
                                                                    onClick={() => handleQuantityChange(
                                                                        cart._id,
                                                                        cart.qty - 1,
                                                                        cart.product.finalPrice
                                                                    )}>-</span>
                                                                <input
                                                                    type="number"
                                                                    value={cart.qty}
                                                                    readOnly
                                                                />
                                                                <span
                                                                    className="inc qtybtn"
                                                                    onClick={() => handleQuantityChange(
                                                                        cart._id,
                                                                        cart.qty + 1,
                                                                        cart.product.finalPrice
                                                                    )}>+</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="total-price first-row">&#8377; {cart.total}</td>
                                                    <td
                                                        className="close-td first-row"
                                                        onClick={() => removeCateItem(cart._id)}>
                                                        <i className="ti-close"></i>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : null}
                                    </tbody>
                                </table>
                            </div>
                            {cartItems.length > 0 ? (
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="cart-buttons">
                                            <Link to="/product" className="primary-btn">Continue shopping</Link>
                                        </div>
                                        <div className="discount-coupon">
                                            <h6>Discount Codes</h6>
                                            <form action="#" className="coupon-form">
                                                <input type="text" placeholder="Enter your codes" />
                                                <button type="submit" className="site-btn coupon-btn">Apply</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 offset-lg-4">
                                        <div className="proceed-checkout">
                                            <ul>
                                                <li className="subtotal">Subtotal <span>&#8377; {calculateSubTotal()}</span></li>
                                                <li className="subtotal">Shipping Charge <span className='text-success'>+ {getShippingCharge().toFixed(2)}</span></li>
                                                <li className="cart-total">Total <span>&#8377; {calculateShippingChange().toFixed(2)}</span></li>
                                            </ul>
                                            <Link to="/checkout" className="proceed-btn">PROCEED TO CHECK OUT</Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <div className="mb-3">
                                        <MdProductionQuantityLimits style={{ width: '5rem', height: '5rem', color: 'grey' }} />
                                    </div >
                                    <p>Your cart is empty</p>
                                    <div className="select-button">
                                        <Link
                                            to="/product"
                                            className="primary-btn checkout-btn">
                                            SHOP NOW
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
