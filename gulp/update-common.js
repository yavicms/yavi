const config = require("./config");

const gulp = require("gulp");

const sass = require('gulp-dart-sass');

const babel = require("gulp-babel");
const browserify = require("gulp-browserify");
const babelify = require("babelify");
const minify = require("gulp-uglify");

const compressed = {};

if (!config.dev) compressed.outputStyle = "compressed";

function log($src, $dest) {
    console.log(
        "\n\nsrc: ", $src[0],
        "\ndest: ", $dest);
}

const UpdateCommon = module.exports = {
    CMSstatus: {
        error: false,
        success: false
    },
    ProjectStatus: {
        error: false,
        success: false
    },
    css($src, $dest) {

        gulp.src($src)
            .pipe(sass(compressed).on('error', sass.logError))
            .on("error", (e) => config.dev && console.log(e.toString()))
            .pipe(gulp.dest($dest));
    },
    jsx($src, $dest, key) {

        UpdateCommon[key].success = false;
        UpdateCommon[key].error = false;

        gulp.src($src)
            .pipe(babel(config.babel.jsx))
            .on("end", () => UpdateCommon[key].success = true)
            .on("error", function (e) {
                if (config.dev) console.log(e);
                UpdateCommon[key].error = true;
            })
            .pipe(gulp.dest($dest));
    },
    waitJS($src, $dest, key) {
        let count = 0;

        setInterval(function run() {
            if (count++ > 10 || UpdateCommon[key].error) return clearInterval(run);
            if (!UpdateCommon[key].success) return;

            clearInterval(run);
            UpdateCommon.js($src, $dest, key);
        }, 100);
    },
    jsdev($src, $dest, key) {
        gulp.src($src)
            .pipe(browserify({
                transform: [babelify.configure(config.babel.js)]
            }))
            // .on("end", function (e) {
            //     UpdateCommon[key].success = false;
            //     UpdateCommon[key].error = false;
            // })
            .on("error", (e) => console.log(e))
            .pipe(minify())
            .pipe(gulp.dest($dest));
    },
    jspro($src, $dest, key) {
        gulp.src($src)
            .pipe(browserify({
                transform: [babelify.configure(config.babel.js)]
            }))
            // .on("end", function (e) {
            //     UpdateCommon[key].success = false;
            //     UpdateCommon[key].error = false;
            // })
            .pipe(minify())
            .pipe(gulp.dest($dest));
    },
    js($src, $dest, key) {
        config.dev
            ? UpdateCommon.jsdev($src, $dest, key)
            : UpdateCommon.jspro($src, $dest, key);
    }
}