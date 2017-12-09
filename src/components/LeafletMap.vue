<template>
  <div>
    <div class="map-pane" :id="mapId"></div>
    <arrival-times :stop="selectedStop" ref="arrivalTimes"></arrival-times>
  </div>
</template>

<script>
  import L from 'leaflet'
  import axios from 'axios'
  import 'leaflet-providers'
  import 'leaflet.markercluster'
  import 'leaflet/dist/leaflet.css'
  import 'leaflet.markercluster/dist/MarkerCluster.css'
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
  import ArrivalTimes from "./ArrivalTimes";

  const stopMarker = L.Marker.extend({
    options: {
      stop: {}
    }
  });

  export default {
    components: {ArrivalTimes},
    name: 'leaflet-map',
    methods: {
      initMap: function () {
        this.map = L.map(this.mapId).setView(this.center, this.zoom);
        L.tileLayer.provider(this.providerName, this.providerOptions).addTo(this.map);
      },
      initMarkerLayer: function () {
        this.markerLayer = L.markerClusterGroup({
          spiderfyDistanceMultiplier: 1.5,
          disableClusteringAtZoom: 17,
          maxClusterRadius: 80
        });
        this.map.addLayer(this.markerLayer);

        axios.get('/src/assets/db.json').then((result) => {
          this.markerLayer.addLayers(result.data.map((stop) => {
            return new stopMarker([stop.lat, stop.lon], {
              icon: this.stopIcon(),
              title: stop.name,
              alt: stop.name,
              stop: stop
            })
          }));
        });

        this.markerLayer.on('click', (event) => {
          this.showInfo(event.layer);
        });

        this.initPopup();
      },
      initPopup: function () {
        this.popup = L.popup({
          offset: L.point(0, -32),
          maxWidth: 400,
          minWidth: 400,
          maxHeight: 600
        }, this.markerLayer);

        this.popup.setContent(this.$refs.arrivalTimes.$el);
      },
      stopIcon: function () {
        return L.icon({
          iconUrl: '/src/assets/stop_icon.png',
          iconSize: [32, 38],
          iconAnchor: [16, 38]
        });
      },
      showInfo: function (marker) {
        this.selectedStop = marker.options.stop;
        marker.bindPopup(this.popup).openPopup();
      },
      cors: function (url) {
        return axios.get('http://cors-proxy.htmldriven.com/?url=' + encodeURIComponent(url))
          .then((result) => {
            return result.data && result.data.body;
          });
      }
    },
    data() {
      return {
        map: null,
        markerLayer: null,
        selectedStop: null,
        popup: null,
        center: [41.7151, 44.8271],
        zoom: 13,
        providerName: 'Hydda.Full',
        providerOptions: {
          keepBuffer: 100
        }
      }
    },
    mounted() {
      this.initMap();
      this.initMarkerLayer();
    },
    computed: {
      mapId() {
        return 'leaflet-map-' + this._uid;
      }
    }
  }
</script>

<style>
  .arrival-times {
    display: none;
  }

  .leaflet-popup-content .arrival-times {
    display: block;
  }

  .leaflet-popup-content-wrapper {
    border-radius: 0;
  }

  .leaflet-popup-content {
    max-height: 80vh;
    min-height: 80px;
    overflow-y: auto;
    margin: 0;
  }

  .leaflet-container a.leaflet-popup-close-button {
    font-size: 18px;
    right: 15px;
    top: 2px;
  }
</style>
