import { Link } from "react-router-dom"
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUsersRequest } from "../../redux/slice/user/userSlice";
import ProfileLayout from "./ProfileLayout";
import Breadcrumb from "../../components/Breadcrumb";


const ProfilePage = () => {
    const dispatch = useDispatch()

    const _id = localStorage.getItem("user_id")

    const { users } = useSelector(state => state.user)

    const user = users.find(x => x._id === _id)

    useEffect(() => {
        dispatch(fetchUsersRequest())
    }, [dispatch])

    const excludedKeys = ["_id", "__v", "pic", "password"]

    if (!user) {
        return <div className="container my-4">Loading...</div>;
    }

    return (
        <>
            <Breadcrumb />
            <ProfileLayout>
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                            Profile
                        </h4>
                        <Link to={`/profile/${_id}`} className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                            <MdEditSquare className="me-2 text-light fs-5" /> Edit
                        </Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <tbody>
                                {Object.entries(user)
                                    .filter(([key]) => !excludedKeys.includes(key))
                                    .map(([lebal, value], index) => (
                                        <tr key={index}>
                                            <th className="w-25 text-capitalize">{lebal}</th>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ProfileLayout>
        </>
    )
}

export default ProfilePage
