<template>
<page>

  <page-header
    title=""
    :breadcrumbs="pageheader.breadcrumbs"
  >
  </page-header>
  <willow-messages v-for="(message, i) in messages" :key="i" :type="message.type" >{{message.msg}}</willow-messages>

  <willow-layout>
  <!-- CARD -->
    <willow-annotated-section title="Edit User" description="Give access to the application, turn on and off accounts, change role, and reset their password.">
       <b-card class="mb-2">
        <h6>Profile</h6>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">First Name</label>
            <b-form-input
                  :value="userEditForm.firstName"
                  v-model="userEditForm.firstName"
                  type="text"
                  placeholder="First">
            </b-form-input>
          </b-col>
          <b-col class="mb-4">
            <label for="inputLive">Last</label>
            <b-form-input
                  :value="userEditForm.lastName"
                  v-model="userEditForm.lastName"
                  type="text"
                  placeholder="Last">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">Email</label>
            <b-form-input
                  :value="userEditForm.email"
                  v-model="userEditForm.email"
                  type="text"
                  placeholder="example@me.com">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">Phone</label>
            <b-form-input
                  :value="userEditForm.phoneNumber"
                  v-model="userEditForm.phoneNumber"
                  type="tel"
                  placeholder="Phone"
                  >
            </b-form-input>
          </b-col>
          <b-col>
          </b-col>
        </b-row>

        <b-row class="mb-4">
          <b-col>
            <willow-select
              :label="'Role'"
              :value="userEditForm.role"
              :options="[{ value: 'Admin', text: 'Admin' },{ value: 'User', text: 'User' }]"
              v-model="userEditForm.role"
            ></willow-select>
          </b-col>
          <b-col>
          </b-col>
        </b-row>

        <b-row class="mb-4">
          <b-col>
            <willow-select
              :label="'Active'"
              :value="userEditForm.active"
              :options="[{ value: true, text: 'Active' },{ value: false, text: 'Inactive' }]"
              v-model="userEditForm.active"
            ></willow-select>
          </b-col>
          <b-col>
          </b-col>
        </b-row>

        <h6>Password Reset</h6>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">New Password</label>
            <b-form-input
                  type="password"
                  v-model="userEditForm.newPassword"
                  >
            </b-form-input>
          </b-col>
          <b-col>
            <label for="inputLive">Confirm Password</label>
            <b-form-input
                  type="text"
                  v-model="userEditForm.confirmPassword"
                  >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row>
           <b-col>
            <willow-button class="float-right mt-0" @click.native="updatePassword()">Reset Password</willow-button>
           </b-col>
        </b-row>
       </b-card>
    </willow-annotated-section>
  </willow-layout>

  <page-actions>
    <template slot="action-right">
      <willow-button primary  @click.native="updateUser()">Save</willow-button>
    </template>
  </page-actions>

</page>
</template>

<script>
import api from '@/api/api'
export default {
  mounted () {
    this.fetch()
  },

  data () {
    return {
      pageheader: {
        breadcrumbs: [
          {
            text: 'Users',
            href: '/admin/users'
          }
        ]
      },
      user: {},
      userEditForm: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        role: null,
        active: null,
        newPassword: null,
        confirmPassword: null
      },
      messages: null
    }
  },

  methods: {
    fetch () {
      api.getUserById(this.$route.params.userId)
        .then(res => {
          var user = res.data

          this.userEditForm.id = user.Id
          this.userEditForm.firstName = user.FirstName
          this.userEditForm.lastName = user.LastName
          this.userEditForm.email = user.Email
          this.userEditForm.phoneNumber = user.PhoneNumber
          this.userEditForm.role = user.Role
          this.userEditForm.active = user.Active
        })
    },

    updatePassword () {
      var params = {
        id: this.userEditForm.id,
        password: this.userEditForm.newPassword,
        confirmPassword: this.userEditForm.confirmPassword
      }
      api.updatePassword(params)
        .then(res => {
          var messages = [res.data]
          messages.forEach(message => {
            message.type = 'success'
          })
          this.messages = messages
          setTimeout(() => {
            this.messages = {}
            this.$router.replace({ name: 'Users' })
          }, 3000)
        })
        .catch(error => {
          var messages = error.response.data.errors

          messages.forEach(message => {
            message.type = 'danger'
          })

          this.messages = messages
        })
    },

    updateUser () {
      var params = {
        firstName: this.userEditForm.firstName,
        lastName: this.userEditForm.lastName,
        email: this.userEditForm.email,
        phoneNumber: this.userEditForm.phoneNumber,
        role: this.userEditForm.role,
        active: this.userEditForm.active === 'true'
      }
      api.updateUserById(this.userEditForm.id, params)
        .then(res => {
          var messages = [res.data]
          messages.forEach(message => {
            message.type = 'success'
          })
          this.messages = messages
          setTimeout(() => {
            this.messages = {}
            this.$router.replace({ name: 'Users' })
          }, 3000)
        })
        .catch(error => {
          var messages = error.response.data.errors

          messages.forEach(message => {
            message.type = 'danger'
          })

          this.messages = messages
        })
    }
  }
}
</script>
