<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
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
  </div>
</template>

<script lang="js">
  import Sidebar from '@/components/Sidebar.vue';
  import Navbar from '@/components/Navbar.vue';

  export default {
    name: "main-layout",

    data: () => ({
      isOpen: true,
      loading: true,
    }),
    
    async mounted() {
      if(Object.keys(this.$store?.getters?.info)?.length) {
        await this.$store.dispatch('fetchInfo');
      }

      this.loading = false;
    },

    components: {
      Navbar,
      Sidebar,
    }
  }
</script>