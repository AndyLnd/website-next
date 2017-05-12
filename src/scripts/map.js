import mapboxgl from 'mapbox-gl';

const webkidCoords = [13.422153, 52.500615];

function init() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2Via2lkIiwiYSI6ImNCUXNCYU0ifQ.JETFQZV_Fs0SPZqTgNtQ5A';


  const map = new mapboxgl.Map({
    center: webkidCoords,
    zoom: 15,
    minZoom: 10,
    maxZoom: 16,
    pitch: 30,
    interactive: false,
    attributionControl: false,
    logoPosition: 'bottom-right',
    container: 'map',
    style: 'mapbox://styles/webkid/cj2m13fxv001r2qmlrokube04'
  });

  map.on('load', function () {

    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": webkidCoords
            }
          }]
        }
      },
      "layout": {
        "icon-image": "circle-15",
        "text-field": "webkid office",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [.8, 0],
        "text-anchor": "left",
      },
      "paint": {
        "icon-color": '#ff0000',
      }
    });
  });

}


export default {
  init
}