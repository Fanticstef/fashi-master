import axiosInstance from "../../../config/api/axiosInstance"

export const mainCategoryApi = async () => {
    try {
        const response = await axiosInstance.get("/api/maincategory", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch mainCategory"
    }
}

export const createMainCategoryApi = async ({ name, active, pic }) => {
    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('active', active)
        formData.append('pic', pic[0]) // Append the actual file

        const response = await axiosInstance.post("/api/maincategory", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create mainCategory"
    }
}

export const deleteMainCategoryApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/maincategory/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete maincategory'
    }
}

export const updateMainCategoryApi = async ({ _id, name, active, pic }) => {
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

        const response = await axiosInstance.put(`/api/maincategory/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update mainCategory"
    }
}