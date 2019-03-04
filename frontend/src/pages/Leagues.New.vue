<template>
<page>

  <page-header
    title="New League"
    :breadcrumbs="pageheader.breadcrumbs"
  >
  </page-header>
  <willow-messages v-for="(message, i) in messages" :key="i" :type="message.type" >{{message.msg}}</willow-messages>

  <willow-layout>
  <!-- CARD -->
    <willow-annotated-section title="New League" description="Add a league to the Jock Tax Index">
       <b-card class="mb-2">
        <h6>Profile</h6>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">League Name</label>
            <b-form-input
                  :value="leagueForm.name"
                  v-model="leagueForm.name"
                  type="text"
                  placeholder="League Name">
            </b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-4">
          <b-col>
            <willow-select
              :label="'Active'"
              :value="leagueForm.active"
              :options="[{ value: true, text: 'Active' },{ value: false, text: 'Inactive' }]"
              v-model="leagueForm.active"
            ></willow-select>
          </b-col>
          <b-col>
          </b-col>
        </b-row>

       </b-card>
    </willow-annotated-section>
  </willow-layout>

  <page-actions>
    <template slot="action-right">
      <willow-button primary  @click.native="saveLeague()">Save</willow-button>
    </template>
  </page-actions>

</page>
</template>

<script>
import api from '@/api/api'
export default {
  data () {
    return {
      pageheader: {
        breadcrumbs: [
          {
            text: 'Leagues',
            href: '/admin/Leagues'
          }
        ]
      },
      league: {},
      leagueForm: {
        name: null,
        active: true
      },
      messages: null
    }
  },

  methods: {
    saveLeague () {
      api.createLeague(this.leagueForm)
        .then((res) => {
          console.log(res.data)
          var messages = [res.data]
          messages.forEach(message => {
            message.type = 'success'
          })
          this.messages = messages
          setTimeout(() => {
            this.messages = {}
            this.$router.replace({ name: 'Leagues' })
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
