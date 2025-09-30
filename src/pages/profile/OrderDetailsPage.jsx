import { useParams } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { fetchCheckoutsRequest } from "../../redux/slice/checkout/checkoutSlice"


const OrderDetailsPage = () => {
    const { _id } = useParams()
    const dispatch = useDispatch()

    const { checkouts } = useSelector(state => state.checkout)

    const orderDetails = useMemo(() => {
        if (!_id || !Array.isArray(checkouts)) return []
        return checkouts.find(check => check._id === _id)
    }, [checkouts, _id])

    useEffect(() => {
        dispatch(fetchCheckoutsRequest())
    }, [dispatch])

    return (
        <>
            <Breadcrumb />
            <section className="span my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="border">
                                <div className="border-bottom p-3">
                                    <div className="d-flex justify-content-between">
                                        <div className="">
                                            <h4>{orderDetails?.products[0].product?.name || '-'}</h4>
                                            <p style={{ fontSize: '14px' }}>{orderDetails?.products[0].product?.color || '-'}</p>
                                            <h5 className="fw-bolder">&#8377;{orderDetails?.products[0].product?.finalPrice || '-'}</h5>
                                        </div>
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/${orderDetails?.products[0].product?.pic[0]}`}
                                            alt={orderDetails?.products[0].product?.name}
                                            width={90} />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h5 className="text-capitalize">{orderDetails?.paymentStatus}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <div className="border p-3">
                                        <h4 className="mb-3 fw-semibold">Delivery details</h4>
                                        <div className="rounded-2 p-3" style={{ background: '#d3d3d354' }}>
                                            <div className="d-flex gap-2 border-bottom pb-2">
                                                <span className="fw-bolder">Home</span>
                                                <div className="d-inline-block text-truncate">{orderDetails?.user?.address}</div>
                                            </div>
                                            <div className="d-flex gap-2 pt-2">
                                                <span className="fw-bolder">{orderDetails?.user?.name}</span>
                                                <div>{orderDetails?.user?.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <div className="border p-3">
                                        <h4 className="mb-3 fw-semibold">Price details</h4>
                                        <div className="rounded-2 p-3" style={{ background: '#d3d3d354' }}>
                                            <ul className="border-bottom pb-3">
                                                <li className="d-flex justify-content-between">
                                                    <span>Listing Price</span>
                                                    <div className="text-decoration-line-through">&#8377;{orderDetails?.subTotal}</div>
                                                </li>
                                                {orderDetails?.subTotal > orderDetails?.products[0].product?.finalPrice && (
                                                    <li className="d-flex justify-content-between">
                                                        <span>Discount</span>
                                                        <div className="text-success">-&#8377;{Math.max(0, orderDetails?.subTotal - orderDetails?.products[0].product?.finalPrice) || '-'}</div>
                                                    </li>
                                                )}
                                                <li className="d-flex justify-content-between">
                                                    <span>Selling Price</span>
                                                    <div>&#8377;{orderDetails?.products[0].product?.finalPrice || '-'}</div>
                                                </li>
                                                <li className="d-flex justify-content-between">
                                                    <span>Shipping Charges</span>
                                                    <div style={{ color: '#e7ab3c' }}>+&#8377;{orderDetails?.shipping}</div>
                                                </li>
                                            </ul>
                                            <div className="d-flex justify-content-between py-3">
                                                <h5 className="fw-semibold">Total Amout</h5>
                                                <div>&#8377;{orderDetails?.total}</div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center border rounded-3 p-2">
                                                <div>Paid By</div>
                                                <div>Cash on Delivery</div> {/* orderDetails.paymentMode */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderDetailsPage
