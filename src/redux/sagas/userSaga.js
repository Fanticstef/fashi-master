import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createUserApi, deleteUserApi, userApi, updateUserApi } from '../slice/user/userApi'
import {
    createUserFailure,
    createUserRequest,
    createUserSuccess,
    deleteUserFailure,
    deleteUserRequest,
    deleteUserSuccess,
    fetchUsersFailure,
    fetchUsersRequest,
    fetchUsersSuccess,
    updateUserFailure,
    updateUserRequest,
    updateUserSuccess
} from '../slice/user/userSlice'
import toast from 'react-hot-toast';


function* fetchUser() {
    try {
        const response = yield call(userApi)
        yield put(fetchUsersSuccess(response.data))
    } catch (error) {
        yield put(fetchUsersFailure(error.message))
        toast.error(error.message)
    }
}

function* createUser(action) {
    try {
        const response = yield call(createUserApi, action.payload)
        yield put(createUserSuccess())
        toast.success(response.message)
        yield put(fetchUsersRequest())
    } catch (error) {
        console.log("Error creating User:", error)
        yield put(createUserFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteUser(action) {
    try {
        const response = yield call(deleteUserApi, action.payload)
        yield put(deleteUserSuccess())
        toast.success(response.message)
        yield put(fetchUsersRequest())
    } catch (error) {
        yield put(deleteUserFailure(error.message))
        toast.error(error.message)
    }
}


function* updateUser(action) {
    try {
        const response = yield call(updateUserApi, action.payload)
        yield put(updateUserSuccess())
        toast.success(response.message)
        yield put(fetchUsersRequest())
    } catch (error) {
        yield put(updateUserFailure(error.message))
        toast.error(error.message)
    }
}


export function* UserSagas() {
    yield all([
        takeLatest(fetchUsersRequest.type, fetchUser),
        takeLatest(createUserRequest.type, createUser),
        takeLatest(deleteUserRequest.type, deleteUser),
        takeLatest(updateUserRequest.type, updateUser),
    ])
}