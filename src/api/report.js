import ApiClient from './apiClient';

export function getAllReports() {
    return ApiClient.get('/camel/report');
}

export function getReportById(id) {
    return ApiClient.get(`/camel/report/${id}`);
}
