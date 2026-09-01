import axiosService from "../api/axiosService";

export const addStudentAPI = async (data) => {
    return await axiosService("POST", "/students", data)
}

export const deleteStudentAPI = async (id) => {
    return await axiosService("DELETE", `/students/${id}`, {})
}
export const viewStudentAPI = async () => {
    return await axiosService("GET", `/students`, {})
}
