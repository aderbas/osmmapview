// services

angular
  .module('MainApp')
  .service('$mapService', ['$rootScope', MapService]);

// map service
function MapService($rootScope){
  var map, vectorLayer;
  return {
      setMap: setM,
      setVectorLayer: putVectorLayer,
      vector:{
          add: addVector
      }
  };
  // set map
  function setM(m){
      map = m;
      map.addLayer(vectorLayer.layer);
      $rootScope.$broadcast('mapReady', map);
      return map;
  }
  // set vector layer
  function putVectorLayer(l){
      vectorLayer = l;
  }
  // add vector
  function addVector(obj){
     vectorLayer.addVector(obj);             
  }
}