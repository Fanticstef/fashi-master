import { useDispatch, useSelector } from "react-redux"
import Breadcrumb from "../../components/Breadcrumb"
import ProfileLayout from "./ProfileLayout"
import { useEffect, useMemo } from "react"
import { fetchCheckoutsRequest } from "../../redux/slice/checkout/checkoutSlice"
import { Link } from "react-router-dom"
import { MdProductionQuantityLimits } from "react-icons/md"


const OrderPage = () => {
    const dispatch = useDispatch()

    const { checkouts } = useSelector(state => state.checkout)

    const currentUserId = localStorage.getItem('user_id')

    const orderItems = useMemo(() => {
        if (!currentUserId || !Array.isArray(checkouts)) return []
        return checkouts.filter(check => check.user?._id === currentUserId)
    }, [checkouts, currentUserId])

    useEffect(() => {
        dispatch(fetchCheckoutsRequest())
    }, [dispatch])

    return (
        <>
            <Breadcrumb />
            <ProfileLayout>
                <div className="col-lg-9">
                    <div className="cart-table">
                        <table>
                            <tbody>
                                {orderItems.length > 0 ? (
                                    orderItems.map(order => (
                                        <tr key={order._id} style={{ border: '1px solid lightGray' }}>
                                            <td className="first-row" style={{ width: '7%' }}>
                                                <Link to={`/order/${order._id}`}>
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/${order?.products[0].product?.pic[0]}`}
                                                        alt={order?.products[0].product?.name}
                                                        width={90} />
                                                </Link>
                                            </td>
                                            <td className="first-row" style={{ width: '7%' }}>
                                                <h5>{order?.products[0].product?.name}</h5>
                                            </td>
                                            <td className="first-row fw-bold" style={{ width: '7%', color: '#e7ab3c' }}>
                                                &#8377; {order?.products[0].product?.finalPrice}
                                            </td>
                                            <td className="total-price first-row" style={{ paddingTop: '4rem' }}>
                                                <div style={{ color: '#343a40' }}>
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            width: '10px',
                                                            height: '10px',
                                                            background: '#198754',
                                                            borderRadius: '50%'
                                                        }}></span> Delivery expected by Yesterday
                                                    <p>{order?.orderStatus}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-column align-items-center justify-content-center p-3">
                                                <div className="mb-3">
                                                    <MdProductionQuantityLimits style={{ width: '5rem', height: '5rem', color: 'grey' }} />
                                                </div >
                                                <p>You do not order any product</p>
                                                <div className="select-button">
                                                    <Link
                                                        to="/product"
                                                        className="primary-btn checkout-btn">
                                                        SHOP NOW
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ProfileLayout>
        </>
    )
}

export default OrderPage
