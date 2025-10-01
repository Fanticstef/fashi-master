import { Link } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteMainCategorysRequest, fetchMainCategorysRequest } from "../../redux/slice/maincategory/mainCategorySlice";
import DeleteConfirmation from "../../components/DeleteConfirmation";


const MainCategory = () => {
    const dispatch = useDispatch()
    const { mainCategorys } = useSelector(state => state.mainCategory)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedId(id)
        setShowDeleteConfirmation(true)
    }

    const handleDelete = () => {
        if (selectedId) {
            dispatch(deleteMainCategorysRequest(selectedId))
        }
        setShowDeleteConfirmation(false)
        setSelectedId(null)
    }

    useEffect(() => {
        dispatch(fetchMainCategorysRequest())
    }, [dispatch])

    return (
        <>
            {showDeleteConfirmation && (
                <DeleteConfirmation
                    onClose={() => setShowDeleteConfirmation(false)}
                    onDelete={handleDelete}
                />
            )}
            <div className="container my-4">
                <div className="row">
                    <div className="col-lg-3 mb-3 mb-lg-0">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                                Main Category
                            </h4>
                            <Link to="/admin/maincategory/create" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                                <FaPlus className="me-2 text-light fs-5" /> Add
                            </Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead className="table-primary">
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        mainCategorys?.length > 0 ? (
                                            mainCategorys?.map((mainCategory, idx) => (
                                                <tr key={mainCategory._id || idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{mainCategory.name}</td>
                                                    <td>
                                                        <Link to={`${import.meta.env.VITE_API_BASE_URL}/${mainCategory.pic}`} target="_blank">
                                                            <img
                                                                src={`${import.meta.env.VITE_API_BASE_URL}/${mainCategory.pic}`}
                                                                alt={mainCategory.name}
                                                                width={60}
                                                                height={60} />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${mainCategory.active ? "bg-success" : "bg-secondary"}`}>
                                                            {mainCategory.active ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/admin/maincategory/update/${mainCategory._id || idx}`}
                                                            className="btn btn-sm btn-warning me-2">
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(mainCategory._id)}
                                                            className="btn btn-sm btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No main categories found.</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainCategory
