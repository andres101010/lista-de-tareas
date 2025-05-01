import axios from "axios"

export const signin = async (body) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post(`${baseUrl}/api/signup`, body);
    return res;
  }