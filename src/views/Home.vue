<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <grid-selector msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GridSelector from '@/components/GridSelector.vue'; // @ is an alias to /src

@Component({
  components: {
    GridSelector,
  },
})
export default class Home extends Vue {}
</script>
