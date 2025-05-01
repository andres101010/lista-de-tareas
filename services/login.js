import axios from "axios"

export const login = async (body) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post(`${baseUrl}/api/login`, body, {withCredentials:true});
    return res;
  }