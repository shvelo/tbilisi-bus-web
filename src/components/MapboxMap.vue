<template>
  <div :id="mapId"></div>
</template>

<script>
  import axios from 'axios'
  import mapboxgl from 'mapbox-gl'
  import MapboxDraw from '@mapbox/mapbox-gl-draw'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

  export default {
    name: 'mapbox-map',
    methods: {
      initMap: function () {
        this.map =  new mapboxgl.Map({
          container: this.mapId,
          style: 'http://localhost:8080/styles/osm-bright/style.json',
          center: this.center,
          zoom: this.zoom
        });

        let Draw = new MapboxDraw();

        this.map.addControl(Draw);

        this.map.on('load', () => {
        });
      },
    },
    data() {
      return {
        map: null,
        markerLayer: null,
        center: [44.8271, 41.7151],
        zoom: 13,
      }
    },
    mounted() {
      this.initMap();
    },
    computed: {
      mapId() {
        return 'mapbox-map-' + this._uid;
      }
    }
  }
</script>

<style>
</style>
