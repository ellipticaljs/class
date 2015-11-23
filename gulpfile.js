var gulp=require('gulp'),
    fs = require('fs-extra'),
    concat=require('gulp-concat'),
    uglify = require('gulp-uglify'),
    BUILD_NAME='elliptical.class.js',
    BUILD_JSON=require('./build.json'),
    MIN_NAME='elliptical.class.min.js',
    REPO_NAME='elliptical class',
    BOWER='./bower_components',
    BOWER_EC='./bower_components/elliptical-class',
    BOWER_EC_DIST='./bower_components/elliptical-class/dist';
    DIST='./dist';


gulp.task('default',function(){
    console.log(REPO_NAME + ' ..."tasks: gulp build|minify|demo"');
});

gulp.task('build',function(){
    concatFileStream(BUILD_JSON,DIST,BUILD_NAME);
});

gulp.task('minify',function(){
    minFileStream(BUILD_JSON,DIST,MIN_NAME);
});

gulp.task('demo',function(){
    fileStream('./elliptical-class.html',BOWER_EC);
    concatFileStream(BUILD_JSON,BOWER_EC_DIST,BUILD_NAME);
});


function fileStream(src,dest){
    gulp.src(src)
        .pipe(gulp.dest(dest));
}

function concatFileStream(src,dest,name){
    gulp.src(src)
        .pipe(concat(name))
        .pipe(gulp.dest(dest));
}

function minFileStream(src,dest,name){
    gulp.src(src)
        .pipe(concat(name))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
}