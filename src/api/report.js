import axios from 'axios';

export function getAllReports() {
    return axios.get('/api/xavier/camel/report');
}

export function getReportById(id) {
    return axios.get(`/api/xavier/camel/report/${id}`);
}
