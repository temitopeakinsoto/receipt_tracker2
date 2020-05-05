import { axiosWithAuth } from '../utilities/axiosWithAuth';
import {DELETE_RECEIPT_SUCCESS, ERROR} from './index';

export const deleteReceipt = id => {
    return dispatch => {
        console.log('does this log?');
        axiosWithAuth()
            .delete(`https://receipt-tracker-api.herokuapp.com/users/receipt/${id}`)
            .then(res => {
                console.log("delete response===",res);
                dispatch({ type: DELETE_RECEIPT_SUCCESS, payload: id });
                window.history.push('/')
            })
            .catch(err => {
                console.log('is this catch throwing an unnecessary error?',err);
                dispatch({ type: ERROR });
            })
    }
}

