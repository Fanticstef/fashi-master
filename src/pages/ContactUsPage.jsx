import { useForm } from "react-hook-form"
import Breadcrumb from "../components/Breadcrumb"
import { useDispatch } from "react-redux"
import { createContactRequest } from "../redux/slice/contact/contactSlice"


const ContactUsPage = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = (data) => {
        // Here you would typically dispatch an action to send the data to your backend
        dispatch(createContactRequest(data))
        reset()
    }

    return (
        <>
            <Breadcrumb />

            <section className="contact-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="contact-title">
                                <h4>Contacts Us</h4>
                                <p>Contrary to popular belief, Lorem Ipsum is simply random text. It has roots in a piece of
                                    classical Latin literature from 45 BC, maki years old.</p>
                            </div>
                            <div className="contact-widget">
                                <div className="cw-item">
                                    <div className="ci-icon">
                                        <i className="ti-location-pin"></i>
                                    </div>
                                    <div className="ci-text">
                                        <span>Address:</span>
                                        <p>60-49 Road 11378 New York</p>
                                    </div>
                                </div>
                                <div className="cw-item">
                                    <div className="ci-icon">
                                        <i className="ti-mobile"></i>
                                    </div>
                                    <div className="ci-text">
                                        <span>Phone:</span>
                                        <p>+65 11.188.888</p>
                                    </div>
                                </div>
                                <div className="cw-item">
                                    <div className="ci-icon">
                                        <i className="ti-email"></i>
                                    </div>
                                    <div className="ci-text">
                                        <span>Email:</span>
                                        <p>hellocolorlib@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="contact-form">
                                <div className="leave-comment">
                                    <h4>Leave A Comment</h4>
                                    <p>Our staff will call back later and answer your questions.</p>
                                    <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    className={`${errors.name ? 'mb-0 border-danger' : ''}`}
                                                    {...register('name', { required: 'Name is required' })} />
                                                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                            </div>
                                            <div className="col-lg-6">
                                                <input
                                                    type="email"
                                                    placeholder="Your email"
                                                    className={`${errors.email ? 'mb-0 border-danger' : ''}`}
                                                    {...register('email', {
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: "Enter a valid email address",
                                                        }
                                                    })} />
                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                            </div>
                                            <div className="col-lg-12">
                                                <textarea placeholder="Your message" className={`${errors.message ? 'mb-0 border-danger' : ''}`} {...register('message', { required: 'Message is required' })}></textarea>
                                                {errors.message && <p className="text-danger">{errors.message.message}</p>}
                                                <button type="submit" className="site-btn">Send message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactUsPage
