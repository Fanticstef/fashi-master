import { FaUser, FaHeartCirclePlus } from "react-icons/fa6"
import { GiShoppingBag } from "react-icons/gi"
import { Link } from "react-router-dom"


const ProfileLayout = ({ children }) => {
    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-lg-3 mb-3 mb-lg-0">
                        <div className="bg-light border">
                            <Link to="/profile" className="list-group-item list-group-item-action bg-light fw-bold fs-6 d-flex ">
                                <FaUser className="me-3 fs-5" />
                                Profile
                            </Link>
                            <Link to="/order" className="list-group-item list-group-item-action bg-light fs-6 fw-bold">
                                <GiShoppingBag className="me-3 fs-5" />
                                My Order
                            </Link>
                            <Link to="/wishlist" className="list-group-item list-group-item-action bg-light fs-6 fw-bold">
                                <FaHeartCirclePlus className="me-3 fs-5" />
                                Wishlist
                            </Link>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ProfileLayout
