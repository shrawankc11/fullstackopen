import axios from "axios";

const baseUrl = "/api/persons"

//get
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//post
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

//delete
const remove = id => {
    axios.delete(`${baseUrl}/${id}`)
}

//put
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }