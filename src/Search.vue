<template>
  <div v-if="isAuthenticated" class="container-fluid">
    <div class="card mt-5 p-4" style="width: auto;">
        <div class="input-group mb-3" style="width: 600px;">
            <input type="text" class="form-control" v-model="searchField" @keyup.enter="searchClicked">
            <div class="input-group-append">
                <button class="btn btn-primary" @click="searchClicked">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div> 
        <span class="text mb-3">Search results</span>
        <Item v-for="incident in incidents.similar_incidents" 
        :key="incident.incident_id"
        :item="incident"/>
    </div>
  </div>  
</template>

<script>
// @ is an alias to /src

import Item from "@/Item.vue"  
export default {
  name: 'Search',
  data() {
      return {
          searchField: ''
      }
  },
  created() {
      //console.log(this.$store.state.user.isAuthenticated);
      if (!this.$store.state.user.isAuthenticated) {
          //console.log("Not Authenticated")
          window.location = '/';
      }
      this.$store.state.incidents = [];
  },
  computed: {
    isAuthenticated() {
      //console.log(this.$store.state.user.isAuthenticated);
      return this.$store.state.user.isAuthenticated;
    },
    incidents() {
      //console.log(this.$store.state.incidents);
      return this.$store.state.incidents;
    }
  },
  methods: {
    searchClicked() {
      this.$store.commit("setSearchfield", this.$data.searchField);
      this.$store.dispatch("getIncidents", this.$data.searchField);
    },
  },
  components: {
    Item
  }
}
</script>

<style scoped>

body {
    background-color: #E7E9F5;
    font-family: 'Heebo', sans-serif
}

.card {
    width: 700px;
    border: none;
    border-radius: 20px
}

.form-control {
    border-radius: 7px;
    border: 1.5px solid #E3E6ED
}

input.form-control:focus {
    box-shadow: none;
    border: 1.5px solid #E3E6ED;
    background-color: #F7F8FD;
    letter-spacing: 1px
}

.btn-primary {
    background-color: #5878FF !important;
    border-radius: 7px
}

.btn-primary:focus {
    box-shadow: none
}

.text {
    font-size: 13px;
    color: #9CA1A4
    
}

.flex-row {
    border: 1px solid #F2F2F4;
    border-radius: 10px;
    margin: 0 1px 0
}

.flex-column p {
    font-size: 14px
}

span.mb-2 {
    font-size: 12px;
    text-align: left;
    color: #8896BD
}

h5 span {
    color: #869099
}

@media screen and (max-width: 450px) {
    .card {
        display: flex;
        justify-content: center;
        text-align: center
    }

    .price {
        border: none;
        margin: 0 auto
    }
}
</style>