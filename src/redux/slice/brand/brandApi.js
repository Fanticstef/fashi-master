import axiosInstance from "../../../config/api/axiosInstance"

export const brandApi = async () => {
    try {
        const response = await axiosInstance.get("/api/brand", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch brand"
    }
}

export const createBrandApi = async ({ name, active, pic }) => {
    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('active', active)
        formData.append('pic', pic[0]) // Append the actual file

        const response = await axiosInstance.post("/api/brand", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create brand"
    }
}

export const deleteBrandApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/brand/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete brand'
    }
}

export const updateBrandApi = async ({ _id, name, active, pic }) => {
    try {
        // Prepare form data for file upload
        const formData = new FormData();
        formData.append("_id", _id);
        formData.append("name", name);
        formData.append("active", active === "true");
        // Only append pic if a new file is selected
        if (pic && pic.length > 0) {
            formData.append("pic", pic[0]);
        }

        const response = await axiosInstance.put(`/api/brand/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update brand"
    }
}