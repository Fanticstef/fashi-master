import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductsRequest: (state, action) => {
            state.loading = true
        },
        fetchProductsSuccess: (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = null
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createProductRequest: (state) => {
            state.loading = true
        },
        createProductSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createProductFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteProductRequest: (state) => {
            state.loading = true
        },
        deleteProductSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteProductFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateProductRequest: (state) => {
            state.loading = true
        },
        updateProductSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateProductFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        removeImageRequest: (state) => {
            state.loading = true
        },
        removeImageSuccess: (state, action) => {
            state.loading = false
            state.error = null
            // Update the product in the products array
            const updatedProduct = action.payload
            const index = state.products.findIndex(product => product._id === updatedProduct._id)
            if (index !== -1) {
                state.products[index] = updatedProduct
            }
        },
        removeImageFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailure,
    removeImageRequest,
    removeImageSuccess,
    removeImageFailure
} = productSlice.actions

export default productSlice.reducer