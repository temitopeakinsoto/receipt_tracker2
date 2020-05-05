import { axiosWithAuth } from '../utilities/axiosWithAuth';
import { ADD_RECEIPT_START, ADD_RECEIPT_SUCCESS, ERROR, ADD_REC_ID_TO_STATE } from './index';

export const addNewReceipt = newReceipt => {
    console.log(newReceipt);
    return dispatch => {
        dispatch({ type: ADD_RECEIPT_START });
        axiosWithAuth()
            .post('https://receipt-tracker-api.herokuapp.com/users/receipt', newReceipt)
            .then(res => {
                console.log(res);
                dispatch({ type: ADD_REC_ID_TO_STATE, payload: res.data[0]});
                dispatch({ type: ADD_RECEIPT_SUCCESS});
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: ERROR });
            })
    }
};
