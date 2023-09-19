import { GET_DASHBOARD_DATA } from 'store/actions/types/types_dashboard';

const initialState = {
    data: null
};
function dashboard(state = initialState, action) {
    switch (action.type) {
        case GET_DASHBOARD_DATA:
            return {
                ...state,
                data: action.payload
            };

        default: {
            return {
                ...state
            };
        }
    }
}

export default dashboard;
