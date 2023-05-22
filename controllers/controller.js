import ApiClient from "./api_client";
import TreeController from "./tree";
import UserController from './user';
import ContributionController from  "./contribution";
import ReportController from "./reportController";

class GlobalController{
    /** @type {GlobalController} */
    static instance = null;
    apiClient;

    constructor() {
        this.apiClient = ApiClient.getInstance();
        this.treeController = new TreeController(this.apiClient);
        this.userController = new UserController(this.apiClient);
        this.contributionController = new ContributionController(this.apiClient);
        this.reportController = new ReportController(this.apiClient);
    }

    static getInstance() {
        if(GlobalController.instance == null) GlobalController.instance = new GlobalController();
        return GlobalController.instance;
    }
}

module.exports = GlobalController;