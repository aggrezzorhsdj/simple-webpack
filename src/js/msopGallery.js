import $ from 'jquery';

import Swiper from 'swiper';

$(document).ready((e) => {
    $('.msProducts__thumb').each((key, value) => {
        let slider = new Swiper($(value).find('#msGallery .swiper-container')[0], {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: false,
            slidesPerGroup: 1,
            paginationClickable: true,
        });
    });
    if(typeof(window.msOptionsPrice) !== 'undefined') {
        window.msOptionsPrice.Tools.setGalleryImage = function (rid, iid) {
            let slide = $('.swiper-slide[data-iid="' + iid + '"]');
            // console.log({rid, iid});
            $(slide).closest('.swiper-container').each((key, container) => {
                container.swiper.slideTo($(slide).index())
            });
        }
    }
})