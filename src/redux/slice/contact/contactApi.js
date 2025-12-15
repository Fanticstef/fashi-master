import axiosInstance from "../../../config/api/axiosInstance"

export const contactApi = async () => {
    try {
        const response = await axiosInstance.get("/api/contact-us", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch contact"
    }
}

export const createContactApi = async (data) => {
    try {
        const response = await axiosInstance.post("/api/contact-us", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create contact"
    }
}

export const deleteContactApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/contact-us/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete contact'
    }
}

export const updateContactApi = async ({ _id, status }) => {
    try {
        const payload = { status }
        const response = await axiosInstance.put(`/api/contact-us/${_id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update contact"
    }
}