import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getComplaints() {

    return axios.get(`${BASE_URL}/api/complaint/list`)

        .then(response => response.data);

}

export function deleteComplaint(id){

    return axios.post(`${BASE_URL}/api/complaint/delete/${id}`)

        .then(response => response.data)

        .catch(err => Promise.reject(err.message));

}

export function createComplaint(data) {

    return axios.post(`${BASE_URL}/api/complaint/create`,

        { title: data.title, body: data.body }

    )      .then(response => {

        return response.data

    })

        .catch(err => Promise.reject(err.message));

}

export function updateComplaint(data, id) {

    return axios.post(`${BASE_URL}/api/complaint/update/${id}`, { data })

        .then(response => {

            return response.data

        })

        .catch(err => Promise.reject(err.message));

}

export function registerUser(data) {
    return axios.post(`${BASE_URL}/api/users/create`, { data })

        .then(response => {

            return response.data

        })

        .catch(err => Promise.reject(err.message));
}

export function loginUser(data) {
    return axios.post(`${BASE_URL}/api/login`, { data })

        .then(response => {

            return response.data

        })

        .catch(err => Promise.reject(err.message));
}

export function getCurrentUser() {
    return axios.get(`${BASE_URL}/api/users/current`)
        .then(response=>response.data);
}

export function getUserComplaints(userData) {
    return axios.post(`${BASE_URL}/api/complaint`, { userData })
        .then(response=>{
            return response.data
        })

}
