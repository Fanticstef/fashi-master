import { all, call, put, takeLatest } from "redux-saga/effects";
import { createSubCategoryApi, deleteSubCategoryApi, subCategoryApi, updateSubCategoryApi } from "../slice/subcategory/subCategoryApi";
import { createSubCategoryFailure, createSubCategoryRequest, createSubCategorySuccess, deleteSubCategoryFailure, deleteSubCategoryRequest, deleteSubCategorySuccess, fetchSubCategorysFailure, fetchSubCategorysRequest, fetchSubCategorysSuccess, updateSubCategoryFailure, updateSubCategoryRequest, updateSubCategorySuccess } from "../slice/subcategory/subCategorySlice";
import toast from "react-hot-toast";


function* fetchSubCategory() {
    try {
        const response = yield call(subCategoryApi)
        yield put(fetchSubCategorysSuccess(response.data))
    } catch (error) {
        yield put(fetchSubCategorysFailure(error.message))
        toast.error(error.message)
    }
}


function* createSubCategory(action) {
    try {
        const response = yield call(createSubCategoryApi, action.payload)
        yield put(createSubCategorySuccess())
        toast.success(response.message)
        yield put(fetchSubCategorysRequest())
    } catch (error) {
        console.log("Error creating sub category:", error)
        yield put(createSubCategoryFailure())
        toast.error(error.message)
    }
}


function* deleteSubCategory(action) {
    try {
        const response = yield call(deleteSubCategoryApi, action.payload)
        yield put(deleteSubCategorySuccess())
        toast.success(response.message)
        yield put(fetchSubCategorysRequest())
    } catch (error) {
        yield put(deleteSubCategoryFailure(error.message))
        toast.error(error.message)
    }
}


function* updateSubCategory(action) {
    try {
        const response = yield call(updateSubCategoryApi, action.payload)
        yield put(updateSubCategorySuccess())
        toast.success(response.message)
        yield put(fetchSubCategorysRequest())
    } catch (error) {
        yield put(updateSubCategoryFailure(error.message))
        toast.error(error.message)
    }
}


export function* subCategorySagas() {
    yield all([
        takeLatest(fetchSubCategorysRequest.type, fetchSubCategory),
        takeLatest(createSubCategoryRequest.type, createSubCategory),
        takeLatest(deleteSubCategoryRequest.type, deleteSubCategory),
        takeLatest(updateSubCategoryRequest.type, updateSubCategory),
    ])
}