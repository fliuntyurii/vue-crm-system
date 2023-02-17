import firebase from 'firebase/compat/app';

type Info = {
  name?: string,
  bill?: number
}

type State = {
  info: Info
}

export default {
  state: {
    info: {
      name: '',
      bill: 0
    },
  },
  
  mutations: {
    setInfo(state: State, info: Info) {
      state.info = info;
    },
    flearInfo(state: State) {
      state.info = {};
    }
  },

  actions: {
    async fetchInfo({ dispatch, commit }: any) {
      try {
        const uid = await dispatch('getUid').then((res: any) => res);
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },

    async updateInfo({ dispatch, commit, getters }: any, data: any) {
      try {
        const uid = await dispatch('getUid').then((res: any) => res);
        const updateData = { ...getters.info, ...data }
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit('setInfo', updateData);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    }
  },
  getters: {
    info: (state: State) => state?.info
  }
}