var wishiButton = "<a class=\"wishiBtn\" title=\"Add item to your Wishi closet\" target=\"_blank\"></a>";

var addWishiItButtons = function() {
    $("img").mouseenter(function() {
        var imgElement = $(this);
        var newButton;
        var wishiBtnArr = imgElement.parent().find(".wishiBtn");

        // Checking if there is no wishi button and if so it'll create a new one if exists it'll find it and set it as the newButton
        if(wishiBtnArr.length == 0) {
            newButton = $(wishiButton);
        }
        else {
            newButton = $(wishiBtnArr[0]);
        }

        // Set the position of the wishi button
        newButton.css("top", imgElement.position().top + 10 + "px");
        newButton.css("left", imgElement.position().left + 10 + "px");

        // Will display the button only if the image is big enough
        if (imgElement.width() > 100 && imgElement.height() > 100) {
            newButton.css("display", "block");
        }

        // Will set the link to the according to the current image
        // http://www.wishi.me/app/#/landing/addToCloset?picture_url=%image_src%
        //http://www.wishi.me/app/#/landing/addToCloset?picture_url=http%3A%2F%2Fguesseu.scene7.com%2Fis%2Fimage%2FGuessEU%2F54W7437816Z-0069-ALT2%3Fwid%3D392%26hei%3D528%26fit%3Dfit%2C1&brand_uuid=1e7b9466-5458-11e4-b&category_uuid=1d4586b8-5458-11e4-b
        newButton.attr("href", "http://www.wishi.me/app/#/landing/addToCloset?picture_url=" + imgElement.attr("src"));
        //newButton.attr("href", "http://angel.mobile.wishi.me/app/#/landing/addToCloset?picture_url=" + imgElement.attr("src") + "&brand_uuid=1e7b9466-5458-11e4-b&category_uuid=1d4586b8-5458-11e4-b");


        if (wishiBtnArr.length == 0) {
            newButton.insertAfter(imgElement);
        }
    }).mouseleave(function() {
        // Will hide the button when leaving the image element.
        $(this).parent().find(".wishiBtn").css( "display", "none");
    });
};

$(document).ready(function() {
    window.setTimeout(addWishiItButtons, 1000);
    $(window).on("hashchange", function() {
        window.setTimeout(addWishiItButtons, 1000);
    });
});