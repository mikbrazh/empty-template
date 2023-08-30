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
      webp         = require('gulp-webp'),
      ttf2woff2    = require('gulp-ttf2woff2'),
      fonter       = require('gulp-fonter'),
      svgsprite    = require('gulp-svg-sprite'),
      browsersync  = require('browser-sync').create();

const config = {
        syntax:           'scss',
        src:              'src',
        dist:             'dist',
        pages:            'C:/Users/admin/Desktop/Github/mikbrazh.github.io',
        sitename:         'sitename'
      }

// На будущее:
// gulp png sprites - не нужен
// gulp favicons - не нужен
// настроить автозаполнение путей +
// подумать нужен ли bower - не нужен
// gulp-avif - не нужен
// gulp-webp +
// gulp-fonter +
// gulp-svg-sprite +
// watch img +

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
// Обработка sass/scss
function buildstyles() {
  return src(''+config.src+'/'+config.syntax+'/style.'+config.syntax+'')
    // .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({overrideBrowserslist: ['> 0.2%, last 10 versions, Firefox ESR']}))
    // .pipe(sourcemaps.write())
    // .pipe(csso()) // Минификация css
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream());
}

// Обработка вендорных sass/scss и css
function buildvendorstyles() {
  // Обработка sass/scss
  return src(''+config.src+'/'+config.syntax+'/vendor.'+config.syntax+'')
    // .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write())

    // Обработка css
    .pipe(src([''+config.src+'/css/*.css', '!'+config.src+'/css/_*.css']))
    // .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    
    .pipe(concat('vendor.min.css'))
    // .pipe(sourcemaps.write())
    // .pipe(csso()) // Минификация css
    .pipe(dest(''+config.dist+'/css/'))
    .pipe(browsersync.stream());
}

// РАБОТА С JS
// Обработка js
function buildjs() {
  return src(''+config.src+'/js/main.js')
    // .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(concat('main.min.js'))
    // .pipe(sourcemaps.write())
    // .pipe(uglify()) // Минификация js
    .pipe(dest(''+config.dist+'/js'))
    .pipe(browsersync.stream());
}

// Обработка вендорных js
function buildvendorjs() {
  return src([
    ''+config.src+'/vendor/vendor.js', // Сюда добавляем js библиотеки
    // ''+config.src+'/vendor/swiper/_dist/swiper-bundle.min.js',
    // ''+config.src+'/vendor/canvi/canvi.js',
    // ''+config.src+'/vendor/fslightbox-basic-3.4.1/fslightbox.js',
    ])
    // .pipe(sourcemaps.init()) // Для работы должна быть отключена минификация
    .pipe(concat('vendor.min.js'))
    // .pipe(sourcemaps.write())
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

// Конвертация в webp
function buildwebp() {
  return src(''+config.src+'/img/**/*.{jpg,jpeg,png}')
  .pipe(webp( {quality: 50} ))
  .pipe(dest(''+config.dist+'/img/webp/'));
}

// Удаление img в каталоге webp
function killwebp() {
  return src(''+config.dist+'/img/webp/', {allowEmpty: true})
    .pipe(clean());
}

// Создание SVG спрайта
// More complex configuration example
const svgspriteConfig = {
  shape: {
    dimension: { // Set maximum dimensions
      maxWidth: 32,
      maxHeight: 32
    },
    spacing: { // Add padding
      padding: 10
    },
    dest: '/intermediate-svg/' // Keep the intermediate files
  },
  mode: {
    view: { // Activate the «view» mode
      bust: false,
      render: {
        css: true, // Activate CSS output (with default options)
        scss: true // Activate Sass output (with default options)
      }
    },
    symbol: true // Activate the «symbol» mode
  }
};

function buildsvgsprite() {
  return src(''+config.src+'/img/for_svg_sprite/**/*.svg')
  .pipe(svgsprite(svgspriteConfig))
  .pipe(dest(''+config.dist+'/img/svgsprite/'));
}

// Удаление img в каталоге webp
function killsvgsprite() {
  return src(''+config.dist+'/img/svgsprite/', {allowEmpty: true})
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

// Конвертация в woff
function buildwoff() {
  return src(''+config.src+'/fonts/**/*.ttf')
  .pipe(fonter({
    formats: ['woff'],
  }))
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
  watch([''+config.src+'/img/**/*'], parallel(buildimg1x, buildimg2x, buildsvg, buildwebp, buildsvgsprite));
  watch(''+config.src+'/'+config.syntax+'/**/*.'+config.syntax+'', buildstyles);
  watch([''+config.src+'/'+config.syntax+'/vendor.'+config.syntax+'', ''+config.src+'/css/*.css'], buildvendorstyles);
  watch(''+config.src+'/js/**/*.js', buildjs);
  watch(''+config.src+'/vendor/**/*.*', buildvendorjs);
  watch([''+config.src+'/index.html', ''+config.src+'/html/**/*.html', '!'+config.src+'/html/_buffer/_index.html'], series(includehtml, buildhtml));
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
exports.buildwebp         = buildwebp;
exports.killwebp          = killwebp;
exports.buildsvgsprite    = buildsvgsprite;
exports.killsvgsprite     = killsvgsprite;
exports.buildfavico       = buildfavico;
exports.buildfavimg       = buildfavimg;
exports.killfav           = killfav;
exports.buildttf          = buildttf;
exports.buildwoff         = buildwoff;
exports.buildwoff2        = buildwoff2;
exports.killfonts         = killfonts;
exports.buildpages        = buildpages;
exports.killpages         = killpages;
exports.killdist          = killdist;

exports.buildimg          = parallel(buildimg1x, buildimg2x, buildsvg, buildwebp);
exports.killimg           = parallel(killimg1x, killimg2x, killsvg, killwebp);
exports.buildfav          = parallel(buildfavico, buildfavimg);
exports.buildfonts        = parallel(buildttf, buildwoff, buildwoff2);

exports.build             = series(killdist, parallel(series(includehtml, buildhtml), buildimg1x, buildimg2x, buildsvg, buildwebp, buildfavico, buildfavimg, buildttf, buildwoff, buildwoff2, buildstyles, buildvendorstyles, buildjs, buildvendorjs));

exports.default           = parallel(series(includehtml, buildhtml), buildstyles, buildvendorstyles, buildjs, buildvendorjs, sync, watching);
