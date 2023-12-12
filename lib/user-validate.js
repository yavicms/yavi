const $notext = "";
function removeAscent(str) {
    str = str.replace(/\s/g, $notext).toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

const reg_email = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const validate = {};
const loop = require("./loop");

Object.defineProperties(validate, {
    username: {
        writable: false,
        value: {
            error: "error_username",
            value(value) {
                if (typeof value === "string" && value.length < 100) {

                    value = value.trim();

                    if (/^([a-zA-Z0-9\.]{5,})$/.test(value))
                        return { k: "username", v: value };
                }
            }
        }
    },
    email: {
        writable: false,
        value: {
            error: "error_email",
            value(value) {
                if (typeof value === "string") {

                    value = value.trim();

                    let array = value.split("@"), address;

                    if (array.length === 2) {
                        address = array[1].split(".");
                        address.push(array[0]);

                        if (address.some((part) => part.length < 63)) {
                            if (reg_email.test(value))
                                return { k: "email", v: value };
                        }
                    }
                }
            }
        }
    },
    phone: {
        writable: false,
        value: {
            error: "error_phone",
            value(value) {
                if (typeof value === "string" && value.length < 15) {

                    value = value.trim();

                    if (/^([0-9]{9,})$/.test(value))
                        return { k: "phone", v: value };
                }
            }
        }
    },
    password: {
        writable: false,
        value: {
            error: "error_password",
            value(value) {
                if (typeof value === "string" && value.length < 200) {

                    value = value.replace(/^\s/g, $notext).replace(/\s$/g, $notext);

                    if (/^[^\n\r\t]{8,}$/.test(value))
                        return { k: "password", v: value };
                }
            }
        }
    },
    code: {
        writable: false,
        value: {
            error: "error_code",
            value(value) {
                if (typeof value === "string") {

                    value = value.replace(/^\s/g, $notext).replace(/\s$/g, $notext);

                    if (/^[0-9]{6}$/.test(value))
                        return { k: "code", v: value };
                }
            }
        }
    },
    fullname: {
        writable: false,
        value: {
            error: "error_name",
            value(value, key) {
                if (typeof value === "string" && value.length) {

                    value = value.replace(/\s{2,}/g, " ").trim();

                    if (/^[a-z]{2,50}$/.test(removeAscent(value)))
                        return { k: key, v: value };
                }
            }
        }
    },
    gender: {
        writable: false,
        value: {
            error: "error_gender",
            value(value) {

                switch (value) {
                    case 0:
                    case 1:
                        return { k: "gender", v: value };

                    case "0":
                    case "1":
                        return { k: "gender", v: Number(value) };
                }
            }
        }
    }
});

Object.defineProperties(validate, {
    login: {
        writable: false,
        value: {
            error: "error_login",
            value(value) {
                return validate.email.value(value)
                    || validate.phone.value(value)
                    || validate.username.value(value);
            }
        }
    },
    firstname: {
        writable: false,
        value: validate.fullname
    },
    lastname: {
        writable: false,
        value: validate.fullname
    }
});

module.exports = function Validate(input, fields) {
    return new Promise(function (success, error) {

        let r, error_message, value,
            keys = {}, values = {};

        loop(fields, function (name) {

            if (r = validate[name]) {

                if (value = r.value(input[name], name)) {

                    keys[name] = value.k;
                    values[value.k] = value.v;
                    return;
                }

                error_message = { name, message: r.error };
                return 1;
            }
            else {
                error_message = { name, message: "arror_" + name };
                return 1;
            }
        });

        error_message ? error(error_message) : success({ keys, values });
    });
}