import axiosInstance from "../../../config/api/axiosInstance"

export const cartApi = async () => {
    try {
        const response = await axiosInstance.get("/api/cart", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch cart"
    }
}

export const createCartApi = async ({ user, product, qty, total }) => {
    try {
        const payload = { user, product, qty, total }
        const response = await axiosInstance.post("/api/cart", payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create cart"
    }
}

export const deleteCartApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/cart/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete cart'
    }
}

export const updateCartApi = async ({ _id, qty, total }) => {
    try {
        const payload = { qty, total }
        const response = await axiosInstance.put(`/api/cart/${_id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update cart"
    }
}