var gulp = require('gulp');

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

//Default
//gulp.task('default', ['speech']);