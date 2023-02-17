import { createStore, Store } from "vuex";
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

declare module '@vue/runtime-core' {
  interface State {
    error: any
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export default createStore({
  state: {
    error: null as any,
  },

  getters: {
    error: state => state.error
  },

  actions: {
    async fetchCurrency() {
      const res = await fetch(`https://api.exchangerate.host/latest?base=EUR`);
      return await res.json();
    }
  },

  mutations: {
    setError(state, err) {
      state.error = err;
    },
    clearError(state) {
      state.error = null;
    }
  },
  
  modules: {
    auth,
    info,
    category,
    record,
  },
});
