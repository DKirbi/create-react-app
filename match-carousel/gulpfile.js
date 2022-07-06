const { src, dest, watch } = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));

compileSass.compiler = require('node-sass');

const bundleSass = () => {
  return src('./src/sass/**/*.scss')
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(dest('./src/css/'));
};

const watchSass = () => {
  watch('./src/sass/**/*.scss', bundleSass);
};

exports.bundleSass = bundleSass;
exports.watchSass = watchSass;
