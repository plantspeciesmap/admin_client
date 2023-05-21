class User{
    constructor({id, name, email, role, avatar, points}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.avatar = avatar;
        this.points = points;
    }

    static fromJson(json){
        return new User({
            id: json.id,
            name: (json.profile && json.profile.name) ? json.profile.name : "",
            email: (json.email) ? json.email : "",
            role: json.role ? json.role.toLowerCase() : "unknown",
            avatar: (json.profile && json.profile.avatar) ? json.profile.avatar : "",
            points: (json.profile && json.profile.points) ? json.points : 0
        })
    }

    toJson(){
        return {
            id: this.id,
            email: this.email,
            role: this.role,
            profile: {
                name: this.name,
                avatar: this.avatar,
                points: this.points
            }
        }
    }

    static empty(){
        return new User({
            id: null,
            email: "",
            name: "",
            role: "",
            avatar: "",
            points: 0
        })
    }
}

export default User;