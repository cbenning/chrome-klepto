
function setList(urllist) {
        var table = document.getElementById('mediatable');
        table.innerHTML = '';
        urllist.reverse().forEach(function(mediainfo){

            // File extention
            var ext = mediainfo.url.split('.').pop();

            // For the link
            console.log(mediainfo)
            var a = document.createElement('a')
            var displayname = mediainfo.track.track + " - " +
                              mediainfo.track.artist + "." + ext
            a.setAttribute('href',mediainfo.url)
            a.setAttribute('download', displayname);
            a.setAttribute('class','btn');
            a.setAttribute("class","glyphicon glyphicon-circle-arrow-down");
            //a.innerHTML = displayname

            // For the download img
            //var span = document.createElement('span');
            //span.setAttribute("class","glyphicon glyphicon-circle-arrow-down");
            //span.setAttribute("aria-hidden","true");
            //a.appendChild(span);

            // Download Column
            var dlCol = document.createElement('td');
            dlCol.setAttribute("class","dl-column");
            dlCol.appendChild(a);

            // Artist Column
            var artistCol = document.createElement('td');
            artistCol.setAttribute("class","artist-column");
            artistCol.innerHTML = mediainfo.track.artist

            // Track Column
            var trackCol = document.createElement('td');
            trackCol.setAttribute("class","track-column");
            trackCol.innerHTML = mediainfo.track.track

            // New Row
            var row = document.createElement('tr');
            row.appendChild(trackCol);
            row.appendChild(artistCol);
            row.appendChild(dlCol);

            // Add the Row
            table.appendChild(row);
        })
}

chrome.runtime.sendMessage({method:"getList"},function(response){
        setList(response)
});

chrome.browserAction.setBadgeText({ text: ""})
