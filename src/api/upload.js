import ApiClient from './apiClient';

export function uploadFile(customerId, formData, config = {}) {
    return ApiClient.post(`/camel/upload/${customerId}`, formData, config);
}
