<template>
  <grid-selector />
</template>

<script lang="ts">
import Vue from 'vue';
import GridSelector from '../components/GridSelector.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    GridSelector,
  },
});
</script>
