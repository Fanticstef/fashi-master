import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newsLetters: [],
    loading: false,
    error: null
}

const newsLetterSlice = createSlice({
    name: 'newsLetter',
    initialState,
    reducers: {
        fetchNewsLettersRequest: (state) => {
            state.loading = true
        },
        fetchNewsLettersSuccess: (state, action) => {
            state.loading = false
            state.newsLetters = action.payload
            state.error = null
        },
        fetchNewsLettersFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createNewsLetterRequest: (state) => {
            state.loading = true
        },
        createNewsLetterSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createNewsLetterFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteNewsLetterRequest: (state) => {
            state.loading = true
        },
        deleteNewsLetterSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteNewsLetterFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateNewsLetterRequest: (state) => {
            state.loading = true
        },
        updateNewsLetterSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateNewsLetterFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
    fetchNewsLettersRequest,
    fetchNewsLettersSuccess,
    fetchNewsLettersFailure,
    createNewsLetterRequest,
    createNewsLetterSuccess,
    createNewsLetterFailure,
    deleteNewsLetterRequest,
    deleteNewsLetterSuccess,
    deleteNewsLetterFailure,
    updateNewsLetterRequest,
    updateNewsLetterSuccess,
    updateNewsLetterFailure
} = newsLetterSlice.actions

export default newsLetterSlice.reducer