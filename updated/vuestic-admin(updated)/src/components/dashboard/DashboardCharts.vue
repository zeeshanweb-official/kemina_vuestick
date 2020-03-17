<!--mahfoudi js-->
<template>
  <div class="row row-equal">
    <div class="flex xs12 xl6">
      <va-card :title="$t('dashboard.charts.trendyTrends')">
        <va-button
          small
          slot="actions"
          color="danger"
          class="mr-0"
        >
          {{ $t('dashboard.charts.deleteSection') }}
        </va-button>
        <va-chart class="chart" :data="lineChartData" type="line"/>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card :title="$t('dashboard.charts.loadingSpeed')">
        <va-button
          icon="fa fa-print"
          flat
          slot="actions"
          class="mr-0"
        />
        <va-chart class="chart" :data="donutChartData" type="donut"/>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card :title="$t('dashboard.charts.topContributors')">
        <va-button flat small slot="actions" class="mr-0" @click="progressIsSorted = !progressIsSorted">
          {{ $t('dashboard.charts.showAll') }}
        </va-button>

        <div
          class="mb-3"
          v-for="(progress, idx) in sortedProgressData"
          :key="idx"
        >
          <va-progress-bar
            :value="getPercent(progress.value/350)"
          >
            {{ progress.value }} Euros
          </va-progress-bar>
          <p class="mt-2">{{ progress.text}}|{{ progress.etat}}</p>
          
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
import { getDonutChartData } from '../../data/charts/DonutChartData'
import { hex2rgb } from '../../services/color-functions'

export default {
  name: 'dashboard-charts',
  data () {
    return {
      isLoadingLineChart: false,
      lineChartSncf: null,
      lineChartData: {},
      donutChartData: getDonutChartData(this.$themes),
      progressMax: 328,
      progressData: [],
      progressIsSorted: true
    }
  },
  mounted() {
    this.fetchLineChartDataSncf();
    this.fetchProgressChartData();
  },
  watch: {
    '$themes.primary' () {
      this.donutChartData = getDonutChartData(this.$themes)
    },

    '$themes.info' () {
      this.donutChartData = getDonutChartData(this.$themes)
    },

    '$themes.danger' () {
      this.donutChartData = getDonutChartData(this.$themes)
    },

    'isLoadingLineChart' (val) {
      if(!val) {
        this.setLineChartData();
      }
    }
  },
  computed: {
    sortedProgressData() {
      if(this.progressIsSorted) {
        return this.progressData.slice(0, 5);
      }

      return this.progressData;
    }
  },
  methods: {
    getPercent (val) {
      return (val / this.progressMax) * 100
    },
    fetchLineChartDataSncf() {
      const url = 'https://data.sncf.com/api/records/1.0/search/?dataset=effectifs-disponibles-sncf-depuis-1851&sort=date';
      this.isLoadingLineChart = true;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const chartData = data.records.reverse().map(item => {
            return item.fields.effectif_sncf;
          });

          this.lineChartSncf = chartData;
          this.isLoadingLineChart = false;
        })
        .catch(err => console.log(err));
    },
    setLineChartData() {
      const themes = this.$themes;
      const months = ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
      const yLabels = ['SNCF', 'OY Years']

      const generatedData = {
        labels: months,
        datasets: [
          {
            label: yLabels[0],
            backgroundColor: hex2rgb(themes['info'], 0.6).css,
            borderColor: 'transparent',
            data: this.lineChartSncf || []
          }
        ],
      }

      this.lineChartData = generatedData
    },
    fetchProgressChartData() {
      const url = 'https://data.sncf.com/api/records/1.0/search/?dataset=remuneration-2012-2015&sort=metier&facet=metier&facet=phase_de_carriere';

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const progressData = data.records.map(item => {
            return {
              value: item.fields.remuneration_fixe_brute_annuelle_en_euros,
              text: item.fields.metier,
              etat:item.fields.phase_de_carriere,
              
            }
          }).sort((a, b) => b.value - a.value );
          
          this.progressData = progressData;
        })
        .catch(err => console.log(err));
    },
  },
}
</script>

<style scoped>
  .chart {
    height: 400px;
  }
</style>
