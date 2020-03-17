export const getVerticalBarChartData = (themes) => ({

  
  created () {
    axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=repartition-genre-effectif&sort=date&facet=date&facet=contrat_travail').then((resp) => {
      this.tableData = resp.data
    }).catch((err) => {
      console.log(err)
    })
    axios(options)
  .then(response => {
    console.log(response.status);
  });
  
  },
  mounted () {
    setTimeout(() => {
      console.log(this.table1)
    }, 5000)
  },
 

  labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
  datasets: [
    {
      label: 'USA',
      backgroundColor: themes['primary'],
      borderColor: 'transparent',
      data: [50, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
    {
      label: 'USSR',
      backgroundColor: themes['info'],
      borderColor: 'transparent',
      data: [50, 10, 22, 39, 15, 20, 85, 32, 60, 50, 20, 30],
    },
  ],
})
