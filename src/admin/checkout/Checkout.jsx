import { useDispatch, useSelector } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { deleteCheckoutRequest, fetchCheckoutsRequest, updateCheckoutRequest } from '../../redux/slice/checkout/checkoutSlice'
import { useEffect, useState } from 'react'
import Layout from '../Layout'
import useSearch from '../../hooks/useSearch'
import usePagination from '../../hooks/usePagination'
import ReactPaginate from 'react-paginate'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import DeleteConfirmation from '../../components/DeleteConfirmation'


const Checkout = () => {
    const dispatch = useDispatch()
    const { checkouts } = useSelector(state => state.checkout)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editPaymentStatus, setEditPaymentStatus] = useState('');
    const [editOrderStatus, setEditOrderStatus] = useState('');


    // Search functionality (searches by name)
    const { searchTerm, filterData, onChange } = useSearch(checkouts)

    // Pagination
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
            dispatch(deleteCheckoutRequest(selectedId))
        }
        setShowDeleteConfirmation(false)
        setSelectedId(null)
    }

    const handleEditClick = (checkout) => {
        setEditingId(checkout._id);
        setEditPaymentStatus(checkout.paymentStatus);
        setEditOrderStatus(checkout.orderStatus);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleUpdate = () => {
        dispatch(updateCheckoutRequest({
            _id: editingId,
            paymentStatus: editPaymentStatus,
            orderStatus: editOrderStatus
        }));
        setEditingId(null);
    };

    useEffect(() => {
        dispatch(fetchCheckoutsRequest())
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
                            Checkout
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
                                    placeholder="Search by customer name..."
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
                                <tr className="text-center text-nowrap">
                                    <th>S. No.</th>
                                    <th>Customer Name</th>
                                    <th>Total Amount</th>
                                    <th>Payment Status</th>
                                    <th>Order Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.length > 0 ? (
                                    currentItems.map((checkout, idx) => (
                                        <tr key={checkout._id || idx} className="text-center">
                                            <td>{startIndex + idx + 1}</td>
                                            <td className='text-nowrap'>{checkout?.user?.name || 'N/A'}</td>
                                            <td>${checkout.total.toFixed(2)}</td>
                                            <td className='text-capitalize' style={{ minWidth: '150px' }}>
                                                {editingId === checkout._id ? (
                                                    <select
                                                        className="form-select form-select-sm"
                                                        value={editPaymentStatus}
                                                        onChange={(e) => setEditPaymentStatus(e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="failed">Failed</option>
                                                    </select>
                                                ) : (
                                                    checkout.paymentStatus
                                                )}
                                            </td>
                                            <td className='text-capitalize' style={{ minWidth: '170px' }}>
                                                {editingId === checkout._id ? (
                                                    <select
                                                        className="form-select form-select-sm"
                                                        value={editOrderStatus}
                                                        onChange={(e) => setEditOrderStatus(e.target.value)}
                                                    >
                                                        <option value="order is placed">Order is Placed</option>
                                                        <option value="packed">Packed</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="out for delivery">Out for Delivery</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                ) : (
                                                    checkout.orderStatus
                                                )}
                                            </td>
                                            <td>{new Date(checkout.date).toLocaleDateString()}</td>
                                            <td className='text-nowrap'>
                                                {editingId === checkout._id ? (
                                                    <>
                                                        <button onClick={handleUpdate} className="btn btn-sm btn-success me-2">Save</button>
                                                        <button onClick={handleCancelEdit} className="btn btn-sm btn-secondary">Cancel</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleEditClick(checkout)} className="btn btn-sm btn-warning me-2">Edit</button>
                                                        <button onClick={() => handleDeleteClick(checkout._id)} className="btn btn-sm btn-danger">Delete</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No checkout data found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <p>Showing {totalItems > 0 ? startIndex + 1 : 0} - {endIndex > totalItems ? totalItems : endIndex} of {totalItems} Checkouts</p>
                        </div>
                        <div className="col-md-4">
                            {pageCount > 1 && (
                                <ReactPaginate
                                    breakLabel="..."
                                    previousLabel={<><IoIosArrowBack /><span className="ms-1 d-none d-md-inline">Previous</span></>}
                                    nextLabel={<><span className="me-1 d-none d-md-inline">Next</span><IoIosArrowForward /></>}
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

export default Checkout;
