const {src, dest, watch, parallel, series} = require('gulp');

const htmlmin      = require('gulp-htmlmin'),
      fileinclude  = require('gulp-file-include'),
      sass         = require('gulp-sass')(require('sass')),
      autoprefixer = require('gulp-autoprefixer'),
      concat       = require('gulp-concat'),
      csso         = require('gulp-csso'),
      uglify       = require('gulp-uglify-es').default,
      rename       = require('gulp-rename'),
      clean        = require('gulp-clean'),
      newer        = require('gulp-newer'),
      imageresize  = require('gulp-image-resize'),
      imagemin     = require('gulp-imagemin'),
      svgmin       = require('gulp-svgmin'),
      browsersync  = require('browser-sync').create();

const config = {
        syntax:           'sass',
        src:              'src',
        dist:             'dist',
        pages:            'C:/Users/admin/Desktop/Github/mikbrazh.github.io',
        sitename:         'sitename'
      }

// Сделать:
      // sourcemap
      // png sprite
      // include html +
      // convert fonts
      // svg sprites
      // css +
      // default styles
      // favicons link
      // script link


function include() {
  return src([''+config.src+'/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: ''+config.src+'/html/'
    }))
    .pipe(dest(config.dist));
}


// РАБОТА С КОДОМ

// Обработка html
function buildhtml() {
  return src(''+config.src+'/*.html')
    // .pipe(htmlmin({collapseWhitespace: true})) // Минификация html
    .pipe(dest(config.dist))
    .pipe(browsersync.stream());
}

// Обработка css
function buildcss() {
  return src(''+config.src+'/css/*.css')
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(csso()) // Минификация css
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream())
}

// Обработка sass/scss
function buildstyles() {
  return src(''+config.src+'/'+config.syntax+'/style.'+config.syntax+'')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({overrideBrowserslist: ['> 0.2%, last 10 versions, Firefox ESR']}))
    .pipe(csso()) // Минификация css
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream());
}

// Обработка вендорных sass/scss
function buildvendorstyles() {
  return src(''+config.src+'/'+config.syntax+'/vendor.'+config.syntax+'')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('vendor.min.css'))
    .pipe(csso()) // Минификация css
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream());
}

