import axios from 'axios';
const baseUrl = '/api/users';

const login = async (userOject) => {
    const response = await axios.post(`${baseUrl}/login`, userOject);
    return response.data;
};

const verify = async (userObj) => {
    const response = await axios.post(`${baseUrl}/tokenVerification`, userObj);
    return response;
};

export default { login, verify };
