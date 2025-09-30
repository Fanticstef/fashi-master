import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mainCategorys: [],
    loading: false,
    error: null
}

const mainCategorySlice = createSlice({
    name: 'mainCategory',
    initialState,
    reducers: {
        fetchMainCategorysRequest: (state) => {
            state.loading = true
        },
        fetchMainCategorysSuccess: (state, action) => {
            state.loading = false
            state.mainCategorys = action.payload
            state.error = null
        },
        fetchMainCategorysFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createMainCategorysRequest: (state) => {
            state.loading = true
        },
        createMainCategorysSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createMainCategorysFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteMainCategorysRequest: (state) => {
            state.loading = true
        },
        deleteMainCategorysSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteMainCategorysFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateMainCategorysRequest: (state) => {
            state.loading = true
        },
        updateMainCategorysSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateMainCategorysFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
    fetchMainCategorysRequest,
    fetchMainCategorysSuccess,
    fetchMainCategorysFailure,
    createMainCategorysRequest,
    createMainCategorysSuccess,
    createMainCategorysFailure,
    deleteMainCategorysRequest,
    deleteMainCategorysSuccess,
    deleteMainCategorysFailure,
    updateMainCategorysRequest,
    updateMainCategorysSuccess,
    updateMainCategorysFailure
} = mainCategorySlice.actions

export default mainCategorySlice.reducer