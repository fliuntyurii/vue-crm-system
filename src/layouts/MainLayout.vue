<template>
  <div class="app-main-layout">
    <Navbar @click="isOpen = !isOpen" />
    <Sidebar :value="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Sidebar from '@/components/Sidebar.vue';
  import Navbar from '@/components/Navbar.vue';

  export default {
    name: "main-layout",
    data: () => ({
      isOpen: true,
    }),
    components: {
      Navbar,
      Sidebar,
    }
  }
</script>