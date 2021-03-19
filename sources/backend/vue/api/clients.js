import axios from 'axios';

export default {
    updatePassword(oldPassword, newPassword){
        return axios.post('/api/admin/updatePassword',{
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    },
}
