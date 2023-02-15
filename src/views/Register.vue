<template>
  <form class="card auth-card" @submit.prevent="submitRegister">
    <div class="card-content">
      <span class="card-title">Home Bookkeeping</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
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

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model="state.name"
          :class="{ invalid: (v$.name?.$invalid && v$.name?.$dirty) }"
        >
        <label for="name">Name</label>
        <small 
          class="helper-text invalid"
          v-if="v$.name?.$invalid && v$.name?.$dirty"
        >Name invalid</small>
      </div>
      <p>
        <label>
          <input 
            type="checkbox" 
            v-model="state.agree"
          />
          <span>Agree</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Register
          <i class="material-icons right">send</i>
        </button>
      </div>
  
      <p class="center">
        Do you have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { useVuelidate } from '@vuelidate/core';
  import { email, required, minLength } from '@vuelidate/validators';
  import { reactive , computed } from '@vue/reactivity';

  export default {
    name: 'register',
    setup() {
      const state = reactive({
        email: "",
        password: "",
        name: "",
        agree: false
      });

      const rules = computed(() => {
        return {
          email: { email, required },
          password: { required, minLength: minLength(8) },
          name: { required, minLength: minLength(2) },
          agree: { checked: v => v }
        }
      });

      const v$ = useVuelidate(rules, state);
      return {
        state,
        v$
      } 
    },

    methods: {
      async submitRegister() {
        if (this.v$.$invalid) {
          this.v$.$touch();
          return;
        } 

        const formData = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        }

        try {
          await this.$store.dispatch('register', formData);
          this.$router.push('/');
        } catch (err) {}
      }
    },
  }
</script>