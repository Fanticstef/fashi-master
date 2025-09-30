import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createMainCategoryApi, deleteMainCategoryApi, mainCategoryApi, updateMainCategoryApi } from '../slice/maincategory/mainCategoryApi'
import { createMainCategorysFailure, createMainCategorysRequest, createMainCategorysSuccess, deleteMainCategorysFailure, deleteMainCategorysRequest, deleteMainCategorysSuccess, fetchMainCategorysFailure, fetchMainCategorysRequest, fetchMainCategorysSuccess, updateMainCategorysFailure, updateMainCategorysRequest, updateMainCategorysSuccess } from '../slice/maincategory/mainCategorySlice'
import toast from 'react-hot-toast';


function* fetchMainCategory() {
    try {
        const response = yield call(mainCategoryApi)
        yield put(fetchMainCategorysSuccess(response.data))
    } catch (error) {
        yield put(fetchMainCategorysFailure(error.message))
        toast.error(error.message)
    }
}

function* createMainCategorySaga(action) {
    try {
        const response = yield call(createMainCategoryApi, action.payload)
        yield put(createMainCategorysSuccess())
        toast.success(response.message)
        yield put(fetchMainCategorysRequest())
    } catch (error) {
        console.log("Error creating main category:", error)
        yield put(createMainCategorysFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteMainCategorySaga(action) {
    try {
        const response = yield call(deleteMainCategoryApi, action.payload)
        yield put(deleteMainCategorysSuccess())
        toast.success(response.message)
        yield put(fetchMainCategorysRequest())
    } catch (error) {
        yield put(deleteMainCategorysFailure(error.message))
        toast.error(error.message)
    }
}


function* updateMainCategorySaga(action) {
    try {
        const response = yield call(updateMainCategoryApi, action.payload)
        yield put(updateMainCategorysSuccess())
        toast.success(response.message)
        yield put(fetchMainCategorysRequest())
    } catch (error) {
        yield put(updateMainCategorysFailure(error.message))
        toast.error(error.message)
    }
}


export function* mainCategorySagas() {
    yield all([
        takeLatest(fetchMainCategorysRequest.type, fetchMainCategory),
        takeLatest(createMainCategorysRequest.type, createMainCategorySaga),
        takeLatest(deleteMainCategorysRequest.type, deleteMainCategorySaga),
        takeLatest(updateMainCategorysRequest.type, updateMainCategorySaga),
    ])
}