# Questions:

1. Why does pushing to the underlying array `areaArray().push()` work, but pushing using the knockout method `areaArray.push()` does not work?
The main problem is that pushing to the underlying array does not trigger the view update.
2. How do I pass a parameter when calling a function like so `data-bind="text: areaNickname($index)"`? 
I have tried the function literal notation, which I use on form elements, but rather than execute the function it .toString's the function
3. Places Autocomplete runs but is not displaying suggestions I found a [thread with a similar issue but in a bootstrap modal](http://stackoverflow.com/questions/10957781/google-maps-autocomplete-result-in-bootstrap-modal-dialog)
I have tried several of the suggested solutions but nothing has worked so far not sure what I am missing.
4. Part of the map is pushed off the page when in fullscreen desktop. I have not been able to figure out if this is an issue with mdl or how I am declaring the map properties in css