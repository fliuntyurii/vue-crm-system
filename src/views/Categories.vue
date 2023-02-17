<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <div class="page-title">
        <h3>Category</h3>
      </div>
      <section>
        <div class="row">
          <CategoryCreate 
            @created="addNewCategory"
          />
          <CategoryEdit 
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @edited="updateCategories"
          />
          <p v-else class="center">Category list empty.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CategoryCreate from './../components/Category/CategoryCreate.vue';
  import CategoryEdit from './../components/Category/CategoryEdit.vue';
  import Loader from './../components/Loader.vue';
  import { Category } from '@/types';

  export default defineComponent({
    name: "categories",

    data() {
      return {
        categories: [] as Category[],
        loading: true,
        updateCount: 0
      }
    },

    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },

    methods: {
      addNewCategory(category: Category) {
        this.categories.push(category);
      },

      updateCategories(category: Category) {
        const index = this.categories.findIndex(c => c.id == category.id);
        this.categories[index].title = category.title;
        this.categories[index].limit = category.limit;

        this.updateCount++;
      },
    },

    components: {
      CategoryCreate, 
      CategoryEdit, 
      Loader
    },
  })
</script>
