import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { createNewsLetterApi, deleteNewsLetterApi, newsLetterApi, updateNewsLetterApi } from '../slice/newsLetter/newsLetterApi'
import { createNewsLetterFailure, createNewsLetterRequest, createNewsLetterSuccess, deleteNewsLetterFailure, deleteNewsLetterRequest, deleteNewsLetterSuccess, fetchNewsLettersFailure, fetchNewsLettersRequest, fetchNewsLettersSuccess, updateNewsLetterFailure, updateNewsLetterRequest, updateNewsLetterSuccess } from '../slice/newsLetter/newsLetterSlice'
import toast from 'react-hot-toast';


function* fetchNewsLetter() {
    try {
        const response = yield call(newsLetterApi)
        yield put(fetchNewsLettersSuccess(response.data))
    } catch (error) {
        yield put(fetchNewsLettersFailure(error.message))
        toast.error(error.message)
    }
}

function* createNewsLetterSaga(action) {
    try {
        const response = yield call(createNewsLetterApi, action.payload)
        yield put(createNewsLetterSuccess())
        if (response.message) {
            toast.success(response.message)
        } else if (response.error) {
            toast(response.error.email, {
                icon: '⚠️',
                style: {
                    border: '1px solid #facc15',
                    padding: '12px',
                    color: '#92400e',
                    backgroundColor: '#fef3c7',
                },
            })
        }
        yield put(fetchNewsLettersRequest())
    } catch (error) {
        console.log("Error creating brand:", error)
        yield put(createNewsLetterFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteNewsLetterSaga(action) {
    try {
        const response = yield call(deleteNewsLetterApi, action.payload)
        yield put(deleteNewsLetterSuccess())
        toast.success(response.message)
        yield put(fetchNewsLettersRequest())
    } catch (error) {
        yield put(deleteNewsLetterFailure(error.message))
        toast.error(error.message)
    }
}


function* updateNewsLetterSaga(action) {
    try {
        yield call(updateNewsLetterApi, action.payload)
        yield put(updateNewsLetterSuccess())
        yield put(fetchNewsLettersRequest())
    } catch (error) {
        yield put(updateNewsLetterFailure(error.message))
        toast.error(error.message)
    }
}


export function* newsLetterSagas() {
    yield all([
        takeLatest(fetchNewsLettersRequest.type, fetchNewsLetter),
        takeLatest(createNewsLetterRequest.type, createNewsLetterSaga),
        takeLatest(deleteNewsLetterRequest.type, deleteNewsLetterSaga),
        takeLatest(updateNewsLetterRequest.type, updateNewsLetterSaga),
    ])
}