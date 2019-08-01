"use strict";

var gulp = require('gulp'),
	server = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	hash = require('gulp-rev-append');
	
gulp.task('imagemin', function(done) {
	return gulp.src('img--save/**/*.{png,jpg,gif}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
		]))
	.pipe(gulp.dest('img'));
	done();
});

gulp.task('hash', function(done) {
	gulp.src('index--basic.html')
		.pipe(hash())
		.pipe(rename("index.html"))
		.pipe(gulp.dest('./'))
		.pipe(server.reload({stream: true}));
	done();
});

gulp.task('watcher', function(done) {
	server.init({server: ''});
	gulp.watch(['index--basic.html', 'css/my_style.css'], gulp.series('hash'));
	done();
});