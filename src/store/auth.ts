import firebase from 'firebase/compat/app';

type LoginPayload = {
  email: string,
  password: string
}

type RegisterPayload = {
  email: string,
  password: string,
  name: string
}

export default {
  actions: {
    async login({ dispatch, commit }: any, { email, password }: LoginPayload) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async register({ dispatch, commit }: any, { email, password, name }: RegisterPayload) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid')  ;
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        });
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async getUid() {
      const user: any = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  
    async logout({ commit }: any) {
      await firebase.auth().signOut();
      await commit('clearInfo');
    }
  }
}