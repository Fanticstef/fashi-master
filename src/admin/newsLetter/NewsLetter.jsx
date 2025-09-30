import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteNewsLetterRequest, fetchNewsLettersRequest } from "../../redux/slice/newsLetter/newsLetterSlice";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";


const NewsLetter = () => {
    const dispatch = useDispatch()
    const { newsLetters } = useSelector(state => state.newsLetter)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // search
    const { searchTerm, filterData, onChange } = useSearch(newsLetters)

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
            dispatch(deleteNewsLetterRequest(selectedId))
        }
        setShowDeleteConfirmation(false)
        setSelectedId(null)
    }

    useEffect(() => {
        dispatch(fetchNewsLettersRequest())
    }, [dispatch])

    return (
        <div className="container my-4">

            {showDeleteConfirmation && (
                <DeleteConfirmation
                    onClose={() => setShowDeleteConfirmation(false)}
                    onDelete={handleDelete}
                />
            )}

            <div className="row">
                <div className="col-lg-3 mb-3 mb-lg-0">
                    <Sidebar />
                </div>
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                            News Letter
                        </h4>
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
                                <tr className="text-center">
                                    <th>S. No.</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems?.length > 0 ? (
                                        currentItems?.map((newsLetter, idx) => (
                                            <tr key={newsLetter._id || idx} className="text-center text-nowrap">
                                                <td>{startIndex + idx + 1}</td>
                                                <td>{newsLetter.email}</td>
                                                <td>
                                                    <span className={`badge ${newsLetter.active ? "bg-success" : "bg-secondary"}`}>
                                                        {newsLetter.active ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/admin/news-letter/update/${newsLetter._id || idx}`}
                                                        className="btn btn-sm btn-warning me-2">
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(newsLetter._id)}
                                                        className="btn btn-sm btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No news letter found.</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <p>Showing {startIndex + 1} - {endIndex} of {totalItems} NewsLetter</p>
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
    )
}

export default NewsLetter
