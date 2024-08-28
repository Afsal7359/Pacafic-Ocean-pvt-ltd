import axios  from 'axios'

const instance =axios.create({
    baseURL:"https://backend.pacificoceanlogistik.com/api/"
})

export default instance;    