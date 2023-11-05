import axios from 'axios'

export const addTask = (values) => {
    return axios.post('http://localhost:4000/apis/tasks', values)
}

export const getTasks = (pageNumber = 0, pageSize = 20, filter = {}) => {
    return axios.get('http://localhost:4000/apis/tasks', {
        params: {
            filter,
            pageNumber,
            pageSize
        }
    })
}

export const getTask = (id) => {
    return axios.get(`http://localhost:4000/apis/tasks/${id}`)
}


export const updateTask = (data, id) => {
    return axios.put(`http://localhost:4000/apis/tasks/${id}`, data)
}

export const deleteTask = (id) => {
    return axios.delete(`http://localhost:4000/apis/tasks/${id}`)
}