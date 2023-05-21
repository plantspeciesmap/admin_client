
class Tree{
    constructor({id, name, scientificName, description}){
        this.id = id;
        this.name = name;
        this.scientificName = scientificName;
        this.description = description;
    }
    static fromJson(json){
        return new Tree({
            id: json.id,
            name: json.name,
            description: json.description ? json.description : "",
            scientificName: json.scientificName ? json.scientificName : ""
        })
    }

    toJson(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            scientificName: this.scientificName
        }
    }

    isDescriptionBlank(){
        return this.description === undefined || this.description === null
    }

    validate(){
        return this.isDescriptionBlank() && (this.name === null || this.name === undefined || this.name === '');
    }


    get value(){
        return this.name + " (" + this.scientificName + ")";
    }


    static empty(){
        return new Tree({
            id: null,
            name: "",
            description: "",
            scientificName: ""
        })
    }
}

export default Tree;