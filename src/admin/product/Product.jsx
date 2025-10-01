import { FaPlus } from "react-icons/fa"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom"
import Layout from "../Layout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteProductRequest, fetchProductsRequest } from "../../redux/slice/product/productSlice"
import DeleteConfirmation from "../../components/DeleteConfirmation"
import ReactPaginate from 'react-paginate';
import usePagination from "../../hooks/usePagination"
import useSearch from "../../hooks/useSearch";


const Product = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // serach
    const {
        searchTerm,
        filterData,
        onChange
    } = useSearch(products)

    // pagination 
    const {
        currentPage,
        pageCount,
        currentItems,
        handlePageChange,
        resetPage,
        startIndex,
        endIndex,
        totalItems,
    } = usePagination(filterData || [])

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
            dispatch(deleteProductRequest(selectedId))
        }
        setShowDeleteConfirmation(false)
        setSelectedId(null)
    }

    useEffect(() => {
        dispatch(fetchProductsRequest())
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
                            Product
                        </h4>
                        <Link to="/admin/product/create" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                            <FaPlus className="me-2 text-light fs-5" /> Add
                        </Link>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <div className="w-75">
                            <div className="input-group flex-nowrap">
                                <div className="input-group-text">
                                    <FiSearch />
                                </div>
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search product, maincategory, subcategory, brand and color name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange} />
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
                                    <th>Maincategory</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Price {/* final price */}</th>
                                    <th>Quantity</th>
                                    <th>Stock</th>
                                    <th>Pic</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems?.length > 0 ? (
                                        currentItems?.map((product, idx) => (
                                            <tr key={product._id || idx} className="text-center text-nowrap">
                                                <td>{startIndex + idx + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product.maincategory?.name}</td>
                                                <td>{product.subcategory?.name}</td>
                                                <td>{product.brand?.name}</td>
                                                <td>{product.color}</td>
                                                <td>{product.size}</td>
                                                <td>{product.finalPrice}</td>
                                                <td className={product.stockQuantity > 0 ? 'text-success' : 'text-danger'}>
                                                    {product.stockQuantity}
                                                </td>
                                                <td>
                                                    <span className={`badge ${product.stock ? "bg-success" : "bg-secondary"}`}>
                                                        {product.stock ? "Yes" : "No"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div style={{ minWidth: 180 }} className="d-flex gap-1">
                                                        {product.pic.slice(0, 3)?.map((item, i) => (
                                                            <Link
                                                                key={i}
                                                                to={`${import.meta.env.VITE_API_BASE_URL}/${item}`} target="_blank">
                                                                <img
                                                                    src={`${import.meta.env.VITE_API_BASE_URL}/${item}`}
                                                                    alt={product.name + (i + 1)}
                                                                    width={60}
                                                                    height={60} />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge ${product.active ? "bg-success" : "bg-secondary"}`}>
                                                        {product.active ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/admin/product/update/${product._id || idx}`}
                                                        className="btn btn-sm btn-warning me-2">
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(product._id)}
                                                        className="btn btn-sm btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="13" className="text-center">No main categories found.</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <p>Show {startIndex + 1} - {endIndex} of {totalItems} Product</p>
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
                                    forcePage={currentPage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Product
