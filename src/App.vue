<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-2"></div>
      <leaflet-map class="col-10 map-pane"></leaflet-map>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'

  export default {
    name: 'app',
    data() {
      return {
      }
    },
    mounted() {
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .map-pane {
    height: 100vh;
  }
</style>
