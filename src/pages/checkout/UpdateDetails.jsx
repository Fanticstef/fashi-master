import { useDispatch, useSelector } from "react-redux"
import Breadcrumb from "../../components/Breadcrumb"
import { fetchUsersRequest, updateUserRequest } from "../../redux/slice/user/userSlice"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaPlus } from "react-icons/fa6"
import Profile from "../../components/Profile"
import { useForm } from "react-hook-form"
import { IoArrowBack } from "react-icons/io5"


const UpdateDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const _id = localStorage.getItem("user_id")

    const { users } = useSelector(state => state.user)

    const user = users.find(x => x._id === _id)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        if (user) {
            setValue('name', user.name)
            setValue('username', user.username)
            setValue('email', user.email)
            setValue('role', user.role)
            setValue('phone', user.phone)
            setValue('state', user.state)
            setValue('city', user.city)
            setValue('pin', user.pin)
            setValue('pic', user.pic)
            setValue('address', user.address)
        }
    }, [user, setValue])

    const onSubmit = (data) => {
        dispatch(updateUserRequest({ ...data, _id }))
        navigate('/checkout')
    }

    useEffect(() => {
        dispatch(fetchUsersRequest())
    }, [dispatch])

    if (!user) {
        return <div className="container my-4">Loading...</div>;
    }

    return (
        <>
            <Breadcrumb data={users} />
            <section className="checkout-section spad">
                <div className="container">
                    <div className="checkout-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold p-2 m-0 flex-grow-1 text-center rounded border">
                                        LOGIN
                                    </h4>
                                    {Object.keys(user).length > 12 ? (
                                        <Link to={`/user-details/${_id}`} className="btn border text-primary d-flex align-items-center ms-1 p-2 fw-bold">
                                            CHANGE
                                        </Link>
                                    ) : (
                                        <Link to={'/checkout'} className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                                            <IoArrowBack className="me-2 text-light fs-5" /> Back
                                        </Link>
                                    )}
                                </div>
                                <Profile
                                    register={register}
                                    errors={errors}
                                    handleSubmit={handleSubmit(onSubmit)} />
                            </div>
                            <div className="col-lg-6">
                                <div className="checkout-content">
                                    <input type="text" placeholder="Enter Your Coupon Code" />
                                </div>
                                <div className="place-order">
                                    <h4>Your Order</h4>
                                    <div className="order-total">
                                        <ul className="order-table">
                                            <li>Product <span>Total</span></li>
                                            <li className="fw-normal">Combination x 1 <span>$60.00</span></li>
                                            <li className="fw-normal">Combination x 1 <span>$60.00</span></li>
                                            <li className="fw-normal">Combination x 1 <span>$120.00</span></li>
                                            <li className="fw-normal">Subtotal <span>$240.00</span></li>
                                            <li className="total-price">Total <span>$240.00</span></li>
                                        </ul>
                                        <div className="payment-check">
                                            <div className="pc-item">
                                                <label htmlFor="pc-check">
                                                    Cheque Payment
                                                    <input type="checkbox" id="pc-check" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="pc-item">
                                                <label htmlFor="pc-paypal">
                                                    Paypal
                                                    <input type="checkbox" id="pc-paypal" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="order-btn">
                                            <button type="submit" className="site-btn place-btn">Place Order</button>
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

export default UpdateDetails
