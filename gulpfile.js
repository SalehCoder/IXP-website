const gulp = require('gulp');
const headerfooter = require('gulp-headerfooter');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;


// Message task
gulp.task('message', function(done) {
    console.log('Gulp is running...');
    done();
});

// Copy all files
gulp.task('copy', function (done) {
   gulp.src(['src/**/!(*.html)', 'src/**/**/!(*.html)'])
    .pipe(gulp.dest('dist'));
    done();
});
 
// Scripts  - combines files into one file
gulp.task('de-template', function(done) {
    gulp.src('src/*.html')
    .pipe(headerfooter.header('./src/partials/header.html'))
    .pipe(headerfooter.footer('./src/partials/footer.html'))
    .pipe(gulp.dest('dist/'));
    done();
});

// Emptying dist directory
gulp.task('clean', function(done){
    console.log('Emptying dist directory...');
    del.sync('dist/**/*', {force:true});
    done();
});

// Default task
gulp.task('default', gulp.series('message', 'clean', 'copy', 'de-template'), function() {
    done();
});

gulp.task('watch', function() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

	gulp.watch(['src/*.html', 'src/partials/*'], gulp.series('copy','de-template')).on("change", reload);;
});


