const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(13);

module.exports = class UserForm {

    props = [];
    search = [];
    name = {};
    _has_role = 0;

    constructor(data) {
        if (typeof data === "object") Object.assign(this, data);
    }

    set email(value) {
        this.props.push({ k: "email", v: value });
    }
    set phone(value) {
        this.props.push({ k: "phone", v: value });
    }

    set firstname(name) {
        this.name.first = name;
    }
    set lastname(name) {
        this.name.last = name;
    }

    set fullname(name) {
        this.search.push({ k: "name", v: name });
    }

    set role(role) {
        if (!this._has_role) {
            this.props.push({ k: "role", v: role });
            this._has_role = 1;
        }
    }

    set username(username) {
        let data = { k: "username", v: username };
        this.props.push(data);
        this.search.push(data);
    }

    get data() {

        this.role = "user";

        this.fullname = this.name.first + " " + this.name.last;
        this.password = bcrypt.hashSync(this.password, salt);

        return this;
    }
}