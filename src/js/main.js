(function() {

  // Активация гамбургера START
  // const headerHamburger = document.querySelector('.header__hamburger');
  
  // headerHamburger.addEventListener('click', ()=> {
  //   headerHamburger.classList.toggle('is-active');
  // });
  // Активация гамбургера END

  // Активация навигации в сайдбаре START
  const sidebarListLinks = document.querySelectorAll('.sidebar__list-link');
  const sidebarListItems = document.querySelectorAll('.sidebar__list-item');

	sidebarListLinks.forEach(function (listLink) {
		listLink.addEventListener('click', function(e) {
			e.stopPropagation();
      sidebarListItems.forEach(function (listItem) {
        if (listItem.classList.contains('sidebar__list-item--is-active')) {
          listItem.classList.remove('sidebar__list-item--is-active')
        }
      });
			listLink.parentElement.classList.add('sidebar__list-item--is-active');
		});
	});
  // Активация навигации в сайдбаре END

  // Swipers START
  const mainPromoSwiper = new Swiper('.main-promo-swiper', {
    // Default parameters
    direction: 'horizontal',
    loop: true,
    speed: 500,
    slidesPerView: 1,
    navigation: {
      nextEl: '.main-promo-swiper__button-next',
      prevEl: '.main-promo-swiper__button-prev',
    },
    pagination: {
      el: '.main-promo-swiper__pagination',
    },
  });

  const ourDoctorsSwiper = new Swiper('.our-doctors-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 4,
      spaceBetween: 30,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 2,
          spaceBetween: 8
        },
         // when window width is >= 768px
         768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
         // when window width is >= 992px
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      navigation: {
        nextEl: '.our-doctors-swiper__button-next',
        prevEl: '.our-doctors-swiper__button-prev',
      },
  });

  const workExamplesSwiper = new Swiper('.work-examples-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 2,
      spaceBetween: 30,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        },
         // when window width is >= 992px
        992: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
      navigation: {
        nextEl: '.work-examples-swiper__button-next',
        prevEl: '.work-examples-swiper__button-prev',
      },
      pagination: {
        el: '.work-examples-swiper__pagination',
      },
  });

  const patientReviewsSwiper = new Swiper('.patient-reviews-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 3,
      spaceBetween: 30,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        },
         // when window width is >= 992px
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      navigation: {
        nextEl: '.patient-reviews-swiper__button-next',
        prevEl: '.patient-reviews-swiper__button-prev',
      },
      pagination: {
        el: '.patient-reviews-swiper__pagination',
      },
  });

  const moreServicesSwiper = new Swiper('.more-services-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 4,
      spaceBetween: 30,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 2,
          spaceBetween: 8
        },
         // when window width is >= 992px
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },

      pagination: {
        el: '.more-services-swiper__pagination',
      },
  });

  const doctorsAdviceSwiper = new Swiper('.doctors-advice-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 3,
      spaceBetween: 30,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 1.5,
          spaceBetween: 9
        },
         // when window width is >= 992px
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },

      navigation: {
        nextEl: '.doctors-advice-swiper__button-next',
        prevEl: '.doctors-advice-swiper__button-prev',
      },
  });

  const clinicsLifeSwiper = new Swiper('.clinics-life-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 'auto',
          spaceBetween: 8
        },
         // when window width is >= 992px
        992: {
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
      },

      pagination: {
        el: '.clinics-life-swiper__pagination',
      },
      
  });

  const certificatesSwiper = new Swiper('.certificates-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 3,
      spaceBetween: 18,
      centeredSlides: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 2.5,
          spaceBetween: 10
        },
         // when window width is >= 992px
        992: {
          slidesPerView: 3,
          spaceBetween: 18,
        },
      },

      navigation: {
        nextEl: '.certificates-swiper__button-next',
        prevEl: '.certificates-swiper__button-prev',
      },
  });

  const articleSwiper = new Swiper('.article-swiper', {
      // Default parameters
      direction: 'horizontal',
      loop: true,
      speed: 500,
      slidesPerView: 3,
      spaceBetween: 30,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 0px
        0: {
          slidesPerView: 1.5,
          spaceBetween: 9
        },
         // when window width is >= 992px
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },

      navigation: {
        nextEl: '.article-swiper__button-next',
        prevEl: '.article-swiper__button-prev',
      },
  });
  // Swipers END

})();