import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createProductApi, deleteProductApi, productApi, updateProductApi, removeSingleImageApi } from '../slice/product/productApi'
import { createProductFailure, createProductRequest, createProductSuccess, deleteProductFailure, deleteProductRequest, deleteProductSuccess, fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess, updateProductFailure, updateProductRequest, updateProductSuccess, removeImageRequest, removeImageSuccess, removeImageFailure } from '../slice/product/productSlice'
import toast from 'react-hot-toast';


function* fetchProduct(action) {
    try {
        const { categoryId, subCategoryId, brandId } = action.payload || {}
        const response = yield call(productApi, categoryId, subCategoryId, brandId)
        yield put(fetchProductsSuccess(response.data))
    } catch (error) {
        yield put(fetchProductsFailure(error.message))
        toast.error(error.message)
    }
}

function* createProduct(action) {
    try {
        const response = yield call(createProductApi, action.payload)
        yield put(createProductSuccess())
        toast.success(response.message)
        yield put(fetchProductsRequest())
    } catch (error) {
        console.log("Error creating product:", error)
        yield put(createProductFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteProduct(action) {
    try {
        const response = yield call(deleteProductApi, action.payload)
        yield put(deleteProductSuccess())
        toast.success(response.message)
        yield put(fetchProductsRequest())
    } catch (error) {
        yield put(deleteProductFailure(error.message))
        toast.error(error.message)
    }
}


function* updateProduct(action) {
    try {
        const response = yield call(updateProductApi, action.payload)
        yield put(updateProductSuccess())
        toast.success(response.message)
        yield put(fetchProductsRequest())
    } catch (error) {
        yield put(updateProductFailure(error.message))
        toast.error(error.message)
    }
}

function* removeSingleImage(action) {
    try {
        const { productId, imageIndex } = action.payload
        const response = yield call(removeSingleImageApi, productId, imageIndex)
        yield put(removeImageSuccess(response.data))
        toast.success(response.message)
    } catch (error) {
        yield put(removeImageFailure(error.message))
        toast.error(error.message)
    }
}


export function* ProductSagas() {
    yield all([
        takeLatest(fetchProductsRequest.type, fetchProduct),
        takeLatest(createProductRequest.type, createProduct),
        takeLatest(deleteProductRequest.type, deleteProduct),
        takeLatest(updateProductRequest.type, updateProduct),
        takeLatest(removeImageRequest.type, removeSingleImage),
    ])
}