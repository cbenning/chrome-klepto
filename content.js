




chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){

  if(message.method == "getTrackInfo") {

    if(message.handler == "8tracks") {
        // Delay scraping page as it seems sometimes the page hasn't updated in tim:e
        setTimeout(function(){

            trackinfo = document.getElementsByClassName("track now_playing open")[0]
                        .getElementsByClassName("track_details_container")[0]
                        .getElementsByClassName("title_container")[0]
                        .getElementsByClassName("title_artist")[0]

            artist = trackinfo.getElementsByClassName("a")[0].innerHTML.trim();
            title = trackinfo.getElementsByClassName("t")[0].innerHTML.trim();
            full = title + " - " + artist

            sendResponse({ title: title, artist: artist, full: full })

        }, 1000);
        return true;
    }
    else if(message.handler == "soundcloud") {

        setTimeout(function(){

            trackinfo = document.getElementsByClassName("playbackSoundBadge__title")[0]

            artist = ""
            title = ""
            full = trackinfo.getAttribute("title").trim()

            sendResponse({ title: title, artist: artist, full: full })

        }, 1000);
        return true;
    }
  }
});
