var curPage = 1;
var curSearch = "";

function loadImages(imageData) {
    var img;
    var row;
    var div;

    for (i = 0; i < imageData.photos.photo.length; i++) {
        if (i % 4 === 0) row = $("<div>").addClass("row");
        div = $("<div>").addClass("col-md-3 imageholder");

        img = 'url(https://farm' + imageData.photos.photo[i].farm + '.staticflickr.com/' + imageData.photos.photo[i].server + '/' + imageData.photos.photo[i].id + '_' + imageData.photos.photo[i].secret + '.jpg) no-repeat'

        div.attr("style", "background:" + img);

        row.append(div);
        if (i % 3 === 0 && i !== 0) $('#imageholder').append(row);
    }
}

function searchFlickrImages(text, page) {
    var searchResult = {};

    $.get("http://localhost:3000/search/?text=" + text + "&page=" + page, function(data) {

        data = data.slice(14, -1);
        console.log(data);
        searchResult = JSON.parse(data);
        loadImages(searchResult);
    })
}

$(document).ready(function() {
    $("#searchbutton").on('click', function() {
        curPage = 1;
        curSearch = $('#inputtext').val()
        searchFlickrImages(curSearch, curPage);
        $('#prevpagebutton').attr('disabled', 'disabled');
    });

    $(document).on('click', '#prevpagebutton', function() {
        page -= 1;
        searchFlickrImages(curSearch, page);
        if (page === 1) {
            $('#prevpagebutton').removeAttr('disabled');
        }
    })

    $(document).on('click', '#nextpagebutton', function() {
        page += 1;
        searchFlickrImages(curSearch, page);
        if (page === 2) {
            $('#prevpagebutton').removeAttr('disabled');
        }
    })
});


/*http://jquery.com/download/*/