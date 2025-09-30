import { Link } from "react-router-dom"


const Confirmation = () => {
    return (
        <>
            <div className="spad">
                <div className="container my-3 text-center">
                    <h2 className="text-success">Thank You</h2>
                    <h3 className="my-2">Your Order has Been Placed</h3>
                    <h4>Now You Can Track You  Order in Profile Page</h4>
                    <Link to="/product" className='primary-btn checkout-btn mt-3'>Shop More</Link>
                </div>
            </div>
        </>
    )
}

export default Confirmation
