import axios from 'axios';

export function uploadFile(customerId, formData, config = {}) {
    return axios.post(`/api/xavier/upload/${customerId}`, formData, config);
}
