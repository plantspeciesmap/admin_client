import Tree from "./tree";
import User from "./user";

class Contribution {
    constructor() {
        this.id = null;
        this.name = "";
        this.description = "";
        this.status = null;
        this.latitude = null;
        this.longitude = null;
        this.tree = null;
        this.user = null;
        this.submittedOn = null;
    }

    static fromJson(json) {
        const data = new Contribution();
        if (!json) return data;

        data.id = json.id || data.id;
        data.name = json.name || data.name;
        data.description = json.description || data.description;
        data.status = json.status || data.status;
        data.latitude = json.latitude || data.latitude;
        data.longitude = json.longitude || data.longitude;

        if (json.tree) {
            data.tree = Tree.fromJson(json.tree);
        }

        if (json.user) {
            data.user = User.fromJson(json.user);
        }

        data.submittedOn = json.submittedOn || data.submittedOn;
        return data;
    }

    toJSON() {
        return {
            id: this.id,
            status: this.status,
            latitude: this.latitude,
            longitude: this.longitude,
            tree: {
                id: this.tree.id,
                name: this.tree.name,
                scientificName: this.tree.scientificName
            },
            user: {
                id: this.user.id,
                profile: {
                    name: this.user.profile.name
                }
            },
            submittedOn: this.submittedOn
        };
    }

    static empty(){
        return new Contribution();
    }
}

export default Contribution;