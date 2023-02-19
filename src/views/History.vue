<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>
  
    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!records.length">Record list empty.</p>
    <section v-else>
      <HistoryTable 
        :records="records"
      />
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HistoryTable from './../components/HistoryTable.vue';
  import Loader from '@/components/Loader.vue';
	import { Category, Record } from '@/types';

  export default defineComponent({
    name: "history",

    data() {
      return {
        loading: true,
        records: [] as Record[],
        categories: [] as Category[],
      }
    },

    async mounted() {
			// this.records = await this.$store.dispatch('fetchRecords');
      const records = await this.$store.dispatch('fetchRecords');
			this.categories = await this.$store.dispatch('fetchCategories');
      this.records = records.map((record: Record) => {
        return {
          ...record,
          categoryName: this.categories.find((c: Category) => c.id == record.categoryId)?.title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        }
      });

      this.loading = false;
    },

    methods: {
      paginationHandler() {
        console.log('page');
      }
    },

    components: {
      HistoryTable,
      Loader,
    }
  });
</script>
