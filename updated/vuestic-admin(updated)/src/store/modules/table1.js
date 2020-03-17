import axios from 'axios';
// mahfoudi
const state = {
    recruits:[]
}

const actions ={
    async fetchrecruits({ commit }) {
        const response = await axios.get(
          'https://data.sncf.com/api/records/1.0/search/?dataset=recrutement-metiers-sncf&sort=recrutement&facet=date&facet=metiers&facet=contrat_travail&facet=sexe'
        );
         // console.log(response.data.records);
         const recruitfields = Object.values(response.data.records).map(({recordid,fields})=>{recordid,fields})
        console.log(recruitfields)
        commit('setrecruits',response.data.records);

      },
}

const getters = {
    allrecruits: state => state.recruits,
} 

const mutations = {
     
    setrecruits: (state, recruits) => (state.recruits = recruits),

} 

export default {
    state,
    actions,
    getters,
    mutations
}