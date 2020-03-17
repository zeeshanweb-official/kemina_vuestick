<!-->mahfoudi map<-->
<template>
  <div class="leaflet-map fill-height">
  </div>
</template>

<script>
import 'leaflet-map'
import * as Leaflet from 'leaflet'
import axios from 'axios'

export default {
  name: 'leaflet-map',
  data () {
    return {
      mapData: [],
    }
  },
  created () {
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=liste-des-gares&rows=100&facet=fret&facet=voyageurs&facet=code_ligne&facet=departement').then(resp => {
      this.mapData = resp.data.records
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted () {
    //    L.Icon.Default.imagePath = 'assets/vendor/leaflet' TODO: make it work with webpack
    Leaflet.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.0.3/dist/images'

    let map = Leaflet.map(this.$el).setView([51.5074, 0.1278], 7)

    Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    //mahfoudi
    setTimeout(() => {
      if (this.mapData.length) {
        this.mapData.map((item) => {
          Leaflet.marker(item.fields.c_geo).addTo(map)
            .bindPopup(item.fields.commune)
            .openPopup()
        })
      }
    }, 2400)
  },
}
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";
</style>
