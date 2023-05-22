import  ApiClient from "./api_client";
import user from "../models/user";
class ReportController{
    constructor(apiClient) {
        /** @type {ApiClient} */
        this.apiClient = apiClient;
    }

    async downloadAll(){
        const config = {
            method: "get",
            url: `https://plant.tanmoy.online/report/all`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.apiClient.token
            },
            responseType: "blob"
        }
        let res = await ApiClient.axiosClient(config);
        let blob = new Blob([res.data]);
        const urlBlob = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = "report.xlsx";
        a.click();
        URL.revokeObjectURL(urlBlob);
    }

    async downloadForUser(user_id){
        const config = {
            method: "get",
            url: `https://plant.tanmoy.online/report/`+user_id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.apiClient.token
            },
            responseType: "blob"
        }
        let res = await ApiClient.axiosClient(config);
        let blob = new Blob([res.data]);
        const urlBlob = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = "report.xlsx";
        a.click();
        URL.revokeObjectURL(urlBlob);
    }

}


module.exports = ReportController