<template>
<page>

  <page-header
    title="Edit League"
    :breadcrumbs="pageheader.breadcrumbs"
  >
    <willow-button slot="action-right" class="mr-1" primary>Export</willow-button>
    <!-- <willow-button slot="action-right" primary>Import</willow-button> -->
    <willow-file-input slot="action-right" :url="`/leagues/${leagueForm.id}/taxIndexes/import`" :identifier="'TaxImport'" class="list-inline-item" @updateTaxImport="updateTaxImport">Import</willow-file-input>
  </page-header>
  <willow-messages v-for="(message, i) in messages" :key="i" :type="message.type" >{{message.msg}}</willow-messages>

  <willow-layout>
  <!-- CARD -->
    <b-tabs class="col-sm-24">
      <b-tab
        :title="'Detail'"
      >
        <willow-annotated-section title="Edit League" description="Change the name and a controll visibility for a league."
        class="my-4">
          <b-card class="mb-2">
            <b-row class="mb-4">
              <b-col>
                <label for="inputLive">League Name</label>
                <b-form-input
                      :value="leagueForm.name"
                      v-model="leagueForm.name"
                      type="text"
                      placeholder="First">
                </b-form-input>
              </b-col>
            </b-row>

            <b-row class="mb-4">
              <b-col>
                <willow-select
                  :label="'Active'"
                  :value="leagueForm.active"
                  :options="[{ value: true, text: 'Active' },{ value: false, text: 'Inactive' }]"
                  v-model="leagueForm.active" @change="convertActiveValue"
                ></willow-select>
              </b-col>
              <b-col>
              </b-col>
            </b-row>
            <willow-button primary  @click.native="updateLeague()" class="float-right">Save</willow-button>

          </b-card>
        </willow-annotated-section>
      </b-tab>
      <b-tab
        :title="'Index'"
        class="col-sm-24"
      >
        <willow-table-editable
          :headings="['Team', 'Country', 'From', 'To', 'Net Income', 'Deductions', 'Federal', 'State', 'City', 'Fica', 'Credits', 'Foreign Tax', 'Foreign Tax Credit']"
          :rows="taxData"
        >
          <template slot="Team" slot-scope="data">
            {{data.item.Team}}
          </template>

          <template slot="Country" slot-scope="data">
            {{data.item.Country}}
          </template>

          <template slot="From" slot-scope="data">
            {{data.item.IncomeFrom}}
          </template>

          <template slot="To" slot-scope="data">
            {{data.item.IncomeTo}}
          </template>

          <template slot="Net Income" slot-scope="data">
            {{data.item.NetIncome}}
          </template>

          <template slot="Federal" slot-scope="data">
            {{data.item.FederalTax}}
          </template>

          <template slot="Deductions" slot-scope="data">
            {{data.item.Deductions}}
          </template>

          <template slot="State" slot-scope="data">
            {{data.item.StateTax}}
          </template>

          <template slot="City" slot-scope="data">
            {{data.item.CityTax}}
          </template>

          <template slot="Fica" slot-scope="data">
            {{data.item.FicaTax}}
          </template>

          <template slot="Credits" slot-scope="data">
            {{data.item.Credits}}
          </template>

           <template slot="Foreign Tax" slot-scope="data">
            {{data.item.ForeignTax}}
          </template>

           <template slot="Foreign Tax Credit" slot-scope="data">
            {{data.item.ForeignTax}}
          </template>

        </willow-table-editable>
      </b-tab>
    </b-tabs>
  </willow-layout>

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
      leagueForm: {
        id: null,
        name: null,
        active: null
      },
      messages: null,
      taxData: [],
      modalShow: true
    }
  },

  methods: {
    fetch () {
      api.getLeague(this.$route.params.league_id)
        .then(res => {
          var league = res.data
          this.leagueForm.id = league.Id
          this.leagueForm.name = league.Name
          this.leagueForm.active = league.Active
          this.taxData = league.TaxIndex
        })
    },

    updateLeague () {
      var params = {
        name: this.leagueForm.name,
        active: this.leagueForm.active
      }
      api.updateLeague(this.leagueForm.id, params)
        .then(res => {
          var messages = [res.data]
          messages.forEach(message => {
            message.type = 'success'
          })
          this.messages = messages
          setTimeout(() => {
            this.messages = {}
            this.$router.push({ name: 'Leagues' })
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

    convertActiveValue (value) {
      if (value === 'true') {
        this.leagueForm.active = true
      } else {
        this.leagueForm.active = false
      }
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
    }
  }
}
</script>
