import axios from 'axios';

export function getAllReports() {
    return axios.get('/camel/report');
}

export function getReportById(id) {
    return axios.get(`/camel/report/${id}`);
}
