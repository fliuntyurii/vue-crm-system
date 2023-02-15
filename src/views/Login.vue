<template>
  <form class="card auth-card" @submit.prevent="submitLogin">
    <div class="card-content">
      <span class="card-title">Home Bookkeeping</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model="state.email"
          :class="{ invalid: (v$.email?.$invalid && v$.email?.$dirty) }"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="v$.email?.$invalid && v$.email?.$dirty"
        >Email invalid</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="state.password"
          :class="{ invalid: (v$.password?.$invalid && v$.password?.$dirty) }"
        >
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="v$.password?.$invalid && v$.password?.$dirty"
        >Password invalid</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Enter
          <i class="material-icons right">send</i>
        </button>
      </div>
  
      <p class="center">
        Have not an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { useVuelidate } from '@vuelidate/core';
  import { email, required, minLength } from '@vuelidate/validators';
  import { reactive , computed } from '@vue/reactivity';

  export default {
    name: 'login',

    setup () {
      const state = reactive({
        email: "",
        password: ""
      });

      const rules = computed(() => {
        return {
          email: { email, required },
          password: { required, minLength: minLength(8) }
        }
      });

      const v$ = useVuelidate(rules, state);
      return {
        state,
        v$
      } 
    },

    methods: {
      async submitLogin() {
        if (this.v$.$invalid) {
          this.v$.$touch();
          return;
        } 
        const formData = {
          email: this.state.email,
          password: this.state.password,
        }
        try {
          await this.$store.dispatch('login', formData);
          this.$router.push('/');
        } catch (err) {}
      }
    },
  }
</script>