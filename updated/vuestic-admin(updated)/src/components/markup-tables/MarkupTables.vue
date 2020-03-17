<!--mahfoudi--->
<template>
  <div class="markup-tables">
    <va-card :title="$t('tables.basic')" class="mb-2">
      <table class="va-table">
        <thead>
          <tr>
            <th>{{ $t('date') }}</th>
            <th>{{ $t('metiers') }}</th>
            <th>{{ $t('contrat_travail') }}</th>
            <th>{{ $t('recruitment') }}</th>         
          </tr>
        </thead>

        <tbody>
          <tr v-for="rec in allrecruits" :key="rec.recordid">
            <td>{{ rec.fields.date }}</td>
            <td>{{ rec.fields.metiers }}</td>
            <td>{{ rec.fields.contrat_travail }}</td>
            <!-- <td>{{ rec.fields.recrutement }}</td> -->
            <td>
              <va-badge :color="getStatusColor(rec.fields.recrutement)">
                {{ rec.fields.recrutement }}
              </va-badge>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>

 
  </div>
</template>

<script>
// import data from './data.json'
import {mapGetters,mapActions} from "vuex"

export default {
  computed:{
    ...mapGetters(['allrecruits'])
  },
  data () {
    return {
      // users: data.slice(0, 8),
     
    }
  },
  methods: {
    ...mapActions(['fetchrecruits']),
    getStatusColor (recrutement) {
      if (recrutement > 2000) {
        return 'success'
      }

      if (recrutement <2000) {
        return 'info'
      }

      return 'danger'
    },
  },
  created(){
    this.fetchrecruits();
  }
}
</script>

<style lang="scss">
  .markup-tables {
    .va-table {
      width: 100%;
    }

    .va-card {
      max-width: 1200px;
    }
  }
</style>rds
