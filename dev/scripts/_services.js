// services

angular
  .module('MainApp')
  .service('$mapService', ['$rootScope', MapService])
  .service('$leafService', ['$rootScope', LService]);

// map service
function MapService($rootScope){
  var map, vectorLayer;
  return {
    setMap: setM,
    setVectorLayer: putVectorLayer,
    center: mapCenter,
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
  // get / set center
  function mapCenter(lng,lat){
    if(lng && lat){
      map.getView().setCenter(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857'));
    }
    return map.getView().getCenter();
  }
}

// map using leafjs http://leafletjs.com/ v.0.7.3
function LService($rootScope){
  var map, mHelper;
  return {
    setMap: setM,
    overlay: overlayHelper,
    center: setCenter
  };
  // set map
  function setM(m){
    map = m;
    mHelper = new LMarkerHelper(map);
    $rootScope.$broadcast('mapReady', map);
    return map;
  }
  // set helper
  function overlayHelper(){
    return mHelper;
  }
  // set center
  function setCenter(latLng, zoom){
    map.panTo(latLng);
    map.setZoom(zoom||14);
  }
}