import axios from "axios";
import { BASE_URL } from "./api";





export const marketOrder = async (url, data) => {
    try {
        const response = await axios.post(`${BASE_URL}${url}`, data)

        console.log('RESPONSE: ', response.data);

    } catch (error) {
        console.log(error);
    }

}