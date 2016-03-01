//(function(chrome) {
//    console.log('clicked on - ' + new Date());
//
//    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//            if (response) {
//                console.log(response.farewell);
//            }
//        });
//    });
//}(chrome));
chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    console.log('clicked on - ' + new Date());

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "start wishi extension"}, function(response) {
            if (response) {
                console.log(response.message);
            }
        });
    });
});