import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

var url_incidents;
//const headers = { Accept: "application/json" };

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    incidents: [],
    searchField: "",
    description: "",
    user: {
      isAuthenticated: false,
      name: "",
      email: "",
      idToken: "",
      accessToken: ""
    },
    endpoints: {
      login: "http://localhost:3000/login",
      //incidents: "https://aimanager-aio-similar-incidents-service-cp4waiops.apps.spumier.cp.fyre.ibm.com/v2/similar_incidents/search"
      incidents: "http://localhost:3000/incidents",
      targetURL: "http://localhost:8001/incidents",
      descriptionURL: "http://192.168.0.211:8001/description?",
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
      state.user.accessToken = "";
      state.incidents = [];
     },
     login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.name = payload.name;
      state.user.email =payload.email;
      state.user.idToken =payload.idToken;
      state.user.accessToken = payload.accessToken;
     },
     setUrls(state) {
       state.endpoints.login = process.env.VUE_APP_AUTH_URL;

       state.endpoints.incidents = process.env.VUE_APP_INCIDENTS_URL;
       state.endpoints.incidents_targetURL = process.env.VUE_APP_INCIDENTS_TARGETURL;

       state.endpoints.descriptionURL = process.env.VUE_APP_DESCRIPTION_URL;
       state.endpoints.description_targetURL = process.env.VUE_APP_DESCRIPTION_TARGETURL;
       url_incidents = state.endpoints.incidents;
       //console.log(process.env);
     },
     setSearchfield(state, payload) {
       state.searchField = payload;
     },
     setDescription(state, payload) {
      state.description = payload;
    }
   },
   actions: { //asynchronous
     async getIncidents(state, payload) {
        //console.log(this.state.user.accessToken);
        const POSTrequestOptions = {
          method: "POST",
          headers: { "Target-URL": this.state.endpoints.incidents_targetURL, "Authorization": "Bearer " + this.state.user.accessToken, "accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            "story_id": "1",
            "application_id": "1000",
            "application_group_id": "1000",
            "text": payload
          })
        };
        var incidents = "";
        try {
          incidents = await fetch(url_incidents, POSTrequestOptions);
          if (incidents.status == 401) {
            console.log('Got 401 Status => force logout');
            state.commit("logout");
            window.location = '/';
          }
          const incds = await incidents.json();
          //console.log(incds);
          state.commit("setIncidents", incds);
        } catch(err) {
          console.log('error = ', err);
        }
     }
   }
});