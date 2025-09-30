import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    subCategorys: [],
    loading: false,
    error: null
}

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers: {
        fetchSubCategorysRequest: (state) => {
            state.loading = true
        },
        fetchSubCategorysSuccess: (state, action) => {
            state.loading = false
            state.subCategorys = action.payload
            state.error = null
        },
        fetchSubCategorysFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createSubCategoryRequest: (state) => {
            state.loading = true
        },
        createSubCategorySuccess: (state) => {
            state.loading = false,
            state.error = null
        },
        createSubCategoryFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        deleteSubCategoryRequest: (state) => {
            state.loading = true
        },
        deleteSubCategorySuccess: (state) => {
            state.loading = false,
            state.error = null
        },
        deleteSubCategoryFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        updateSubCategoryRequest: (state) => {
            state.loading = true
        },
        updateSubCategorySuccess: (state) => {
            state.loading = false,
            state.error = null
        },
        updateSubCategoryFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
    }
})

export const {
    fetchSubCategorysRequest,
    fetchSubCategorysSuccess,
    fetchSubCategorysFailure,
    createSubCategoryRequest,
    createSubCategorySuccess,
    createSubCategoryFailure,
    deleteSubCategoryRequest,
    deleteSubCategorySuccess,
    deleteSubCategoryFailure,
    updateSubCategoryRequest,
    updateSubCategorySuccess,
    updateSubCategoryFailure,
} = subCategorySlice.actions

export default subCategorySlice.reducer