import axios from "axios";
// import {BASE_API_URL, BASE_FILE_MANAGEMENT_URL} from  "../config";
const BASE_API_URL = "https://plant.tanmoy.online/admin"


class ApiClient{
    static instance = null;
    /** @type {axios} */
    static axiosClient = null;
    static #token = "";
    static getInstance() {
        if(ApiClient.instance !== null) return ApiClient.instance;
        ApiClient.axiosClient = axios;
        ApiClient.instance = new ApiClient();
        ApiClient.#token = "";
        return  ApiClient.instance;
    }

    setToken(token){
        if(!token) return false;
        ApiClient.#token = token;
        return true;
    }

    static isLoggedIn(){
        if (ApiClient.#token === ""){
            if (window && document){
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Check if the cookie starts with the token name
                    if (cookie.startsWith('token=')) {
                        // Extract the token value
                        const token = cookie.substring('token='.length);
                        ApiClient.#token = token;
                        break;
                    }
                }
            }
        }
        return ApiClient.#token !== "";
    }

    async request(method, route, body={}){
        // if no token, retrieve
        if (ApiClient.#token === ""){
            if (window && document){
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Check if the cookie starts with the token name
                    if (cookie.startsWith('token=')) {
                        // Extract the token value
                        const token = cookie.substring('token='.length);
                        ApiClient.#token = token;
                        break;
                    }
                }
            }
        }
        if(!["get", "put", "post", "delete", "patch"].includes(method.toLowerCase())) {
            return {
                success: false,
                message: "Invalid method",
                data: null
            }
        }
        const config = {
            method: method.toLowerCase(),
            url: `${BASE_API_URL}${route}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ApiClient.#token
            },
            data: JSON.stringify(body)
        }
        console.log( ApiClient.#token)
        try{
            let res = await ApiClient.axiosClient(config);
            return {
                success: true,
                message: res.data.message || "Successful",
                data: res.data.data
            }
        }catch (e) {
            return {
                success: false,
                message: e.message,
                data: null
            }
        }
    }
}

module.exports =  ApiClient;