var gulp = require('gulp') ;
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass', function() {
		return gulp.src('./app/scss/**/*.scss')
							 .pipe(sass())
							 .pipe(gulp.dest('./app/css'))
							 .pipe(browserSync.reload({
							 	stream: true
							 })) ;
}) ;

gulp.task('copy', function() {
	gulp.src('./node_modules/material-design-lite/material.min.css') 
	    .pipe(gulp.dest('./app/css/')) ;
	gulp.src('./node_modules/material-design-lite/material.min.js') 
	    .pipe(gulp.dest('./app/js/')) ;
});

gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: {
		  baseDir: './app/' 
		} , 
		browser: "firefox"
	}); 
	gulp.watch("./app/scss/**/*.scss",  ['sass']);
	gulp.watch("./app/**/*.html").on('change',  browserSync.reload);
}); 

gulp.task('default', ['copy', 'serve']) ;
