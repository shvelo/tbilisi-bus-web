<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-3 sidebar">
        <h1 class="text-center">
          <img src="/src/assets/ic_launcher_web.png" alt="" class="img-fluid" width="60px">
          Tbilisi Bus
        </h1>

        <div role="tablist">
          <div class="card">
            <a @click.prevent="shownPane = 'pane1'" role="tab" id="heading1" aria-expanded="true" aria-controls="pane1"
               class="btn btn-dark" href="#pane1">
              Routes
            </a>

            <div id="pane1" class="collapse" :class="{ show: shownPane === 'pane1' }" role="tabpanel"
                 aria-labelledby="heading1">
              <div class="card-body">
              </div>
            </div>
          </div>
          <div class="card">
            <a @click.prevent="shownPane = 'pane2'" role="tab" id="heading2" class="btn btn-dark" href="#pane2"
               aria-expanded="false" aria-controls="pane2">
              Stops
            </a>
            <div id="pane2" class="collapse" :class="{ show: shownPane === 'pane2' }" role="tabpanel"
                 aria-labelledby="heading2">
              <div class="card-body">
              </div>
            </div>
          </div>
          <div class="card">
            <a @click.prevent="shownPane = 'pane3'" role="tab" id="heading3" aria-expanded="false" aria-controls="pane3"
               class="btn btn-dark"  href="#pane3">
              Item 3
            </a>
            <div id="pane3" class="collapse" role="tabpanel" :class="{ show: shownPane === 'pane3' }"
                 aria-labelledby="heading3">
              <div class="card-body">
              </div>
            </div>
          </div>
        </div>
      </div>
      <leaflet-map class="col-9 map-pane"></leaflet-map>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'open-iconic/font/css/open-iconic-bootstrap.css'

  export default {
    name: 'app',
    data() {
      return {
        shownPane: 'pane1'
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

  .sidebar {
    height: 100vh;
    overflow-y: auto;
  }

  .map-pane {
    height: 100vh;
  }
</style>
