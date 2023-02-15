<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Currency check</span>

        <p 
          class="currency-line"
          v-for="cur of currencies"
          :key="cur"
        >
          <span>
            {{ getCurrency(cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: ['rates'],

    data() {
      return {
        currencies: ['UAH', 'EUR', 'USD']
      }
    },

    computed: {
      base() {
        return (this.$store?.getters?.info?.bill || 0) / (this.rates['UAH'] / this.rates['EUR']);
      }
    },

    methods: {
      getCurrency(currency: any) {
        return Math.floor(this.base * this.rates[currency]) + ` ${currency}`;
      }
    }
  });
</script>
