import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMainCategorysRequest, updateMainCategorysRequest } from "../../redux/slice/maincategory/mainCategorySlice";


const UpdateMainCategory = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mainCategorys } = useSelector(state => state.mainCategory);

    const mainCategory = mainCategorys.find(cat => cat._id === _id);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // Pre-fill form when mainCategory is loaded
    useEffect(() => {
        if (mainCategory) {
            setValue("name", mainCategory.name);
            setValue("active", mainCategory.active ? "true" : "false");
            // Don't set pic here, as it's a file input
        }
    }, [mainCategory, setValue]);

    const onSubmit = (data) => {
        dispatch(updateMainCategorysRequest({ ...data, _id }));
        navigate('/admin/maincategory')
    };

    useEffect(() => {
        dispatch(fetchMainCategorysRequest())
    }, [dispatch])

    if (!mainCategory) {
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
                            Update Main Category
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
                                placeholder="Enter main category name"
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
                                {mainCategory.pic && (
                                    <div className="mt-2">
                                        <img
                                            src={`${import.meta.env.VITE_API_BASE_URL}/${mainCategory.pic}`}
                                            alt={mainCategory.name}
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

export default UpdateMainCategory;
