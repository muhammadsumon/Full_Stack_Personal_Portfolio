const Api_Url = process.env.NODE_ENV === 'production' ? "https://api.muhammadsumon.me" : "http://localhost:5050";

module.exports = Api_Url;