<template>
<page>

  <page-header
    title="Edit League"
    :breadcrumbs="pageheader.breadcrumbs"
  >
  </page-header>
  <willow-messages v-for="(message, i) in messages" :key="i" :type="message.type" >{{message.msg}}</willow-messages>

  <willow-layout>
  <!-- CARD -->
    <willow-annotated-section title="Edit League" description="Change the name and a controll visibility for a league.">
       <b-card class="mb-2">
        <h6>Profile</h6>
        <b-row class="mb-4">
          <b-col>
            <label for="inputLive">League Name</label>
            <b-form-input
                  :value="editLeagueForm.firstName"
                  v-model="editLeagueForm.firstName"
                  type="text"
                  placeholder="First">
            </b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-4">
          <b-col>
            <willow-select
              :label="'Active'"
              :value="editLeagueForm.active"
              :options="[{ value: true, text: 'Active' },{ value: false, text: 'Inactive' }]"
              v-model="editLeagueForm.active"
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
      <willow-button primary  @click.native="updateLeague()">Save</willow-button>
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
            text: 'Leagues',
            href: '/admin/Leagues'
          }
        ]
      },
      league: {},
      editLeagueForm: {
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
    }
  }
}
</script>
