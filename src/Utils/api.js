import axios from "axios";

const fetcher = (url) => {
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_Api_Key}`,
        },
    });
}

export default fetcher;