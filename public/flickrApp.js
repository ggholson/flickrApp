function loadImages(imageData) {
    var img;

    for (i = 0; i < imageData.photos.photo.length; i++) {
        img = $("<img>");
        img.attr("src", 'https://farm' + imageData.photos.photo[i].farm + '.staticflickr.com/' + imageData.photos.photo[i].server + '/' + imageData.photos.photo[i].id + '_' + imageData.photos.photo[i].secret + '.jpg');
        $('body').append(img);
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
    $("button").on('click', function() {
        searchFlickrImages($('#inputtext').val(), 1)
    });
});


/*http://jquery.com/download/*/