import {
    FETCH_REPORTS
} from '../actions/ReportAction';
import {
    pendingMessage,
    successMessage,
    failureMessage,
    initialStateFor
} from './reducerHelper';

export const normalizeFilterData = (payload) => {
    return payload.data === null ? {} : payload.data;
};

export const reportReducer = function (state = initialStateFor('reports', {}), action) {
    switch (action.type) {
        case pendingMessage(FETCH_REPORTS):
            return {
                ...state,
                reports: {},
                loading: true,
                error: null,
                total: 0
            };

        case successMessage(FETCH_REPORTS):
            return {
                ...state,
                reports: normalizeFilterData(action.payload),
                loading: false,
                error: null,
                total: action.payload.data.length
            };

        case failureMessage(FETCH_REPORTS):
            return {
                ...state,
                reports: {},
                loading: false,
                error: action.payload.message,
                total: 0
            };

        default:
            return state;
    }
};
