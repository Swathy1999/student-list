import axios from "axios"

const axiosInstance=axios.create(
    {
        baseURL:"https://student-list-server.onrender.com",
        timeout:5000
    }
)

export default axiosInstance