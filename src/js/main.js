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
    var self = this;
//start: machines

    //start: newArea 
    self.newArea = function(dialogState) {
        var self2 = this;
        self2.counter = 0;
        self2.newName = ('newArea' + counter);
        
        self2.nickname = ko.observable();
        console.log("newArea");
        switch (dialogState) {
            case 'showModal':
                newArea.showModal();
                initAutocomplete('area');
                break;
            case 'closeModal':
                newArea.close();
                break;
            case 'submit':
                //todo add validation possibly with jquery plugin https://jqueryvalidation.org/
                //grab location details by calling initAutocomplete.place?
                self2.areaDetails = place;
                console.log( initAutocomplete('address'));
                console.log(newArea.nickname, place);

                //new object
                var obj = {};
                obj[self2.newName] = new Area(newArea.nickname, self2.newName);
                console.log(obj);
                //console.log(ko.toJSON(areaArray));
                areaArray.push(obj);
                console.log('areaArray', areaArray());
                areaArray.valueHasMutated();
                //self.newName.gMaps.push(self.areaDetails); //push google places json data to the gmaps array todo rename to more intuitive name
                //allAreas.push(self.newName); //push the new Area to the allAreas observableArray
                dialog.close();
                break;
            default:
                //todo add error message on screen
                console.log('error in dialogState');
        }
        console.log(dialogState);
        self2.counter = self.counter + 1;
    };
    //end: newArea

    var defaultArea = new Area('Austin', 'default');

    self.areaArray = ko.observableArray ([
        { default: defaultArea },
    ]);

    console.log(self.areaArray()[0]['default'].nickname);
    console.log(Object.keys(areaArray()[0])[0]);

    self.areaNames = ko.observableArray ([]);

    //loops through the areaArray to find the names of each instance of Area
    var findAreaNames = function() {
        var areaLength = this.areaArray().length;

        for(var i = 0; i < areaLength; i++) {
            //this finds the first key in an object and returns it
            var areaName = Object.keys(areaArray()[i])[0];

            var obj = {};
            obj['name'] = areaName;
            obj['index'] = i;
            areaNames.push(obj); 
        }
    };

    findAreaNames();
    console.log('areaNames', self.areaNames());

    self.itemNumber = function(index) {
        return index + 1;
    };

    self.areaNickname = function() {
        //areaArray[areaName[$index].index][areaName[$index.name]].nickname
        //var areaIndex = areaNames()[areaNameIndex].index;
        //var areaName = areaNames()[areaNameIndex].name;
        console.log(index);
        var context = ko.contextFor(event.target);

        //var nicknameCall = self.areaArray()
        var nicknameCall = self.areaArray()[self.areaNames()[context.$index()].index][self.areaNames()[context.$index()].name].nickname;//areaArray[areaIndex][areaName].nickname;
        console.log(nicknameCall);
        return nicknameCall;
    };

    //start: subscribe functions
    self.areaArray.subscribe(function(changes) {
        //deletes contents of areaNames
        self.areaNames.removeAll();

        findAreaNames();
        //todo run query function looking for nicknames in each object in the areaArrray
        //above similiar to http://stackoverflow.com/questions/14149551/subscribe-to-observable-array-for-new-or-removed-entry-only
    });
    //end: subscribe functions

    //start: newLocation
    self.newLocation = function(address, nickname) {
        this.counter = 0;
        this.newlocationName = ('newLocation' + counter);


        //newMarker
            //todo https://developers.google.com/maps/documentation/javascript/markers
        this.counter = counter + 1;
    };
    //end: newLocation

    //start: state machine
    self.currentState = ko.observable ({
        coords: {
            lat: undefined,
            lng: undefined
        },
        zoom: undefined,
        selectedArea: self[areaArray()[0]],
        selectedLocation: undefined,
        locationModal: undefined,
        areaModal: undefined
    });

    self.stateMachine = function(changedState, data) {
        switch (changedState) {
            case 'selectedArea':
                //todo areaArray[areaNames[data].index]
                break;
            case 'selectedLocation':
                break;
            case 'locationModal':
                break;
            case 'areaModal':
                break;
            default:
                console.log('error in stateMachine');
        }
    };
    //end: state machine

//end: machines

//start: observable arrays
    //todo to update from json in model http://knockoutjs.com/documentation/json-data.html
    self.allAreas = ko.observableArray([]);
    //todo to push to json to model http://knockoutjs.com/documentation/json-data.html
//end: observable arrays

};

//start: classes

    //class for locations which are stored in areas
    var Location = function(address, nickname) {
        this.address = address;
        this.nickname = nickname;
    };

    Location.prototype.gMaps = [];

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

ko.applyBindings(viewModel);



