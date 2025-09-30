import axiosInstance from "../../../config/api/axiosInstance"


export const subCategoryApi = async () => {
    try {
        const response = await axiosInstance.get('/api/subcategory', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch subCategory"
    }
}


export const createSubCategoryApi = async ({ name, active, pic }) => {
    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('active', active)
        formData.append('pic', pic[0])

        const response = await axiosInstance.post('/api/subcategory', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create subCategory"
    }
}


export const deleteSubCategoryApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/subcategory/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete subcategory'
    }
}


export const updateSubCategoryApi = async ({ _id, name, active, pic }) => {
    try {
        const formData = new FormData()
        formData.append('_id', _id)
        formData.append('name', name)
        formData.append('active', active)

        if (pic && pic.length > 0) {
            formData.append('pic', pic[0])
        }
        const response = await axiosInstance.put(`/api/subcategory/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error : ", error)
        throw error.response?.data?.message || error.message || 'Failed to delete subcategory'
    }
}


