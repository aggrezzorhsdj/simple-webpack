// import AOS from "aos";

import "lazyload";
import SmoothScroll from "smooth-scroll";
import $ from "jquery";
import Swiper from "swiper";
import 'jquery.inputmask';
import 'inputmask.phone.extensions';
import "inputmask.phone-codes-ru";
import {CustomTabs} from './customTabs';
import './credits';
let im = new Inputmask('phoneru');
im.mask($('input[type="tel"]'));
$(document).ajaxStop(function () {
    let im = new Inputmask('phoneru');
    im.mask($('input[type="tel"]'));
})
let images = document.querySelectorAll(".lazy");
lazyload(images);

let scroll = new SmoothScroll('a[href*="#"]',{
    offset: window.innerWidth >= 992 ? 74/2 : 0,
    speed: 800,
    header: '.header',
    easing: 'easeInOutQuad'
});

let header = document.querySelector('.header');

if(header !== null){
    if(window.innerWidth > 992) {
        window.onscroll = (e) => {
            header.classList.toggle('sticky', window.scrollY > 0);
            document.body.classList.toggle('sticky', window.scrollY > 0);
        }
    }
}
$(".nav-tabs a").on('click',function(e){
    $(this).tab('show');
});

let capSlider = new Swiper('.capabilitiesSlider.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 80,
    allowTouchMove: false,
    autoHeight: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
    },
});

const multipleSliders = () => {
    let galleryTop = [];
    let galleryThumbs = [];

    $(".gallery-top").each(function(index, element){
        if(element.querySelectorAll('.swiper-slide').length > 1) {
            galleryTop.push(new Swiper(element, {
                spaceBetween: 10,
                loopedSlides: 3, //looped slides should be the same
            }));
            galleryThumbs.push(new Swiper(element.nextElementSibling, {
                spaceBetween: 10,
                slidesPerView: 3,
                loopedSlides: 3, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                preventClicks: false,
            }));
            element.nextElementSibling.addEventListener("click", evt => {evt.preventDefault()});
        }
    });

    for (let i = 0; i < galleryTop.length; i++) {
        galleryTop[i].thumbs.swiper = galleryThumbs[i];
        galleryThumbs[i].on('click', function (e) {
            galleryTop[i].slideTo($(this.clickedSlide).index());
        })
    }
}

multipleSliders();


let msProductsSlider = new Swiper('.swiper-container.msProductsSlider', {
    slidesPerView: 4,
    spaceBetween: 20,
    breakpoints:{
        320: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 4
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

let gallery = new Swiper('.gallery-slider',{
    slidesPerView: 3,
    breakpoints: {
        320:{
            slidesPerView: 1
        },
        1024:{
            slidesPerView: 3
        }
    },
    centeredSlides: 1,
    loop: !0,
    speed: 400,
    spaceBetween: 20,
    initialSlide: 2,
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
});
$('.magnific').each(function (index, element) {
    if(element.closest('.gallery-thumbs') === null){
        $(element).magnificPopup({
            type: 'image',
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
    } else {
        element.addEventListener('click',(e) => {e.preventDefault()});
    }
});
$('.gallery-top .swiper-wrapper').each(function() {
    $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled:true,
            tCounter: '%curr% / %total%',
            arrowMarkup: '' +
                '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%">' +
                '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.49 31.49"><path d="M21.2,5a1.12,1.12,0,1,0-1.59,1.57l8,8H1.11A1.11,1.11,0,0,0,0,15.74a1.12,1.12,0,0,0,1.11,1.13H27.67l-8,8a1.14,1.14,0,0,0,0,1.59,1.11,1.11,0,0,0,1.59,0l10-10a1.09,1.09,0,0,0,0-1.57Z" style="fill:#fff"/></svg>' +
                '</button>'
        },
        callbacks: {
            buildControls: function() {
                this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
            }

        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });
});
$(document).on('msoneclick_after_init', function (e, data) {
    var form = $('.msoptionsprice-product-'+msOneClick.Product.product_id);
    if (form.length) {
        msOptionsPrice.Product.action('modification/get',form)
    }
})

let ct = new CustomTabs('.myTab__item > a', '.myToggle__item');
ct.init();