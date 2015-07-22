// main

 angular
  .module('MainApp')
  .controller('MainController', ['$rootScope', '$mapService', MainController]);

function MainController($rootScope, $mapService){
  //
  $rootScope.$on('mapReady', function(map){
    //$mapService.vector.add({lng: -34.856898,lat: -7.1194165});
  });
} 