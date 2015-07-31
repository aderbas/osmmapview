# osmmapview
Basic Open Street Map Directive

<div class="highlight highlight-javascript">
<pre>
-- usage
$ npm install
$ bower install
$ grunt build
$ grunt server
</pre>
</div>

![Alt text](https://raw.githubusercontent.com/aderbas/osmmapview/master/osmap-directive.png "Print")

Using Leafletjs
```javascript
(function(){
  angular
  .module('MainApp', [])
  .controller('MainController', ['$rootScope', '$leafService', MainController]);
  
  function MainController($rootScope, $leafService){
    navigator.geolocation.getCurrentPosition(function(position) {
      if(position){
        $leafService.overlay().point.add([position.coords.latitude, position.coords.longitude], {
          content: 'My Location text here',
          title: 'My Location'
        });        
      }
    }
  }
}());
```
```html
  <!DOCTYPE html> 
  <html lang="en" ng-app="MainApp">
    <head>
      <link rel="stylesheet" href="//openlayers.org/en/v3.7.0/css/ol.css"> 
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css"> 
      <link rel="stylesheet" href="css/main.css"> 
    </head> 
    
    <body ng-controller="MainController">
      <div leaf-oms-map lat="-7.1194165" lng="-34.856898"></div>
      
      <script src="//openlayers.org/en/v3.7.0/build/ol.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"></script>
      <script src="js/lib/lib.js"></script>
      <script src="js/osmmapview.js"></script>
    </body>
  </html>
```




