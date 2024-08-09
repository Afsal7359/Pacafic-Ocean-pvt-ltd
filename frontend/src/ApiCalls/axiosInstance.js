import axios  from 'axios'

const instance =axios.create({
    baseURL:"https://pacafic-ocean-pvt-ltd.onrender.com/api/"
})

export default instance;    