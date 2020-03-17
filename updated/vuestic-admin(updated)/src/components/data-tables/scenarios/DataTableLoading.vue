<template>
  <va-card :title="$t('tables.loading')">
    <div class="row align--center">
      <div class="flex xs12 md6">
        <va-input
          :value="term"
          placeholder="Search by COLLÈGE"
          @input="search"
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>

      <div class="flex xs12 md3 offset--md3">
        <va-select
          v-model="perPage"
          :label="$t('tables.perPage')"
          :options="perPageOptions"
        />
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      :loading="isLoading"
    />
  </va-card>
</template>

<script>
import { debounce } from 'lodash'
import users from '../../../data/users.json'

export default {
  data () {
    return {
      term: null,
      perPage: '6',
      perPageOptions: ['4', '6', '10', '20'],
      users: users,
      tableData: [],
      isLoading: false
    }
  },
  mounted() {
    this.fetchTableData();
  },
  computed: {
    fields () {
      return [
        {
          name: "fields.date",
          title: "Date",
          width: "10%",
        },
        {
          name: "fields.contrat_travail",
          title: "Contrat de travail",
          width: "20%",
        },
        {
          name: "fields.college",
          title: "Collège",
          width: "20%",
        },
        {
          name: "fields.tranche_age",
          title: "Tranche d'âge",
          width: "10%",
        },
        {
          name: "fields.effectif",
          title: "Effectif",
          width: "10%",
        }
      ]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.tableData
      }

      return this.tableData.filter(item => {
        return item.fields.college.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
  methods: {
    fetchTableData() {
      this.isLoading = true;
      const url = 'https://data.sncf.com/api/records/1.0/search/?dataset=repartition-age-effectif&sort=-effectif&facet=date&facet=contrat_travail&facet=college&facet=tranche_age';
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.tableData = data.records;
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
          console.log('Error:', err);
        });
    },
    search: debounce(function (term) {
      this.term = term
    }, 400)
  },
}
</script>

<style lang="scss">
</style>
