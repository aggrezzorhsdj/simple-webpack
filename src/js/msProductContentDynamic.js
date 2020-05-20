import $ from 'jquery';
import Swiper from "swiper";
window.msProdCD = {
    config: {
        url: '/service/ajax',
        template: 'ls__tpl_msProduct_content_info',
        modal: $('#modal_product_info'),
        modalThank: $('#modal_thank'),
        selector: $('#modal_product_info .modal-resource'),
    },
    slider: {},
    order: function(form) {
        let order = {
            name: form.querySelector('[name="name"]').value,
            phone: form.querySelector('[name="phone"]').value,
            count: form.querySelector('[name="count"]').value,
            productId: form.querySelector('[name="id"]').value,
            email: form.querySelector('[name="email"]').value,
            option: JSON.stringify({color: $(form).find('[name="options[color]"]:checked').val()})
        }
        $.ajax({
            url: window.msProdCD.config.url,
            type: 'POST',
            data: {
                action: 'order/create',
                order
            },
            success: (response) => {
                let data = JSON.parse(response);
                if(data.success){
                    $(msProdCD.config.modal).modal('hide');
                    $(msProdCD.config.modalThank).modal('show');
                }
            },
            error: (error) => {
                console.log(new Error(error));
            },
        })
    },
    init: function () {
        $(window.msProdCD.config.modal).find('form').on('submit', function () {
            window.msProdCD.order(this);
            return false;
        })
        window.msProdCD.slider = new Swiper('.msProductInfo .swiper-container', {
            loop: false,
            autoplayDisableOnInteraction: false,
            init: false
        });
        if (window.msOptionsPrice) {
            window.msOptionsPrice.initialize();
            setTimeout(function () {
                window.msProdCD.slider.init();
                window.msOptionsPrice.Tools.setGalleryImage = function (rid, iid) {
                    let slide = document.querySelector('.msProductInfo .swiper-container').querySelector('.swiper-slide[data-iid="' + iid + '"]');
                    if(slide !== null && window.msProdCD.slider.activeIndex !== $(slide).index()) {
                        window.msProdCD.slider.slideTo($(slide).index());
                    }
                }
            },200)

        }
    }
}

$(window.msProdCD.config.modal).on('show.bs.modal', (e) => {
    let productId = e.relatedTarget.getAttribute('data-product-id');
    $.ajax({
        url: window.msProdCD.config.url,
        type: 'POST',
        data: {
            action: 'product/get',
            productId,
            template: window.msProdCD.config.template
        },
        dataType: 'html',
        success: (response) => {
            if(response == null) return false;
            window.msProdCD.config.selector.html(response);
            window.msProdCD.init();
        },
        error: (error) => {
            new Error(error);
        },
    })
})



