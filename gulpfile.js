const {series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/img/**/*',  // * = La carpeta actual - ** = Todos los archivos con esa extension
    scss: 'src/scss/**/*.scss',
    destImg: './build/img',
    js: 'src/JS/**/*.js'
}

// Función para compilar SASS
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'))

}

// Funcion para JS
function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix:'.min'}))
        .pipe(dest('./build/js'))
}

// Función para minificar imagenes
function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest(paths.destImg))
        .pipe(notify({message: 'Imagen Minificada'}))
}

// Función para convertir img a  formato webp
function vWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest(paths.destImg))
        .pipe(notify({message: 'Version webP lista'}))
}

// Función para aplicar cambios en tiempo real 
function watchArchivos() {
    watch(paths.scss, css);
    watch(paths.js, javascript);
}


exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.vWebp = vWebp;
exports.watchArchivos = watchArchivos;

exports.cssjs = parallel(css, javascript)
exports.default = series(css, javascript, imagenes, vWebp, watchArchivos);
