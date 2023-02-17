import firebase from 'firebase/compat/app';
import { Record } from '@/types';

export default {
  actions: {
    async createRecord({ dispatch, commit }: any, record: Record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`/users/${uid}/records`).push(record);
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async fetchRecords({ dispatch, commit }: any) {
      try {
        const uid = await dispatch('getUid');
        let records = await (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || [];
        records = Object.keys(records).map(key => ({ ...records[key], id: key }));

        return records;
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    }
  }
}