import { Link, useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUserRequest } from '../redux/slice/user/userSlice';


const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { users } = useSelector(state => state.user)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError
    } = useForm();

    const password = watch("password"); // Used for confirming password match

    const onSubmit = (data) => {
        const usernameExists = users.find(x => x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase())
        const emailExists = users.find(x => x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase())

        if (usernameExists) {
            setError("username", {
                type: "manual",
                message: "User Name already exists"
            })
        }

        if (emailExists) {
            setError("email", {
                type: "manual",
                message: "Email already exists"
            })
        }

        if (!usernameExists && !emailExists) {
            dispatch(createUserRequest(data))
            navigate("/login")
        }
    };

    return (
        <>
            <Breadcrumb title={'Register'} />

            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="register-form">
                                <h2>Register</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="group-input">
                                        <label>Full Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            placeholder='Full Name'
                                            {...register("name", { required: "Full Name is required" })}
                                        />
                                        {errors.name && (
                                            <p className={errors.name ? 'text-danger' : ''}>{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="group-input">
                                                <label>Username <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Username'
                                                    {...register("username", { required: "Username is required" })}
                                                />
                                                {errors.username && (
                                                    <p className={errors.username ? 'text-danger' : ''}>{errors.username.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="group-input">
                                                <label>Phone</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Phone Number'
                                                    {...register("phone")}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group-input">
                                        <label>Email address <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            placeholder='Enter Email Address'
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Enter a valid email address",
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className={errors.email ? 'text-danger' : ''}>{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="group-input">
                                        <label>Password <span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            placeholder='********'
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                            })}
                                        />
                                        {errors.password && (
                                            <p className={errors.password ? 'text-danger' : ''}>{errors.password.message}</p>
                                        )}
                                    </div>

                                    <div className="group-input">
                                        <label>Confirm Password <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            placeholder='********'
                                            {...register("confirmPassword", {
                                                // required: "Please confirm your password",
                                                validate: (value) =>
                                                    value === password || "Passwords do not match",
                                            })}
                                        />
                                    </div>

                                    <button type="submit" className="site-btn register-btn">
                                        REGISTER
                                    </button>
                                </form>
                                <div className="switch-login">
                                    <Link to="/login" className="or-login">Or Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
