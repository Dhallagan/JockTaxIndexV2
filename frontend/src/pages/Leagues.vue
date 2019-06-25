<template>
<page>
  <page-header
    title="Manage Leagues"
  >
    <!-- <template slot="action-right">
      <willow-button plain>Print Application</willow-button>
    </template> -->

    <!-- <template slot="action-right">
      <willow-button primary url="/admin/leagues/new">Add League</willow-button>
    </template> -->
    <willow-button slot="action-right" class="mr-1" primary v-b-modal.myModal>Import</willow-button>

  </page-header>

  <willow-messages v-for="(message, i) in messages" :key="i" :type="message.type" >{{message.msg}}</willow-messages>

  <b-card class="w-100">

    <b-form-input
      placeholder="Search..."
    ></b-form-input>

    <br>

    <b-table hover :items="leagues" :fields="fields">
      <template slot="League Name" slot-scope="data">
        {{data.item.Name}}
      </template>

      <template slot="Active" slot-scope="data">
        <b-badge v-if="data.item.Active === true" variant="success" pill>Active</b-badge>
        <b-badge v-if="data.item.Active === false" variant="danger" pill>Deactivated</b-badge>
      </template>

      <template slot="Action" slot-scope="data">
        <willow-button primary :url="'/admin/leagues/' + data.item.Id" >Edit</willow-button>
        <willow-button destructive @click.native="deleteLeague(data.item.Id)">Delete</willow-button>
      </template>

    </b-table>

  </b-card>

  <b-modal title="Import" id="myModal">
    <b-row>
      <b-col>
        <h5>Upload a tax index</h5>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        Example XLS
      </b-col>
      <b-col>
        <willow-button @click.native="downloadExampleIndex()"><i class="fa fa-file-download"></i>Download</willow-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        Upload File
      </b-col>
      <b-col>
        <willow-file-input :url="`/leagues/importTaxIndexes`" :identifier="'TaxImport'" @updateTaxImport="updateTaxImport"><i class="fa fa-file-upload"></i>Import</willow-file-input>
      </b-col>
    </b-row>
  </b-modal>

</page>
</template>

<script>
import api from '@/api/api'
import { saveAs } from 'file-saver'

export default {
  mounted () {
    this.fetch()
  },

  data () {
    return {
      fields: ['League Name', 'Active', 'Action'],
      leagues: {}
    }
  },

  methods: {
    fetch () {
      api.getLeagues()
        .then(res => {
          console.log(res.data)
          this.leagues = res.data
        })
    },

    deleteLeague (leagueId) {
      api.deleteLeague(leagueId)
        .then(res => {
          this.$router.go()
        })
        .catch(error => {
          console.log(error.response.data.errors)
        })
    },

    updateTaxImport (value) {
      console.log(value)
      var messages = [value]
      messages.forEach(message => {
        message.type = 'success'
      })
      this.messages = messages
      setTimeout(() => {
        this.messages = {}
        this.fetch()
      }, 3000)
    },

    downloadExampleIndex () {
      api.downloadExampleIndex()
        .then(res => {
          saveAs(res.data, 'ExampleIndex.xlsx')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
