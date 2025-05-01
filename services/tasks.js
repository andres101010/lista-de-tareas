import axios from "axios";

export const getTasks = async (id) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${baseUrl}/api/tasks/${id}`, {withCredentials:true})
    return res.data
}

export const sendTask = async (id, body) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post(`${baseUrl}/api/tasks/${id}`, body, {withCredentials:true})
    return res
}

export const editTask = async (id, body) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.put(`${baseUrl}/api/tasks/${id}`, body, {withCredentials:true})
    return res

}

export const deleteTask = async (id) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.delete(`${baseUrl}/api/tasks/${id}`, {withCredentials: true})
    return res
}