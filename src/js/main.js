var map;

function initMap() {
    var lat = mapArea.lat;
    var lng = mapArea.lng;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 14
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

var locationArrray = ko.observableArray([
    { name: 'helloWorld' }
]);

//todo add a more complete map area with state machine
var mapArea = {
    lat: 30.284301,
    lng: -97.74473390000001
};

var viewModel = function() {
    this.person = {
        personName: ko.observable('Bob'),
        personAge: ko.observable(123)
    };
    this.locationArray = ko.observableArray([
        { name: 'helloWorld' },
        { name: 'apartment' }
    ]);
};

/*ViewModel.prototype.area = function(nickname, address) {

};*/

/*ViewModel.prototype.locationArray = function() {

};*/

var model = {

};