// Обработка js
function buildjs() {
  return src(''+config.src+'/js/script.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify()) // Минификация js
    .pipe(dest(''+config.dist+'/js'))
    .pipe(browsersync.stream());
}

// Обработка вендорных js
function buildvendorjs() {
  return src([
    ''+config.src+'/vendor/swiper/src/swiper.js', // Сюда добавляем js библиотеки
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify()) // Минификация js
    .pipe(dest(''+config.dist+'/js'))
    .pipe(browsersync.stream());
}

// РАБОТА С ИЗОБРАЖЕНИЯМИ

// Обработка img
function buildimg2x() {
  return src([''+config.src+'/img/**/*.*', '!'+config.src+'/img/**/*.svg', '!'+config.src+'/img/**/*/Thumbs.db', '!'+config.src+'/img/**/*/*.DS_Store'])
    .pipe(rename({suffix: '@2x', prefix: ''}))
    .pipe(newer(''+config.dist+'/img/@2x/'))
    .pipe(imagemin())
    .pipe(dest(''+config.dist+'/img/@2x/'));
}

// Обработка img с уменьшением размера в 2 раза
function buildimg1x() {
  return src([''+config.src+'/img/**/*.*', '!'+config.src+'/img/**/*.svg', '!'+config.src+'/img/**/*/Thumbs.db', '!'+config.src+'/img/**/*/*.DS_Store'])
    .pipe(rename({suffix: '@1x', prefix: ''}))
    .pipe(imageresize({width: '50%'}))
    .pipe(newer(''+config.dist+'/img/@1x/'))
    .pipe(imagemin())
    .pipe(dest(''+config.dist+'/img/@1x/'));
}

// Удаление img в каталоге @2x
function killimg2x() {
  return src(''+config.dist+'/img/@2x/', {allowEmpty: true}) // allowEmpty: true – не выбрасывать исключение и продолжить (если файлы не найдены) 
    .pipe(clean());
}

// Удаление img в каталоге @1x
function killimg1x() {
  return src(''+config.dist+'/img/@1x/', {allowEmpty: true})
    .pipe(clean());
}

// Обработка svg
function buildsvg() {
  return src(''+config.src+'/img/**/*.svg')
    .pipe(svgmin())
    .pipe(dest(''+config.dist+'/img/svg/'));
}

// Удаление svg
function killsvg() {
  return src(''+config.dist+'/img/svg/', {allowEmpty: true})
    .pipe(clean());
}

// Обработка favicons
function buildfav() {
  return src([''+config.src+'/fav/*.*', '!'+config.src+'/fav/Thumbs.db', '!'+config.src+'/fav/*.DS_Store'])
    .pipe(dest(config.dist));
}

// Удаление favicons
function killfav() {
  return src([''+config.dist+'/*.jpg', ''+config.dist+'/*.jpeg', ''+config.dist+'/*.png', ''+config.dist+'/*.svg', ''+config.dist+'/*.ico', ''+config.dist+'/browserconfig.xml', ''+config.dist+'/site.webmanifest'], {allowEmpty: true})
    .pipe(clean());
}

// РАБОТА СО ШРИФТАМИ

// Обработка fonts
function buildfonts() {
  return src(''+config.src+'/fonts/**/*')
    .pipe(dest(''+config.dist+'/fonts/'));
}

// Удаление fonts
function killfonts() {
  return src(''+config.dist+'/fonts/', {allowEmpty: true})
    .pipe(clean());
}

// КОПИРОВАНИЕ В ЛОКАЛЬНЫЙ КАТАЛОГ GITHUB PAGES

// Копирование dist
function buildpages() {
  return src(''+config.dist+'/**/*')
    .pipe(dest(''+config.pages+'/'+config.sitename+''));
}

// Удаление каталога GitHub Pages
function killpages() {
  return src(''+config.pages+'/'+config.sitename+'', {allowEmpty: true})
    .pipe(clean({force: true}));
}

// ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЙ

function watching() {
  watch([''+config.src+'/css/**/*.css'], buildcss);
  watch([''+config.src+'/'+config.syntax+'/style.'+config.syntax+''], buildstyles);
  watch([''+config.src+'/'+config.syntax+'/vendor.'+config.syntax+''], buildvendorstyles);
  watch([''+config.src+'/js/**/*.js'], buildjs);
  watch([''+config.src+'/vendor/**/*.*'], buildvendorjs);
  watch([''+config.src+'/**/*.html'], buildhtml);
}

// СИНХРОНИЗАЦИЯ В БРАУЗЕРЕ
function sync() {
  browsersync.init({
    server: {
      baseDir: ''+config.dist+'/'
    }
  });
}

exports.buildcss = buildcss;
exports.buildstyles = buildstyles;
exports.buildvendorstyles = buildvendorstyles;
exports.buildjs = buildjs;
exports.buildvendorjs = buildvendorjs;
exports.buildhtml = buildhtml;
exports.buildimg1x = buildimg1x;
exports.buildimg2x = buildimg2x;
exports.killimg1x = killimg1x;
exports.killimg2x = killimg2x;
exports.buildsvg = buildsvg;
exports.killsvg = killsvg;
exports.buildfav = buildfav;
exports.killfav = killfav;
exports.buildfonts = buildfonts;
exports.killfonts = killfonts;
exports.buildpages = buildpages;
exports.killpages = killpages;

exports.include = include;

exports.buildimg = parallel(buildimg1x, buildimg2x, buildsvg);
exports.killimg = parallel(killimg1x, killimg2x, killsvg);

exports.default = parallel(buildhtml, buildcss, buildstyles, buildvendorstyles, buildjs, buildvendorjs, sync, watching);
