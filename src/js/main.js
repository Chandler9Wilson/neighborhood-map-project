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
    var autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')));
        autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', function() {
          infowindow.close();  //closes the autocomplete suggestions
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          console.log(place);
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
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
        selectedLocation: undefined
    };

    this.stateMachine = function(newState) {
        if(newState.type === area) {
            mapCenter = newState.coords;

        }
    };
    //end: state machine

    //start: newArea 
    this.newArea = function(dialogState) {
        this.counter = 0;
        this.newAreaAddress = ko.observable;
        this.newAreaNickname = ko.observable();
        
        console.log("newArea");
        switch (dialogState) {
            case 'showModal':
                dialog.showModal();
                break;
            case 'closeModal':
                dialog.close();
                break;
            case 'submit':
                //todo add validation possibly with jquery plugin https://jqueryvalidation.org/
                console.log(newArea.newAreaAddress);
                console.log(newArea.newAreaNickname);
                break;
            default:
                //todo add error message on screen
                console.log('error in dialogState');
        }
        console.log(dialogState);
    };
    //end: newArea

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



