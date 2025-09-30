import axiosInstance from "../../../config/api/axiosInstance"

export const wishlistApi = async () => {
    try {
        const response = await axiosInstance.get("/api/wishlist", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch wishlist"
    }
}

export const createWishlistApi = async ({ user, product }) => {
    try {
        const payload = { user, product }
        const response = await axiosInstance.post("/api/wishlist", payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create wishlist"
    }
}

export const deleteWishlistApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/wishlist/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete wishlist'
    }
}