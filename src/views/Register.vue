<template>
    <div class="wrapper">
        <div class="section page-header header-filter" :style="headerStyle">
            <div class="container">
                <div class="md-layout">
                    <div
                            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
                    >
                        <login-card header-color="green">
                            <h4 slot="title" class="card-title">Register</h4>
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
                            <md-field class="md-form-group" slot="inputs">
                                <md-icon>face</md-icon>
                                <label>Name</label>
                                <md-input v-model="name"></md-input>
                            </md-field>
                            <md-field class="md-form-group" slot="inputs">
                                <md-icon>email</md-icon>
                                <label>Email...</label>
                                <md-input v-model="email" type="email"></md-input>
                            </md-field>
                            <md-field class="md-form-group" slot="inputs" >
                                <md-icon>lock_outline</md-icon>
                                <label>Password...</label>
                                <md-input v-model="password" type="password"></md-input>
                            </md-field>
                            <md-button slot="footer" class="md-success md-lg" v-on:click="register">
                                Register
                            </md-button>
                            <p> OR </p>
                            <md-button slot="footer" class="md-success md-lg" v-on:click="login">
                                Login
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
    import {registerUser} from "../repository";
    import router from "../router"

    export default {
        name: "Register",
        components:{
            LoginCard
        },
        bodyClass: "login-page",
        data(){
            return{
                name: '',
                email: '',
                password: ''
            }
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
        methods:{
            register(e){
e.preventDefault()
                let data={
                    name:this.name,
                    email:this.email,
                    password: this.password
                }
                registerUser(data).then((response)=>{
                    console.log(response)
                    router.push("/login")
                }).catch((err)=>{
                    console.log(err)
                })



            },
            login(){
                router.push("/login")
            }
        }
    }
</script>

<style scoped>

</style>
