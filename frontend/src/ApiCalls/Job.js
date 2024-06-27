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
