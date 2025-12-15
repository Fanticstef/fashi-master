import { all, call, put, takeLatest, } from 'redux-saga/effects'
import { contactApi, createContactApi, deleteContactApi, updateContactApi } from '../slice/contact/contactApi';
import { createContactFailure, createContactRequest, createContactSuccess, deleteContactFailure, deleteContactRequest, deleteContactSuccess, fetchContactsFailure, fetchContactsRequest, fetchContactsSuccess, updateContactFailure, updateContactRequest, updateContactSuccess } from '../slice/contact/contactSlice';
import toast from 'react-hot-toast';


function* fetchContact() {
    try {
        const response = yield call(contactApi)
        yield put(fetchContactsSuccess(response.data))
    } catch (error) {
        yield put(fetchContactsFailure(error.message))
        toast.error(error.message)
    }
}

function* createContactSaga(action) {
    try {
        const response = yield call(createContactApi, action.payload)
        yield put(createContactSuccess())
        if (response.result === "Done") {
            toast.success('Thank you for your message. We will get back to you soon.')
        } else if (response.error) {
            toast(response.error.message, {
                icon: '⚠️',
                style: {
                    border: '1px solid #facc15',
                    padding: '12px',
                    color: '#92400e',
                    backgroundColor: '#fef3c7',
                },
            })
        }
        yield put(fetchContactsRequest())
    } catch (error) {
        console.log("Error creating brand:", error)
        yield put(createContactFailure(error.message))
        toast.error(error.message)
    }
}


function* deleteContactSaga(action) {
    try {
        const response = yield call(deleteContactApi, action.payload)
        yield put(deleteContactSuccess())
        toast.success(response.message)
        yield put(fetchContactsRequest())
    } catch (error) {
        yield put(deleteContactFailure(error.message))
        toast.error(error.message)
    }
}


function* updateContactSaga(action) {
    try {
        yield call(updateContactApi, action.payload)
        yield put(updateContactSuccess())
        yield put(fetchContactsRequest())
    } catch (error) {
        yield put(updateContactFailure(error.message))
        toast.error(error.message)
    }
}


export function* contactSagas() {
    yield all([
        takeLatest(fetchContactsRequest.type, fetchContact),
        takeLatest(createContactRequest.type, createContactSaga),
        takeLatest(deleteContactRequest.type, deleteContactSaga),
        takeLatest(updateContactRequest.type, updateContactSaga),
    ])
}