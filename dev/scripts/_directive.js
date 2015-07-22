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
      // Layer. Possible values are osm, sat, and hyb.
      maplayer = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'osm'}) // or ol.source.OSM
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
      // maplayer.on('postcompose', function(event) {
      //   var context = event.context;
      //   var canvas = context.canvas;
      //   var image = context.getImageData(0, 0, canvas.width, canvas.height);
      //   var data = image.data;
      //   for (var i = 0, ii = data.length; i < ii; i += 4) {
      //     data[i] = data[i + 1] = data[i + 2] = (3 * data[i] + 4 * data[i + 1] + data[i + 2]) / 8;
      //   }
      //   context.putImageData(image, 0, 0);
      // });        
      // register vector layer
      ctrl.registerVLayer(new VectorLayerHelper()); // _helper.js                
      // register map
      ctrl.registerMap(map);
    }// link
  }; // return
} // OpenStreetMap */