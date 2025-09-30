import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createCheckoutApi, deleteCheckoutApi, checkoutApi, updateCheckoutApi } from '../slice/checkout/checkoutApi'
import {
    fetchCheckoutsRequest,
    fetchCheckoutsSuccess,
    fetchCheckoutsFailure,
    createCheckoutRequest,
    createCheckoutSuccess,
    createCheckoutFailure,
    deleteCheckoutRequest,
    deleteCheckoutSuccess,
    deleteCheckoutFailure,
    updateCheckoutRequest,
    updateCheckoutSuccess,
    updateCheckoutFailure
} from '../slice/checkout/checkoutSlice'
import toast from 'react-hot-toast';


function* fetchCheckout() {
    try {
        const response = yield call(checkoutApi)
        yield put(fetchCheckoutsSuccess(response.data))
    } catch (error) {
        yield put(fetchCheckoutsFailure(error.message))
        toast.error(error.message)
    }
}

function* createCheckout(action) {
    try {
        const response = yield call(createCheckoutApi, action.payload)
        yield put(createCheckoutSuccess())
        if (response.message) {
            toast.success(response.message)
        } else {
            toast.error(response.reason)
        }
        yield put(fetchCheckoutsRequest())
    } catch (error) {
        console.log("Error creating checkout:", error)
        yield put(createCheckoutFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteCheckout(action) {
    try {
        const response = yield call(deleteCheckoutApi, action.payload)
        yield put(deleteCheckoutSuccess())
        // toast.success(response.message)
        yield put(fetchCheckoutsRequest())
    } catch (error) {
        yield put(deleteCheckoutFailure(error.message))
        toast.error(error.message)
    }
}


function* updateCheckout(action) {
    try {
        yield call(updateCheckoutApi, action.payload)
        yield put(updateCheckoutSuccess())
        yield put(fetchCheckoutsRequest())
    } catch (error) {
        yield put(updateCheckoutFailure(error.message))
        toast.error(error.message)
    }
}


export function* checkoutSaga() {
    yield all([
        takeLatest(fetchCheckoutsRequest.type, fetchCheckout),
        takeLatest(createCheckoutRequest.type, createCheckout),
        takeLatest(deleteCheckoutRequest.type, deleteCheckout),
        takeLatest(updateCheckoutRequest.type, updateCheckout),
    ])
}