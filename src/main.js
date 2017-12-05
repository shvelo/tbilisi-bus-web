import Vue from 'vue'
import App from './App.vue'
import LeafletMap from './components/LeafletMap'

Vue.component('leaflet-map', LeafletMap);

new Vue({
  el: '#app',
  render: h => h(App)
});
