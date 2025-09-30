import { Link, useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { IoArrowBack } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { createBrandsRequest } from "../../redux/slice/brand/brandSlice";

const AddBrand = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Validate that a file is selected
        if (!data.pic || data.pic.length === 0) return

        // Validate file type
        const file = data.pic[0];
        if (!file.type.startsWith('image/')) return

        dispatch(createBrandsRequest(data))
        navigate('/admin/brand')
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-3 mb-3 mb-lg-0">
                    <Sidebar />
                </div>
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                            Add Brand
                        </h4>
                        <Link to="/admin/brand" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                            <IoArrowBack className="me-2 text-light fs-5" /> Back
                        </Link>
                    </div>
                    <form
                        className="border rounded-2 p-3"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name <span className='text-danger'>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Brand name"
                                {...register("name", { required: "Name is required" })} />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-6">
                                <label htmlFor="pic" className="form-label">
                                    Picture <span className='text-danger'>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    accept="image/*"
                                    {...register("pic", { required: "Picture is required" })} />
                                {errors.pic && <span className="text-danger">{errors.pic.message}</span>}
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="active" className="form-label">
                                    Status <span className='text-danger'>*</span>
                                </label>
                                <select
                                    className="form-select"
                                    {...register("active", { required: "Status is required" })}>
                                    <option value="">Select status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                                {errors.active && <span className="text-danger">{errors.active.message}</span>}
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary fw-semibold">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBrand
