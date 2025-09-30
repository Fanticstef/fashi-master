import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb"
import Product from "../components/Product"
import { fetchProductsRequest } from "../redux/slice/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const ProductPage = () => {
    const query = useQuery()
    const dispatch = useDispatch()

    const categoryId = query.get("category")
    const subCategoryId = query.get("subCategory")
    const brandId = query.get("brand")

    const { products } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(fetchProductsRequest({ categoryId, subCategoryId, brandId }))
    }, [dispatch, categoryId, subCategoryId, brandId])

    return (
        <>
            <Breadcrumb />
            <Product products={products} />
        </>
    )
}

export default ProductPage
