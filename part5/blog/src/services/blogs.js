import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = (user) => {
    token = user.token;
};

const deleteBlogs = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: `bearer ${token}` },
    });
    return response;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (blogObject) => {
    const response = await axios.post(baseUrl, blogObject, {
        headers: { Authorization: `bearer ${token}` },
    });
    return response;
};

const updateLikes = async (blogObject, id) => {
    const response = await axios.put(`${baseUrl}/${id}`, blogObject, {
        headers: { Authorization: `bearer ${token}` },
    });
    return response.data;
};

// const create = () => {
//   const request = axios.post(baseUrl, )
// }

export default { getAll, create, setToken, updateLikes, deleteBlogs };
