//todo add modular loading with require js http://knockoutjs.com/documentation/amd-loading.html

//map init and starting coords
//todo update to be based on state machine and add markers dynamically
var map;

//this initializes the google map on the page to load async
function initMap() {
    var lat = mapArea.lat;
    var lng = mapArea.lng;
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 14
            //todo change control defaults to prevent interference with new location button
            //https://developers.google.com/maps/documentation/javascript/controls#Adding_Controls_to_the_Map
            //todo change the map space to change on rezise so that 15% of map is not off screen on desktop
    });
    var tribeca = { lat: 40.719526, lng: -74.0089934 };
    var marker = new google.maps.Marker({
        position: tribeca,
        map: map,
        title: 'tribeca'
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'la;sdkfjl;asdfj'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

//initial map area used in initMap
var mapArea = {
    lat: 30.284301,
    lng: -97.74473390000001
};

//Main view model
var ViewModel = function() {
    var self = this;

    self.filter = ko.observable('');
    //todo add current object and state machine

    //todo implement areas
    /*var allAreas = ko.observableArray([
        {'default': new Area()}
    ]);*/

    //stores all locations
    self.locationArray = ko.observableArray([]);

    //function called when a location is being added
    self.newLocation = function(address, nickname) {
        var obj = {};
        obj['nickname'] = nickname;
        obj['placeInfo'] = new Location(address);

        //push the newLocation to locationArray 
        self.locationArray.push(obj);
    };

    self.stringStartsWith = function(string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };

    self.filteredLocations = ko.computed(function() {
        var filter = self.filter().toLowerCase();

        if (!filter) {
            return self.locationArray();
        } else {
            return ko.utils.arrayFilter(self.locationArray(), function(Location) {
                return self.stringStartsWith(Location.nickname.toLowerCase(), filter);
            });
        }
    });


};

//location class used within viewmodel
var Location = function(address) {
    //stores the google maps json info
    this.address = address;
};

//either pulls defaults for new user, or a previous users info from $localStorage
var init = function() {
    var defaultLocations = [{
            'nickname': 'Jimmy Johns',
            'address': {}
        },
        {
            'nickname': 'Art Museum',
            'address': {}
        },
        {
            'nickname': 'Park',
            'address': {}
        }
    ];

    for (var i = 0; i < defaultLocations.length; i++) {
        vm.locationArray.push(defaultLocations[i]);
    }
};

var vm = new ViewModel();

ko.applyBindings(vm);

init();