const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');
const kit = require('gulp-kit-2');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const svgmin = require('gulp-svgmin');
const path = require('path');
const svgstore = require('gulp-svgstore');
const browserSync = require('browser-sync').create();
// const sourcemaps = require('gulp-sourcemaps');
const paths = {
  modules: './node_modules/',
  src: './src',
  dist: './dist',
};
const { src, dest, series, parallel, watch, task } = require('gulp');

const jsModulePrefix = 'module-*.js';

/**
 * Workaround for browsersyncReload fires only once
 */
const reload = (done) => {
  browserSync.reload();
  done();
};

const bundles = ['slider', 'counter', 'splash'];

/**
 * Compiles js file to bundle
 */
const scripts = (done) => {
  bundles.forEach((bundle) => {
    src(`${paths.src}/js/${bundle}.js`)
      .pipe(
        babel({
          presets: [
            '@babel/preset-env',
            [
              'minify',
              {
                builtIns: false,
              },
            ],
          ],
          comments: false,
        }),
      )
      .pipe(concat(`${bundle}.bundle.js`))
      .pipe(dest(`${paths.dist}/js`));
  });

  return src(`${paths.src}/js/${jsModulePrefix}`)
    .pipe(
      babel({
        presets: ['@babel/preset-env', 'minify'],
        comments: false,
      }),
    )
    .pipe(concat('main.bundle.js'))
    .pipe(dest(`${paths.dist}/js`));
};

/**
 * Coompiles SASS files to css bundle
 */
const css = (done) =>
  src(`${paths.src}/sass/screen.scss`)
    // .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 2 versions'],
        }),
        uncss({
          html: [`${paths.dist}/*.html`],
          ignore: [
            /\.error-message.*/,
            /\.form-error.*/,
            /.*is-active.*/,
            /\.overflow.*/,
            /.*is-open.*/,
            /.*loaded.*/,
            /.*embed-responsive.*/,
            /.*embed-responsive-16by9.*/,
          ],
        }),
      ]),
    )
    // .pipe(sourcemaps.write())
    .pipe(dest(`${paths.dist}/css`));

/**
 * Runs dev server
 */
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      routes: {
        '/components': 'components',
      },
    },
  });

  done();
};

/**
 * Compiles .kit files to .html files
 */
const html = (done) => {
  src(`${paths.src}/*.kit`).pipe(kit()).pipe(dest(paths.dist));
  done();
};

/**
 * Copies images from src to dist direcotry
 */
const copyImages = (done) => {
  src(`${paths.src}/images/**/*.*`).pipe(dest(`${paths.dist}/images`));
  done();
};

/**
 * Minifies images
 */
const minifyImages = (done) => {
  src(`${paths.src}/images/**/*.+(png|jpg|jpeg|gif)`)
    // Caching images that ran through imagemin
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        }),
      ),
    )
    .pipe(dest(`${paths.dist}/images`));
  done();
};

/**
 * Watches for changes in source files
 */
const watchdog = (done) => {
  watch(`${paths.src}/sass/**/*.scss`, series(css, reload));
  watch(`${paths.src}/**.kit`, series(html, reload));
  watch(`${paths.src}/js/*.js`, series(scripts, reload));
  watch(`${paths.src}/images/**/*.*`, series(minifyImages, copyImages));
  watch(`${paths.src}/images/icons/*.svg`, series(svg, html, reload));
  done();
};

/**
 * Merges svg icons into one build file
 */
const svg = (done) => {
  src(`${paths.src}/images/icons/*.svg`)
    .pipe(
      svgmin((file) => {
        const prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [
            {
              cleanupIDs: {
                prefix: `${prefix}-`,
                minify: true,
              },
            },
          ],
        };
      }),
    )
    .pipe(svgstore())
    .pipe(dest(`${paths.dist}/images/icons/`));
  done();
};

exports.scripts = scripts;
exports.css = css;
exports.html = html;
exports.server = server;
exports.imagesMin = minifyImages;
exports.imagesCopy = copyImages;
exports.watch = series(html, css, scripts, svg, watchdog, server);
exports.svg = svg;
exports.default = series(html, css, scripts, svg, watchdog, server);
