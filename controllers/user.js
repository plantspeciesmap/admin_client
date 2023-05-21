import {
    FETCH_ALL_USERS_ROUTE,
    UPDATE_USER_ROLE_ROUTE
} from "../route"
import User from "../models/user";

class UserController{

    constructor(apiClient) {
        /** @type {ApiClient} */
        this.apiClient = apiClient;
    }

    async fetch_all(){
        const res = await this.apiClient.request('GET', FETCH_ALL_USERS_ROUTE);
        console.log("GET trees", res);
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: res.data.map((e)=>User.fromJson(e))
            }
        }else {
            return {
                success: true,
                message: res.message,
                data: []
            }
        }
    }


    /**
     * @param {User} record
     * @param {String} preferredRole
     * */
    async updateRole(record, preferredRole){
        const res = await this.apiClient.request('PATCH', UPDATE_USER_ROLE_ROUTE+"/"+record.id, {
            "role" : preferredRole.toLowerCase()
        });
        if(res.success) {
            return {
                success: true,
                message: res.message,
                record: User.fromJson(res.data)
            };
        }else {
            return {
                success: false,
                message: res.message,
                record: null
            };
        }
    }
}

module.exports = UserController;