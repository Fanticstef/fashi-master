import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createCartApi, deleteCartApi, cartApi, updateCartApi } from '../slice/cart/cartApi'
import {
    fetchCartsRequest,
    fetchCartsSuccess,
    fetchCartsFailure,
    createCartRequest,
    createCartSuccess,
    createCartFailure,
    deleteCartRequest,
    deleteCartSuccess,
    deleteCartFailure,
    updateCartRequest,
    updateCartSuccess,
    updateCartFailure
} from '../slice/cart/cartSlice'
import toast from 'react-hot-toast';


function* fetchCart() {
    try {
        const response = yield call(cartApi)
        yield put(fetchCartsSuccess(response.data))
    } catch (error) {
        yield put(fetchCartsFailure(error.message))
        toast.error(error.message)
    }
}

function* createCart(action) {
    try {
        const response = yield call(createCartApi, action.payload)
        yield put(createCartSuccess())
        if (response.message) {
            toast.success(response.message)
        } else {
            toast.error(response.reason)
        }
        yield put(fetchCartsRequest())
    } catch (error) {
        console.log("Error creating Cart:", error)
        yield put(createCartFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteCart(action) {
    try {
        const response = yield call(deleteCartApi, action.payload)
        yield put(deleteCartSuccess())
        toast.success(response.message)
        yield put(fetchCartsRequest())
    } catch (error) {
        yield put(deleteCartFailure(error.message))
        toast.error(error.message)
    }
}


function* updateCart(action) {
    try {
        yield call(updateCartApi, action.payload)
        yield put(updateCartSuccess())
        yield put(fetchCartsRequest())
    } catch (error) {
        yield put(updateCartFailure(error.message))
        toast.error(error.message)
    }
}


export function* CartSagas() {
    yield all([
        takeLatest(fetchCartsRequest.type, fetchCart),
        takeLatest(createCartRequest.type, createCart),
        takeLatest(deleteCartRequest.type, deleteCart),
        takeLatest(updateCartRequest.type, updateCart),
    ])
}