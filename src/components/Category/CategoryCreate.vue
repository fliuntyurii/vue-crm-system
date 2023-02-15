<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
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
          Create
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
    name: 'CategoryCreate',

    setup () {
      const state = reactive({
        title: "",
        limit: 100
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

    mounted() {
      M.updateTextFields()
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch();
          return;
        }

        try {
          await this.$store.dispatch('createCategory', {
            title: this.state.title,
            limit: this.state.limit
          });

          this.state.title = '';
          this.state.limit = this.v$.limit.minValue.$params.min;

          this.v$.$reset();
          M.toast({ html: 'Category has been created!' });
          this.$emit('created', category);
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>