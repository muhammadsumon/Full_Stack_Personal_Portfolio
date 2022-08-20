import axios from "axios";
import { React_App_Public_Api_Key } from "../config/config";

const fetcher = (url) => {
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${React_App_Public_Api_Key}`
        },
    });
}

export default fetcher;