var gulp = require('gulp');
var rename = require('gulp-rename');

//Speech
gulp.task('speech', function(){

    return gulp
            .src('./bmo-bankz/vui/src/speech/*')
            .pipe(gulp.dest('./speech'));
});

//Connector Firestore
gulp.task('lbcon_firestore', function(){
    
    return gulp
            .src('./bmo-bankz/client/firestore.js')
            .pipe(gulp.dest('./node_modules/loopback-connector-firestore/lib'));
});

//Middleware Dev
gulp.task('middleware-dev', function(){
    
    return gulp
            .src('./bmo-bankz/server/middleware.dev.json')
            .pipe(rename('middleware.json'))
            .pipe(gulp.dest('./bmo-bankz/server/'));
});

//Middleware Prod
gulp.task('middleware-prod', function(){
    
    return gulp
            .src('./bmo-bankz/server/middleware.prod.json')
            .pipe(rename('middleware.json'))
            .pipe(gulp.dest('./bmo-bankz/server/'));
});

//Default
//gulp.task('default', ['speech']);