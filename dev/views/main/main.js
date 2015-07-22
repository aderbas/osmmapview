// main

 angular
  .module('MainApp')
  .controller('MainController', ['$rootScope', '$mapService', MainController]);

function MainController($rootScope, $mapService){
  $rootScope.$on('mapReady', function(map){
    //$mapService.vector.add({lng: -34.856898,lat: -7.1194165});
    // geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
      if(position){
        $mapService.vector.add({lng: position.coords.longitude, lat: position.coords.latitude});
        // set center
        $mapService.center(position.coords.longitude, position.coords.latitude);
      }
    });
  });
} 