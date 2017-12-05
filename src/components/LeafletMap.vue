<template>
  <div :id="mapId"></div>
</template>

<script>
  import L from 'leaflet'
  import 'leaflet-providers'
  import 'leaflet/dist/leaflet.css'

  export default {
    name: 'leaflet-map',
    methods: {
      initMap: function () {
        this.map = L.map(this.mapId).setView([41.7151, 44.8271], 13);
        L.tileLayer.provider('CartoDB.Positron', {
          keepBuffer: 100
        }).addTo(this.map);
      }
    },
    data() {
      return {
        map: null
      }
    },
    mounted() {
      this.initMap();
    },
    computed: {
      mapId() {
        return 'leaflet-map-' + this._uid;
      }
    }
  }
</script>

<style scoped>
</style>
