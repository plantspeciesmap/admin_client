import {
    FETCH_TREE_ROUTE,
    FETCH_ALL_TREES_ROUTE,
    UPDATE_TREE_ROUTE,
    DELETE_TREE_ROUTE,
    CREATE_TREE_ROUTE
} from "../route"
import Tree from "../models/tree";

// TODO error
class TreeController{

    constructor(apiClient) {
        /** @type {ApiClient} */
        this.apiClient = apiClient;
    }

    async fetch_all(){
        const res = await this.apiClient.request('GET', FETCH_ALL_TREES_ROUTE);
        console.log("GET trees", res);
        if(res.success) {
            return res.data.map((e)=>Tree.fromJson(e));
        }else {
            return [];
        }
    }

    async fetch(id){
        const res = await this.apiClient.request('GET', FETCH_TREE_ROUTE+"/"+id);
        if(res.success) {
            return Tree.fromJson(res.data);
        }else {
            return null;
        }
    }

    /**
     * @param {Tree} record
     * */
    async update(record){
        const res = await this.apiClient.request('PUT', UPDATE_TREE_ROUTE+"/"+record.id, record.toJson());
        if(res.success) {
            return {
                success: true,
                record: Tree.fromJson(res.data)
            };
        }else {
            return {
                success: false,
                record: null
            };
        }
    }

    async create(record){
        const res = await this.apiClient.request('POST', CREATE_TREE_ROUTE, record.toJson());
        if(res.success) {
            return {
                success: true,
                record: Tree.fromJson(res.data)
            };
        }else {
            return {
                success: false,
                record: null
            };
        }
    }

    // async delete(record){
    //     const res = await this.apiClient.request('DELETE', DELETE_TREE_ROUTE+"/"+record.id, record.toJson());
    //     if(res.success) {
    //         return true;
    //     }else {
    //         return false;
    //     }
    // }
}

module.exports = TreeController;