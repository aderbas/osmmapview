// main

 angular
  .module('MainApp')
  .controller('MainController', ['$rootScope', '$mapService', MainController]);

function MainController($rootScope, $mapService){
  // geolocation
  navigator.geolocation.getCurrentPosition(function(position) {
    $rootScope.position = position;
  });
  $rootScope.$on('mapReady', function(map){
    $mapService.vector.add({lng: -34.856898,lat: -7.1194165});
    if($rootScope.position){
      $mapService.vector.add({lng: $rootScope.coords.longitude, lat: $rootScope.coords.latitude});
    }
  });
} 