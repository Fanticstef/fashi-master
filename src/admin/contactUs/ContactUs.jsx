import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import ReactPaginate from 'react-paginate';
import useSearch from '../../hooks/useSearch';
import usePagination from '../../hooks/usePagination';
import { deleteContactRequest, fetchContactsRequest, updateContactRequest } from '../../redux/slice/contact/contactSlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const ContactUs = () => {
    const dispatch = useDispatch()
    const { contacts } = useSelector(state => state.contact)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editStatus, setEditStatus] = useState(false);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    // serach
    const { searchTerm, filterData, onChange } = useSearch(contacts)

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
            dispatch(deleteContactRequest(selectedId)) // Use deleteContactRequest
        }
        setShowDeleteConfirmation(false)
        setSelectedId(null)
    }

    useEffect(() => {
        dispatch(fetchContactsRequest()) // Use fetchContactsRequest
    }, [dispatch])

    const handleEditClick = (contact) => {
        setEditingId(contact._id);
        setEditStatus(contact.status);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleUpdate = () => {
        dispatch(updateContactRequest({ _id: editingId, status: editStatus }));
        setEditingId(null);
    };

    const handleViewClick = (index) => {
        // If the clicked row is already expanded, collapse it. Otherwise, expand it.
        setExpandedRowIndex(expandedRowIndex === index ? null : index);
    };

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
                            Contact Us
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
                                    placeholder="Search name & email here..."
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
                                    <th className='text-nowrap'>S. No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.length > 0 ? (
                                    currentItems.map((contact, index) => {
                                        const absoluteIndex = startIndex + index;
                                        const isExpanded = expandedRowIndex === absoluteIndex;
                                        return (
                                            <tr className="text-center" key={contact._id || index}>
                                                <td>{absoluteIndex + 1}</td>
                                                <td className='text-nowrap'>{contact.name}</td>
                                                <td className='text-nowrap'>{contact.email}</td>
                                                <td className='text-wrap text-start' style={{ minWidth: '300px' }}>
                                                    {isExpanded || contact.message.length <= 100
                                                        ? contact.message
                                                        : `${contact.message.substring(0, 100)}...`}
                                                    {contact.message.length > 100 && (
                                                        <button className="btn btn-sm btn-link me-2" onClick={() => handleViewClick(absoluteIndex)}>
                                                            {isExpanded ? 'Less' : 'More'}
                                                        </button>
                                                    )}
                                                </td>
                                                <td style={{ minWidth: '125px' }}>
                                                    {editingId === contact._id ? (
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={editStatus}
                                                            onChange={(e) => setEditStatus(e.target.value === 'true')}
                                                        >
                                                            <option value="false">Pending</option>
                                                            <option value="true">Resolved</option>
                                                        </select>
                                                    ) : (
                                                        <span className={`fw-bold ${contact.status ? 'text-success' : 'text-danger'}`}>
                                                            {contact.status ? 'Resolved' : 'Pending'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className='text-nowrap'>
                                                    {editingId === contact._id ? (
                                                        <>
                                                            <button onClick={handleUpdate} className="btn btn-sm btn-success me-2">Save</button>
                                                            <button onClick={handleCancelEdit} className="btn btn-sm btn-secondary">Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => handleEditClick(contact)} className="btn btn-sm btn-warning me-2">
                                                                Edit
                                                            </button>
                                                            <button onClick={() => handleDeleteClick(contact._id)} className="btn btn-sm btn-danger">Delete</button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No messages found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <p>Showing {totalItems > 0 ? startIndex + 1 : 0} - {endIndex} of {totalItems} Messages</p>
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

export default ContactUs
