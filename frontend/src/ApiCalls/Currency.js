import axios from "axios"
import instance from "./axiosInstance"

export const GetAllCurrency = async()=>{
    try {
        const response = await instance.get('currency/get-currency')
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const UpdateCurrency = async(payload)=>{
    try {
        const response = await instance.post('currency/edit-currency',payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const Currencyrate = async(payload)=>{
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/61f022cbe4fc443ef114a020/latest/${payload}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}