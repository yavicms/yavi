const gulp = require("gulp");

const UpdateCMS = require("./update-cms");
const UpdateProject = require("./update-project");
const UpdateCSS = require("./update-css");

gulp.task('default', gulp.series(UpdateCMS, UpdateProject, UpdateCSS));
