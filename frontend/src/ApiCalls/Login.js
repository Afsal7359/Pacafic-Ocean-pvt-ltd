import instance from "./axiosInstance"

export const AdminLogin =async(payload)=>{
    try {
        const response = await instance.post('admin/login',payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}