import axios  from 'axios'

const instance =axios.create({
    baseURL:"http://localhost:4011/api/"
})

export default instance;    