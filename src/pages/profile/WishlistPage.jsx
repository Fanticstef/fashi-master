import { Link } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb"
import ProfileLayout from "./ProfileLayout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { deleteWishlistRequest, fetchWishlistsRequest } from "../../redux/slice/wishlist/wishlistSlice"
import { MdProductionQuantityLimits } from "react-icons/md"
import { RiDeleteBinFill } from "react-icons/ri";


const WishlistPage = () => {
    const dispatch = useDispatch()

    const { wishlists } = useSelector(state => state.wishlist)

    const currentUserId = localStorage.getItem('user_id')

    const wishlistItems = useMemo(() => {
        if (!currentUserId || !Array.isArray(wishlists)) return []
        return wishlists.filter(wish => wish.user?._id === currentUserId)
    }, [wishlists, currentUserId])

    const removeWishlistItem = (id) => {
        if (id) {
            dispatch(deleteWishlistRequest(id))
        }
    }

    useEffect(() => {
        dispatch(fetchWishlistsRequest())
    }, [dispatch])

    return (
        <>
            <Breadcrumb />
            <ProfileLayout>
                <div className="col-lg-9">
                    <div className="cart-table">
                        <table>
                            <thead>
                                {wishlistItems.length > 0 && (
                                    <tr>
                                        <th>Image</th>
                                        <th className="p-name">Product Name</th>
                                        <th>Price</th>
                                        <th>View</th>
                                        <th>Remove</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {wishlistItems.length > 0 ? (
                                    wishlistItems.map(wish => (
                                        <tr key={wish._id}>
                                            <td className="cart-pic first-row">
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/${wish?.product?.pic[0]}`}
                                                    alt={wish?.product?.name}
                                                    width={90} />
                                            </td>
                                            <td className="cart-title first-row" style={{ width: '10%' }}>
                                                <h5>{wish?.product?.name}</h5>
                                            </td>
                                            <td className="p-price first-row">&#8377; {wish?.product?.finalPrice}</td>
                                            <td className="total-price first-row">
                                                <Link
                                                    to={`/product/${wish?.product?._id}`}
                                                    className="primary-btn checkout-btn">
                                                    More
                                                </Link>
                                            </td>
                                            <td
                                                className="close-td first-row"
                                                onClick={() => removeWishlistItem(wish._id)}>
                                                <RiDeleteBinFill className="fs-3 delete-wishlist" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <div className="d-flex flex-column align-items-center justify-content-center p-3">
                                        <div className="mb-3">
                                            <MdProductionQuantityLimits style={{ width: '5rem', height: '5rem', color: 'grey' }} />
                                        </div >
                                        <p>Your wishlist is empty</p>
                                        <div className="select-button">
                                            <Link
                                                to="/product"
                                                className="primary-btn checkout-btn">
                                                SHOP NOW
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ProfileLayout>
        </>
    )
}

export default WishlistPage
