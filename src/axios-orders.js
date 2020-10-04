import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-burger-builder092019.firebaseio.com/'
});

export default axiosInstance;
