import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const postAnecdotes = async (content) => {
    const anecdoteToPost = { content, votes: 0 };
    const response = await axios.post(baseUrl, anecdoteToPost);
    return response.data;
};

export default { getAll, postAnecdotes };
