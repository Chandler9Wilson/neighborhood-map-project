//todo add modular loading with require js http://knockoutjs.com/documentation/amd-loading.html

//map init and starting coords
//todo update to be based on state machine and add markers dynamically
var map;
var infowindow;

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
    infowindow = new google.maps.InfoWindow();
    initVM();
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
    //stores all locations
    self.locationArray = ko.observableArray([]);

    //used for temporary storage of markers
    self.allMarkers = [];

    //todo add current object and state machine

    //todo implement areas
    /*var allAreas = ko.observableArray([
        {'default': new Area()}
    ]);*/

    //https://getmdl.io/components/index.html#snackbar-section
    //https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
    //todo add website tour http://github.hubspot.com/shepherd/docs/welcome/

    //todo add snackbar alerts for items not loading
    self.alert = function() {

    };

    self.mapFocus = function(newLocation) {
        if (newLocation === 'Austin') {
            map.setZoom(14);
            map.setCenter(mapArea);
        } else {
            map.setZoom(15);
            map.setCenter(newLocation.place.ll);
        }
    };

    //gets foursquare data for infowindow
    self.getFoursquare = function(location) {
        //change to array of strings then push dynamic parts to array
        var foursquareURL = [
            'https://api.foursquare.com/v2/venues/search',
            'client_id=1XFTFIOZPBXBW2LAFUBE3IQSVXPNOOWQJXFX0N5JUUTVORF5',
            //how to hide or not use this since this app is client side only atm?
            'client_secret=DAV55HOOCPAE4LVQY34K3RIHMRSUF4H15XD4GG0UZ4CF2L4N',
            'intent=match',
            'v=20140806',
            'm=foursquare'
        ];

        var near = location.place.address.replace(/\s+/g, '+'); //'near=Austin,+TX';

        foursquareURL.push(near);

        var url = help.assembleUrl(foursquareURL);
        console.log(url);
        help.sendRequest();
    };

    //computed observable to filter locations based on user input
    self.filteredLocations = ko.computed(function() {
        var filter = self.filter().toLowerCase();

        if (!filter) {
            return self.locationArray();
        } else {
            return ko.utils.arrayFilter(self.locationArray(), function(Location) {
                return help.stringContains(Location.place.nickname.toLowerCase(), filter);
            });
        }
    });

    //tells setMarkers to update when filteredLocations changes
    self.filteredLocations.subscribe(function(newValue) {
        self.setMarkers();
    });

    //displays markers based on filteredLocations
    self.setMarkers = function() {
        setMapOnAll(null);

        allMarkers = [];

        //called within a for loop to create a closure
        var createMarker = function(location, indexOf) {
            var marker = new google.maps.Marker({
                position: location.place.ll,
                map: map,
                title: location.place.nickname,
                indexOf: indexOf
            });
            //I have no idea why this solution worked http://stackoverflow.com/questions/7110027/google-maps-issue-cannot-call-method-apply-of-undefined ??
            google.maps.event.addListener(marker, 'click', function() {
                var title = marker.title;
                infowindow.setContent(title);
                infowindow.open(map, marker);
            });
            //marker.addListener('click', setInfoWindow(marker));
            allMarkers.push(marker);
        };

        for (var i = 0; i < vm.filteredLocations().length; i++) {
            createMarker(vm.filteredLocations()[i], i);
        }

        function setMapOnAll(map) {
            for (var i = 0; i < self.allMarkers.length; i++) {
                self.allMarkers[i].setMap(map);
            }
        }
    };
};

//contains helper functions
var help = {
    //compares two strings and returns true if any part matchs
    stringContains: function(string, contains) {
        string = string || "";
        return string.includes(contains);
    },
    //loops through an array and assembles the string to http standards
    assembleUrl: function(urlArray) {
        var url;
        var parameter;
        for (var i = 0; i < urlArray.length; i++) {
            parameter = urlArray[i];
            if (i === 0) {
                url = urlArray[i];
            } else if (i === 1) {
                url = url + '?' + parameter;
            } else {
                url = url + '&' + parameter;
            }
        }
        return url;
    },
    //sends a CORS request to a 3rd party
    //todo anonymize and make modular
    sendRequest: function(url) {
        var foursquare = new XMLHttpRequest();

        foursquare.addEventListener('load', transferComplete);
        foursquare.addEventListener('error', transferFailed);
        foursquare.addEventListener('abort', transferFailed);

        foursquare.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

            }
        };

        foursquare.open('GET', url);

        function transferComplete(evt) {
            console.log('transfer complete');
        }

        function transferFailed(evt) {
            console.log('transfer failed');
        }
    }
};

var model = {
    //location class used within viewmodel
    Location: function(data) {
        var self = this;

        //how to do error handling here?
        self.nickname = data.nickname;
        self.formalName = data.formalName;
        self.address = data.address;
        self.query = data.query;

        //todo check if within 5mi of area
        //https://developers.google.com/maps/documentation/javascript/reference#spherical
        if (data.ll !== undefined) {
            self.ll = data.ll;
        } else {
            self.geocode(query);
        }
    },
    //function called when a new location is being added
    newLocation: function(isDefault, query, nickname) {
        var data;
        if (isDefault !== false && isDefault !== undefined) {
            data = isDefault;
        } else if (isDefault === false) {
            //todo assemble data object based on query and nickname 
            //possibly call geocode here before push to locationArray?
        } else {
            //todo add alert link in
            console.log('error in newLocation()');
        }

        //wrapper obj to push to array
        var obj = {};
        obj.place = new model.Location(data);

        vm.locationArray.push(obj);
    }
};

model.Location.prototype.geocode = function(query) {
    //todo add geocode ajax call to google.maps.geocode
    console.log("geocode not set update");
};

var vm = new ViewModel();

//when map loads applys bindings
var initVM = function() {
    //todo if($localStorage === undefined) //if new user
    //todo GET json from web server
    ko.applyBindings(vm);

    for (var i = 0; i < defaultData.locations.length; i++) {
        model.newLocation(defaultData.locations[i]);
    }
    //todo else
    //ko.applyBindings($localStorage)
};