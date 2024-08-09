import axios  from 'axios'

const instance =axios.create({
    baseURL:"http://103.154.184.14:4011/api/"
})

export default instance;    