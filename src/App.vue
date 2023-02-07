<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core';
  import AuthLayout from './layouts/AuthLayout.vue';
  import MainLayout from './layouts/MainLayout.vue';

  export default defineComponent({
    computed: {
      layout() {
        return (this.$route.meta.layout || 'main') + '-layout';
      }
    },
    components: {
      AuthLayout, MainLayout
    }
  })
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import 'assets/index.css';
</style>
