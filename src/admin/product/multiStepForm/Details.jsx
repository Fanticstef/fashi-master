
import { useDispatch } from 'react-redux'
import { removeImageRequest } from '../../../redux/slice/product/productSlice'

const Details = ({ register, errors, isUpdate, lastImg, productId }) => {
    const dispatch = useDispatch()

    const handleRemoveImage = (imageIndex) => {
        if (window.confirm('Are you sure you want to remove this image?')) {
            dispatch(removeImageRequest({ productId, imageIndex }))
        }
    }

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="name" className="form-label">
                        Colour <span className='text-danger'>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        {...register('color', { required: 'Colour is required' })}
                        placeholder="Enter Colour" />
                    {errors.color && <span className="text-danger">{errors.color.message}</span>}
                </div>
                <div className="col-md-3">
                    <label htmlFor="name" className="form-label">
                        Size <span className='text-danger'>*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        {...register('size', { required: 'Size is required' })}
                        placeholder="Enter Size" />
                    {errors.size && <span className="text-danger">{errors.size.message}</span>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                        Picture {!isUpdate && <span className='text-danger'>*</span>}
                    </label>
                    <input
                        type="file"
                        multiple
                        {...register("pic", {
                            ...(isUpdate ? {} : { required: "Picture is required" })
                        })}
                        className="form-control" />
                    {errors.pic && <span className="text-danger">{errors.pic.message}</span>}
                </div>
            </div>
            <div className="row mb-3">
                <div className={isUpdate ? 'col-md-6' : 'col-md-10'}>
                    <label htmlFor="name" className="form-label">
                        Description
                    </label>
                    <textarea
                        rows={3}
                        className='form-control'
                        {...register("description")}
                        placeholder='Enter product description here...'></textarea>
                </div>
                <div className="col-md-6">
                    {!!isUpdate && (
                        <div className="d-flex gap-1 mt-n1 flex-wrap">
                            {lastImg?.map((img, i) => (
                                <div key={i} className="position-relative image-hover-wrapper">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/${img}`}
                                        alt={`product ${i + 1}`}
                                        width={60}
                                        height={60}
                                        className="img-thumbnail hover-img"
                                    />
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white image-close-btn"
                                        aria-label="Close"
                                        onClick={() => handleRemoveImage(i)}
                                    ></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Details
