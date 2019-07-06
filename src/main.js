import Vue from "vue";
import App from "./App.vue";
import router from "./router"
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';;

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:5000', // Your API domain



})

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
