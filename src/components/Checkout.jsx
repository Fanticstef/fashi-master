import { useDispatch, useSelector } from "react-redux"
import { fetchUsersRequest } from "../redux/slice/user/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useMemo } from "react"
import { FaPlus } from "react-icons/fa6"
import { deleteCartRequest, fetchCartsRequest } from "../redux/slice/cart/cartSlice"
import { MdProductionQuantityLimits } from "react-icons/md"
import { fetchProductsRequest, updateProductRequest } from "../redux/slice/product/productSlice"
import { createCheckoutRequest } from "../redux/slice/checkout/checkoutSlice"

const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const _id = localStorage.getItem("user_id")

    const { users } = useSelector(state => state.user)
    const { carts } = useSelector(state => state.cart)
    const { products } = useSelector(state => state.product)

    const user = users.find(x => x._id === _id)

    const cartItems = useMemo(() => {
        if (!_id || !Array.isArray(carts)) return []
        return carts.filter(cart => cart.user?._id === _id)
    }, [carts, _id])

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

    const placeOrder = () => {
        const checkoutItem = {
            user: _id,
            subTotal: parseInt(calculateSubTotal()),
            shipping: getShippingCharge(),
            total: calculateSubTotal() + getShippingCharge(),
            products: [...cartItems]
        };

        try {
            dispatch(createCheckoutRequest(checkoutItem));

            // Update product stock
            cartItems.forEach(cartItem => {
                const product = products.find(p => p._id === cartItem.product._id);
                const updatedProduct = {
                    ...product,
                    stockQuantity: Math.max(0, product.stockQuantity - cartItem.qty),
                };
                updatedProduct.stock = updatedProduct.stockQuantity > 0;

                dispatch(updateProductRequest(updatedProduct));
                dispatch(deleteCartRequest(cartItem._id));
            });

            // Navigate to confirmation page
            navigate("/confirmation");

        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    useEffect(() => {
        dispatch(fetchUsersRequest())
        dispatch(fetchCartsRequest())
        dispatch(fetchProductsRequest())
    }, [dispatch])

    const excludedKeys = ["_id", "__v", "pic", "password", "username"]

    if (!user) {
        return <div className="container my-4">Loading...</div>;
    }

    return (
        <>
            <section className="checkout-section spad">
                <div className="container">
                    <form action="#" className="checkout-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold p-2 m-0 flex-grow-1 text-center rounded border">
                                        LOGIN
                                    </h4>
                                    {Object.keys(user).length >= 12 && (
                                        <Link to={`/user-details/${_id}`} className="btn border text-primary d-flex align-items-center ms-1 p-2 fw-bold">
                                            CHANGE
                                        </Link>
                                    )}
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            {Object.entries(user)
                                                .filter(([key]) => !excludedKeys.includes(key))
                                                .map(([lebal, value], index) => (
                                                    <tr key={index}>
                                                        <th className="w-25 text-capitalize">{lebal}</th>
                                                        <td>{`${value || 'N/A'}`}</td>
                                                    </tr>
                                                ))}
                                            {Object.keys(user).length < 12 && (
                                                <tr>
                                                    <th style={{ paddingTop: '20px' }}>Other Details</th>
                                                    <td>
                                                        <Link
                                                            to={`/user-details/${_id}`}
                                                            className="primary-btn checkout-btn">
                                                            Add <FaPlus />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {cartItems.length > 0 ? (
                                <div className="col-lg-6">
                                    <div className="checkout-content">
                                        <input type="text" placeholder="Enter Your Coupon Code" />
                                    </div>
                                    <div className="place-order">
                                        <h4>Your Order</h4>
                                        <div className="order-total">
                                            <ul className="order-table">
                                                <li>Product <span>Total</span></li>
                                                {cartItems.map(cart => (
                                                    <li key={cart._id} className="fw-normal">
                                                        {cart.product?.name} x {cart.qty} <span>&#8377; {cart?.product?.finalPrice}</span>
                                                    </li>
                                                ))}
                                                <li className="fw-normal">Subtotal <span>&#8377; {calculateSubTotal()}</span></li>
                                                <li className="fw-normal">Shipping <span className="text-success">+ {getShippingCharge().toFixed(2)}</span></li>
                                                <li className="total-price">Total <span>&#8377; {calculateShippingChange().toFixed(2)}</span></li>
                                            </ul>
                                            <div className="payment-check">
                                                <div className="pc-item">
                                                    <label htmlFor="pc-check">
                                                        Cash on delivery
                                                        <input type="checkbox" id="pc-check" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                                <div className="pc-item">
                                                    <label htmlFor="pc-paypal">
                                                        Online
                                                        <input type="checkbox" id="pc-paypal" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="order-btn">
                                                <button
                                                    type="button"
                                                    onClick={placeOrder}
                                                    className="site-btn place-btn">Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-lg-6 d-flex justify-content-center border">
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
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Checkout
