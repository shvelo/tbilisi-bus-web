<template>
  <div class="arrival-times">
    <div class="stopInfoHeader" v-if="stop">
      <a href="#" @click.prevent="refresh" class="arrival-times-refresh">
        <span class="oi oi-reload"></span>
      </a>
      <strong>[{{ stop.id }}]</strong>
      {{ stop.name }}
    </div>
    <div v-if="loading" class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div v-else v-html="stopTable"></div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'arrival-times',
    props: {
      stop: Object
    },
    methods: {
      refresh: function () {
        if (!this.stop)
          return;

        this.loading = true;
        this.cors('http://transit.ttc.com.ge/pts-portal-services/servlet/stopArrivalTimesServlet?stopId=' + this.stop.id)
          .then((result) => {
            this.loading = false;
            this.stopTable = result;
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
        loading: true,
        stopTable: ""
      }
    },
    watch: {
      stop: function () {
        this.refresh();
      }
    }
  }
</script>

<style>
  .arrivalTimesTable, .arrivalTimesInnerTable {
    width: 100%;
  }

  .arrival-times-refresh {
    position: absolute;
    left: 8px;
    top: 7px;
  }

  .stopInfoHeader {
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding: 5px 20px;
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
