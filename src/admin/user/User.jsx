
import { useDispatch, useSelector } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { deleteUserRequest, fetchUsersRequest } from '../../redux/slice/user/userSlice'
import { useEffect, useState } from 'react'
import Layout from '../Layout'
import useSearch from '../../hooks/useSearch'
import usePagination from '../../hooks/usePagination'
import ReactPaginate from 'react-paginate'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import DeleteConfirmation from '../../components/DeleteConfirmation'


const User = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // serach
    const { searchTerm, filterData, onChange } = useSearch(users)

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
    } = usePagination(filterData || [], 6)

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
            dispatch(deleteUserRequest(selectedId))
        }
        setShowDeleteConfirmation(false)
        setSelectedId(null)
    }

    useEffect(() => {
        dispatch(fetchUsersRequest())
    }, [dispatch])

    return (
        <>
            {showDeleteConfirmation && (
                <DeleteConfirmation
                    onClose={() => setShowDeleteConfirmation(false)}
                    onDelete={handleDelete} />
            )}

            <Layout>
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                            User
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
                                    placeholder="Search user name..."
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
                                    <th>Name</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems?.length > 0 ? (
                                        currentItems?.map((user, idx) => (
                                            <tr key={user._id || idx} className="text-center text-nowrap">
                                                <td>{startIndex + idx + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone || 'N/A'}</td>
                                                <td className='text-capitalize'>{user.role}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDeleteClick(user._id)}
                                                        className="btn btn-sm btn-danger">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No user found.</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <p>Showing {startIndex + 1} - {endIndex} of {totalItems} Users</p>
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
            </Layout>
        </>
    )
}

export default User
