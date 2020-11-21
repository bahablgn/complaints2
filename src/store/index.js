import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
// import db from "@/db";
import { db } from '@/db2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    loadMessages: firestoreAction(context => {
      return context.bindFirestoreRef(
        'messages',
        db.collection('messages').orderBy('timestamp')
      )
    })
  },
  modules: {
  }
})
