import instance from "./axiosInstance";

 export const AddParties =async (payload) => {
    try {
        const response = await instance.post('parties/add-parties',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        return error.response.data;
    }
}
export const EditParties = async(payload,id)=>{
    try {
        const response = await instance.post(`parties/edit-parties/${id}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const GetAllParties = async()=>{
    try {
        const response = await instance.get('parties/Get-All-Parties')
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const DeleteParties = async(payload)=>{
    try {
        const response = await instance.get(`parties/delete-Parties/${payload}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}