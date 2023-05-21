import ApiClient from "./api_client";
import TreeController from "./tree";


class GlobalController{
    /** @type {GlobalController} */
    static instance = null;
    apiClient;
    // static profile = null; /** @type {Profile} */

    constructor() {
        this.apiClient = ApiClient.getInstance();
        this.treeController = new TreeController(this.apiClient);  
    }

    // static async fetchProfile(ignore_cache = false){
    //     if(GlobalController.profile != null && ignore_cache===false) return GlobalController.profile;
    //     GlobalController.profile = await GlobalController.getInstance().profileController.fetch();
    //     return GlobalController.profile;
    // }

    static getInstance() {
        if(GlobalController.instance == null) GlobalController.instance = new GlobalController();
        return GlobalController.instance;
    }
}

module.exports = GlobalController;