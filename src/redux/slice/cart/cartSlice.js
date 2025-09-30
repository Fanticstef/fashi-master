import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    carts: [],
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        fetchCartsRequest: (state) => {
            state.loading = true
        },
        fetchCartsSuccess: (state, action) => {
            state.loading = false
            state.carts = action.payload
            state.error = null
        },
        fetchCartsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createCartRequest: (state) => {
            state.loading = true
        },
        createCartSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createCartFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteCartRequest: (state) => {
            state.loading = true
        },
        deleteCartSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteCartFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateCartRequest: (state) => {
            state.loading = true
        },
        updateCartSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateCartFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
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
} = cartSlice.actions

export default cartSlice.reducer