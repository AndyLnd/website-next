import mapboxgl from 'mapbox-gl';

const webkidCoords = [13.422153, 52.500615];

class Map {

  constructor(selector) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2Via2lkIiwiYSI6ImNCUXNCYU0ifQ.JETFQZV_Fs0SPZqTgNtQ5A';

    this.map = new mapboxgl.Map({
      center: webkidCoords,
      zoom: 15,
      minZoom: 10,
      maxZoom: 16,
      pitch: 30,
      interactive: false,
      attributionControl: false,
      logoPosition: 'bottom-right',
      container: selector,
      style: 'mapbox://styles/webkid/cj2m13fxv001r2qmlrokube04'
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    this.bindEvents();
    this.addOfficeIcon();
  }

  bindEvents() {
    this.map.on('zoomend', () => {
      this.map.scrollZoom.enable();
      this.map.dragPan.enable();
    });
  }

  addOfficeIcon() {
    this.map.on('load', () => {
      this.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': webkidCoords
              }
            }]
          }
        },
        'layout': {
          'icon-image': 'circle-15',
          'text-field': 'webkid office',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [.8, 0],
          'text-anchor': 'left',
        }
      });
    });
  }
}

export default Map;
