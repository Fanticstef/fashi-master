import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checkouts: [],
    loading: false,
    error: null
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        fetchCheckoutsRequest: (state) => {
            state.loading = true
        },
        fetchCheckoutsSuccess: (state, action) => {
            state.loading = false
            state.checkouts = action.payload
            state.error = null
        },
        fetchCheckoutsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createCheckoutRequest: (state) => {
            state.loading = true
        },
        createCheckoutSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createCheckoutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteCheckoutRequest: (state) => {
            state.loading = true
        },
        deleteCheckoutSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteCheckoutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateCheckoutRequest: (state) => {
            state.loading = true
        },
        updateCheckoutSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateCheckoutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
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
} = checkoutSlice.actions

export default checkoutSlice.reducer