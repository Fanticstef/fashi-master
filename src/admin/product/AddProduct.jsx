import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Layout'
import ProductInfo from './multiStepForm/ProductInfo'
import Details from './multiStepForm/Details'
import Pricing from './multiStepForm/Pricing'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoArrowBack } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { createProductRequest } from '../../redux/slice/product/productSlice'


const AddProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentStep, setCurrentStep] = useState(1);

    const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm();

    const steps = [
        { number: 1, title: 'Product Info' },
        { number: 2, title: 'Details' },
        { number: 3, title: 'Pricing' },
    ];

    const handleNext = async () => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger(['name', 'maincategory', 'subcategory', 'brand'])
        } else if (currentStep === 2) {
            isValid = await trigger(['color', 'size', 'pic'])
        } else if (currentStep === 3) {
            isValid = await trigger(['basePrice', 'discount', 'stockQuantity', 'stock', 'status'])
        }

        if (isValid) {
            setCurrentStep(prevStep => prevStep + 1)
        }
    }

    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1)
    }

    const formSubmit = (data) => {
        const images = Array.from(data.pic)

        // Remove the pic field from data to avoid serialization issues
        const { pic, ...formData } = data

        dispatch(createProductRequest({ ...formData, images }))
        navigate('/admin/product')
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <ProductInfo
                    register={register}
                    errors={errors} />
            case 2:
                return <Details
                    register={register}
                    errors={errors}
                    isUpdate={false} />
            case 3:
                return <Pricing
                    register={register}
                    errors={errors} />
            default:
                return null;
        }
    }
    return (
        <>
            <Layout>
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="bg-primary fw-bold text-light p-2 m-0 flex-grow-1 text-center rounded">
                            Add Product
                        </h4>
                        <Link to="/admin/product" className="btn btn-primary d-flex align-items-center ms-1 p-2 fw-bold">
                            <IoArrowBack className="me-2 text-light fs-5" /> Back
                        </Link>
                    </div>

                    <div className="border rounded-2 p-3">
                        {/* Step indicator with circles and horizontal lines */}
                        <div className="d-flex align-items-center mb-4">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.number}>
                                    <div className="d-flex flex-column align-items-center flex-fill">
                                        <div
                                            className={`rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 ${currentStep >= step.number ? 'bg-primary text-white' : 'bg-light text-secondary'
                                                }`}
                                            style={{ width: '48px', height: '48px' }}
                                        >
                                            {currentStep > step.number ? '✓' : step.number}
                                        </div>
                                        <div
                                            className={`mt-2 text-center small ${currentStep >= step.number ? 'text-primary fw-semibold' : 'text-secondary'
                                                }`}
                                        >
                                            <span>{step.title}</span>
                                        </div>
                                    </div>

                                    {/* Horizontal line between steps not work */}
                                    {index < steps.length - 1 && (
                                        <div className={`flex-fill h-1 mx-1 ${currentStep >= step.number + 1 ? 'bg-primary' : 'bg-light'}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>


                        <form
                            className="mt-4"
                            onSubmit={handleSubmit(formSubmit)}>
                            {renderStep()}

                            <div className="mt-4 d-flex justify-content-between">
                                {currentStep > 1 && (
                                    <button
                                        type='button'
                                        onClick={handleBack}
                                        className='btn btn-secondary'>Back</button>
                                )}

                                {currentStep === 1 && <div className="w-16"></div>}

                                {currentStep <= 3 ? (
                                    <button
                                        type='button'
                                        onClick={handleNext}
                                        className='btn btn-primary'>Next</button>
                                ) : (
                                    <button
                                        type='submit'
                                        className='btn btn-success'>Submit</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AddProduct
