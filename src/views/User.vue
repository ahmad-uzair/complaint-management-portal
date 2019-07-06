<template>
    <div class="wrapper">
        <parallax
                class="section page-header header-filter"
                :style="headerStyle"
        >
            <h3 class="title">Welcome {{this.$route.params.user.name}}!</h3></parallax>
        <div class="main main-raised">
            <div class="section profile-content">
                <div class="container">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-50 mx-auto">
                            <div class="profile">
                                <!-- <div class="avatar">
                                  <img
                                    :src="img"
                                    alt="Circle Image"
                                    class="img-raised rounded-circle img-fluid"
                                  />
                                </div> -->
                                <div>
                                    <div>
                                        <h1>Your Complaints</h1>
                                        <md-button class="md-info md-round classic-modal" @click="classicModal=true">Add a Complaint</md-button>
                                        <modal v-if="classicModal" @close="classicModalHide">

                                            <template slot="body">
                                                <add-Complaint-Form></add-Complaint-Form>
                                            </template>
                                            <template slot="footer">
                                                <md-button class="md-danger md-simple" @click="classicModalHide">Close</md-button>
                                            </template>
                                        </modal>
                                    </div>
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <!-- <tr v-for="todo in todos" @click="selectTodo(todo)"> -->

                                        <th></th>

                                        <td></td>

                                        <td>
                                            <!-- <button class="btn btn-danger" @click="deleteTodo(todo)"> X</button>
                                            <a class="btn btn-primary" v-bind:href="'/todo-update/' + todo.id"> &#9998; </a> -->
                                        </td>
                                        <!-- </tr> -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {AddComplaintForm,Modal} from '@/components'
    import {getUserComplaints} from "../repository";
    export default {
        name: "User",
        components: {
            AddComplaintForm,
            Modal
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
        data(){
            return{
                classicModal: false,
                user:{},
                complaints:[]
            }
        },
        methods: {
            classicModalHide() {
                this.classicModal = false;
            }
        },
        mounted() {
            //getCurrentUser().then(data=>this.user={id:data.id,name:data.name,email:data.email,IsAdmin:data.IsAdmin})
            getUserComplaints(this.$route.params.user.name).then(data=>this.complaints=data.complaints)
        }
    }
</script>

<style scoped>

</style>
