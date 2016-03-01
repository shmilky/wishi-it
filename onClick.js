//We'll send a message to the content script that the icon was clicked
chrome.browserAction.onClicked.addListener(function () { //Fired when User Clicks ICON
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "start wishi extension"}, function(response) {
            if (response) {
                console.log(response.message);
            }
        });
    });
});