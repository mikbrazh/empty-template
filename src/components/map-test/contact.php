<?php
/*
Template Name: Контакты
*/
get_header(); ?>

<!-- contact-page START -->
<div class="contact-page">
  <!-- breadcrumbs START -->
  <div class="breadcrumbs-block">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="breadcrumbs">
            <ul class="breadcrumbs__list">
              <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="#">Главная</a></li>
              <li class="breadcrumbs__item">/</li>
              <li class="breadcrumbs__item"><a class="breadcrumbs__link breadcrumbs__link--is-active" href="#">Услуги</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- breadcrumbs END -->

  <!-- contacts START -->
  <section class="contacts">
    <div class="container">
      <div class="contacts-block">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="contacts__content-block">
              <h2 class="contacts__title section-title">Контакты</h2>
              <div class="contacts__info-block">
                <p class="contacts__info-elem contacts__metro">Калужская</p>
                <a class="contacts__info-elem contacts__phone-number" href="tel:+74958773923">+74958773923</a>
                <p class="contacts__info-elem contacts__timetable">Пн-Сб: 9:00 - 19:00</p>
                <p class="contacts__info-elem contacts__address">119421, г.Москва, Ленинский проспект, <br class="d-inline d-lg-none"> дом 111, корп. 1, офис 30</p>
              </div>
            </div>
          </div>
          <div class="elem-lg-min--p-none col-12 col-lg-6">
            <!-- Slider main container -->
            <div class="contacts-swiper">
              <!-- Additional required wrapper -->
              <div class="contacts__swiper-wrapper swiper-wrapper">
                <!-- Slides -->
                <div class="contacts__swiper-slide swiper-slide">
                  <div class="contacts__image-block">
                    <img class="contacts__image img-responsive" src="<?php bloginfo('template_url'); ?>/img/@2x/contacts-img@2x.jpg" alt="Кабинет зубного врача">
                  </div>
                </div>
              </div>
              <!-- If we need navigation buttons -->
              <div class="contacts-swiper__button-prev button-prev-default"></div>
              <div class="contacts-swiper__button-next button-next-default"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- contacts END -->

  <!-- yandex map START -->
  <section class="yandex-map">
    <div class="container">
      <div class="row">
        <div class="col">
            <div id="yandex-map">
              <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4c8b69011551d3539728472c4a429cc2a95f5ba2ddc05556143e980fd31c04ad&amp;width=100%25&amp;height=580&amp;lang=ru_RU&amp;scroll=true"></script>
            </div>
        </div>
      </div>
    </div>
  </section>
  <!-- yandex map END -->

  <!-- certificates START -->
  <section class="certificates">
    <div class="container">
      <div class="certificates-content">
        <div class="row">
          <div class="col-12 col-xl-5">
            <h2 class="certificates__title section-title">Документы <br> и сертификаты</h2>
            <p class="certificates__subtitle">Сложно сказать, почему базовые сценарии поведения пользователей призваны к ответу. <br class="d-inline d-lg-none"> Сделанные на базе интернет-аналитики выводы</p>
          </div>
          <div class="elem-lg-min--p-none col-12 col-xl-7">
            <div class="certificates__carousel-block">
              <!-- Slider main container -->
              <div class="certificates-swiper">
                <!-- Additional required wrapper -->
                <div class="certificates-swiper-wrapper swiper-wrapper">
                  <!-- Slides -->
                  <div class="certificates-swiper-swiper-slide swiper-slide">
                    <div class="certificates__image-block">
                      <img src="<?php bloginfo('template_url'); ?>/img/@2x/certificate-1@2x.jpg" alt="Сертификат компании Liza-Dent"
                        class="certificates__image img-responsive" width="204" height="284">
                    </div>
                  </div>
                  <div class="certificates-swiper-swiper-slide swiper-slide">
                    <div class="certificates__image-block">
                      <img src="<?php bloginfo('template_url'); ?>/img/@2x/license@2x.jpg" alt="Сертификат компании Liza-Dent" class="certificates__image img-responsive"
                        width="204" height="284">
                    </div>
                  </div>
                  <div class="certificates-swiper-swiper-slide swiper-slide">
                    <div class="certificates__image-block">
                      <img src="<?php bloginfo('template_url'); ?>/img/@2x/certificate-2@2x.jpg" alt="Сертификат компании Liza-Dent"
                        class="certificates__image img-responsive" width="204" height="284">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- If we need navigation buttons -->
        <div class="certificates-swiper__button-prev button-prev-default"></div>
        <div class="certificates-swiper__button-next button-next-default"></div>
      </div>
    </div>
  </section>
  <!-- certificates END -->

  <!-- online-consultation START -->
  <section class="online-consultation">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="online-consultation__title">Записаться на онлайн консультацию</h2>
          <p class="online-consultation__subtitle">Получить консультацию врача <br class="d-inline d-lg-none"> стоматолога специалистаили доктора <br class="d-inline"> медицинских наук, в режиме онлайн</p>
          <a href="#" class="online-consultation__registration-button button-default-18">Онлайн - консультация</a>
        </div>
      </div>
    </div>
  </section>
  <!-- online-consultation END -->
</div>
<!-- contact-page END -->

<?php get_footer(); ?>