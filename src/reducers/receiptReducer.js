import {
    FETCH_RECEIPTS_START,
    FETCH_RECEIPTS_SUCCESS,
    ADD_RECEIPT_START,
    ADD_RECEIPT_SUCCESS,
    EDIT_RECEIPT_START,
    EDIT_RECEIPT_SUCCESS,
    ADD_USERNAME_TO_STATE,
    ADD_REC_ID_TO_STATE,
    PIC_UPLOAD_START,
    PIC_UPLOAD_SUCCESS,
    RESET_ASYNC_PROPS,
    DELETE_RECEIPT_SUCCESS,
    ERROR
} from '../actions/index';

const initialState = {
    pic_success: false,
    rec_id: '',
    user_username: '',
    isLoading: false,
    error: '',
    data: []
}

export const receiptReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECEIPTS_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        case FETCH_RECEIPTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case ADD_RECEIPT_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        case ADD_RECEIPT_SUCCESS:
            return {
                ...state,
                pic_success: true,
                isLoading: false,
            };
        case ADD_USERNAME_TO_STATE:
            return {
                ...state,
                isLoading: false,
                user_username: action.payload
            };
        case ADD_REC_ID_TO_STATE:
            return {
                ...state,
                isLoading: false,
                rec_id: action.payload
            };
        case PIC_UPLOAD_START:
            return {
                ...state,
                isLoading: true
            };
        case PIC_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pic_success: true
            };
        case RESET_ASYNC_PROPS:
            return {
                ...state,
                pic_success: false,
                rec_id: ''
            };
        case DELETE_RECEIPT_SUCCESS:
            return {
                ...state,
                data: state.data.filter(state.data.id !== action.payload.id)
            };
        case EDIT_RECEIPT_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        case EDIT_RECEIPT_SUCCESS:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload
                    } else {
                        return item
                    }
                })
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
