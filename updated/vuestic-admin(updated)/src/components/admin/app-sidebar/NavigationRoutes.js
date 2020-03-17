export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'dashboard',
      meta: {
        iconClass: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'statistics',
      displayName: 'menu.statistics',
      meta: {
        iconClass: 'vuestic-iconset-statistics',
      },
      disabled: true,
      children: [
        {
          name: 'charts',
          displayName: 'menu.charts',
        },
      
      ],
    },
 
    {
      name: 'tables',
      displayName: 'menu.tables',
      meta: {
        iconClass: 'vuestic-iconset-tables',
      },
      children: [
        {
          name: 'markup',
          displayName: 'menu.markupTables',
        },
        {
          name: 'data',
          displayName: 'menu.dataTables',
        },
      ],
    },
 
    {
      name: 'maps',
      displayName: 'menu.maps',
      meta: {
        iconClass: 'vuestic-iconset-maps',
      },
      disabled: true,
      children: [
        
        {
          name: 'leaflet-maps',
          displayName: 'Leaflet Maps',
        },
        {
          name: 'bubble-maps',
          displayName: 'Bubble Maps',
        },
    
      ],
    },
 
  ],
}
