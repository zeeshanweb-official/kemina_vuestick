import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'
import table1 from './modules/table1'
//mahfoudi
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
    // mahfoudi
    table1,
  },
  state: {},
  mutations: {},
})

Vue.use(VuexI18n.plugin, store)

export default store
