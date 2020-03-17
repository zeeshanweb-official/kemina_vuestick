import Vue from 'vue'
import Router from 'vue-router'

import AppLayout from '../components/admin/AppLayout'

Vue.use(Router)

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const demoRoutes = []
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_INCLUDE_DEMOS) {
  const vueBookRoutes = require('./vueBookRoutes').default
  vueBookRoutes.forEach(route => demoRoutes.push(route))
}

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' },
    },
  
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
        },
        {
          name: 'statistics',
          path: 'statistics',
          component: EmptyParentComponent,
          children: [
            {
              name: 'charts',
              path: 'charts',
              component: () => import('../components/statistics/charts/Charts.vue'),
             
            },
        
          ],
        },
      
        {
          name: 'tables',
          path: 'tables',
          component: EmptyParentComponent,
          children: [
            {
              name: 'markup',
              path: 'markup',
              component: () => import('../components/markup-tables/MarkupTables.vue'),
              
            },
            {
              name: 'data',
              path: 'data',
              component: () => import('../components/data-tables/DataTables.vue'),
              
            },
          ],
        },
        
        {
          name: 'maps',
          path: 'maps',
          component: EmptyParentComponent,
          children: [
           
            {
              name: 'leaflet-maps',
              path: 'leaflet-maps',
              component: () => import('../components/maps/leaflet-maps/LeafletMapsPage'),
              
            },
            {
              name: 'bubble-maps',
              path: 'bubble-maps',
              component: () => import('../components/maps/bubble-maps/BubbleMapsPage'),
              
            },
    
          ],
        },
    
      ],
    },
  ],
})
