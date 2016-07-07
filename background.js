
//Example of relevant request
//frameId : 0
//fromCache : false
//ip : "52.84.22.151"
//method : "GET"
//parentFrameId : -1
//requestId : "1227"
//statusCode : 206
//statusLine : "HTTP/1.1 206 Partial Content"
//tabId : 18
//timeStamp : 1465444350168.834
//type : "other"
//url : "https://dtp6gm33au72i.cloudfront.net/tf/096/733/412/oN10ma.48k.v3.m4a"

mediaurls=[
    "*://*.cloudfront.net/*.m4a",
    "*://ec-media.sndcdn.com/*",
    "*://*.8tracks.com/*.m4a"
]

sites=[
    {   url: "https?://8tracks.com/*",    handler:"8tracks"},
    {   url: "https?://soundcloud.com/*", handler:"soundcloud"}
]

filters = { types: ["other"] , urls : mediaurls }
history_size = 25

urllist = []

chrome.webRequest.onCompleted.addListener(
    function( request ) {

        if (request.tabId > 0) {
            chrome.tabs.get(request.tabId, function( tab ){

                sites.forEach(function(site){

                    if(tab.url.match(site.url)){

                        chrome.tabs.sendMessage(request.tabId, {method:"getTrackInfo", handler:site.handler}, function(trackinfo){
                                urllist.push({ url: request.url, track : trackinfo})
                                if(urllist.length > history_size) { urllist.shift() } // Discard more than 25
                                chrome.browserAction.getBadgeText({}, function(text){
                                    if(text == "") { text = "0" }
                                    var newCount = parseInt(text);
                                    chrome.browserAction.setBadgeText({ text: ((newCount+1).toString()) });
                                });
                        });
                    }
                })
            })
        }
    }, filters);

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.method == "getList"){
    sendResponse(urllist);
    return true;
  }
});
