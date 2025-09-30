import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../../components/Sidebar"
import { fetchUsersRequest } from "../../redux/slice/user/userSlice"
import { useEffect } from "react"


const AdminHome = () => {
    const dispatch = useDispatch()

    const _id = localStorage.getItem("user_id")

    const { users } = useSelector(state => state.user)

    const user = users.find(x => x._id === _id)

    useEffect(() => {
        dispatch(fetchUsersRequest())
    }, [dispatch])

    return (
        <>
            <div className="container mx-auto">
                <div className="row my-4">
                    <div className="col-lg-3">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9">
                        <h4 className="text-center bg-primary fw-bold text-light py-2">Profile Information</h4>
                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th>User ID</th>
                                    <td>{user?._id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{user?.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user?.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{user?.phone}</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome
