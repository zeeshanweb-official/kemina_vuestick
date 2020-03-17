<template>
  <div class="charts">
    <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.verticalBarChart')"
        >
          <va-chart :data="verticalBarChartData" type="vertical-bar"/>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.horizontalBarChart')"
        >
          <va-chart :data="horizontalBarChartData" type="horizontal-bar"/>
        </va-card>
      </div>
    </div>

    <div class="row">
      <div class="flex md12 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.lineChart')"
        >
          <va-chart :data="lineChartData" type="line"/>
        </va-card>
      </div>
    </div>

    <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.pieChart')"
        >
          <va-chart :data="pieChartData" type="pie"/>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.donutChart')"
        >
          <va-chart :data="donutChartData" type="donut"/>
        </va-card>
      </div>
    </div>
    <div class="row">
      <div class="flex md12 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.bubbleChart')"
        >
          <va-chart :data="bubbleChartData" type="bubble"/>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getLineChartData } from '../../../data/charts/LineChartData'
import { getBubbleChartData } from '../../../data/charts/BubbleChartData'
import { getPieChartData } from '../../../data/charts/PieChartData'
import { getDonutChartData } from '../../../data/charts/DonutChartData'
import { getVerticalBarChartData } from '../../../data/charts/VerticalBarChartData'
import { getHorizontalBarChartData } from '../../../data/charts/HorizontalBarChartData'
import axios from 'axios'
export default {
  name: 'charts',
  data () {
    return {
      bubbleChartData: getBubbleChartData(this.$themes),
      lineChartData: getLineChartData(this.$themes),
      pieChartData: getPieChartData(this.$themes),
      donutChartData: getDonutChartData(this.$themes),
      verticalBarChartData: getVerticalBarChartData(this.$themes),
      horizontalBarChartData: getHorizontalBarChartData(this.$themes),
      lineData: [],
      bubbleChart: [],
    }
  },
  methods: {
    refreshData () {
      this.lineChartData = getLineChartData(this.$themes)
    },
  },
  created () {
    this.$nextTick().then(() => {
    // Add the component back in
      console.log(this.bubbleChartData)
      this.renderComponent = true
      this.$forceUpdate()
    })
  },
  mounted () {
    let debit = []
    let credit = []
    let bubbles = []
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=repartition-genre-effectif&rows=12&sort=date&facet=date&facet=contrat_travail').then((success) => {
      this.lineData = success.data
    }).catch((err) => {
      console.log(err)
    })
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=vitesse-maximale-nominale-sur-ligne&rows=70&sort=-v_max').then((success) => {
      this.bubbleChart = success.data
      success.data.records.map((item) => {
        if (item.fields.v_max < 20) {
          let mainobj = {
            label: 'USA',
            backgroundColor: 'rgba(227,75,74,0.9)',
            borderColor: 'transparent',
            data: [
            ],
          }
          let obj = {
            x: item.fields.x_d_wgs84,
            y: item.fields.y_d_wgs84,
            r: item.fields.v_max,
          }
          mainobj.data.push(obj)
          // console.log(bubbles)
          // console.log(this.bubbleChartData.datasets[0].data = bubbles)
        }
        if (item.fields.v_max < 30 && item.fields.v_max > 21) {
          let obj = {
            x: item.fields.x_d_wgs84,
            y: item.fields.y_d_wgs84,
            r: item.fields.v_max,
          }
          bubbles.push(obj)
          console.log(bubbles)
          console.log(this.bubbleChartData.datasets[1].data = bubbles)
        }
        if (item.fields.v_max < 80 && item.fields.v_max > 60) {
          let obj = {
            x: item.fields.x_d_wgs84,
            y: item.fields.y_d_wgs84,
            r: item.fields.v_max,
          }
          bubbles.push(obj)
          console.log(bubbles)
          console.log(this.bubbleChartData.datasets[2].data = bubbles)
        }
        if (item.fields.v_max < 100 && item.fields.v_max > 80) {
          let obj = {
            x: item.fields.x_d_wgs84,
            y: item.fields.y_d_wgs84,
            r: item.fields.v_max,
          }
          bubbles.push(obj)
          console.log(bubbles)
          console.log(this.bubbleChartData.datasets[3].data = bubbles)
        }
      })
    }).catch((err) => {
      console.log(err)
    })
    setTimeout(() => {
      this.lineData.records.map((item, index) => {
        if (index < 6) {
          debit.push(item.fields.nombre_de_femmes)
        } else {
          credit.push(item.fields.nombre_de_femmes)
        }
      })
      this.lineChartData.datasets[0].data = credit
      this.lineChartData.datasets[1].data = debit
      // this.chart.validateData()
    }, 5000)
  },
}
</script>

<style lang="scss">
.chart-widget {
  .va-card__body {
    height: 550px;
  }
}
</style>
