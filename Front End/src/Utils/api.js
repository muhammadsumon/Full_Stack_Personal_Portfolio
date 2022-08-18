import axios from "axios";

const fetcher = (url) => {
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.React_App_Api_Key}`,
        },
    });
}

export default fetcher;