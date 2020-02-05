// ========== API Keys ==========
const googleAPIkey = 'AIzaSyB3_355xgTrbvLb3K_FE_2bpig4WBtCGgM';
const charityAPIkey = '3ea2f1ef16ab9b240050c2cf1c055650';
// ========== CORS Fix ==========
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
// ========== Query Variables ==========
// let name = user input
// let city = user input
// let state = user input 
// let category = user input
// let responseNum = user input
let queryURL = "http://data.orghunter.com/v1/charitysearch?user_key=" + charityAPIkey + "&eligible=1&rows=100"
// ========== Charity Ajax Call ==========
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response.data);
    let orgLat;
    let orgLon;
    for (i = 0; i < response.data.length; i++) {
        console.log('==========');
        console.log(response.data[i].charityName);
        console.log(response.data[i].url);
        console.log(response.data[i].donationUrl);
        console.log(response.data[i].city + ', ' + response.data[i].state);
        console.log(response.data[i].latitude);
        console.log(response.data[i].longitude);
        console.log(response.data[i].missionStatement);
        // ========== Map Marker GeoLocation Variables ==========
        orgLat = response.data[i].latitude;
        orgLon = response.data[i].longitude;
        console.log(orgLat + ', ' + orgLon);
    };
    initMap(orgLat, orgLon);
});
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
function initMap(orgLat, orgLon) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    // ========== Google Maps API Marker Test ----------
    let myLatlng = new google.maps.LatLng(orgLat, orgLon);
    let marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);
    // ========== Try HTML5 geolocation ==========
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
// ========== Google API Geolocation (DO NOT TOUCH) ==========
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser does not support geolocation.');
    infoWindow.open(map);
}
