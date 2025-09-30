
const Profile = ({ register, handleSubmit, errors }) => {

    return (
        <>
            <form
                className="border rounded-2 p-3"
                onSubmit={handleSubmit}
                encType="multipart/form-data">
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className='form-label'>
                            Name <span className='text-danger'>*</span>
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter name'
                            {...register('name', { required: 'Name is required' })} />
                        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                    </div>
                    <div className="col-lg-6">
                        <label className='form-label'>
                            User Name <span className='text-danger'>*</span>
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter user name'
                            disabled
                            {...register('username', { required: 'User Name is required' })} />
                        {errors.username && <p className='text-danger'>{errors.username.message}</p>}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className='form-label'>
                            Email Address <span className='text-danger'>*</span>
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter email address'
                            disabled
                            {...register('email', { required: 'Email address is required' })} />
                        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                    </div>
                    <div className="col-lg-6">
                        <label className='form-label'>
                            Phone
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter phone number'
                            {...register('phone')} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className='form-label'>
                            Role
                        </label>
                        <input
                            type="text"
                            className='form-control text-capitalize'
                            placeholder='Role'
                            disabled
                            {...register('role')} />
                    </div>
                    <div className="col-lg-6">
                        <label className='form-label'>
                            State
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter state'
                            {...register('state')} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className='form-label'>
                            City
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter city'
                            {...register('city')} />
                    </div>
                    <div className="col-lg-6">
                        <label className='form-label'>
                            Pin
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter pin number'
                            {...register('pin')} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className='form-label'>
                        Address
                    </label>
                    <textarea
                        rows={3}
                        className="form-control"
                        {...register('address')}></textarea>
                </div>
                <div className="mt-4">
                    <button type='submit' className='btn btn-primary fw-semibold'>Update</button>
                </div>
            </form>
        </>
    )
}

export default Profile
