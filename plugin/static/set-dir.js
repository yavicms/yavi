const fs = require("fs");
const { copy } = require("yavi/lib");
const ProjectInfo = require('yavi/plugin/lib/info');

module.exports = function (Plugin) {

    const project_info = {};
    let private_info;

    Object.defineProperties(Plugin, {

        setDir: {
            writable: false,
            value(dir) {
                project_info.dir = dir;
                project_info.file = dir + "/info.json";
                project_info.data = JSON.parse(fs.readFileSync(project_info.file));

                ProjectInfo(project_info);
                private_info = copy(project_info.data.private);
            }
        },

        dir: {
            get() {
                return project_info.dir;
            }
        },

        info: {
            get() {
                return project_info.data.public;
            }
        },

        $info: {
            get() {
                return private_info;
            }
        },

        json: {
            writable: false,
            value(filename, callback) {
                try {
                    let data = JSON.parse(fs.readFileSync(filename));
                    if (!callback) return data;
                    if (data) fs.writeFileSync(filename, JSON.stringify(callback(data), null, "\t"));
                }
                catch (e) { }
            }
        },

        public: {
            writable: false,
            value(filename) {
                return ["/public", this.type, this.name, filename].join("/");
            }
        }
    });
}