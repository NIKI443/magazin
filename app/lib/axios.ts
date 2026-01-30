import axios from 'axios'

const axiosInstance = axios.create({
	baseURL:
		import.meta.env.VITE_REACT_APP_BACKEND_URI || 'http://localhost:3000',
})

console.log(import.meta.env.VITE_REACT_APP_BACKEND_URI)
export default axiosInstance
