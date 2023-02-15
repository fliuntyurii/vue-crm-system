<template>
  <div>
    <div class="page-title">
      <h3>Check</h3>
  
      <button 
        class="btn waves-effect waves-light btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill 
        :rates="currency.rates"
      />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import HomeBill from './../components/Home/HomeBill.vue';
  import HomeCurrency from './../components/Home/HomeCurrency.vue';

  export default defineComponent({
    name: "HomeView",

    data() {
      return {
        loading: false,
        currency: {
          rates: {
            EUR: 0,
            USD: 0,
            UAH: 0
          }
        } as any,
      }
    },

    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },

    methods: {
      async refresh() {
        this.loading = true;
        this.currency = await this.$store.dispatch('fetchCurrency');
        this.loading = false; 
      }
    },

    components: {
      HomeBill, HomeCurrency
    }
  });
</script>
