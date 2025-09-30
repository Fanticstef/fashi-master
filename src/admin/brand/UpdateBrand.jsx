import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateBrandRequest } from "../../redux/slice/brand/brandSlice";


const UpdateBrand = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { brands } = useSelector(state => state.brand);

    const brand = brands.find(brand => brand._id === _id);

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm();

    // Pre-fill form when mainCategory is loaded
    useEffect(() => {
        if (brand) {
            setValue("name", brand.name);
            setValue("active", brand.active ? "true" : "false");
            // Don't set pic here, as it's a file input
        }
    }, [brand, setValue]);

    const onSubmit = (data) => {
        dispatch(updateBrandRequest({ ...data, _id }));
        navigate('/admin/brand')
    };

    if (!brand) {
        return <div className="container my-4">Loading...</div>;
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
                            Update Brand
                        </h4>
                        <Link to="/admin/maincategory" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                            Back <IoArrowBack className="ms-2 text-light fs-5" />
                        </Link>
                    </div>
                    <form
                        className="border rounded-2 p-3"
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name <span className='text-danger'>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Brand name"
                                {...register("name", { required: "Name is required" })}
                            />
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
                                    {...register("pic")}
                                />
                                {/* Show current image */}
                                {brand.pic && (
                                    <div className="mt-2">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/${brand.pic}`}
                                            alt={brand.name}
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="active" className="form-label">
                                    Status <span className='text-danger'>*</span>
                                </label>
                                <select
                                    className="form-select"
                                    {...register("active", { required: "Status is required" })}
                                >
                                    <option value="">Select status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                                {errors.active && <span className="text-danger">{errors.active.message}</span>}
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary fw-semibold">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBrand;
