<template>
  <va-card :title="$t('dashboard.currentVisitors')">
    <line-map
      class="dashboard-map"
      :map-data="lineMapData"
    />
  </va-card>
</template>



<style>
  .dashboard-map {
    height: 380px;
  }
</style>
