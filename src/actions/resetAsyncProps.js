import { RESET_ASYNC_PROPS } from './index';


export const resetAsyncProps = () => {
    return dispatch => {
        dispatch({ type: RESET_ASYNC_PROPS });
    }
};
