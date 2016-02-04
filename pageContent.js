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
        newButton.attr("href", imgElement.attr("src"));

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