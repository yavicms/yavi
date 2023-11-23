const is = require("./is");
const config = require("./config");
const UpdateCommon = require("./update-common");

const watch = require("gulp-watch");

module.exports = function UpdateCSS(next) {

    watch(config.project.scss.watch, function (file) {

        let $exp = is.Plugin.exec(file.path);

        if (!$exp || $exp.length !== 4) return;

        let $dest = [$exp[1], $exp[2], $exp[3], "public"].join("/");

        let $info = {
            scss: {
                src: $dest + "/scss/**/*.scss",
                dest: $dest + "/css"
            },
            css: {
                src: $dest + "/css/*.css",
                dest: $dest + "/main"
            }
        };

        UpdateCommon.css($info.scss.src, $info.css.dest);
    });

    next();
}