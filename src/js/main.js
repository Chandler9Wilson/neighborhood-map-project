//todo add modular loading with require js http://knockoutjs.com/documentation/amd-loading.html

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

//todo fix autocomplete suggestions not showing should be related to this
//http://stackoverflow.com/questions/10957781/google-maps-autocomplete-result-in-bootstrap-modal-dialog
//https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
/*function initAutocomplete() {*/
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    /*autocomplete = new google.maps.places.Autocomplete(*/
        /** @type {!HTMLInputElement} *//*(document.getElementById('address')),*/
        /*{types: ['geocode']});*/

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    //autocomplete.addListener('place_changed');
    
/*    var place = autocomplete.getPlace();
    if(place !== undefined) {
        console.log(place);
        viewModel.newArea.newAreaAddress = place;
        console.log(viewModel.newArea.newAreaAddress);
    }
}*/
var place;

function initAutocomplete(type) {
    //var self = this;
    //self.place = undefined;

    if(type === 'area') {
        var autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')));
            autocomplete.bindTo('bounds', map);
            autocomplete.addListener('place_changed', function() {
                //infowindow.close();  //closes the autocomplete suggestions
                //marker.setVisible(false);
                place = autocomplete.getPlace();
                console.log(place);
            });
    }else if(type === 'location') {

    }else if(type === 'address') {
        return place;
    }else {
        console.log('error in initAutocomplete');
    }
    console.log(place);
}

var mapArea = {
    lat: 30.284301,
    lng: -97.74473390000001
};

var viewModel = function() {
//start: machines

    //start: state machine
    this.currentState = {
        coords: {
            lat: undefined,
            lng: undefined
        },
        zoom: undefined,
        selectedArea: undefined,
        selectedLocation: undefined,
        locationModal: undefined,
        areaModal: undefined
    };

    this.stateMachine = function(newState) {
        if(newState.type === area) {
            mapCenter = newState.coords;

        }
    };
    //end: state machine

    //start: newArea 
    this.newArea = function(dialogState) {
        var self = this;
        self.counter = 0;
        self.newName = ('newArea' + counter);
        
        self.nickname = ko.observable();
        console.log("newArea");
        switch (dialogState) {
            case 'showModal':
                dialog.showModal();
                initAutocomplete('area');
                break;
            case 'closeModal':
                dialog.close();
                break;
            case 'submit':
                //todo add validation possibly with jquery plugin https://jqueryvalidation.org/
                //grab location details by calling initAutocomplete.place?
                self.areaDetails = place;
                console.log( initAutocomplete('address'));
                console.log(newArea.nickname, place);

                //new object
                var obj = {};
                obj[self.newName] = new Area(self.nickname, self.newName);
                areaArray.push(obj);
                //self.newName.gMaps.push(self.areaDetails); //push google places json data to the gmaps array todo rename to more intuitive name
                //allAreas.push(self.newName); //push the new Area to the allAreas observableArray
                dialog.close();
                break;
            default:
                //todo add error message on screen
                console.log('error in dialogState');
        }
        console.log(dialogState);
        self.counter = self.counter + 1;
    };
    //end: newArea

    this.areaArray = ko.observableArray ([
        { default: new Area('Austin') }
    ]);

    this.areaNames = ko.observableArray ([]);

    //start: subscribe functions
    areaArrray.subscribe(function(changes) {
        //todo delete all contents of areaNames http://stackoverflow.com/questions/18638507/how-to-clear-contents-of-an-observablearray-that-was-populated-from-previous-vis
        //todo run query function looking for nicknames in each object in the areaArrray
        //above similiar to http://stackoverflow.com/questions/14149551/subscribe-to-observable-array-for-new-or-removed-entry-only
    })
    //end: subscribe functions

    //start: newLocation
    this.newLocation = function(address, nickname) {
        this.counter = 0;
        this.newlocationName = ('newLocation' + counter);


        //newMarker
            //todo https://developers.google.com/maps/documentation/javascript/markers
        this.counter = counter + 1;
    };
    //end: newLocation

//end: machines

//start: observable arrays
    //todo to update from json in model http://knockoutjs.com/documentation/json-data.html
    this.allAreas = ko.observableArray([]);
    //todo to push to json to model http://knockoutjs.com/documentation/json-data.html
//end: observable arrays

};

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
    var Area = function(nickname, generatedName) {
        this.nickname = nickname;
        this.generatedName = generatedName;
    };

    Area.prototype.gMaps = [];

    Area.prototype.locations = ko.observableArray([]);

//end: classes

var model = {
    //todo for converting from observables to json http://knockoutjs.com/documentation/json-data.html
};



