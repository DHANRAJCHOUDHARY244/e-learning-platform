const cloudinary = require('../config/cloudinary')

const fileUploadGetUrl = async (file) => {
    try {
        if (file.size > 2024 * 2024) throw new Error('Image size is not greater than 2MB! ')
        const resp = await cloudinary.uploader.upload(file.tempFilePath)
        return { success: true, url: resp.url }
    } catch (error) {
        return { success: false, message: 'Internal Server Error!😞' + error }
    }
}

module.exports = { fileUploadGetUrl }