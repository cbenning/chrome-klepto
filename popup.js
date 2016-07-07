
function setList(urllist, newCount) {
        var table = document.getElementById('mediatable');
        table.innerHTML = '';
        count = 1
        urllist.reverse().forEach(function(mediainfo){

            // File extention
            var ext = mediainfo.url.split('.').pop().substring(0,3);

            // For the link
            var a = document.createElement('a')
            var displayname = decodeURIComponent(mediainfo.track.full) + "." + ext
            a.setAttribute('href',mediainfo.url)
            a.setAttribute('download', displayname);
            a.setAttribute('class','btn');
            a.setAttribute("class","glyphicon glyphicon-circle-arrow-down");

            // Count Column
            var countCol = document.createElement('td');
            countCol.setAttribute("class","count-column");
            countCol.innerHTML = count;
            countCol.appendChild(a);

            // Download Column
            var dlCol = document.createElement('td');
            dlCol.setAttribute("class","dl-column");
            dlCol.appendChild(a);

            // Title Column
            var titleCol = document.createElement('td');
            titleCol.setAttribute("class","track-column");
            titleCol.innerHTML = mediainfo.track.full

            // New Row
            var row = document.createElement('tr');

            if(newCount >= count) {
                row.setAttribute("class","new");
                row.addEventListener("mouseout",function (event) {
                    event.fromElement.parentNode.classList.remove("new");
                })
            }

            row.appendChild(countCol);
            row.appendChild(titleCol);
            row.appendChild(dlCol);

            // Add the Row
            table.appendChild(row);
            count += 1;
        })
}

chrome.runtime.sendMessage({method:"getList"},function(response){

        chrome.browserAction.getBadgeText({}, function(text){
            var newCount = 0;
            if( text != "" ) { newCount = parseInt(text); }
            chrome.browserAction.setBadgeText({ text: ""})
            setList(response, newCount)
        });
});


