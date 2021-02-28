import axios from 'axios';
import { AXIOS_URL } from './helpers/utility';

const instance = axios.create({
    baseURL: AXIOS_URL,
});

export default instance;
