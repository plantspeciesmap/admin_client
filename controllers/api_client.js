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
        ApiClient.#token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyN2M2MjRiLTc4NTktNGVmNi1hYjI0LTlmYjJlZWE2YWU2ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjE3OTQzNX0.3Qd9LM4tTGMJLPPzQ7CoPDOiF6cGARFNH_Ldr8DvYxI";
        return  ApiClient.instance;
    }

    setToken(token){
        if(!token) return false;
        ApiClient.#token = token;
        return true;
    }

    async request(method, route, body={}){
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