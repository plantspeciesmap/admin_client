import ApiClient from "./api_client";
import TreeController from "./tree";
import UserController from './user';


import {
    FETCH_ALL_CONTRIBUTIONS_ROUTE,
    FETCH_ALL_CONTRIBUTIONS_BY_STATUS_ROUTE,
    FETCH_CONTRIBUTION_DETAILS_ROUTE,
    UPDATE_CONTRIBUTION_ROUTE, FETCH_TREE_ROUTE
} from "../route";
import Tree from "../models/tree";
import Contribution from "../models/contribution";

class ContributionController{
    constructor(apiClient) {
        /** @type {ApiClient} */
        this.apiClient = apiClient;
    }

    async fetch_all(){
        const res = await this.apiClient.request('GET', FETCH_ALL_CONTRIBUTIONS_ROUTE);
        console.log("GET trees", res);
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: res.data.map((e)=>Contribution.fromJson(e))
            }
        }else {
            return {
                success: false,
                message: res.message,
                data: []
            }
        }
    }

    async fetch_by_status(status){
        const res = await this.apiClient.request('GET', FETCH_ALL_CONTRIBUTIONS_BY_STATUS_ROUTE+"/"+status);
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: res.data.map((e)=>Contribution.fromJson(e))
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
        const res = await this.apiClient.request('GET', FETCH_CONTRIBUTION_DETAILS_ROUTE+"/"+id);
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


    async update(record){
        const res = await this.apiClient.request('PUT', UPDATE_CONTRIBUTION_ROUTE+"/"+record.id, record.json());
        if(res.success) {
            return {
                success: true,
                message: res.message,
                data: Contribution.fromJson(res.data)
            }
        }else {
            return {
                success: false,
                message: res.message,
                data: {}
            }
        }
    }
}


module.exports = ContributionController;