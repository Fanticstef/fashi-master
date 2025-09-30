import { FaBeer } from "react-icons/fa"

const NoFoundProduct = ({ tital, message }) => {
    return (
        <>
            <div className="text-center product-shop border">
                <FaBeer className="icon-big-size text-secondary" />
                <div className="my-5">
                    <h1 className="">No Product Found</h1>
                    <p>{message} <br /> {tital}</p>
                </div>
            </div>
        </>
    )
}

export default NoFoundProduct
