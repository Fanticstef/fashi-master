import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createBrandApi, deleteBrandApi, brandApi, updateBrandApi } from '../slice/brand/brandApi'
import { createBrandsFailure, createBrandsRequest, createBrandsSuccess, deleteBrandsFailure, deleteBrandsRequest, deleteBrandsSuccess, fetchBrandsFailure, fetchBrandsRequest, fetchBrandsSuccess, updateBrandFailure, updateBrandRequest, updateBrandSuccess } from '../slice/brand/brandSlice'
import toast from 'react-hot-toast';


function* fetchBrand() {
    try {
        const response = yield call(brandApi)
        yield put(fetchBrandsSuccess(response.data))
    } catch (error) {
        yield put(fetchBrandsFailure(error.message))
        toast.error(error.message)
    }
}

function* createBrandSaga(action) {
    try {
        const response = yield call(createBrandApi, action.payload)
        yield put(createBrandsSuccess())
        toast.success(response.message)
        yield put(fetchBrandsRequest())
    } catch (error) {
        console.log("Error creating brand:", error)
        yield put(createBrandsFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteBrandSaga(action) {
    try {
        const response = yield call(deleteBrandApi, action.payload)
        yield put(deleteBrandsSuccess())
        toast.success(response.message)
        yield put(fetchBrandsRequest())
    } catch (error) {
        yield put(deleteBrandsFailure(error.message))
        toast.error(error.message)
    }
}


function* updateBrandSaga(action) {
    try {
        const response = yield call(updateBrandApi, action.payload)
        yield put(updateBrandSuccess())
        toast.success(response.message)
        yield put(fetchBrandsRequest())
    } catch (error) {
        yield put(updateBrandFailure(error.message))
        toast.error(error.message)
    }
}


export function* BrandSagas() {
    yield all([
        takeLatest(fetchBrandsRequest.type, fetchBrand),
        takeLatest(createBrandsRequest.type, createBrandSaga),
        takeLatest(deleteBrandsRequest.type, deleteBrandSaga),
        takeLatest(updateBrandRequest.type, updateBrandSaga),
    ])
}