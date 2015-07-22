// Util / Help 

// Vector Layer Helper
function VectorLayerHelper(){
  //empty vector
  var vectorSource = new ol.source.Vector({ });
  // icon style
  var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      opacity: 0.75,
      anchor: [0.5, 1],
      src: 'images/location-alt-32.png'
    }))
  });

  // {lng,lat,point}
  function addnew(obj){
    if(!obj.point){
      obj.point = new ol.geom.Point(ol.proj.transform([obj.lng,obj.lat], 'EPSG:4326',   'EPSG:3857'));   
    }
    var ft = new ol.Feature({
      geometry: obj.point,
      name: ''
    });
    vectorSource.addFeature(ft);
  }
    
  return {
    layer: new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle
    }),
    addVector: addnew
  };                
}// VectorLayerHelper