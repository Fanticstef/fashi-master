import axiosInstance from "../../../config/api/axiosInstance"

export const userApi = async () => {
    try {
        const response = await axiosInstance.get("/api/user", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch user"
    }
}

export const createUserApi = async ({ name, username, phone, email, password, confirmPassword }) => {
    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('username', username)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)

        const response = await axiosInstance.post("/api/user", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create user"
    }
}

export const deleteUserApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/user/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete user'
    }
}

export const updateUserApi = async ({ _id, name, phone, state, city, pin, address, pic }) => {
    try {
        // Prepare form data for file upload
        const formData = new FormData();
        formData.append("_id", _id);
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("state", state);
        formData.append("city", city);
        formData.append("pin", pin);
        formData.append("address", address);

        // Only append pic if a new file is selected
        if (pic && pic.length > 0) {
            formData.append("pic", pic[0]);
        }

        const response = await axiosInstance.put(`/api/user/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update user"
    }
}