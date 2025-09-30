import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteSubCategoryRequest, fetchSubCategorysRequest } from "../../redux/slice/subcategory/subCategorySlice";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import usePagination from "../../hooks/usePagination";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import useSearch from "../../hooks/useSearch";


const SubCategory = () => {
    const dispatch = useDispatch()
    const { subCategorys } = useSelector(state => state.subCategory)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // search
    const { searchTerm, filterData, onChange } = useSearch(subCategorys)

    // pagination
    const {
        currentPage,
        pageCount,
        currentItems,
        handlePageChange,
        resetPage,
        startIndex,
        endIndex,
        totalItems
    } = usePagination(filterData || [], 5)

    const handleSearchChange = (e) => {
        resetPage()
        onChange(e)
    }

    const handleDeleteClick = (id) => {
        setSelectedId(id)
        setShowDeleteConfirmation(true)
    }

    const handleDelete = () => {
        if (selectedId) {
            dispatch(deleteSubCategoryRequest(selectedId))
        }
        setShowDeleteConfirmation(false)
        setSelectedId(null)
    }

    useEffect(() => {
        dispatch(fetchSubCategorysRequest())
    }, [dispatch])

    return (
        <>
            {showDeleteConfirmation && (
                <DeleteConfirmation
                    onClose={() => setShowDeleteConfirmation(false)}
                    onDelete={handleDelete} />
            )}
            <div className="container my-4">
                <div className="row">
                    <div className="col-lg-3 mb-3 mb-lg-0">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                                Sub Category
                            </h4>
                            <Link to="/admin/subcategory/create" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                                <FaPlus className="me-2 text-light fs-5" /> Add
                            </Link>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div className="w-50">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-text">
                                        <FiSearch />
                                    </div>
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search brand name..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                            <div style={{ width: '90px' }}>
                                <button className="btn btn-outline-primary fw-semibold w-100">Filter</button>
                            </div>
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
                                        currentItems?.length > 0 ? (
                                            currentItems?.map((subCategory, idx) => (
                                                <tr key={subCategory._id || idx}>
                                                    <td>{startIndex + idx + 1}</td>
                                                    <td>{subCategory.name}</td>
                                                    <td>
                                                        <Link to={`${import.meta.env.VITE_API_URL}/${subCategory.pic}`} target="_blank">
                                                            <img
                                                                src={`${import.meta.env.VITE_API_URL}/${subCategory.pic}`}
                                                                alt={subCategory.name}
                                                                width={60}
                                                                height={60} />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${subCategory.active ? "bg-success" : "bg-secondary"}`}>
                                                            {subCategory.active ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/admin/subcategory/update/${subCategory._id || idx}`}
                                                            className="btn btn-sm btn-warning me-2">
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(subCategory._id)}
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
                        <div className="row mt-4">
                            <div className="col-md-8">
                                <p>Showing {startIndex + 1} - {endIndex} of {totalItems} sub categories</p>
                            </div>
                            <div className="col-md-4">
                                {pageCount > 1 && (
                                    <ReactPaginate
                                        breakLabel="..."
                                        previousLabel={
                                            <>
                                                <IoIosArrowBack />
                                                <span className="ms-1 d-none d-md-inline">Previous</span>
                                            </>
                                        }
                                        nextLabel={
                                            <>
                                                <span className="me-1 d-none d-md-inline">Next</span>
                                                <IoIosArrowForward />
                                            </>
                                        }
                                        onPageChange={handlePageChange}
                                        pageRangeDisplayed={5}
                                        marginPagesDisplayed={2}
                                        pageCount={pageCount}
                                        renderOnZeroPageCount={null}
                                        containerClassName="pagination custom-pagination"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        activeClassName="active"
                                        forcePage={currentPage} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategory;