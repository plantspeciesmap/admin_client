import {
    FETCH_TREE_ROUTE,
    FETCH_ALL_TREES_ROUTE,
    UPDATE_TREE_ROUTE,
    SEARCH_TREE_ROUTE,
    CREATE_TREE_ROUTE
} from "../route"
import Tree from "../models/tree";

class TreeController{
    constructor(apiClient) {
        /** @type {ApiClient} */
        this.apiClient = apiClient;
    }

    async fetch_all(){
        const res = await this.apiClient.request('GET', FETCH_ALL_TREES_ROUTE);
        console.log("GET trees", res);
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: res.data.map((e)=>Tree.fromJson(e))
            }
        }else {
            return {
                success: false,
                message: res.message,
                data: []
            }
        }
    }

    async fetch(id){
        const res = await this.apiClient.request('GET', FETCH_TREE_ROUTE+"/"+id);
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: Tree.fromJson(res.data)
            }
        }else {
            return {
                success: false,
                message: res.message,
                data: {}
            }
        }
    }

    async search(name){
        const res = await this.apiClient.request('GET', SEARCH_TREE_ROUTE+"/?query="+name);
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: res.data
            }
        }else {
            return {
                success: false,
                message: res.message,
                data: {}
            }
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
                message: res.message,
                data: Tree.fromJson(res.data)
            };
        }else {
            return {
                success: false,
                message: res.message,
                data: null
            };
        }
    }

    async create(record){
        const res = await this.apiClient.request('POST', CREATE_TREE_ROUTE, record.toJson());
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: Tree.fromJson(res.data)
            };
        }else {
            return {
                success: false,
                message: res.message,
                data: null
            };
        }
    }
}

module.exports = TreeController;