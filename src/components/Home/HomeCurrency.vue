<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange Rates</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="cur of currencies"
            :key="cur"
          >
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(2) }}</td>
            <td>{{ date || '12.12.1000' }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: ['rates', 'date'],

    data() {
      return {
        currencies: ['UAH', 'EUR', 'USD']
      }
    }
  })
</script>
