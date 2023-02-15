import firebase from 'firebase/compat/app';

type Category = {
  id?: string,
  title: string,
  limit: number,
}

export default {
  actions: {
    async fetchCategories({ dispatch, commit }: any) {
      try {
        const uid = await dispatch('getUid');
        let categories = await (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || [];
        categories = Object.keys(categories).map(key => ({ ...categories[key], id: key }));

        return categories;
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async createCategory({ dispatch, commit }: any, { title, limit }: Category) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit });

        return { title, limit, id: category.key }
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async editCategory({ dispatch, commit }: any, { title, limit, id }: Category) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database()
          .ref(`/users/${uid}/categories`).
          child(id as string).update({ title, limit });

      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
  }
}