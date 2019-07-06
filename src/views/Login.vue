<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
                  class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <!-- <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button> -->
              <!-- <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>First Name...</label>
                <md-input v-model="firstname"></md-input>
              </md-field> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs" >
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-success md-lg" v-on:click="login">
                Login
              </md-button>
              <p> OR </p>
              <md-button slot="footer" class="md-success md-lg" v-on:click="register">
                Register
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { LoginCard } from "@/components";
import {loginUser} from "../repository";

import router from '../router'
export default {
  name:'Login',
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/survey.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
    // methods: {
    //     login: function () {
    //         this.$auth.login({ email:this.email, password:this.password }).then(function () {
    //             console.log("Logged In\n")
    //             router.push('/user')
    //         })
    //     },
    //
    //     register: function () {
    //         router.push('/register')
    //             // Execute application logic after successful registration
    //         }
    //
    // },
  methods:{
    login(e){
      e.preventDefault()
console.log("In login method")
      let data={
        email:this.email,
        password: this.password
      }
loginUser(data).then((response)=>{
  console.log(response)
  if (response.IsAdmin) {
    router.push({name: "admin", params: {user: response}})
  }
  else {
    router.push({name: "user", params: {user: response}})
  }
}).catch((err)=>{
        console.log(err)
      })
    },
    register:()=>{
      router.push("/register")
    }
  }
};
</script>

<style lang="css"></style>
