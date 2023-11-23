const readline = require('node:readline');
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '(press "help") >> '
});

const TextHelp = `
Hello, now what task would you like to perform?
Use the following commands:\n
create project:name plugin:name theme:name admin:name
create project:name
create project:name plugin:name
create project:name theme:name
create project:name admin:name\n
-> to create a project with the name "name"
-> create a plugin:name in the project:name
-> create a theme:name in the project:name
-> create an admin:name in the project:name\n
`;

const RegexCreate = /(plugin|theme|project|admin):([a-z0-9\-]+)/g;
const IsCreate = /^create/i;
const NodeModuleDir = __dirname + "/node_modules/yavi/create";

function Create(options) {
    CreateProject(options.project);
    CreatePluginThemeAdmin(options, "plugin");
    CreatePluginThemeAdmin(options, "theme");
    CreatePluginThemeAdmin(options, "admin");
    console.log("");
};

function CreateProject(name) {
    let node_modules = [NodeModuleDir, "project"].join("/");
    let dirname = [__dirname, name].join("/");

    if (!fs.existsSync(dirname)) {
        //fs.cpSync(node_modules, dirname);
        console.log(`\nPROJECT "${name}" \thas been created`);
    }
};

function CreatePluginThemeAdmin(options, type) {
    let project = options.project, name = options[type];
    let node_modules = [NodeModuleDir, "project", type, "demo"].join("/");
    let dirname = [__dirname, project, type, name].join("/");

    if (name && !fs.existsSync(dirname)) {
        //fs.cpSync(node_modules, dirname);
        console.log(`${type.toUpperCase()} \t"${name}" \tin PROJECT "${project}" has been created`);
    }
};

rl.prompt();

rl.on("line", function (answer) {
    switch (answer) {

        case "exit":
            rl.close();
            return;

        case "help":
            console.log(TextHelp);
            break;

        default:
            let result = {}, match;

            /**
             *  Nếu không phải là câu lệnh "create" thì hủy lệnh
             */
            if (!IsCreate.test(answer)) break;

            /**
             *  Nếu câu lệnh là tạo (project|plugin|theme|admin)
             *  thì phân tách kết quả thành 1 object.
             */
            while (match = RegexCreate.exec(answer)) {
                const [, key, value] = match;
                result[key] = value;
            }

            /**
             *  Nếu không có kết quả, thì hủy lệnh.
             */
            if (!Object.keys(result).length) break;

            /**
             *  Nếu không có tên Project, thì hủy lệnh
             */
            if (!result.project) {
                console.log("!! Project name cannot be missing\n");
                break;
            }

            /**
             *  Tiến hành tạo Project - Plugin - Theme - Admin
             */
            Create(result);

            break;
    }

    rl.prompt();
});

module.exports = rl;
