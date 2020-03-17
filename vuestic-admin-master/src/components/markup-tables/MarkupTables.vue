<template>
  <div class="markup-tables">
     <va-card :title="$t('tables.stripedHoverable')">
      <table class="va-table va-table--striped va-table--hoverable">
        <thead>
          <tr>
            <th v-for="i in table1.facet_groups" :key="i.name">{{ i.name }}</th>
            <th>recrutements</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in table1.records" :key="user.recordid">
            <td>{{ user.fields.date }}</td>
            <td>{{ user.fields.contrat_travail }}</td>
            <td>{{ user.fields.metiers }}</td>
            <td>{{ user.fields.sexe }}</td>
            <td>{{ user.fields.recrutement }}</td>
            <!-- <td>
              <va-badge :color="getStatusColor(user.status)">
                {{ user.status }}
              </va-badge>
            </td> -->
          </tr>
        </tbody>
      </table>
    </va-card>
    <va-card :title="$t('tables.basic')" class="mb-2">
      <table class="va-table">
        <thead>
          <tr>
            <th v-for="i in tableData.facet_groups" :key="i.name">{{ i.name }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in tableData.records" :key="user.recordid">
            <td>{{ user.fields.date }}</td>
            <td>{{ user.fields.contrat_travail }}</td>
            <td>{{ user.fields.college }}</td>
            <td>{{ user.fields.tranche_age }}</td>
          </tr>
        </tbody>
      </table>
    </va-card>

  </div>
</template>

<script>
import data from './data.json'
import axios from 'axios'

export default {
  data () {
    return {
      users: data.slice(0, 8),
      tableData: [],
      table1: [],
    }
  },
  methods: {
    getStatusColor (status) {
      if (status === 'paid') {
        return 'success'
      }

      if (status === 'processing') {
        return 'info'
      }

      return 'danger'
    },
  },
  created () {
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=repartition-age-effectif&rows=100&sort=-effectif&facet=date&facet=contrat_travail&facet=college&facet=tranche_age').then((resp) => {
      this.tableData = resp.data
    }).catch((err) => {
      console.log(err)
    })
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=recrutement-metiers-sncf&rows=100&sort=recrutement&facet=date&facet=metiers&facet=contrat_travail&facet=sexe').then((resp) => {
      this.table1 = resp.data
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted () {
    setTimeout(() => {
      console.log(this.table1)
    }, 5000)
  },
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
</style>
