var wishiOneTimeBtn = '<a id="wishiOneTimeBtn" class="wishiBtn" title="Add item to your Wishi closet" target="_blank"></a>';
var uploadItemWishiUrl = 'http://www.wishi.me/app/#/landing/addToCloset';
// var uploadItemWishiUrl = 'https://stage.wishi.me/app/#/landing/addToCloset';
// var uploadItemWishiUrl = 'http://localhost:8000/web/app/#/landing/addToCloset';

function getWishiUrl (pictureUrl) {
    var url = uploadItemWishiUrl;
    url += '?picture_url=' + encodeURIComponent(pictureUrl);
    url += '&pageUrl=' + encodeURIComponent(window.location.href);

    var itemPrice = $("*[itemprop='price']").attr('content');
    if (itemPrice) {
        url += '&item_price=' + itemPrice;
    }

    var itemBrand = $("*[itemprop='brand'] *[itemprop='name']").text();
    if (itemBrand && itemBrand !== 'Unbranded') {
        url += '&item_brand=' + itemBrand;
    }

    return url;
}

var addWishiItButtons = function() {
    // First we'll start by unbinding old wishiEvents and only then we'll add the new events.
    $('img:not(.wishiImg)').unbind('mouseenter.wishiEvent mouseleave.wishiEvent').on('mouseenter.wishiEvent', function() {

        // get the image url form the img element and execute the callback if it's valid
        getImgSrcAndExec(this, function(imgElement, pictureUrl) {
            pictureUrl = encodeURIComponent(pictureUrl);
            var newButton = $('#wishiOneTimeBtn');

            // Set the position of the wishi button
            newButton.css('top', imgElement.offset().top + 10 + 'px');
            newButton.css('left', imgElement.offset().left + 10 + 'px');

            // Will display the button only if the image is big enough
            if (imgElement.width() > 100 && imgElement.height() > 100) {
                newButton.css('display', 'block');
            }

            // Will set the link to the according to the current image
            newButton.attr('href', getWishiUrl(pictureUrl));
        });
    }).on('mouseleave.wishiEvent', function() {
        // Will hide the button when leaving the image element.
        $('#wishiOneTimeBtn').css( 'display', 'none');
    });
};

var addWishiImagesToWindow = function() {
    var imagesRow = $('.wishiImagesRow');
    $('img').each(function() {
        // get the image url form the img element and execute the callback if it's valid
        getImgSrcAndExec(this, function(imgElement, pictureUrl) {
            // Check that we don't have this image on our images yet.
            if(presentedImages.indexOf(pictureUrl) < 0) {
                // Add the image to reduce multiplication.
                presentedImages.push(pictureUrl);

                var newImgStr = '<div class="wishiImgThumb">' +
                    '<a class="wishiBtn" title="Add item to your Wishi closet" target="_blank" href="' + getWishiUrl(pictureUrl) + '"></a>' +
                    '<div class="imgWrapper">' +
                    '<img class="wishiImg" src="' + pictureUrl + '">' +
                    '<div>' +
                    '</div>';
                imagesRow.append(newImgStr);

                $('.wishiImgThumb:last').on('mouseenter', function() {
                    $(this).find('.wishiBtn').css('display', 'block');
                }).on('mouseleave', function() {
                    // Will hide the button when leaving the image element.
                    $(this).find('.wishiBtn').css( 'display', 'none');
                });
            }
        });
    });
};

// Wil try to retrieve img src url.
var getImgSrcAndExec = function(imgElement, succCB, failCB) {
    imgElement = $(imgElement);

    // A var for the picture url to be stored in.
    var pictureUrl;

    // We'll try to check if the img has a valid srcset vars for the img src
    var imgSrcsetAtrr = imgElement.attr('srcset');
    if (!!imgSrcsetAtrr) {
        var srcsetAsStrArr = imgSrcsetAtrr.trim().split(' ');
        if (srcsetAsStrArr.length > 0) {
            pictureUrl = fixImgSrcUrl(srcsetAsStrArr[0]);
        }
    }

    // In case we don't have srcset (probably most cases will be like that)
    if (!pictureUrl) {
        pictureUrl = fixImgSrcUrl(imgElement.attr('src'));
    }

    // If the img src url is valid we'll return it otherwise we'll return null.
    if (pictureUrl && pictureUrl.length > 7) {
        var pic_real_width, pic_real_height;
        $('<img/>') // Make in memory copy of image to avoid css issues
            .attr('src', pictureUrl)
            .load(function() {
                if (this) {
                    pic_real_width = this.width;   // Note: $(this).width() will not
                    pic_real_height = this.height; // work for in memory images.
                }

                if (pic_real_width > 100 && pic_real_height > 100) {
                    succCB(imgElement, pictureUrl);
                }
            });
    }
};

// Will try to improve the url to be a correct one on simple cases
var fixImgSrcUrl = function(url) {
    url = url.trim();

    if (url.length > 3) {
        if (url.length > 4 && url.substr(0, 4) == 'http') {
            return url;
        }

        if(url[0] == '/' && url[1] == '/') {
            return window.location.protocol + url;
        }

        if (url[0] == '/') {
            return window.location.host.href + '/' + url.substr(1, url.length - 1);
        }

        return window.location.host.href + '/' + url;
    }

    return false;
};

// When the document is ready we'll run our code.
$(document).ready(function() {
    $('body').append($(wishiOneTimeBtn));
    window.setTimeout(addWishiItButtons, 1000);
    $(window).on('hashchange', function() {
        window.setTimeout(addWishiItButtons, 1000);
    });
});

// For every scroll we'll run our code once again in case there is an infinite scroll.
$(window).scroll(function() {
    window.setTimeout(addWishiItButtons, 1000);
});

var presentedImages = [];

// We'll build the on top view for the wishi new view
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request && request.message) {
            console.log(request.message);
        }


        sendResponse({message: 'init wishi view'});
        if ($('.closeWishiExtension').length == 0) {
            var wishiWindowViewStr = '<div id="wishiItemsCanvas">' +
                '<div class="topViewHeader">' +
                '<div class="topViewHeadline">Add items to your closet</div>' +
                '<a href="#" class="closeWishiExtension">X</a>' +
                '</div>' +
                '<div class="wishiImagesRowWrapper">' +
                '<div class="wishiImagesRow"></div>' +
                '</div>' +
                '</div>';

            var body = $('body');
            var html = $('html');
            body.append(wishiWindowViewStr);
            body.css('overflow-y', 'hidden');
            html.css('overflow-y', 'hidden');

            $('.closeWishiExtension').click(function(e) {
                e.preventDefault();
                $('#wishiItemsCanvas').remove();
                body.css('overflow-y', '');
                html.css('overflow-y', '');
                presentedImages = [];
            });

            addWishiImagesToWindow();
        }
    }
);

