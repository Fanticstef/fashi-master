import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createWishlistApi, deleteWishlistApi, wishlistApi } from '../slice/wishlist/wishlistApi'
import {
    fetchWishlistsRequest,
    fetchWishlistsSuccess,
    fetchWishlistsFailure,
    createWishlistRequest,
    createWishlistSuccess,
    createWishlistFailure,
    deleteWishlistRequest,
    deleteWishlistSuccess,
    deleteWishlistFailure,
} from '../slice/wishlist/wishlistSlice'
import toast from 'react-hot-toast';


function* fetchWishlist() {
    try {
        const response = yield call(wishlistApi)
        yield put(fetchWishlistsSuccess(response.data))
    } catch (error) {
        yield put(fetchWishlistsFailure(error.message))
        toast.error(error.message)
    }
}

function* createWishlist(action) {
    try {
        const response = yield call(createWishlistApi, action.payload)
        yield put(createWishlistSuccess())
        if (response.message) {
            toast.success(response.message)
        } else {
            toast.error(response.reason)
        }
        yield put(fetchWishlistsRequest())
    } catch (error) {
        console.log("Error creating Wishlist:", error)
        yield put(createWishlistFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteWishlist(action) {
    try {
        const response = yield call(deleteWishlistApi, action.payload)
        yield put(deleteWishlistSuccess())
        toast.success(response.message)
        yield put(fetchWishlistsRequest())
    } catch (error) {
        yield put(deleteWishlistFailure(error.message))
        toast.error(error.message)
    }
}



export function* wishlistSaga() {
    yield all([
        takeLatest(fetchWishlistsRequest.type, fetchWishlist),
        takeLatest(createWishlistRequest.type, createWishlist),
        takeLatest(deleteWishlistRequest.type, deleteWishlist),
    ])
}