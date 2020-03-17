<template>
  <div class="row row-equal">
    <div class="flex xl6 xs12">
      <div class="row">
        <div
          class="flex xs12 sm4"
          v-for="(info, idx) in infoTiles"
          :key="idx"
        >
          <va-card class="mb-4" :color="info.color">
            <p class="display-2 mb-0" style="color: white">{{ info.value }}</p>
            <p>{{$t(info.text)}}</p>
          </va-card>
        </div>
      </div>

      <div class="row">
        <div class="flex xs12 md6">
          <va-card>
            <p class="display-2 mb-1" :style="{color: this.$themes.primary}">291</p>
            <p class="no-wrap">{{$t('dashboard.info.completedPullRequests')}}</p>
          </va-card>
        </div>
        <div class="flex xs12 md6">
          <va-card>
            <div class="row row-separated">
              <div class="flex xs4">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.primary}">3</p>
                <p class="text--center mb-1">{{$t('dashboard.info.users')}}</p>
              </div>
              <div class="flex xs4">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.info}">{{wifiyes}}</p>
                <p class="text--center no-wrap mb-1">{{$t('dashboard.info.points')}}</p>
              </div>
              <div class="flex xs4">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.warning}">91</p>
                <p class="text--center mb-1">{{$t('dashboard.info.units')}}</p>
              </div>
            </div>
          </va-card>
        </div>
      </div>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card
        stripe="info"
        :title="$t('dashboard.info.componentRichTheme')"
      >
        Buying the right telescope to take your love of astronomy to the
        next level is a big next step.

        <div class="row mt-3">
          <va-button color="success">
            {{$t('dashboard.info.viewLibrary')}}
          </va-button>
        </div>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card
        image="https://i.imgur.com/qSykGko.jpg"
        square
        titleOnImage
      >
        <template slot="header">
          <va-button
            flat
            icon-right="ion ion-ios-arrow-forward"
            color="success"
            class="ma-0"
          >
            {{$t('dashboard.info.exploreGallery')}}
          </va-button>
        </template>
      </va-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DashboardInfoBlock',
  data () {
    return {
      mapData: [],
      wifiyes: [],
      infoTiles: [{
        color: 'success',
        value: '',
        text: 'le nombre des gares',

      }, {
        color: 'danger',
        value: '',
        text: 'list des quai',

      }, {
        color: 'info',
        value: '',
        text: 'gares equipee avec wifi',
      }],
    }
  },
  created () {
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=liste-des-gares&rows=100&facet=fret&facet=voyageurs&facet=code_ligne&facet=departement').then(resp => {
      this.infoTiles[0].value = resp.data.records.length
      // this.infoTiles[1].value = reds.length
    }).catch((err) => {
      console.log(err)
    })
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=gares-equipees-du-wifi&rows=57&sort=nom_de_la_gare&facet=nom_de_la_gare&facet=service_wifi').then(resp => {
      console.log(resp)
      this.infoTiles[1].value = resp.data.records.length
    }).catch((err) => {
      console.log(err)
    })
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=gares-equipees-du-wifi&rows=100&sort=nom_de_la_gare&facet=nom_de_la_gare&facet=service_wifi').then(resp => {
      let wifinone = []
      let wifiyes = []
      resp.data.records.map((item) => {
        if (item.fields.service_wifi === 'Non') {
          wifinone.push(item)
        } else {
          wifiyes.push(item)
        }
      })
      this.infoTiles[2].value = wifinone.length
      this.wifiyes = wifiyes.length
    }).catch((err) => {
      console.log(err)
    })
  },
}
</script>

<style lang="scss">
  .row-separated {
    .flex + .flex {
      border-left: 1px solid #e3eaeb;
    }

    @include media-breakpoint-down(xs) {
      p:not(.display-2){
        font-size: 0.875rem;
      }
    }
  }

  .dashboard {
    .va-card__header--over {
      @include media-breakpoint-up(md) {
        padding-top: 0 !important;
      }
    }

    .va-card__image {
      @include media-breakpoint-up(md) {
        padding-bottom: 0 !important;
      }
    }
  }
</style>
