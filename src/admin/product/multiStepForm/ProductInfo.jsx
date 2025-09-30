import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMainCategorysRequest } from "../../../redux/slice/maincategory/mainCategorySlice"
import { fetchSubCategorysRequest } from "../../../redux/slice/subcategory/subCategorySlice"
import { fetchBrandsRequest } from "../../../redux/slice/brand/brandSlice"


const ProductInfo = ({ register, errors }) => {
    const dispatch = useDispatch()
    const { mainCategorys } = useSelector(state => state.mainCategory)
    const { subCategorys } = useSelector(state => state.subCategory)
    const { brands } = useSelector(state => state.brand)

    useEffect(() => {
        dispatch(fetchMainCategorysRequest())
        dispatch(fetchSubCategorysRequest())
        dispatch(fetchBrandsRequest())
    }, [dispatch])

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">
                        Name <span className='text-danger'>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Enter product name" />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Maincategory <span className='text-danger'>*</span>
                    </label>
                    <select
                        className="form-select"
                        {...register('maincategory', { required: 'Main category name is required' })}>
                        <option value="">Select Maincategory</option>
                        {mainCategorys && mainCategorys?.map(mainCategory => (
                            <option key={mainCategory._id} value={mainCategory._id}>{mainCategory.name}</option>
                        ))}
                    </select>
                    {errors.maincategory && <span className="text-danger">{errors.maincategory.message}</span>}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                        Subcategory <span className='text-danger'>*</span>
                    </label>
                    <select
                        className="form-select"
                        {...register('subcategory', { required: 'Sub category name is required' })}>
                        <option value="" hidden>Select Subcategory</option>
                        {subCategorys && subCategorys?.map(subCategory => (
                            <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                        ))}
                    </select>
                    {errors.subcategory && <span className="text-danger">{errors.subcategory.message}</span>}
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Brand <span className='text-danger'>*</span>
                    </label>
                    <select
                        className="form-select"
                        {...register('brand', { required: 'Brand name is required' })}>
                        <option value="">Select Brand</option>
                        {brands && brands?.map(brand => (
                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                        ))}
                    </select>
                    {errors.brand && <span className="text-danger">{errors.brand.message}</span>}
                </div>
            </div>
        </>
    )
}

export default ProductInfo
