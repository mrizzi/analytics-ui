import axios from 'axios';

export const FETCH_REPORTS = 'FETCH_REPORTS';
export const FETCH_REPORT = 'FETCH_REPORT';

export const fetchReports = () => ({
    type: FETCH_REPORTS,
    payload: axios.get('/api/xavier/camel/report'),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: 'Failed to load reports'
            }
        }
    }
});

export const fetchReport = (id) => ({
    type: FETCH_REPORT,
    payload: axios.get(`/report/${ id }`),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: `Failed to load report ${ id }`
            }
        }
    }
});
