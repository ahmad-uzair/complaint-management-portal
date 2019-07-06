<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Add New Complaint</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="title">Title</label>
                <md-input name="title" id="title" autocomplete="given-name" v-model="form.title" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.title.required">The Title is required</span>
                <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid title</span>
              </md-field>
            </div>


          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('complaintType')">
                <label for="complaintType">Type of Complaint</label>
                <md-select name="complaintType" id="complaintType" v-model="form.complaintType" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="General">General</md-option>
                  <md-option value="Technical">Technical</md-option>
                  <md-option value="Logistics">Logistics</md-option>
                  <md-option value="Communication">Communication</md-option>
                </md-select>
                <span class="md-error">The type of complaint is required</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('description')">
            <label for="description">Description</label>
            <md-input type="description" name="description" id="description" autocomplete="description" v-model="form.description" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
            <span class="md-error" v-else-if="!$v.form.description.description">Invalid description</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Submit</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The complaint with the title of {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {required, minLength, maxLength } from 'vuelidate/lib/validators';


  export default {
    name: 'add-Complaint-Form',
    mixins: [validationMixin],
    components:{

    },
    data: () => ({
      form: {
        title: null,
        complaintType: null,
        age: null,
        description: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        title: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        complaintType: {
          required
        },
        description: {
          required,

        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.title = null
        this.form.lastName = null
        this.form.age = null
        this.form.complaintType = null
        this.form.description = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.title}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
};
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
