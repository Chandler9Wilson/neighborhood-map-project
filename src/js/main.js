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
    onMapLoad();
}

//initial map area used in initMap
var mapArea = {
    lat: 30.284301,
    lng: -97.74473390000001
};

var allMarkers = [];

//sets up displayed markers based on filteredLocations
var setMarkers = function() {
    setMapOnAll(null);

    allMarkers = [];

    for (var i = 0; i < vm.filteredLocations().length; i++) {
        var marker = new google.maps.Marker({
            position: vm.filteredLocations()[i].address.geometry.location,
            map: map,
            title: vm.filteredLocations()[i].nickname
        });
        allMarkers.push(marker);
    }

    function setMapOnAll(map) {
        for (var i = 0; i < allMarkers.length; i++) {
            allMarkers[i].setMap(map);
        }
    }
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

    //compares a string to another partial string
    self.stringStartsWith = function(string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };

    //computed observable to filter locations based on user input
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

    //tells setMarkers to update when filteredLocations changes
    self.filteredLocations.subscribe(function(newValue) {
        setMarkers();
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
            nickname: 'Jimmy Johns',
            address: {
                "address_components": [{
                        "long_name": "601",
                        "short_name": "601",
                        "types": ["street_number"]
                    },
                    {
                        "long_name": "West Martin Luther King Junior Boulevard",
                        "short_name": "W Martin Luther King Jr Blvd",
                        "types": ["route"]
                    },
                    {
                        "long_name": "Downtown",
                        "short_name": "Downtown",
                        "types": ["neighborhood", "political"]
                    },
                    {
                        "long_name": "Austin",
                        "short_name": "Austin",
                        "types": ["locality", "political"]
                    },
                    {
                        "long_name": "Travis County",
                        "short_name": "Travis County",
                        "types": ["administrative_area_level_2", "political"]
                    },
                    {
                        "long_name": "Texas",
                        "short_name": "TX",
                        "types": ["administrative_area_level_1", "political"]
                    },
                    {
                        "long_name": "United States",
                        "short_name": "US",
                        "types": ["country", "political"]
                    },
                    {
                        "long_name": "78701",
                        "short_name": "78701",
                        "types": ["postal_code"]
                    },
                    {
                        "long_name": "1115",
                        "short_name": "1115",
                        "types": ["postal_code_suffix"]
                    }
                ],
                "formatted_address": "601 W Martin Luther King Jr Blvd, Austin, TX 78701, USA",
                "geometry": {
                    "bounds": {
                        "northeast": {
                            "lat": 30.2822,
                            "lng": -97.74393649999999
                        },
                        "southwest": {
                            "lat": 30.282071,
                            "lng": -97.74407459999999
                        }
                    },
                    "location": {
                        "lat": 30.2821355,
                        "lng": -97.7440055
                    },
                    "location_type": "ROOFTOP",
                    "viewport": {
                        "northeast": {
                            "lat": 30.2834844802915,
                            "lng": -97.74265656970849
                        },
                        "southwest": {
                            "lat": 30.2807865197085,
                            "lng": -97.74535453029151
                        }
                    }
                },
                "place_id": "ChIJI35ue3a1RIYRPkyrwsbq5LI",
                "types": ["premise"]
            }
        },
        {
            nickname: 'Art Museum',
            address: {
                "address_components": [{
                        "long_name": "Jack S. Blanton Museum of Art",
                        "short_name": "Jack S. Blanton Museum of Art",
                        "types": ["premise"]
                    },
                    {
                        "long_name": "200",
                        "short_name": "200",
                        "types": ["street_number"]
                    },
                    {
                        "long_name": "East Martin Luther King Junior Boulevard",
                        "short_name": "E Martin Luther King Jr Blvd",
                        "types": ["route"]
                    },
                    {
                        "long_name": "University of Texas at Austin",
                        "short_name": "University of Texas at Austin",
                        "types": ["neighborhood", "political"]
                    },
                    {
                        "long_name": "Austin",
                        "short_name": "Austin",
                        "types": ["locality", "political"]
                    },
                    {
                        "long_name": "Travis County",
                        "short_name": "Travis County",
                        "types": ["administrative_area_level_2", "political"]
                    },
                    {
                        "long_name": "Texas",
                        "short_name": "TX",
                        "types": ["administrative_area_level_1", "political"]
                    },
                    {
                        "long_name": "United States",
                        "short_name": "US",
                        "types": ["country", "political"]
                    },
                    {
                        "long_name": "78701",
                        "short_name": "78701",
                        "types": ["postal_code"]
                    }
                ],
                "formatted_address": "Jack S. Blanton Museum of Art, 200 E Martin Luther King Jr Blvd, Austin, TX 78701, USA",
                "geometry": {
                    "bounds": {
                        "northeast": {
                            "lat": 30.2813626,
                            "lng": -97.7369872
                        },
                        "southwest": {
                            "lat": 30.2806046,
                            "lng": -97.73783539999999
                        }
                    },
                    "location": {
                        "lat": 30.2809836,
                        "lng": -97.73741129999999
                    },
                    "location_type": "ROOFTOP",
                    "viewport": {
                        "northeast": {
                            "lat": 30.2823325802915,
                            "lng": -97.73606231970849
                        },
                        "southwest": {
                            "lat": 30.2796346197085,
                            "lng": -97.7387602802915
                        }
                    }
                },
                "place_id": "ChIJ93cxvJ61RIYRgMmw6BoC_eA",
                "types": ["premise"]
            }
        },
        {
            nickname: 'Park',
            address: {
                "address_components": [{
                        "long_name": "1100",
                        "short_name": "1100",
                        "types": ["street_number"]
                    },
                    {
                        "long_name": "Kingsbury Street",
                        "short_name": "Kingsbury St",
                        "types": ["route"]
                    },
                    {
                        "long_name": "Old West Austin",
                        "short_name": "Old West Austin",
                        "types": ["neighborhood", "political"]
                    },
                    {
                        "long_name": "Austin",
                        "short_name": "Austin",
                        "types": ["locality", "political"]
                    },
                    {
                        "long_name": "Travis County",
                        "short_name": "Travis County",
                        "types": ["administrative_area_level_2", "political"]
                    },
                    {
                        "long_name": "Texas",
                        "short_name": "TX",
                        "types": ["administrative_area_level_1", "political"]
                    },
                    {
                        "long_name": "United States",
                        "short_name": "US",
                        "types": ["country", "political"]
                    },
                    {
                        "long_name": "78703",
                        "short_name": "78703",
                        "types": ["postal_code"]
                    }
                ],
                "formatted_address": "1100 Kingsbury St, Austin, TX 78703, USA",
                "geometry": {
                    "bounds": {
                        "northeast": {
                            "lat": 30.2813987,
                            "lng": -97.75225789999999
                        },
                        "southwest": {
                            "lat": 30.2813128,
                            "lng": -97.7523513
                        }
                    },
                    "location": {
                        "lat": 30.2813557,
                        "lng": -97.7523046
                    },
                    "location_type": "ROOFTOP",
                    "viewport": {
                        "northeast": {
                            "lat": 30.2827047302915,
                            "lng": -97.75095561970848
                        },
                        "southwest": {
                            "lat": 30.2800067697085,
                            "lng": -97.7536535802915
                        }
                    }
                },
                "partial_match": true,
                "place_id": "ChIJFcOQ_nG1RIYRpZrnRwZTu7I",
                "types": ["premise"]
            }
        }
    ];

    for (var i = 0; i < defaultLocations.length; i++) {
        vm.locationArray.push(defaultLocations[i]);
    }
};

var vm = new ViewModel();

var onMapLoad = function() {
    ko.applyBindings(vm);

    init();
};