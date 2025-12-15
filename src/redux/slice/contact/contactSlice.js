import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contacts: [],
    loading: false,
    error: null
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        fetchContactsRequest: (state) => {
            state.loading = true
        },
        fetchContactsSuccess: (state, action) => {
            state.loading = false
            state.contacts = action.payload
            state.error = null
        },
        fetchContactsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createContactRequest: (state) => {
            state.loading = true
        },
        createContactSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createContactFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteContactRequest: (state) => {
            state.loading = true
        },
        deleteContactSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteContactFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateContactRequest: (state) => {
            state.loading = true
        },
        updateContactSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateContactFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsFailure,
    createContactRequest,
    createContactSuccess,
    createContactFailure,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactFailure,
    updateContactRequest,
    updateContactSuccess,
    updateContactFailure
} = contactSlice.actions

export default contactSlice.reducer