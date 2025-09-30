import axiosInstance from "../../../config/api/axiosInstance"

export const newsLetterApi = async () => {
    try {
        const response = await axiosInstance.get("/api/news-letter", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch newsLetter"
    }
}

export const createNewsLetterApi = async (data) => {
    try {
        const response = await axiosInstance.post("/api/news-letter", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create newsLetter"
    }
}

export const deleteNewsLetterApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/news-letter/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete newsLetter'
    }
}

export const updateNewsLetterApi = async ({ _id, active }) => {
    try {
        const payload = { active }
        const response = await axiosInstance.put(`/api/news-letter/${_id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update newsLetter"
    }
}