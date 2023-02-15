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
            :categories="categories"
          />
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

  type Category = {
    id?: string,
    title: string,
    limit: number,
  }

  export default defineComponent({
    name: "categories",

    data() {
      return {
        categories: [] as Category[],
        loading: true,
      }
    },

    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },

    methods: {
      addNewCategory(category: Category) {
        this.categories.push(category)
      }
    },

    components: {
      CategoryCreate, CategoryEdit, Loader
    },
  })
</script>
