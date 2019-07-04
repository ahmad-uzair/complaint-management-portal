<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <h3 class="title">Welcome {{ user.name }}!</h3></parallax
    >
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
                  <h1>Complaints</h1>
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                       <tr v-for="complaint in complaints">

                      <th></th>

                      <td></td>

                      <td>
                        <button class="btn btn-danger" @click="updateComplaintStatus(complaint)"> Resolved</button>
                                            <a class="btn btn-primary" v-bind:href="'/todo-update/' + todo.id"> &#9998; </a>
                      </td>
                      </tr>
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
    import {getComplaints,updateComplaint} from "../repository";

    export default {
  name: "Admin",
data(){
      return{
          complaints: []
      }
},
        methods:{
      updateComplaintStatus(complaint){
            updateComplaint(complaint,complaint._id)
      }
        },
        mounted() {
      getComplaints().then(data=>this.complaints=data.complaints)
          .catch((err=>alert(err)))
        }
    };
</script>

<style scoped></style>
