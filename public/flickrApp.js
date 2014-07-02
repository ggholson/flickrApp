var curPage = 1;
var curSearch = "";

function loadImages(imageData) {
    var img;
    var row;
    var div;

    $('#imageholder').html("");

    for (i = 0; i < imageData.photos.photo.length; i++) {
        if (i % 4 === 0) row = $("<div>").addClass("row");
        div = $("<div>").addClass("col-md-3 imageholder");

        img = 'url(https://farm' + imageData.photos.photo[i].farm + '.staticflickr.com/' + imageData.photos.photo[i].server + '/' + imageData.photos.photo[i].id + '_' + imageData.photos.photo[i].secret + '.jpg) no-repeat'

        div.attr("style", "background:" + img);

        row.append(div);
        if (i % 3 === 0 && i !== 0) $('#imageholder').append(row);
    }


    if ($('#pagebuttons').html() === "") {
        row = $("<div>").addClass("row");
        div = $("<div>").addClass("col-md-offset-5 col-md-2");
        img = $('<btn>').addClass("btn btn-default btn-md").attr("type", "button").attr("id", "prevpagebutton").attr("disabled", "disabled").html("Prev Page");
        div.append(img);
        img = $('<btn>').addClass("btn btn-default btn-md").attr("type", "button").attr("id", "nextpagebutton").html("Next Page");
        div.append(img);
        row.append(div);
        $('#pagebuttons').append(row);
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
    $('#pagebuttons').html("");

    $("#searchbutton").on('click', function() {
        curPage = 1;
        curSearch = $('#inputtext').val()
        searchFlickrImages(curSearch, curPage);
    });

    $(document).on('click', '#prevpagebutton', function() {
        curPage -= 1;
        searchFlickrImages(curSearch, curPage);
        if (curPage === 1) {
            $('#prevpagebutton').removeAttr('disabled');
        }
    })

    $(document).on('click', '#nextpagebutton', function() {
        curPage += 1;
        searchFlickrImages(curSearch, curPage);
        if (curPage === 2) {
            $('#prevpagebutton').removeAttr('disabled');
        }
    })
});


/*http://jquery.com/download/*/