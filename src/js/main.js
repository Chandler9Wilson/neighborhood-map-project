//todo add modular loading with require js http://knockoutjs.com/documentation/amd-loading.html
var map;
var infowindow;
var vm;

//this initializes the google map on the page
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapArea,
        zoom: 14
        //todo change control defaults to prevent interference with new location button
        //https://developers.google.com/maps/documentation/javascript/controls#Adding_Controls_to_the_Map
        //todo change the map space to change on rezise so that 15% of map is not off screen on desktop
    });
    infowindow = new google.maps.InfoWindow();
    initVM(model.addFoursquare);
}

//initial map area used in initMap
var mapArea = {
    lat: 30.284301,
    lng: -97.74473390000001
};

//Main view model
var ViewModel = function() {
    var self = this;


    //text filter from user
    self.filter = ko.observable('');
    //stores all locations
    self.locationArray = ko.observableArray([]);

    self.test = function() {
        console.log('bs');
    };

    self.mapFocus = function(newLocation) {
        if (newLocation === 'Austin') {
            map.setZoom(14);
            map.panTo(mapArea);
            infowindow.close();
        } else {
            map.setZoom(15);
            map.panTo(newLocation.place.ll);
        }
    };

    //accepts a locationArray index from click events on the location list
    self.currentLocation = ko.observable();

    self.stateMachine = ko.computed(function() {
        //location tracking
        if (self.currentLocation() !== undefined) {
            //changes map zoom and center
            self.mapFocus(self.currentLocation());

            //triggers the locations infowindow to open on its marker
            var trigger = new google.maps.event.trigger(vm.currentLocation().place.marker, 'click');
        }
    });

    //todo implement areas
    /*var allAreas = ko.observableArray([
        {'default': new Area()}
    ]);*/

    //todo add website tour http://github.hubspot.com/shepherd/docs/welcome/

    //todo add snackbar alerts for items not loading
    //https://getmdl.io/components/index.html#snackbar-section
    //https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
    self.alert = function() {

    };

    //takes foursquare json and formats it to be displayed in the infowindow
    self.formatedFoursquare = ko.computed(function() {

    });

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
        self.displayMarkers();
    });

    //displays markers based on filteredLocations
    self.displayMarkers = function() {
        //sets the map property off all markers to null
        var clearMarkers = function() {
            for (var i = 0; i < self.locationArray().length; i++) {
                self.locationArray()[i].place.marker.setMap(null);
            }
        };

        //sets the map property of filtered locations to map
        var display = function() {
            for (var i = 0; i < vm.filteredLocations().length; i++) {
                self.filteredLocations()[i].place.marker.setMap(map);
            }
        };

        clearMarkers();
        display();
    };
};

//contains helper functions
var help = {
    status: function(firstOption, secondOption) {
        if (firstOption !== undefined) {
            return firstOption;
        } else if (secondOption !== undefined) {
            return secondOption;
        } else {
            //change to use alert
            return 'error loading resource';
        }
    },
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
    sendRequest: function(url) {
        var request = new XMLHttpRequest();

        request.ontimeout = function() {
            console.error('Request timed out');
        };

        request.onload = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(this.responseText);
                    console.log('hello')
                } else {
                    console.error(xhr.statusText);
                }
            }
        };

        request.open('GET', url);
        request.timeout = 5000;
    },
    replaceSpaces: function(string, changeTo) {
        var spaceGenocide = string.replace(/\s+/g, changeTo);

        return spaceGenocide;
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

        self.rawFoursquare = ko.observable();
        self.formattedFoursquare = ko.computed(function() {
            //todo converts rawFoursquare into an html template when rawFoursquare is returned
        });
        self.foursquare = ko.computed(function() {
            //todo returns loading animation or formattedFoursquare
        });


        //todo check if within 5mi of area
        //https://developers.google.com/maps/documentation/javascript/reference#spherical
        if (data.ll !== undefined) {
            self.ll = data.ll;
        } else {
            self.geocode(query);
        }
    },
    //function called when a new location is being added
    newLocation: function(isDefault, info, pushTo) {
        var data;
        if (isDefault !== false && isDefault !== undefined) {
            data = isDefault;
        } else if (isDefault === false) {
            //todo assemble data object based on query and nickname
            //possibly call geocode here before pushing to locationArray?
        } else {
            //todo add alert link in
            console.log('error in newLocation()');
        }

        //wrapper obj to push to array
        var obj = {};
        obj.place = new model.Location(data);
        obj.place.createMarker();

        pushTo.push(obj);
    },
    //adds foursquare data to all objects in vm.locationArray() this will delete current data
    addFoursquare: function(err, destination) {
        if (err) {
            return console.error(err);
        }

        var length = vm.locationArray().length;

        for (var i = 0; i < length; i++) {
            vm.locationArray()[i].place.rawFoursquare(undefined);

            vm.locationArray()[i].place.getFoursquare();
        }
    }
};

model.Location.prototype.geocode = function(query) {
    //todo add geocode ajax call to google.maps.geocode
    console.log("geocode not setup");
};

model.Location.prototype.createMarker = function() {
    var self = this;
    self.marker = new google.maps.Marker({
        position: self.ll,
        map: map,
        title: self.nickname
    });
    //I have no idea why this solutioatn worked http://stackoverflow.com/questions/7110027/google-maps-issue-cannot-call-method-apply-of-undefined ??
    google.maps.event.addListener(self.marker, 'click', function() {
        self.marker.setAnimation(google.maps.Animation.DROP);
        infowindow.setContent(help.status(self.rawFoursquare(), self.marker.title));
        infowindow.open(map, self.marker);
    });
};

//formats url then sends GET request to foursquare and returns the result
model.Location.prototype.getFoursquare = function() {
    var self = this;

    //todo format url for get request then call help.sendRequest(GET)
    var foursquareURL = [
        'https://api.foursquare.com/v2/venues/search',
        'client_id=1XFTFIOZPBXBW2LAFUBE3IQSVXPNOOWQJXFX0N5JUUTVORF5',
        //how to hide or not use this since this app is client side only atm?
        'client_secret=DAV55HOOCPAE4LVQY34K3RIHMRSUF4H15XD4GG0UZ4CF2L4N',
        'intent=match',
        'v=20140806',
        'm=foursquare'
    ];

    var near = 'll=' + self.ll.lat + ',' + self.ll.lng;
    var formalName = 'query=' + help.replaceSpaces(self.formalName, '+');

    foursquareURL.push(near, formalName);

    var url = help.assembleUrl(foursquareURL);
    console.log(url);
    help.sendRequest(url);
};

//when map loads applys bindings
var initVM = function(callback) {
    //todo if($localStorage === undefined) //if new user
    vm = new ViewModel();
    //todo GET json from web server
    ko.applyBindings(vm);

    var destination = vm.locationArray;

    for (var i = 0; i < defaultData.locations.length; i++) {
        model.newLocation(defaultData.locations[i], undefined, destination);
    }
    //todo else
    //ko.applyBindings($localStorage)

    return callback(null, destination);
};