
const Pricing = ({ register, errors }) => {
    return (
        <>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label className="form-label">
                        Base Price <span className='text-danger'>*</span>
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                            type="number"
                            className="form-control"
                            {...register('basePrice', { required: 'Base Price is required' })}
                            placeholder="0.00" />
                    </div>
                    {errors.basePrice && <span className="text-danger">{errors.basePrice.message}</span>}
                </div>
                <div className="col-md-4">
                    <label className="form-label">
                        Discount Amount <span className='text-danger'>*</span>
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">%</span>
                        <input
                            type="number"
                            className="form-control"
                            {...register('discount', { required: 'Discount is required' })}
                            placeholder="Percentag" />
                    </div>
                    {errors.discount && <span className="text-danger">{errors.discount.message}</span>}
                </div>
                <div className="col-md-4">
                    <label className="form-label">
                        Stock Quantity <span className='text-danger'>*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        {...register('stockQuantity', { required: 'Stock Quantity is required' })}
                        placeholder="Quantity" />
                    {errors.stockQuantity && <span className="text-danger">{errors.stockQuantity.message}</span>}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label className="form-label">
                        Stock <span className='text-danger'>*</span>
                    </label>
                    <select
                        className="form-select"
                        {...register('stock', { required: 'Stock is required' })}>
                        <option value="" hidden>Select Stock</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    {errors.stock && <span className="text-danger">{errors.stock.message}</span>}
                </div>
                <div className="col-md-4">
                    <label className="form-label">
                        Status <span className='text-danger'>*</span>
                    </label>
                    <select
                        className="form-select"
                        {...register('active', { required: 'Status is required' })}>
                        <option value="" hidden>Select Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>
            </div>
        </>
    )
}

export default Pricing
