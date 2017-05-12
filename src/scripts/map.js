import mapboxgl from 'mapbox-gl'; 

function init() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2Via2lkIiwiYSI6ImNCUXNCYU0ifQ.JETFQZV_Fs0SPZqTgNtQ5A';

  const map = new mapboxgl.Map({
    center: [13.422153, 52.500615],
    zoom: 13,
    minZoom: 10,
    maxZoom: 16,
    interactive: false,
    attributionControl: false,
    logoPosition: 'bottom-right',
    container: 'map',
    style: 'mapbox://styles/webkid/cj2lojjo7000v2smt2z4ne9w8'
  });
}

export default {
  init
}