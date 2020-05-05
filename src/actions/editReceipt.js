import { axiosWithAuth } from '../utilities/axiosWithAuth';
import { EDIT_RECEIPT_START, EDIT_RECEIPT_SUCCESS, ERROR,} from './index';

export const Edit = receiptEdited => {
    console.log(receiptEdited);
    return dispatch => {
        dispatch({ type: EDIT_RECEIPT_START });
        axiosWithAuth()
            .put(`https://receipt-tracker-api.herokuapp.com/users/receipt/${receiptEdited.id}`, receiptEdited)
            .then(res => {
                console.log(res);
                dispatch({ type: EDIT_RECEIPT_SUCCESS, payload: receiptEdited});
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: ERROR, payload: err });
            })
    }
};