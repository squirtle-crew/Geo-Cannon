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
            // -----------------CURRENT POSITION START----------------
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos);
            // -----------------CURRENT POSITION END-------------------
            // ------------------TURTLE ICON START---------------------
            var icon = {
                url: "images/turtle-icon.png",
                scaledSize: new google.maps.Size(60, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: icon
            });
            // ------------------TURTLE ICON END---------------------
            infoWindow.setPosition(pos);
            infoWindow.setContent('<h4><u>Andrews Message</u></h4>' + '<p>Hello Everyone!</p>');

            infoWindow.open(map);
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
