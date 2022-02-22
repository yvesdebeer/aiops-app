import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

var url;
//const headers = { Accept: "application/json" };

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    incidents: [],
    searchField: "",
    user: {
      isAuthenticated: false,
      name: "",
      email: "",
      idToken: ""
    },
    endpoints: {
      login: "http://localhost:3000/login",
      //incidents: "https://aimanager-aio-similar-incidents-service-cp4waiops.apps.spumier.cp.fyre.ibm.com/v2/similar_incidents/search"
      incidents: "http://localhost:8001/incidents"
    },
   },
   mutations: { //synchronous
     setIncidents(state, payload) {
       state.incidents = payload;
     },
     logout(state) {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.email ="";
      state.user.idToken ="";
      state.incidents = [];
     },
     login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.name = payload.name;
      state.user.email =payload.email;
      state.user.idToken =payload.idToken;
     },
     setUrls(state) {
       state.endpoints.login = process.env.VUE_APP_AUTH_URL;
       state.endpoints.incidents = process.env.VUE_APP_INCIDENTS_URL;
       url = state.endpoints.incidents;
       console.log(process.env);
     },
     setSearchfield(state, payload) {
       state.searchField = payload;
     }
   },
   actions: { //asynchronous
     async getIncidents(state, payload) {
      const requestOptions = {
        method: "POST",
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          "story_id": "1",
          "application_id": "1000",
          "application_group_id": "1000",
          "text": payload
        })
      };
       const incidents = await fetch(url, requestOptions);
       const incds = await incidents.json();
       state.commit("setIncidents", incds);
     }
   }
})
