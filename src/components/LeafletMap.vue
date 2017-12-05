<template>
  <div :id="mapId"></div>
</template>

<script>
  import L from 'leaflet'
  import axios from 'axios'
  import 'leaflet-providers'
  import 'leaflet.markercluster'
  import 'leaflet/dist/leaflet.css'
  import 'leaflet.markercluster/dist/MarkerCluster.css'
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

  const stopMarker = L.Marker.extend({
    options: {
      stop: {}
    }
  });

  export default {
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
      },
      stopIcon: function () {
        return L.icon({
          iconUrl: '/src/assets/stop_icon.png',
          iconSize: [32, 38],
          iconAnchor: [16, 38]
        });
      },
      showInfo: function (marker) {
        let stopId = marker.options.stop.id;

        let popup = L.popup({
          offset: L.point(0, -32),
          maxWidth: 400,
          minWidth: 400,
          maxHeight: 600
        }, marker);

        let stopHeader = '<div class="stopInfoHeader"><strong>[' + marker.options.stop.id + ']</strong> ' +
          marker.options.stop.name + '</div>';

        popup.setContent(stopHeader +
          '<div class="spinner">\n' +
          '  <div class="rect1"></div>\n' +
          '  <div class="rect2"></div>\n' +
          '  <div class="rect3"></div>\n' +
          '  <div class="rect4"></div>\n' +
          '  <div class="rect5"></div>\n' +
          '</div>');

        marker.bindPopup(popup).openPopup();

        this.cors('http://transit.ttc.com.ge/pts-portal-services/servlet/stopArrivalTimesServlet?stopId=' + stopId)
          .then((result) => {
            popup.setContent(stopHeader + result);
          });
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
  .arrivalTimesTable, .arrivalTimesInnerTable {
    width: 100%;
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

  .stopInfoHeader {
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-right: 20px;
  }

  .arrivalTableRouteNumberHeader, .arrivalTableStopNameHeader, .arrivalTableArrivalTimeHeader {
    display: none;
  }

  .arrivalTableRouteNumber {
    width: 4em;
    padding: 5px;
    color: white;
    background: orange;
    text-align: center;
    font-weight: bold;
  }

  .arrivalTableStopName {
    text-align: center;
    padding: 5px;
  }

  .arrivalTableArrivalTime {
    width: 4em;
    text-align: center;
    padding: 5px;
    font-weight: bold;
  }

  .arrivalTableArrivalTime::after {
    content: 'წთ.'
  }

  .spinner {
    margin: 0 auto;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: #333;
    height: 100%;
    width: 6px;
    display: inline-block;

    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% {
      -webkit-transform: scaleY(0.4)
    }
    20% {
      -webkit-transform: scaleY(1.0)
    }
  }

  @keyframes sk-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
</style>
