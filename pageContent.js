var wishiButton = "<a id=\"wishiBtn\" title=\"Add item to your Wishi closet\" target=\"_blank\"></a>";

var addWishiItButtons = function() {
    $("img").mouseenter(function() {
        var imgElement = $(this);
        var newButton = $('#wishiBtn');

        // Set the position of the wishi button
        newButton.css("top", imgElement.offset().top + 10 + "px");
        newButton.css("left", imgElement.offset().left + 10 + "px");

        // Will display the button only if the image is big enough
        if (imgElement.width() > 100 && imgElement.height() > 100) {
            newButton.css("display", "block");
        }

        var linkUrl = encodeURIComponent(fixImgSrcUrl(imgElement.attr("src")));

        // Will set the link to the according to the current image
        newButton.attr("href", "http://www.wishi.me/app/#/landing/addToCloset?picture_url=" + linkUrl + '&pageUrl=' + encodeURIComponent(window.location.href));

    }).mouseleave(function() {
        // Will hide the button when leaving the image element.
        $("#wishiBtn").css( "display", "none");
    });

    // Will try to improve the url to be a correct one on simple cases
    var fixImgSrcUrl = function(url) {
        if (url.length > 3) {
            if (url.length > 4 && url.substr(0, 4) == 'http') {
                return url;
            }

            if(url[0] == '/' && url[1] == '/') {
                return 'http:' + url;
            }

            if (url[0] == '/') {
                return 'http://' + window.location.host + window.location.pathname + url.substr(1, url.length - 1);
            }

            if (url.substr(0, 2) == './' || url.substr(0, 3) == '../') {
                return 'http://' + window.location.host + window.location.pathname + url;
            }
        }

        return url;
    };
};

$(document).ready(function() {
    $('body').append($(wishiButton));
    window.setTimeout(addWishiItButtons, 1000);
    $(window).on("hashchange", function() {
        window.setTimeout(addWishiItButtons, 1000);
    });
});

$(window).scroll(function() {
    window.setTimeout(addWishiItButtons, 1000);
});