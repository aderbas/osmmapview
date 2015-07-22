// directives

angular
  .module('MainApp')
  .directive('osmMap', OpenStreetMap);

// directive setup
function OpenStreetMap(){
  return {
    restrict: 'EA',
    controller: function($scope, $location, $mapService, $window){ 
      // register map
      this.registerMap = function(map){
        $mapService.setMap(map);  
      };
      // register vector layer
      this.registerVLayer = function(vl){
        $mapService.setVectorLayer(vl);   
      };
      // height
      this.getHeight = function(xf){
        return ($window.innerHeight - xf)+'px';
      };      
    }, // controller
    link: function (scope, elem, attrs, ctrl){
      var 
        lat = attrs.lat && parseFloat(attrs.lat) || -7.1194165,
        lng = attrs.lng && parseFloat(attrs.lng) || -34.856898,
        xf = attrs.xf && parseInt(attrs.xf) || 0,
        map, maplayer;
      // create map layer
      maplayer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      // create map
      map = new ol.Map({
         target: elem[0],
         layers: [maplayer],
         view: new ol.View({
          center: ol.proj.transform([lng,lat], 'EPSG:4326', 'EPSG:3857'),
          zoom: 17
         })
      });// map
      elem[0].style.height = ctrl.getHeight(xf);
      // register vector layer
      ctrl.registerVLayer(new VectorLayerHelper());                
      // register map
      ctrl.registerMap(map);
    }// link
  }; // return
} // OpenStreetMap */