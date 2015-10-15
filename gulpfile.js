var gulp = require('gulp'),
  react = require('gulp-react'),
  concat = require('gulp-concat');


gulp.task('js', function(){
  gulp.src([ "./public/js/components/**.js", './public/js/test.js', ])
    .pipe(concat('main.js'))
    .pipe(react())
    .pipe(gulp.dest('./public/build'));
});

gulp.task('default', ['js']);
