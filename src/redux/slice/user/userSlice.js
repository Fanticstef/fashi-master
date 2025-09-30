import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersRequest: (state) => {
            state.loading = true
        },
        fetchUsersSuccess: (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = null
        },
        fetchUsersFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createUserRequest: (state) => {
            state.loading = true
        },
        createUserSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteUserRequest: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateUserRequest: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure
} = userSlice.actions

export default userSlice.reducer