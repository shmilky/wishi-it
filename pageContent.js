var whisiButton = '<span class="wishiBtn" title="Add item to your Wishi closet"></span>';

var addWishiItButtons = function() {
    $('img').each(function() {
        var imgElement = $(this);
        if(imgElement.find('wishiBtn').length == 0) {
            var newButton = $(whisiButton);
            newButton.css( "top", imgElement.position().top + 10 + 'px' );
            newButton.css( "left", imgElement.position().left + 10 + 'px' );
            newButton.attr("imgSrc", imgElement.attr("src"));
            newButton.insertAfter(imgElement);
            //imgElement.parent().append(newButton);

            imgElement.hover(function() {
                if (imgElement.width() > 100 && imgElement.height() > 100) {
                    newButton.css("display", "block");
                }
            }, function() {
                newButton.css( "display", "none");
            });

            newButton.click(function() {
                window.open(newButton.attr('imgSrc'));
            });
            //imgElement.append(newButton);
        }
    });
};

$(document).ready(function() {
    window.setTimeout(addWishiItButtons, 2000);
});

$(window).hashchange(function(){
    window.setTimeout(addWishiItButtons, 2000);
});

