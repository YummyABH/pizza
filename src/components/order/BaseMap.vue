<script setup lang="ts">
import { Map, MapStyle, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
  config.apiKey = 'Mmzg1oXuQtrJnEExNTJW';

  const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

  map.value = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  }));

})

onUnmounted(() => {
  map.value?.remove();
})
</script>

<template>
    <div class="map-wrap">
        <div class="map" ref="mapContainer"></div>
    </div>
  </template>
  
  
  <style scoped>
  .map-wrap {
    position: relative;
    width: 100%;
    height: 400px; /* calculate height of the screen minus the heading */
  }
  
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  </style>