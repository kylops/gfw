/*
 * @return RaisgLayer class (extends WMSLayerClass)
 */
define([
  'uri',
  'abstract/layer/WMSLayerClass',
], function(UriTemplate, WMSLayerClass) {

  'use strict';

  var wmsUrl = 'http://gisserver.socioambiental.org:6080/arcgis/services/raisg/raisg_mineria/MapServer/WMSServer?';
    wmsUrl += '&SERVICE=WMS';
    wmsUrl += '&REQUEST=GetMap';
    wmsUrl += '&VERSION=1.3.0';
    wmsUrl += '&LAYERS=0';
    wmsUrl += '&STYLES=polygonSymbolizer';
    wmsUrl += '&FORMAT=image%2Fpng';
    wmsUrl += '&TRANSPARENT=true';
    wmsUrl += '&HEIGHT=256';
    wmsUrl += '&WIDTH=256';
    wmsUrl += '&SLD=http://gfw-nav.herokuapp.com/assets/map/cartocss/raisg_mining.xml'; 
    wmsUrl += '&CRS=EPSG%3A3857';


  var wmsInfowindowUrl = 'http://gisserver.socioambiental.org:6080/arcgis/rest/services/raisg/raisg_mineria/MapServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=pais,nombre,cia,situacion,tipo_minerio,fuente,area_oficial_ha,leyenda,grupo&geometryType=esriGeometryPoint&geometry={longitude},{latitude}';


  var RaisgMiningLayer = WMSLayerClass.extend({

    options: {
      url: wmsUrl,
      infowindowUrl: wmsInfowindowUrl,
    },

    getQuery: function(_longitude, _latitude, _bbox) {
      return new UriTemplate(wmsInfowindowUrl)
        .fillFromObject({ longitude: _longitude, latitude: _latitude});
    }


  });

  return RaisgMiningLayer;

});
