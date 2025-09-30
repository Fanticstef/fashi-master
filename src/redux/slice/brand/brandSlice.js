import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    brands: [],
    loading: false,
    error: null
}

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        fetchBrandsRequest: (state) => {
            state.loading = true
        },
        fetchBrandsSuccess: (state, action) => {
            state.loading = false
            state.brands = action.payload
            state.error = null
        },
        fetchBrandsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createBrandsRequest: (state) => {
            state.loading = true
        },
        createBrandsSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createBrandsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteBrandsRequest: (state) => {
            state.loading = true
        },
        deleteBrandsSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteBrandsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateBrandRequest: (state) => {
            state.loading = true
        },
        updateBrandSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateBrandFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
    fetchBrandsRequest,
    fetchBrandsSuccess,
    fetchBrandsFailure,
    createBrandsRequest,
    createBrandsSuccess,
    createBrandsFailure,
    deleteBrandsRequest,
    deleteBrandsSuccess,
    deleteBrandsFailure,
    updateBrandRequest,
    updateBrandSuccess,
    updateBrandFailure
} = brandSlice.actions

export default brandSlice.reducer