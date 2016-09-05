//map init and starting coords
//todo update to be based on state machine and add markers dynamically
var map;

function initMap() {
    var lat = mapArea.lat;
    var lng = mapArea.lng;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 14
        //todo change control defaults to prevent interference with new location button
            //https://developers.google.com/maps/documentation/javascript/controls#Adding_Controls_to_the_Map
        //todo change the map space to change on rezise so that 15% of map is not off screen on desktop
    });
    var tribeca = {lat: 40.719526, lng: -74.0089934};
    var marker = new google.maps.Marker({
        position: tribeca,
        map: map,
        title: 'tribeca'
    });
    var infowindow= new google.maps.InfoWindow({
        content: 'la;sdkfjl;asdfj'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

var mapArea = {
    lat: 30.284301,
    lng: -97.74473390000001
};

//start: machines

    //start: state machine
    var currentState = {
        coords: {
            lat: undefined,
            lng: undefined
        },
        zoom: undefined,
        selectedArea: undefined,
        selectedLocation: undefined
    };

    var stateMachine = function(newState) {
        if(newState.type === area) {
            mapCenter = newState.coords;

        }
    };
    //end: state machine

    //start: newArea
    var newArea = function() {
        var counter = 0;

    };
    //end: newArea

    //start: newLocation
    var newLocation = function(address, nickname) {
        var counter = 0;
        var newlocationName = ('userLocation' + counter);


        //newMarker
            //todo https://developers.google.com/maps/documentation/javascript/markers
        counter = counter + 1;
    };
    //end: newLocation

//end: machines

//start: observable arrays
    //todo to update from json in model http://knockoutjs.com/documentation/json-data.html
    var allAreas = ko.observableArray([]);
    //todo to push to json to model http://knockoutjs.com/documentation/json-data.html
//end: observable arrays

//start: classes

    //class for locations which are stored in areas
    var Location = function(address, nickname) {
        this.address = address;
        this.nickname = nickname;
    };

    Location.prototype.geocode = function(address) {
        var apiKey = 'AIzaSyArF3-K7mHN56mOyALKYD0bsPaiYfWYaeM';
        var completedURL = 
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?', function(address) {

        });
    };

    //this is the class for most of our view models to be created
    var Area = function() {
        this.person = {
            personName: ko.observable('Bob'),
            personAge: ko.observable(123)
        };
        this.locationArray = ko.observableArray([
            { name: 'helloWorld' },
            { name: 'apartment' }
        ]);
    };

    Area.prototype.area = function(nickname, address) {

    };

    Area.prototype.locationArray = function() {

    };

//end: classes

var model = {
    //todo for converting from observables to json http://knockoutjs.com/documentation/json-data.html
};



