const latlng = new google.maps.LatLng(48.141878, 18.41308);

const options = {
    zoom: 6, // This number can be set to define the initial zoom level of the map
    center: latlng,
    scrollwheel: false,
    styles: [{
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#444444"
        }]
    }, {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }, {
            "gamma": "5.23"
        }, {
            "weight": "1.00"
        }]
    }, {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [{
            "invert_lightness": true
        }]
    }, {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "simplified"
        }, {
            "lightness": "50"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "administrative.locality",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [{
            "visibility": "off"
        }, {
            "hue": "#ff5800"
        }, {
            "gamma": "6.61"
        }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "color": "#f2f2f2"
        }]
    }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 45
        }, {
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "color": "#d9d9d9"
        }, {
            "visibility": "on"
        }]
    }],
    mapTypeId: google.maps.MapTypeId.ROADMAP, // This value can be set to define the map type ROADMAP/SATELLITE/HYBRID/TERRAIN
    scaleControl: true,
};

// Calling the constructor, thereby initializing the map  
const MAP = new google.maps.Map(document.getElementById('google-map'), options);

// Define Marker properties
const MARKER = new google.maps.MarkerImage('img/mapmarker.png',
    // This marker is 129 pixels wide by 42 pixels tall.
    null,
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 18,42.
    new google.maps.Point(18, 42),
    new google.maps.Size(25, 25)
);

let windows = [];

// Add Marker
for (let i = 0; i < markers.length; i++) {
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
        map: MAP,
        icon: MARKER
    });

    addMarker(marker, markers[i]);
}

function addMarker(marker, item) {
    let infowindow = new google.maps.InfoWindow({
        content: '<div class="map-popup"><h4 class="map-popup-title">' + item.title + '</h4><div class="map-popup-content">' + item.text + '</div></div>'
    });

    windows.push(infowindow);

    marker.addListener('click', function() {
        infowindow.open(MAP, marker);
        closeWindow(infowindow);
    });
}

function closeWindow(window) {
    for (let i = 0; i < windows.length; i++) {
        if (window != windows[i]) {
            windows[i].close();
        }
    }
}