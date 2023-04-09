alert('qweqwe');


// Отслеживание медиа-запросов
// (function () {
//   // Создаем список медиа-запросов
//   const mediaQueryList = window.matchMedia('(min-width: 0) and (max-width: 1503.98px)');

//   // Колбэк функция (обработчик событий)
//   function handleWidthChange(mql) {
//     const carousel = document.querySelector('.carousel');
//     const carouselWrapper = document.querySelector('.carousel-wrapper');

//     if (mql.matches) {
//       carousel.classList.add('swiper');
//       carouselWrapper.classList.add('swiper-wrapper')
//     }
//     else {
//       carousel.classList.remove('swiper');
//       carouselWrapper.classList.remove('swiper-wrapper')
//     }
//   }
//   // Запускаем обработчик событий
//   handleWidthChange(mediaQueryList);

//   // Добавляем колбэк функцию в качестве прослушивателя событий в список запросов
//   mediaQueryList.addEventListener('change', handleWidthChange);
// })();