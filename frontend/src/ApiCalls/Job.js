import instance from "./axiosInstance"

export const AddJobs = async(payload)=>{
    try {
        const response = await instance.post('job/add-job',payload);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetJobs = async()=>{
    try {
        const response = await instance.get('job/get-job');
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const EditJobApi = async(payload)=>{
    try {
        const response = await instance.post(`job/edit-job/${payload._id}`,payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const BlockEditandDeleteApi = async(payload)=>{
    try {
        const response = await instance.post(`job/block-job/${payload}`);
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const UnBlockEditandDeleteApi = async(payload)=>{
    try {
        const response = await instance.post(`job/unblock-job/${payload}`);
        return response.data
    } catch (error) {
        return error.response.data
    }
}