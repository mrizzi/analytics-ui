import axios from 'axios';

export function uploadFile(formData, config = {}) {
    return axios.post('/api/xavier/upload', formData, config);
}
