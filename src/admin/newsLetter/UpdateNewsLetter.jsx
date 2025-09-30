import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateNewsLetterRequest } from "../../redux/slice/newsLetter/newsLetterSlice";


const UpdateNewsLetter = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { newsLetters } = useSelector(state => state.newsLetter);

    const newsLetter = newsLetters.find(newsLetter => newsLetter._id === _id);

    const { register, handleSubmit, setValue } = useForm();

    // Pre-fill form when mainCategory is loaded
    useEffect(() => {
        if (newsLetter) {
            setValue("email", newsLetter.email);
            setValue("active", newsLetter.active ? "true" : "false");
        }
    }, [newsLetter, setValue]);

    const onSubmit = (data) => {
        dispatch(updateNewsLetterRequest({ ...data, _id }));
        navigate('/admin/news-letter')
    };

    if (!newsLetter) {
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
                            Update News Letter
                        </h4>
                        <Link to="/admin/news-letter" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                            Back <IoArrowBack className="ms-2 text-light fs-5" />
                        </Link>
                    </div>
                    <form
                        className="border rounded-2 p-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="row">
                            <div className="col-lg-6">
                                <label className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    disabled="true"
                                    {...register("email")}
                                />
                            </div>
                            <div className="col-lg-6">
                                <label className="form-label">
                                    Status
                                </label>
                                <select
                                    className="form-select"
                                    {...register("active")}
                                >
                                    <option value="">Select status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
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

export default UpdateNewsLetter;
