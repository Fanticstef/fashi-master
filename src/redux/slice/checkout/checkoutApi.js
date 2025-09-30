import axiosInstance from "../../../config/api/axiosInstance"

export const checkoutApi = async () => {
    try {
        const response = await axiosInstance.get("/api/checkout", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch checkout"
    }
}

export const createCheckoutApi = async ({ user, subTotal, shipping, total, products }) => {
    try {
        const payload = { user, subTotal, shipping, total, products }
        const response = await axiosInstance.post("/api/checkout", payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create checkout"
    }
}

export const deleteCheckoutApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/checkout/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete checkout'
    }
}

export const updateCheckoutApi = async ({ _id, orderStatus, paymentStatus, paymentMode }) => {
    try {       
        const payload = { orderStatus, paymentStatus, paymentMode }
        const response = await axiosInstance.put(`/api/checkout/${_id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update checkout"
    }
}