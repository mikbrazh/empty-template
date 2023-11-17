/* ======= Main JS START ======= */
(function () {

  if (document.querySelector('header')) {
    /* ======= header-bottom menu START ======= */
    const headerBottomMenuListAllLi = document.querySelectorAll('.header-bottom__menu-list li');
    headerBottomMenuListAllLi.forEach(function (item) {

      const headerBottomMenuListAllLiAlla = item.querySelector('a');
      // Автоматическое добавление стрелки при добавлении нового уровня меню
      (item.querySelector('ul')) ? headerBottomMenuListAllLiAlla.classList.add('header-bottom__menu-link--has-arrow') : headerBottomMenuListAllLiAlla.classList.remove('header-bottom__menu-link--has-arrow');

    });

    const headerBottomMenuList = document.querySelector('.header-bottom__menu-list');
    const headerBottomMenuListDirectLi = document.querySelectorAll('.header-bottom__menu-list > li');

    // Автоматический отступ от правого края, если есть стрелка у последнего пункта
    const lastLi = headerBottomMenuListDirectLi[headerBottomMenuListDirectLi.length - 1];
    const lastA = lastLi.querySelector('a');

    (lastA.classList.contains('header-bottom__menu-link--has-arrow')) ? headerBottomMenuList.classList.add('header-bottom__menu-list--has-margin') : headerBottomMenuList.classList.remove('header-bottom__menu-list--has-margin');
    /* ======= header-bottom menu END ======= */
  }

})();
/* ======= Main JS END ======= */