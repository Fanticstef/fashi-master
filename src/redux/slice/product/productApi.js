import axiosInstance from "../../../config/api/axiosInstance"

export const productApi = async (categoryId, subCategoryId, brandId) => {
    try {
        const params = new URLSearchParams()
        if (categoryId) params.append('category', categoryId)
        if (subCategoryId) params.append('subCategory', subCategoryId)
        if (brandId) params.append('brand', brandId)

        const response = await axiosInstance.get(`/api/product${params.toString() ? `?${params.toString()}` : ''}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch product"
    }
}

export const createProductApi = async ({ name, maincategory, subcategory, brand, color, size, basePrice, discount, stock, stockQuantity, description, active, images }) => {
    try {
        // calculate finalPrice
        let finalPrice = (basePrice - basePrice * discount / 100)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('maincategory', maincategory)
        formData.append('subcategory', subcategory)
        formData.append('brand', brand)
        formData.append('color', color)
        formData.append('size', size)
        formData.append('basePrice', basePrice)
        formData.append('discount', discount)
        formData.append('finalPrice', finalPrice)
        formData.append('stock', stock)
        formData.append('stockQuantity', stockQuantity)
        formData.append('description', description)
        formData.append('active', active)
        images.forEach(p => {
            formData.append('pic', p)
        })

        const response = await axiosInstance.post("/api/product", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to create product"
    }
}

export const deleteProductApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/product/${id}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to delete product'
    }
}

export const updateProductApi = async ({ _id, name, maincategory, subcategory, brand, color, size, basePrice, discount, stock, stockQuantity, description, active, images }) => {
    try {
        // calculate finalPrice
        let finalPrice = (basePrice - basePrice * discount / 100)

        const formData = new FormData()
        formData.append("_id", _id);
        formData.append('name', name)
        formData.append('maincategory', maincategory._id)
        formData.append('subcategory', subcategory._id)
        formData.append('brand', brand._id)
        formData.append('color', color)
        formData.append('size', size)
        formData.append('basePrice', basePrice)
        formData.append('discount', discount)
        formData.append('finalPrice', finalPrice)
        formData.append('stock', stock)
        formData.append('stockQuantity', stockQuantity)
        formData.append('description', description)
        formData.append('active', active)
        // images.forEach(p => {
        //     formData.append('pic', p)
        // })

        // Add null check for images
        if (images && Array.isArray(images)) {
            images.forEach(p => {
                formData.append('pic', p)
            })
        }

        const response = await axiosInstance.put(`/api/product/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("API Error:", error)
        throw error.response?.data?.message || error.message || "Failed to update product"
    }
}

export const removeSingleImageApi = async (productId, imageIndex) => {
    try {
        const response = await axiosInstance.delete(`/api/product/${productId}/image/${imageIndex}`)
        return response.data
    } catch (error) {
        throw error.response?.data?.message || error.message || 'Failed to remove image'
    }
}