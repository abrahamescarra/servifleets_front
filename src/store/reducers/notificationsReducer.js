import { LOAD_NOTIFICATIONS, LOADING_NOTIFICATIONS, MARK_ALL_READED, MARK_READED } from 'store/actions/types/types_notifications';

const initialState = {
    all: [],
    notReaded: [],
    loading: false
};

function notifications(state = initialState, action) {
    switch (action.type) {
        case LOAD_NOTIFICATIONS: {
            return {
                ...state,
                all: action.payload.all,
                notReaded: action.payload.notReaded,
                loading: false
            };
        }
        case LOADING_NOTIFICATIONS: {
            return {
                ...state,
                loading: true
            };
        }
        case MARK_ALL_READED: {
            return {
                ...state,
                loading: false,
                notReaded: []
            };
        }
        case MARK_READED: {
            return {
                ...state,
                loading: false,
                notReaded: state.notReaded.filter((notification) => notification.id !== action.payload.id)
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
}

export default notifications;
