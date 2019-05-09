<template>
<page>
  <page-header
    title="Users"
  >
    <!-- <template slot="action-right">
      <willow-button plain>Print Application</willow-button>
    </template> -->

    <template slot="action-right">
      <willow-button primary url="/admin/users/new">Add User</willow-button>
    </template>

  </page-header>

  <willow-messages v-for="(message, i) in messages" :key="i" :type="message.type" >{{message.msg}}</willow-messages>

  <b-card class="w-100">
    <!-- <willow-button outline v-b-toggle.collapse1>Filters +</willow-button> -->

    <!-- <b-collapse id="collapse1" class="mt-2">
      <b-card>
        <p class="card-text">Options:</p>
        <b-row>
          <b-col cols="6">
          <b-form-group id="fieldsetHorizontal"
                        description="Building applied to"
                        label="Property"
                        label-for="inputHorizontal">
              <b-select :options="[{ value: null, text: '150 Main St' },{ value: 'a', text: '3 Industrial Road' }]"></b-select>
            </b-form-group>
          </b-col>
          <b-col cols="6">
                <b-form-group label="Application Status">
                  <b-form-checkbox-group stacked v-model="selected" name="flavour2" :options="[{text: 'New', value: 'past'},{text: 'In Review', value: 'present'},{text: 'Accepted', value: 'Future'}, {text: 'Rejected', value: 'Future'}, {text: 'Archived', value: 'Future'}]">
                  </b-form-checkbox-group>
                </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
    <br><br> -->

    <b-form-input
      placeholder="Search..."
    ></b-form-input>

    <br>

    <b-table hover :items="users" :fields="fields">
      <template slot="Email" slot-scope="data">
        {{data.item.Email || '-'}}
      </template>

      <template slot="Verified" slot-scope="data">
        <b-badge v-if="data.item.EmailVerified === true" variant="success" pill>Verified</b-badge>
        <b-badge v-if="data.item.EmailVerified === false" variant="danger" pill>Unverified</b-badge>
      </template>

      <template slot="Created" slot-scope="data">
        {{fns.format(data.item.DateCreated, 'MMM DD, YYYY')}}
      </template>

      <template slot="Role" slot-scope="data">
        {{data.item.Role}}
      </template>

      <template slot="Active" slot-scope="data">
        <b-badge v-if="data.item.Active === true" variant="success" pill>Active</b-badge>
        <b-badge v-if="data.item.Active === false" variant="danger" pill>Deactivated</b-badge>
      </template>

      <template slot="Action" slot-scope="data">
        <willow-button primary :url="'/admin/users/' + data.item.Id" >Edit</willow-button>
        <willow-button destructive @click.native="deleteUser(data.item.Id)">Delete</willow-button>
        <willow-button v-if="data.item.EmailVerified === false" @click.native="resendInvite(data.item.Id)">Resend Invite</willow-button>
      </template>

    </b-table>

  </b-card>

</page>
</template>

<script>
import api from '@/api/api'

export default {
  mounted () {
    this.fetch()
    // this.applications = this.$store.getters.getApplications
  },

  data () {
    return {
      fields: ['Email', 'Verified', 'Created', 'Role', 'Active', 'Action'],
      users: {},
      messages: null
    }
  },

  methods: {
    fetch () {
      api.getUsers()
        .then(res => {
          this.users = res.data
        })
    },

    deleteUser (userId) {
      api.deleteUserById(userId)
        .then(res => {
          this.$router.go()
        })
        .catch(error => {
          console.log(error.response.data.errors)
        })
    },

    resendInvite (userId) {
      const user = this.users.find(user => user.Id === userId)
      const { FirstName, LastName, Role, Email } = user
      api.sendInvite({
        firstName: FirstName,
        lastName: LastName,
        role: Role,
        email: Email
      })
        .then((res) => {
          var messages = [res.data]
          messages.forEach(message => {
            message.type = 'success'
          })
          this.messages = messages
          setTimeout(() => {
            this.messages = {}
          }, 3000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
