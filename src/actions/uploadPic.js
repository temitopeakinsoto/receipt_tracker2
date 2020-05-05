import Axios from 'axios';
import { PIC_UPLOAD_START, PIC_UPLOAD_SUCCESS, ERROR } from './index';

export const uploadPic = (file, photo_id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gkb9fpss');
    formData.append('public_id', photo_id);
    
    return dispatch => {
        dispatch({ type: PIC_UPLOAD_START });
        Axios({
            url: 'https://api.cloudinary.com/v1_1/argordon/upload',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(res => {
            dispatch({ type: PIC_UPLOAD_SUCCESS });
            console.log(res);
        }).catch(err => {
            dispatch({ type: ERROR });
            console.log(err);
        });
    };
};
