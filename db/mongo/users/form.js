
module.exports = class UserForm {

    props = [];
    search = [];
    login = [];
    public = {};

    constructor(data) {
        if (typeof data === "object") Object.assign(this, data);
    }

    set email(value) {
        this.login.push({ k: "email", v: value });
    }
    set phone(value) {
        this.login.push({ k: "phone", v: value });
    }

    set role(role) {
        if (!this.public.role) {
            this.props.push({ k: "role", v: role });
            this.public.role = role;
        }
    }

    set fullname(name) {
        this.search.push({ k: "fullname", v: name });
        this.public.fullname = name;
    }
    set username(username) {
        this.search.push({ k: "username", v: username });
        this.public.username = username;
    }
    set firstname(name) {
        this.public.firstname = name;
    }
    set lastname(name) {
        this.public.lastname = name;
    }
    get register() {

        let time = new Date();

        this.props.push({ k: "createdAt", v: time });
        this.public.createdAt = time;

        this.role = "user";

        // this.fullname = this.public.firstname + " " + this.public.lastname;

        return this;
    }
}