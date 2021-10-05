const globby = require('globby');
const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const rimraf = require('rimraf');

gulp.task('build', async function () {
    rimraf.sync('build');
    let workers = globby.sync([
        'src/worker/workers/**'
    ]);
    rollup.rollup({
        input: workers,
        plugins: [
            rollupTypescript({ target: "es5" })
        ]
    }).then(function (bundle) {
        return bundle.write({
            dir: 'dist/workers',
            banner: '/* This file is automatically rebuilt by the worker build process. */',
            format: 'amd'
        });
    })
    // .then(function () {
    //     return streamToPromise(
    //         gulp.src('Build/createWorkers/**').pipe(gulp.dest('Source/Workers'))
    //     );
    // }).then(function () {
    //     rimraf.sync('Build/createWorkers');
    // });
});