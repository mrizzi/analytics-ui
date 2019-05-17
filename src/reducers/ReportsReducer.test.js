import { reportReducer } from './ReportReducer';
import {
    FETCH_REPORTS,
    FETCH_REPORT
} from '../actions/ReportAction';
import {
    successMessage,
    failureMessage,
    pendingMessage
} from './reducerHelper';

import reports, { report } from '../__fixtures__/reports';

const initialState = {
    error: null,
    loading: false
};

const fromRequest = (type, payload, meta: {}) => ({
    type,
    payload,
    meta: { partial: false, ...meta }
});

describe('report reducer', () => {
    const reportInitialState = {
        ...initialState,
        reports: []
    };

    it('should return the initial state', () => {
        expect(reportReducer(undefined, {})).toEqual(reportInitialState);
    });

    it('should handle FETCH_REPORTS_PENDING', () => {
        const expectation = {
            ...reportInitialState,
            loading: true,
            error: null
        };
        const newState = reportReducer(
            reportInitialState,
            fromRequest(pendingMessage(FETCH_REPORTS), {})
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_REPORT_PENDING', () => {
        const expectation = {
            ...reportInitialState,
            loading: true,
            error: null
        };
        const newState = reportReducer(
            reportInitialState,
            fromRequest(pendingMessage(FETCH_REPORT), {})
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_REPORTS_SUCCESS', () => {
        const expectation = {
            ...reportInitialState,
            loading: false,
            reports: reports.data,
            total: 3
        };
        const newState = reportReducer(
            reportInitialState,
            fromRequest(successMessage(FETCH_REPORTS), reports)
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_REPORT_SUCCESS', () => {
        let testReport = report.data;

        const expectation = {
            ...reportInitialState,
            loading: false,
            report: testReport
        };
        const newState = reportReducer(
            reportInitialState,
            fromRequest(successMessage(FETCH_REPORT), report)
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_REPORTS_FAILURE', () => {
        const error = 'It broke';
        const newState = reportReducer(
            reportInitialState,
            fromRequest(failureMessage(FETCH_REPORTS), { message: error })
        );
        expect(newState).toEqual({
            ...reportInitialState,
            loading: false,
            error
        });
    });

    it('should handle FETCH_REPORT_FAILURE', () => {
        const error = 'It broke';
        const newState = reportReducer(
            reportInitialState,
            fromRequest(failureMessage(FETCH_REPORT), { message: error })
        );
        expect(newState).toEqual({
            ...reportInitialState,
            loading: false,
            error
        });
    });

});
