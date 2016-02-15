var wishiButton = "<a id=\"wishiBtn\" title=\"Add item to your Wishi closet\" target=\"_blank\"></a>";

var addWishiItButtons = function() {
    // First we'll start by unbinding old wishiEvents and only then we'll add the new events.
    $("img").unbind('mouseenter.wishiEvent mouseleave.wishiEvent').on('mouseenter.wishiEvent', function() {
        var imgElement = $(this);
        var newButton = $('#wishiBtn');

        // A var for the picture url to be stored in.
        var pictureUrl;

        // We'll try to check if the img has a valid srcset vars for the img src
        var imgSrcsetAtrr = imgElement.attr('srcset');
        if (!!imgSrcsetAtrr) {
            var srcsetAsStrArr = imgSrcsetAtrr.trim().split(' ');
            if (srcsetAsStrArr.length > 0) {
                pictureUrl = encodeURIComponent(fixImgSrcUrl(srcsetAsStrArr[0]));
            }
        }

        // In case we don't have srcset (probably most cases will be like that)
        if (!pictureUrl) {
            pictureUrl = encodeURIComponent(fixImgSrcUrl(imgElement.attr("src")));
        }

        // Only if we have a valid picture url the wishi button will appear
        if (pictureUrl && pictureUrl.length > 7) {
            // Set the position of the wishi button
            newButton.css("top", imgElement.offset().top + 10 + "px");
            newButton.css("left", imgElement.offset().left + 10 + "px");

            // Will display the button only if the image is big enough
            if (imgElement.width() > 100 && imgElement.height() > 100) {
                newButton.css("display", "block");
            }

            // Will set the link to the according to the current image
            newButton.attr("href", "http://www.wishi.me/app/#/landing/addToCloset?picture_url=" + pictureUrl + '&pageUrl=' + encodeURIComponent(window.location.href));
        }
    }).on('mouseleave.wishiEvent', function() {
        // Will hide the button when leaving the image element.
        $("#wishiBtn").css( "display", "none");
    });

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
};

// When the document is ready we'll run our code.
$(document).ready(function() {
    $('body').append($(wishiButton));
    window.setTimeout(addWishiItButtons, 1000);
    $(window).on("hashchange", function() {
        window.setTimeout(addWishiItButtons, 1000);
    });
});

// For every scroll we'll run our code once again in case there is an infinite scroll.
$(window).scroll(function() {
    window.setTimeout(addWishiItButtons, 1000);
});