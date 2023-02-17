<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select 
            ref="select"
            v-model="current"
          >
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >
              {{ c.title }}
            </option>
          </select>
          <label>Choose a Category</label>
        </div>

        <div class="input-field">
          <input 
            type="text" 
            id="name"
            v-model="state.title"
            :class="{ invalid: (v$.title?.$invalid && v$.title?.$dirty) }"
          >
          <label for="name">Name</label>
          <span 
            class="helper-text invalid"
            v-if="v$.title?.$invalid && v$.title?.$dirty"
          >Print name</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="state.limit"
            :class="{ invalid: (v$.limit?.$invalid && v$.limit?.$dirty) }"
          >
          <label for="limit">Limit</label>
          <span 
            class="helper-text invalid"
            v-if="v$.limit?.$invalid && v$.limit?.$dirty"
          >Min value {{ v$.limit.minValue.$params.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import { useVuelidate } from '@vuelidate/core';
  import { required, minValue, minLength } from '@vuelidate/validators';
  import { reactive , computed } from '@vue/reactivity';

  export default {
    name: 'CategoryEdit',
    props: {
      categories: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        select: null,
        current: null,
      }
    },

    setup () {
      const state = reactive({
        title: "",
        limit: 100,
      });

      const rules = computed(() => {
        return {
          title: { required, minLength: minLength(3) },
          limit: { required, minValue: minValue(100) }
        }
      });

      const v$ = useVuelidate(rules, state);
      return {
        state,
        v$
      } 
    },

    watch: {
      current(id) {
        const { title, limit } = this.categories.find(c => c.id == id);
        this.state.title = title;
        this.state.limit = limit;
        this.current = id;
      }
    },

    created() {
      const { id, title, limit } = this.categories[0];
      this.current = id;
      this.state.title = title;
      this.state.limit = limit;
    },

    mounted() {
      M.updateTextFields();
      this.select = M.FormSelect.init(this.$refs.select);
    },

    destroyed() {
      if(this.select && this.select?.destroy) {
        this.select.destroy();
      }
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch();
          return;
        }

        const categoryData = {
          title: this.state.title,
          limit: this.state.limit,
          id: this.current
        }
        try {
          await this.$store.dispatch('editCategory', categoryData);

          this.v$.$reset();
          M.toast({ html: 'Category has been edited!' });
          this.$emit('edited', categoryData);
        } catch (error) {
          console.log(error)
        }
      }
    },
  }
</script>
