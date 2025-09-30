import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wishlists: [],
    loading: false,
    error: null
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        fetchWishlistsRequest: (state) => {
            state.loading = true
        },
        fetchWishlistsSuccess: (state, action) => {
            state.loading = false
            state.wishlists = action.payload
            state.error = null
        },
        fetchWishlistsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createWishlistRequest: (state) => {
            state.loading = true
        },
        createWishlistSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        createWishlistFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteWishlistRequest: (state) => {
            state.loading = true
        },
        deleteWishlistSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteWishlistFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})


export const {
    fetchWishlistsRequest,
    fetchWishlistsSuccess,
    fetchWishlistsFailure,
    createWishlistRequest,
    createWishlistSuccess,
    createWishlistFailure,
    deleteWishlistRequest,
    deleteWishlistSuccess,
    deleteWishlistFailure,
} = wishlistSlice.actions

export default wishlistSlice.reducer