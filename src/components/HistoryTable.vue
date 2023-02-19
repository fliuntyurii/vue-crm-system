<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Sum</th>
      <th>Date</th>
      <th>Category</th>
      <th>Type</th>
      <th>Open</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, index) of records"
      :key="record.id"
    >
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount }} ₴</td>
      <td>{{ record.date }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span 
          class="white-text badge"
          :class="[record.typeClass]"
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button 
          class="btn-small btn" 
          @click="$router.push('/detail/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
	import { Category, Record } from '@/types';

  export default defineComponent({
    name: "historyTable",
    props: ['records']
  });
</script>