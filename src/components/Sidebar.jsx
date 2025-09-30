import { FaHome, FaListUl, FaUsers, FaCog, FaRegNewspaper } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { Link } from "react-router-dom";


const Sidebar = () => {
    return (
        <>
            <div className="bg-light border">
                <div className="list-group list-group-flush">
                    <Link to="/admin" className="list-group-item list-group-item-action bg-light fw-bold d-flex ">
                        <FaHome className="me-3 fs-4" />
                        Home
                    </Link>
                    <Link to="/admin/maincategory" className="list-group-item list-group-item-action bg-light fw-bold">
                        <FaListUl className="me-3 fs-4" />
                        Main Category
                    </Link>
                    <Link to="/admin/subcategory" className="list-group-item list-group-item-action bg-light fw-bold">
                        <FaListUl className="me-3 fs-4" />
                        Sub Category
                    </Link>
                    <Link to="/admin/brand" className="list-group-item list-group-item-action bg-light fw-bold">
                        <FaListUl className="me-3 fs-4" />
                        Brand
                    </Link>
                    <Link to="/admin/product" className="list-group-item list-group-item-action bg-light fw-bold">
                        <AiFillProduct className="me-3 fs-4" />
                        Product
                    </Link>
                    <Link to="/admin/news-letter" className="list-group-item list-group-item-action bg-light fw-bold">
                        <FaRegNewspaper className="me-3 fs-4" />
                        Newsletter
                    </Link>
                    <Link to="/settings" className="list-group-item list-group-item-action bg-light fw-bold">
                        <FaCog className="me-3 fs-4" />
                        Contact Us
                    </Link>
                    <Link to="/admin/user" className="list-group-item list-group-item-action bg-light fw-bold">
                        <FaUsers className="me-3 fs-4" />
                        User
                    </Link>
                    <Link to="/settings" className="list-group-item list-group-item-action bg-light fw-bold">
                        <FaCog className="me-3 fs-4" />
                        Checkout
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar
