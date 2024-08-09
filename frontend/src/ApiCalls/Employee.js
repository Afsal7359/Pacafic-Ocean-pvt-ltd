import instance from "./axiosInstance"

export const GetAllEmployees = async()=>{
    try {
        const response = await instance.get('employee/get-Employee')
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const AddEmployees = async(payload)=>{
    try {
        const response = await instance.post('employee/add-Employee',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const DeleteEmployees = async(payload)=>{
    try {
        const response = await instance.get(`employee/delete-employee/${payload}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const EmployeeLogin = async(payload)=>{
    try {
        const response = await instance.post('employee/login',payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}