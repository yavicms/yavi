const fs = require('fs');

module.exports = function (project_info) {

    Object.defineProperties(project_info.data.public.plugins, {
        "set": {
            writable: false,
            value(list) {
                project_info.data.public.plugins = list;
            }
        },
        "has": {
            writable: false,
            value(name) {
                return project_info.data.public.plugins.indexOf(name) + 1 > 0;
            }
        },
        "add": {
            writable: false,
            value(name) {
                project_info.data.public.plugins.push(name);
            }
        }
    });

    Object.defineProperties(project_info.data.public, {
        "set": {
            writable: false,
            value(key, value) {
                project_info.data.public[key] = value;
            }
        },
        "get": {
            writable: false,
            value(key) {
                return project_info.data.public[key];
            }
        },
        "update": {
            writable: false,
            value() {
                fs.writeFileSync(project_info.file, JSON.stringify(project_info.data, null, "\t"));
            }
        },
        "remove": {
            writable: false,
            value(key) {
                delete project_info.data.public[key];
            }
        },
        "plugins": {
            writable: false,
            value: project_info.data.public.plugins
        }
    });
}