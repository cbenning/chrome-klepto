

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){

  if(message.method == "getTrackInfo"){

    // Delay scraping page as it seems sometimes the page hasn't updated in time
    setTimeout(function(){

        trackinfo = document.getElementsByClassName("track now_playing open")[0]
                    .getElementsByClassName("track_details_container")[0]
                    .getElementsByClassName("title_container")[0]
                    .getElementsByClassName("title_artist")[0]

        artist = trackinfo.getElementsByClassName("a")[0].innerHTML;
        track = trackinfo.getElementsByClassName("t")[0].innerHTML;

        sendResponse({ track: track, artist: artist })

        }, 1000);
    return true;
  }
});
