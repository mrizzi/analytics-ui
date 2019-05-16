import axios from 'axios';

export function uploadFile(customerId, formData, config = {}) {
    return axios.post(`/camel/upload/${customerId}`, formData, config);
}
