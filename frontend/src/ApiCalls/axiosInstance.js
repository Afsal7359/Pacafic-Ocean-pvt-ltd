import axios  from 'axios'

const instance =axios.create({
    baseURL:"https://backend.pacificoceanlogistik.com/api/"
    // baseURL:"http://localhost:4025/api/"
})
instance.interceptors.request.use(
    async (config) => {
        try {
            // Retrieve the token from AsyncStorage
            const usertoken = localStorage.getItem('usertoken');
            const admintoken = localStorage.getItem('admintoken');
            if (usertoken) {
                // Set the token in the Authorization header if it exists
                config.headers['Authorization'] = `Bearer ${usertoken}`;
            }else if(admintoken){
                config.headers['Authorization'] = `Bearer ${admintoken}`;
            }
        } catch (error) {
            console.error('Error fetching token from AsyncStorage:', error);
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);
export default instance;    