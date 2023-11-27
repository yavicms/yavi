const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(13);

module.exports = class UserForm {
    login = [];
    name = {};
    props = [];
    constructor(data) {
        if (typeof data === "object") Object.assign(this, data);
    }

    set email(value) {
        this.login.push({ k: "email", v: value });
    }
    set phone(value) {
        this.login.push({ k: "phone", v: value });
    }

    set firstname(name) {
        this.name.first = name;
    }
    set lastname(name) {
        this.name.last = name;
    }

    get data() {
        this.fullname = this.name.first + " " + this.name.last;
        this.password = bcrypt.hashSync(this.password, salt);
        return this;
    }
}