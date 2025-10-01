import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io"
import { fetchMainCategorysRequest } from "../redux/slice/maincategory/mainCategorySlice"
import { fetchSubCategorysRequest } from "../redux/slice/subcategory/subCategorySlice"
import { fetchBrandsRequest } from "../redux/slice/brand/brandSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import usePagination from "../hooks/usePagination"
import NoFoundProduct from "./NoFoundProduct"
import ProductLayout from "../pages/product/ProductLayout"
import { createCartRequest, fetchCartsRequest } from "../redux/slice/cart/cartSlice"
import { createWishlistRequest, fetchWishlistsRequest } from "../redux/slice/wishlist/wishlistSlice"


const Product = ({ products }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(location.search)
    const categoryId = searchParams.get("category")
    const subCategoryId = searchParams.get("subCategory")
    const brandId = searchParams.get("brand")

    const { mainCategorys } = useSelector(state => state.mainCategory)
    const { subCategorys } = useSelector(state => state.subCategory)
    const { brands } = useSelector(state => state.brand)
    const { carts } = useSelector(state => state.cart)
    const { wishlists } = useSelector(state => state.wishlist)

    // pagination
    const {
        currentPage,
        pageCount,
        currentItems,
        handlePageChange,
        startIndex,
        endIndex,
        totalItems,
    } = usePagination(products, 9)

    const categoryName = useMemo(() => {
        if (!categoryId || !mainCategorys) {
            return null
        }

        const foundCategory = mainCategorys.find(cat => cat._id === categoryId)
        return foundCategory ? foundCategory.name : null
    }, [categoryId, mainCategorys])

    const subCategoryName = useMemo(() => {
        if (!subCategoryId || !subCategorys) {
            return null
        }

        const foundSubCategory = subCategorys.find(cat => cat._id === subCategoryId)
        return foundSubCategory ? foundSubCategory.name : null
    }, [subCategoryId, subCategorys])

    const brandName = useMemo(() => {
        if (!brandId || !brands) {
            return null
        }

        const foundBrand = brands.find(cat => cat._id === brandId)
        return foundBrand ? foundBrand.name : null
    }, [brandId, brands])

    // addToWishlist
    const addToWishlist = (product) => {
        const loggedInUserId = localStorage.getItem('user_id')
        if (!loggedInUserId) {
            navigate("/login")
            return
        }
        const isSameProduct = (p) => (typeof p === 'string' ? p === _id : p?._id === product._id)
        const isSameUser = (u) => (typeof u === 'string' ? u === loggedInUserId : u?._id === loggedInUserId)

        const alreadyInWishlists = wishlists?.some(w => isSameUser(w.user) && isSameProduct(w.product))
        if (!alreadyInWishlists) {
            const wishlistItem = {
                user: loggedInUserId,
                product: product._id
            }
            dispatch(createWishlistRequest(wishlistItem))
        }
    }

    // addToCart
    const addToCart = (product) => {
        const loggedInUserId = localStorage.getItem('user_id')
        if (!loggedInUserId) {
            navigate("/login")
            return
        }
        const isSameProduct = (p) => (typeof p === 'string' ? p === _id : p?._id === product._id)
        const isSameUser = (u) => (typeof u === 'string' ? u === loggedInUserId : u?._id === loggedInUserId)

        const alreadyInCart = carts?.some(c => isSameUser(c.user) && isSameProduct(c.product))
        if (!alreadyInCart) {
            const cartItem = {
                user: loggedInUserId,
                product: product._id,
                qty: 1,
                total: 1 * product.finalPrice
            }
            dispatch(createCartRequest(cartItem))
        }
        navigate("/cart")
    }

    const handleCloseCategoryFilter = () => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete('category');
        navigate(`/product?${newSearchParams.toString()}`);
    };

    const handleCloseSubCategoryFilter = () => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete('subCategory');
        navigate(`/product?${newSearchParams.toString()}`);
    };

    const handleCloseBrandFilter = () => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete('brand');
        navigate(`/product?${newSearchParams.toString()}`);
    };

    useEffect(() => {
        dispatch(fetchMainCategorysRequest())
        dispatch(fetchSubCategorysRequest())
        dispatch(fetchBrandsRequest())
        dispatch(fetchCartsRequest())
        dispatch(fetchWishlistsRequest())
    }, [dispatch])

    return (
        <>
            <ProductLayout>
                <div className="col-lg-9">
                    <div className="product-show-option">
                        <div className="row">
                            <div className={`${(categoryName || subCategoryName || brandName) && 'col bg-light p-2'}`}>
                                {categoryName && (
                                    <div className="badge rounded-pill text-bg-dark border ps-3 me-2">
                                        {categoryName}
                                        <IoIosClose
                                            style={{ width: 24, height: 24, cursor: 'pointer' }}
                                            onClick={handleCloseCategoryFilter} />
                                    </div>
                                )}
                                {subCategoryName && (
                                    <div className="badge rounded-pill text-bg-dark border ps-3 me-2">
                                        {subCategoryName}
                                        <IoIosClose
                                            style={{ width: 24, height: 24, cursor: 'pointer' }}
                                            onClick={handleCloseSubCategoryFilter} />
                                    </div>
                                )}
                                {brandName && (
                                    <div className="badge rounded-pill text-bg-dark border ps-3 me-2">
                                        {brandName}
                                        <IoIosClose
                                            style={{ width: 24, height: 24, cursor: 'pointer' }}
                                            onClick={handleCloseBrandFilter} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="product-show-option">
                        <div className="row">
                            <div className="col-lg-7 col-md-7">
                                <div className="select-option">
                                    <select className="sorting form-control w-50">
                                        <option value="">Default Sorting</option>
                                    </select>
                                    <select className="p-show form-control w-25">
                                        <option value="">Show:</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-5 text-right">
                                <p>Show {startIndex + 1} - {endIndex} Of {totalItems} Product</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-list">
                        <div className="row">
                            {currentItems.length > 0 ? (
                                currentItems?.map(product => (
                                    <div key={product._id} className="col-lg-4 col-sm-6">
                                        <div className="product-item">
                                            <div className="pi-pic">
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL}/${product.pic[0]}`}
                                                    width={260}
                                                    height={360}
                                                    alt={product.name} />
                                                <div className="sale pp-sale">Sale</div>
                                                <div
                                                    className="icon"
                                                    onClick={() => addToWishlist(product)}>
                                                    <i className={`icon_heart_alt`}></i>
                                                </div>
                                                <ul>
                                                    <li className="w-icon active">
                                                        <button
                                                            className="mini-add-to-cart"
                                                            onClick={() => addToCart(product)}>
                                                            <i className="icon_bag_alt"></i>
                                                        </button>
                                                    </li>
                                                    <li className="quick-view">
                                                        <Link to={`/product/${product._id}`}>+ Quick View</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="pi-text">
                                                <div className="catagory-name">{product.subcategory?.name}</div>
                                                <Link to="/">
                                                    <h5>{product.name}</h5>
                                                </Link>
                                                <div className="product-price">
                                                    &#8377; {product.finalPrice}&nbsp;
                                                    <span>&#8377; {product.basePrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <NoFoundProduct
                                    tital={'Please try another products'}
                                    message={'This product is not available on this site.'} />
                            )}
                        </div>
                    </div>
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

                    {/* <div className="loading-more">
                        <i className="icon_loading"></i>
                        <a href="#">
                            Loading More
                        </a>
                    </div> */}
                </div>
            </ProductLayout>
        </>
    )
}

export default Product
