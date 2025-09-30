import { Link, useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { useForm } from 'react-hook-form';
import axiosInstance from '../config/api/axiosInstance';
import toast from 'react-hot-toast';


const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('username', data.usernameOrEmail)
        formData.append('password', data.password)

        let response = await axiosInstance.post("/api/user/login", formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data.reason) {
            toast.error(response.data.reason)
        }

        if (response.data.result === 'Done') {
            // set localstorge
            let { data } = response.data
            localStorage.setItem("login", true)
            localStorage.setItem("user_id", data._id)
            localStorage.setItem("username", data.username)
            localStorage.setItem("role", data.role)
            navigate("/")
        }
    }

    return (
        <>
            <Breadcrumb title={'Login'} />

            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="login-form">
                                <h2>Login</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="group-input">
                                        <label>Username or email address <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            placeholder='Enter Username'
                                            {...register("usernameOrEmail", { required: "Username or email address is required" })}
                                        />
                                        {errors.usernameOrEmail && (
                                            <p className={errors.usernameOrEmail ? 'text-danger' : ''}>{errors.usernameOrEmail.message}</p>
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
                                    <div className="group-input gi-check">
                                        <div className="gi-more">
                                            <label>
                                                Save Password
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <a href="#" className="forget-pass">Forget your Password</a>
                                        </div>
                                    </div>
                                    <button type="submit" className="site-btn login-btn">Login In</button>
                                </form>
                                <div className="switch-login">
                                    <Link to="/register" className="or-login">Or Create An Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
