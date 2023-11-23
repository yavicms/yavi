const config = require('./config');
const watch = require("gulp-watch");
const UpdateCommon = require("./update-common");

module.exports = function UpdateCMS(next) {

    /**
     *  Chuyển từ JSX sang JS
     */
    // watch(config.cms.jsx.watch, function (file) {

    //     UpdateCommon.jsx(config.cms.jsx.watch, config.cms.jsx.dest, "CMSstatus");
    // });

    /**
     *  Gom các file JS thành 1 file JS nhờ sử dụng hàm require,
     *  sau đó nén file đó lại.
     *  sử dụng 
     */
    watch(config.cms.js.watch, function (file) {

        UpdateCommon.js(config.cms.js.src, config.cms.js.dest, "CMSstatus");
    });

    next();
}