import Vue from "vue";
import Router from "vue-router";
import User from "./views/User"
import Admin from "./views/Admin"
import Register from "./views/Register"
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Login},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/register",
      name: "register",
      components: { default: Register},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login},
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/admin",
      name: "admin",
      components: { default: Admin},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/user",
      name: "user",
      components: { default: User, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
