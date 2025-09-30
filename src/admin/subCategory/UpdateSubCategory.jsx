import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { IoArrowBack } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchSubCategorysRequest, updateSubCategoryRequest } from "../../redux/slice/subcategory/subCategorySlice"
import Sidebar from "../../components/Sidebar"

const UpdateSubCategory = () => {
    const { _id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { subCategorys } = useSelector(state => state.subCategory)

    const subCategory = subCategorys.find(cat => cat._id === _id)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        if (subCategory) {
            setValue('name', subCategory.name)
            setValue('active', subCategory.active ? "true" : "false")
        }
    }, [subCategory, setValue])

    const onSubmit = (data) => {
        dispatch(updateSubCategoryRequest({ ...data, _id }))
        navigate('/admin/subcategory')
    }

    useEffect(() => {
        dispatch(fetchSubCategorysRequest())
    }, [dispatch])

    if (!subCategory) {
        return <div className="container my-4">Loading...</div>;
    }

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-lg-3 mb-3 mb-lg-0">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                                Update Sub Category
                            </h4>
                            <Link to="/admin/subcategory" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                                <IoArrowBack className="me-2 text-light fs-5" /> Back
                            </Link>
                        </div>
                        <form
                            className="border rounded-2 p-3"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data">
                            <div className="mb-3">
                                <label className='form-label'>
                                    Name <span className='text-danger'>*</span>
                                </label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Enter sub category name'
                                    {...register('name', { required: 'Name is required' })} />
                                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className='form-label'>
                                        Picture <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        accept="image/*"
                                        {...register("pic")}
                                    />
                                    {/* Show current image */}
                                    {subCategory.pic && (
                                        <div className="mt-2">
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}/${subCategory.pic}`}
                                                alt={subCategory.name}
                                                width={60}
                                                height={60}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className='form-label'>
                                        Status <span className='text-danger'>*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        {...register("active", { required: "Status is required" })}>
                                        <option value="">Select Status</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                    {errors.active && <span className="text-danger">{errors.active.message}</span>}
                                </div>
                            </div>
                            <div className="mt-4">
                                <button type='submit' className='btn btn-primary fw-semibold'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateSubCategory
