import Vue from 'vue'
import App from './App.vue'
import LeafletMap from './components/LeafletMap'
import MapboxMap from './components/MapboxMap'

Vue.component('leaflet-map', LeafletMap);
Vue.component('mapbox-map', MapboxMap);

new Vue({
  el: '#app',
  render: h => h(App)
});
