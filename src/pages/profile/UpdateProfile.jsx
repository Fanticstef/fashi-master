import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { fetchUsersRequest, updateUserRequest } from "../../redux/slice/user/userSlice";
import Profile from "../../components/Profile";
import { IoArrowBack } from "react-icons/io5"
import ProfileLayout from "./ProfileLayout"
import Breadcrumb from "../../components/Breadcrumb"



const UpdateProfile = () => {
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
        navigate('/profile')
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
            <ProfileLayout>
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                            Update Profile
                        </h4>
                        <Link to={`/profile`} className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                            <IoArrowBack className="me-2 text-light fs-5" /> Back
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="border rounded-2 p-2">
                                <div className="mb-2">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/${user.pic}`}
                                        className="img-fluid img-thumbnail"
                                        alt="profile" />
                                </div>
                                <input
                                    type="file"
                                    className="form-control form-control-sm"
                                    {...register("pic")} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <Profile
                                register={register}
                                errors={errors}
                                handleSubmit={handleSubmit(onSubmit)} />
                        </div>
                    </div>
                </div>
            </ProfileLayout>
        </>
    )
}

export default UpdateProfile
