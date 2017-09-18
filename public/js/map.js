//----------------------------------Google Maps API----------------------------------------------//
$(document).on("click", ".newPost", initMap);
// Note: This requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you did not give permission for the browser to
// locate you.
var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        // maps starting location
        center: {
            lat: 33.6449812,
            lng: -117.83512870000001
        },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // users current position
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // splits username in URL and stores in query input
            var placeHolderInput = window.location.href.split("#");
            var queryInput = placeHolderInput[1].replace(/ /g, '+');

            // gets the specific user with the query input
            $.get("/api/users/" + queryInput, function(results) {

                // users new post
                var newPost = {
                    post: $("#UserInput").val().trim(),
                    longitude: pos.lng,
                    latitude: pos.lat,
                    UserId: results.id
                }

                // post request to display users message
                $.post("/api/post", newPost);
                var id = results.id

                // ensures post request finishes before getting new post
                setTimeout(function() {
                    $.get("/api/posts/" + id, function(data) {
                        var newDiv = $("<div>");
                        var olist = $("<ol>");
                        for (i = 0; i < data.length; i++) {
                            var list = $("<li>");
                            list.html(data[i].post);
                            olist.append(list);
                            newDiv.append(olist);
                        }
                        // updates most recent message to user table
                        var userPost = {
                                post: data[0].post,
                                longitude: data[0].longitude,
                                latitude: data[0].latitude
                            }
                            // put request to user table
                        $.ajax({
                            method: "PUT",
                            url: "/api/newpost/" + id,
                            data: userPost
                        });

                        // creates new divs for message box on html
                        $(".userspost").html(newDiv);
                        $("#UserInput").val("");


                        // user icon
                        var icon = {
                            url: "images/turtle-icon.png",
                            scaledSize: new google.maps.Size(60, 60),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                        };

                        // friends icon
                        var friendicon = {
                            url: "images/rabbit.png",
                            scaledSize: new google.maps.Size(60, 60),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                        };
                        // array that holds each users newest posts
                        var everyPost = [];
                        $.get("/api/allpost/" + results.username, function(response) {
                            var infowindow = new google.maps.InfoWindow();
                            var secondmarker, i;
                            for (var i = 0; i < response.length; i++) {

                                everyPost.push([response[i].name, response[i].NewestPost, parseFloat(response[i].latitude), parseFloat(response[i].longitude), response[i].updatedAt]);
                                // creates friends marker on map
                                var secondmarker = new google.maps.Marker({
                                    position: {
                                        lat: parseFloat(response[i].latitude),
                                        lng: parseFloat(response[i].longitude)
                                    },
                                    map: map,
                                    icon: friendicon
                                });
                                // allows user to click on icon to view message
                                google.maps.event.addListener(secondmarker, "click", (function(secondmarker, i) {
                                    return function() {
                                        infowindow.setContent('<h4><u>' + everyPost[i][0] + "'s Message</u></h4>" + "<p>" + new Date(everyPost[i][4]).toUTCString() + "</p>" + '<p>' + everyPost[i][1] + '</p>');
                                        infowindow.open(map, secondmarker);
                                    }
                                })(secondmarker, i));
                            }
                        });
                        // parses users location
                        var post = {
                                lat: parseFloat(data[0].latitude),
                                lng: parseFloat(data[0].longitude)
                            }
                            // creates marker for user
                        var marker = new google.maps.Marker({
                            position: post,
                            map: map,
                            icon: icon
                        });

                        // users newest posts displayed on map
                        var contentString = '<h4><u>' + results.name + "'s Message</u></h4>" + '<p>' + new Date(data[0].updatedAt).toUTCString() + '</p>' + '<p>' + data[0].post + '</p>';
                        var myinfowindow = new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 200
                        });
                        marker.addListener('click', function() {
                            myinfowindow.open(map, marker);
                        });
                    });
                }, 300);

            });

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {

        handleLocationError(false, infoWindow, map.getCenter());
    }
}
// handles any map errors with geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}