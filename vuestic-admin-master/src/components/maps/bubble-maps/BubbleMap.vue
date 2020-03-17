<template>
  <div class="bubble-map fill-height" />
</template>

<script>
import 'amcharts3'
import 'amcharts3/amcharts/plugins/responsive/responsive.js'
import 'amcharts3/amcharts/serial.js'
import 'amcharts3/amcharts/themes/light'

import 'ammap3'
import 'ammap3/ammap/maps/js/worldLow'
import axios from 'axios'
export default {
  name: 'bubble-map',
  data () {
    return {
      mapData: [],
    }
  },
  created () {
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=liste-des-quais&rows=100').then(resp => {
      this.mapData = resp.data.records
    }).catch((err) => {
      console.log(err)
    })
    setTimeout(() => {
      console.log(this.mapData)
    }, 4000)
  },
  methods: {
    drawMap () {
      /* global AmCharts */
      let map
      let minBulletSize = 3
      let maxBulletSize = 70
      let min = Infinity
      let max = -Infinity
      AmCharts.theme = AmCharts.themes.light

      // get min and max values
      setTimeout(() => {
        console.log(this.mapData)
        this.mapData.forEach((dataItem) => {
          let value = dataItem.fields.longueur
          if (value < min) {
            min = value
          }
          if (value > max) {
            max = value
          }
        })
        map = new AmCharts.AmMap()

        map.projection = 'winkel3'
        map.addTitle('Population of the World in 2011', 14, 1, 1, false)
        map.addTitle('source: Gapminder', 11, 1, 1, 1, false)
        map.areasSettings = {
          unlistedAreasColor: '#eee',
          unlistedAreasAlpha: 1,
          outlineColor: '#fff',
          outlineThickness: 2,
        }
        map.imagesSettings = {
          balloonText: '<span style="font-size:14px"><b>[[title]]</b>: [[value]]</span>',
          alpha: 0.75,
        }

        let dataProvider = {
          mapVar: AmCharts.maps.worldLow,
          images: [],
        }

        // create circle for each country
        // it's better to use circle square to show difference between values, not a radius
        const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI
        const minSquare = minBulletSize * minBulletSize * 2 * Math.PI

        // create circle for each country
        this.mapData.forEach((dataItem) => {
          console.log(dataItem.fields)
          const value = dataItem.fields.longueur
          // calculate size of a bubble
          let square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare
          if (square < minSquare) {
            square = minSquare
          }
          const size = Math.sqrt(square / (Math.PI * 2))
          const id = dataItem.recordid
          dataProvider.images.push({
            type: 'circle',
            width: size,
            height: size,
            color: dataItem.fields.longueur > 200 ? 'red' : 'green',
            longitude: dataItem.fields.c_geo_f ? dataItem.fields.x_f_wgs84 : '',
            latitude: dataItem.fields.c_geo_f ? dataItem.fields.y_f_wgs84 : '',
            title: dataItem.fields.lib_gare,
            value: value,
          })
        })

        map.dataProvider = dataProvider
        map.write(this.$el)
      }, 3000)

      // build map
    },
  },

  mounted () {
    this.drawMap()
  },
}
</script>
