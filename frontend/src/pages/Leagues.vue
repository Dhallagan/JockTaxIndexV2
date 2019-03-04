<template>
<page>
  <page-header
    title="Manage Leagues"
  >
    <!-- <template slot="action-right">
      <willow-button plain>Print Application</willow-button>
    </template> -->

    <template slot="action-right">
      <willow-button primary url="/admin/leagues/new">Add League</willow-button>
    </template>

  </page-header>

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
    }
  }
}
</script>

<style>

</style>
