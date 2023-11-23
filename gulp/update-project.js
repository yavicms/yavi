const is = require("./is");
const config = require("./config");
const UpdateCommon = require("./update-common");
const watch = require("gulp-watch");

module.exports = function UpdateProject(next) {

    /**
     *  Chuyển từ JSX sang JS
     */
    // watch(config.project.jsx.watch, function (file) {

    //     let $exp = is.Plugin.exec(file.path), $dest;

    //     if (!$exp || $exp.length !== 4) return;

    //     $dest = [$exp[1], $exp[2], $exp[3], "public"].join("/");

    //     UpdateCommon.jsx($dest + "/jsx/**/*.jsx", $dest + "/js", "ProjectStatus");
    // });

    /**
     *  Gom các file JS thành 1 file JS nhờ sử dụng hàm require,
     *  sau đó nén file đó lại.
     *  sử dụng 
     */
    watch(config.project.js.watch, function (file) {

        let $exp = is.Plugin.exec(file.path), $dest;

        if (!$exp || $exp.length !== 4) return;

        $dest = [$exp[1], $exp[2], $exp[3], "public"].join("/");

        UpdateCommon.js($dest + "/js/*.js", $dest + "/main", "ProjectStatus");
    });

    next();
}