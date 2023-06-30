const {src, dest, watch, parallel, series} = require('gulp');

const fileinclude  = require('gulp-file-include'),
      htmlmin      = require('gulp-htmlmin'),
      sass         = require('gulp-sass')(require('sass')),
      sourcemaps   = require('gulp-sourcemaps'),
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
      ttf2woff2    = require('gulp-ttf2woff2'),
      browsersync  = require('browser-sync').create();

const config = {
        syntax:           'scss',
        src:              'src',
        dist:             'dist',
        pages:            'C:/Users/admin/Desktop/Github/mikbrazh.github.io',
        sitename:         'sitename'
      }

// На будущее:
//   gulp png sprites
//   gulp svg sprites
//   gulp favicons
//   настроить автозаполнение путей
//   подумать нужен ли bower

// РАБОТА С HTML

// Подключение html в html
function includehtml() {
  return src(''+config.src+'/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: ''+config.src+'/html/'
    }))
    .pipe(rename('_index.html')) // Буферный файл для последующей обработки в buildhtml
    .pipe(dest(''+config.src+'/html/_buffer'))
}

// Обработка html
function buildhtml() {
  return src(''+config.src+'/html/_buffer/_index.html')
    // .pipe(htmlmin({collapseWhitespace: true})) // Минификация html
    .pipe(rename('index.html'))
    .pipe(dest(config.dist))
    .pipe(browsersync.stream());
}

// РАБОТА С CSS

// Обработка css
function buildcss() {
  return src(''+config.src+'/css/*.css')
    .pipe(rename({suffix: '.min', prefix: ''}))
    // .pipe(csso()) // Минификация css
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream())
}

// Обработка sass/scss
function buildstyles() {
  return src(''+config.src+'/'+config.syntax+'/style.'+config.syntax+'')
    .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({overrideBrowserslist: ['> 0.2%, last 10 versions, Firefox ESR']}))
    .pipe(sourcemaps.write())
    // .pipe(csso()) // Минификация css
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream());
}

// Обработка вендорных sass/scss
function buildvendorstyles() {
  return src(''+config.src+'/'+config.syntax+'/vendor.'+config.syntax+'')
    .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(concat('vendor.min.css'))
    // .pipe(csso()) // Минификация css
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream());
}

// РАБОТА С JS

// Обработка js
function buildjs() {
  return src(''+config.src+'/js/main.js')
    .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    // .pipe(uglify()) // Минификация js
    .pipe(dest(''+config.dist+'/js'))
    .pipe(browsersync.stream());
}

// Обработка вендорных js
function buildvendorjs() {
  return src([
    ''+config.src+'/vendor/vendor.js', // Сюда добавляем js библиотеки
    ])
    .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(concat('vendor.min.js'))
    .pipe(sourcemaps.write())
    // .pipe(uglify()) // Минификация js
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

// РАБОТА С ФАВИКОНКАМИ

// Обработка фавиконок img
function buildfavimg() {
  return src([''+config.src+'/fav/*.*', '!'+config.src+'/fav/favicon.ico', '!'+config.src+'/fav/Thumbs.db', '!'+config.src+'/fav/*.DS_Store'])
    .pipe(dest(''+config.dist+'/img/fav/'));
}

// Обработка фавиконок ico
function buildfavico() {
  return src([''+config.src+'/fav/favicon.ico', ''+config.src+'/manifest/manifest.json', ''+config.src+'/manifest/browserconfig.xml', ''+config.src+'/manifest/ht.access'])
    .pipe(dest(config.dist));
}

// Удаление фавиконок
function killfav() {
  return src([''+config.dist+'/img/fav/', ''+config.dist+'/*.ico', ''+config.dist+'/manifest.json', ''+config.dist+'/browserconfig.xml', ''+config.dist+'/ht.access'], {allowEmpty: true})
    .pipe(clean());
}

// РАБОТА СО ШРИФТАМИ

// Обработка ttf и других
function buildttf() {
  return src(''+config.src+'/fonts/**/*')
    .pipe(dest(''+config.dist+'/fonts/'));
}

// Конвертация в woff2
function buildwoff2() {
  return src(''+config.src+'/fonts/**/*.ttf')
  .pipe(ttf2woff2())
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

// УДАЛЕНИЕ DIST

function killdist() {
  return src(config.dist, {allowEmpty: true})
    .pipe(clean({force: true}));
}

// ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЙ

function watching() {
  watch(''+config.src+'/css/**/*.css', buildcss);
  watch(''+config.src+'/'+config.syntax+'/**/*.'+config.syntax+'', buildstyles);
  // watch([''+config.src+'/'+config.syntax+'/style.'+config.syntax+'',
  //        ''+config.src+'/'+config.syntax+'/_sections/*.'+config.syntax+''], buildstyles);
  watch(''+config.src+'/'+config.syntax+'/vendor.'+config.syntax+'', buildvendorstyles);
  watch(''+config.src+'/js/**/*.js', buildjs);
  watch(''+config.src+'/vendor/**/*.*', buildvendorjs);
  watch([''+config.src+'/index.html', ''+config.src+'/html/*.html'], series(includehtml, buildhtml));
}

// СИНХРОНИЗАЦИЯ В БРАУЗЕРЕ
function sync() {
  browsersync.init({
    server: {
      baseDir: ''+config.dist+'/'
    }
  });
}

exports.includehtml       = includehtml;
exports.buildhtml         = buildhtml;
exports.buildcss          = buildcss;
exports.buildstyles       = buildstyles;
exports.buildvendorstyles = buildvendorstyles;
exports.buildjs           = buildjs;
exports.buildvendorjs     = buildvendorjs;
exports.buildimg1x        = buildimg1x;
exports.buildimg2x        = buildimg2x;
exports.killimg1x         = killimg1x;
exports.killimg2x         = killimg2x;
exports.buildsvg          = buildsvg;
exports.killsvg           = killsvg;
exports.buildfavico       = buildfavico;
exports.buildfavimg       = buildfavimg;
exports.killfav           = killfav;
exports.buildttf          = buildttf;
exports.buildwoff2        = buildwoff2;
exports.killfonts         = killfonts;
exports.buildpages        = buildpages;
exports.killpages         = killpages;
exports.killdist          = killdist;

exports.buildimg          = parallel(buildimg1x, buildimg2x, buildsvg);
exports.killimg           = parallel(killimg1x, killimg2x, killsvg);
exports.buildfav          = parallel(buildfavico, buildfavimg);
exports.buildfonts        = parallel(buildttf, buildwoff2);

exports.build             = series(killdist, parallel(series(includehtml, buildhtml), buildimg1x, buildimg2x, buildsvg, buildfavico, buildfavimg, buildttf, buildwoff2, buildcss, buildstyles, buildvendorstyles, buildjs, buildvendorjs));

exports.default           = parallel(series(includehtml, buildhtml), buildcss, buildstyles, buildvendorstyles, buildjs, buildvendorjs, sync, watching);