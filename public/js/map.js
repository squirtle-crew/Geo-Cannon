//----------------------------------Google Maps API----------------------------------------------//

$(document).on("click", ".newPost", initMap);

// Note: This requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you did not give permission for the browser to
// locate you.
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 33.6449812,
            lng: -117.83512870000001
        },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // -----------------CURRENT POSITION START----------------//
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
              var placeHolderInput= window.location.href.split("#");
              var queryInput = placeHolderInput[1].replace(/ /g, '+');

          $.get("/api/users/" + queryInput, function(results){

              var newPost = {
                post: $("#UserInput").val().trim(),
                longitude: pos.lng,
                latitude: pos.lat,
                UserId: results.id
              }

              $.post("/api/post", newPost);
              var id = results.id

              setTimeout(function(){
                $.get("/api/posts/" + id, function(data){
                  var newDiv = $("<div>");
                  var olist = $("<ol>");
                  for(i = 0; i < data.length; i++){
                  var list = $("<li>");
                      list.html(data[i].post);
                      olist.append(list);
                      newDiv.append(olist);
                    }

                    var userPost = {
                      post: data[0].post,
                      longitude: data[0].longitude,
                      latitude: data[0].latitude
                    }

                    $.ajax({
                      method: "PUT",
                      url: "/api/newpost/" + id,
                      data: userPost
                    });

                    $(".userspost").html(newDiv);
                    $("#UserInput").val("");


              // -----------------CURRENT POSITION END-------------------//
              // ------------------TURTLE ICON START---------------------//
              var icon = {
                  url: "images/turtle-icon.png",
                  scaledSize: new google.maps.Size(60, 60),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
              };

              var friendicon = {
                  url: "images/rabbit.png",
                  scaledSize: new google.maps.Size(60, 60),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
              };

              var everyPost = [];
              $.get("/api/allpost/" + results.username, function(response){
                var infowindow = new google.maps.InfoWindow();
                var secondmarker, i;
                for(var i = 0; i < response.length; i++){

                  everyPost.push([response[i].name , response[i].NewestPost, parseFloat(response[i].latitude), parseFloat(response[i].longitude), response[i].updatedAt]);

                  var secondmarker = new google.maps.Marker({
                      position: {lat: parseFloat(response[i].latitude), lng: parseFloat(response[i].longitude)},
                      map: map,
                      icon: friendicon
                  });
                  google.maps.event.addListener(secondmarker, "click", (function(secondmarker, i){
                    return function(){
                      infowindow.setContent('<h4><u>' + everyPost[i][0] + "'s Message</u></h4>" + "<p>" + new Date(everyPost[i][4]).toUTCString() + "</p>" + '<p>' + everyPost[i][1] +'</p>');
                      infowindow.open(map, secondmarker);
                    }
                  })(secondmarker, i));
                }
              });

              var post = {
                lat: parseFloat(data[0].latitude),
                lng: parseFloat(data[0].longitude)
              }

              var marker = new google.maps.Marker({
                  position: post,
                  map: map,
                  icon: icon
              });
              // ------------------TURTLE ICON END---------------------//
              // -----------------USER MESSAGE START-------------------//
              var contentString = '<h4><u>' + results.name + "'s Message</u></h4>" + '<p>'+ new Date(data[0].updatedAt).toUTCString() + '</p>' + '<p>' + data[0].post +'</p>';
              var myinfowindow = new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 200
              });
              marker.addListener('click', function() {
                  myinfowindow.open(map, marker);
              });
              });
            },300);

            });
            // -----------------USER MESSAGE END-------------------//

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {

        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
