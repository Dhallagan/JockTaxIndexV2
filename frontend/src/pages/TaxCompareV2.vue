<template>
  <div class="container-fluid">

  <!-- Don't Touch Above! -->
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-24">
      <h4>Options</h4>
      <div role="form" action="/nhl" method="post">
         <label for="contract">Contract Amount</label>
         <div class="form-group">
            <input type="text" name="contract" id="contract" value="10000000" class="selectpicker" v-model="state.amountFieldValue">
         </div>

         <label for="escrow">Escrow</label>
         <div class="form-group">
            <select name="escrow" id="escrow" class="selectpicker" v-model="state.escrowFieldValue">
               <option value="0.00">0%</option>
               <option value="0.01">1%</option>
               <option value="0.02">2%</option>
               <option value="0.03">3%</option>
               <option value="0.04">4%</option>
               <option value="0.05">5%</option>
               <option value="0.06">6%</option>
               <option value="0.07">7%</option>
               <option value="0.08">8%</option>
               <option value="0.09">9%</option>
               <option value="0.1">10%</option>
               <option value="0.11">11%</option>
               <option value="0.12">12%</option>
               <option value="0.13">13%</option>
               <option value="0.14">14%</option>
               <option value="0.15">15%</option>
               <option value="0.16">16%</option>
               <option value="0.17">17%</option>
               <option value="0.18">18%</option>
               <option value="0.19">19%</option>
               <option value="0.20">20%</option>
            </select>
         </div>

         <!-- DON"T NEED TO EDIT -->
         <!-- <h4>Present Value</h4>
         <label for="discountrate">Discount Rate</label>
         <div class="form-group">
            <select name="discountrate" id="discountrate" class="selectpicker" v-model="state.discountRateFieldValue">
               <option value="0.0">0.0</option>
               <option value="0.01">0.01</option>
               <option value="0.02">0.02</option>
               <option value="0.03">0.03</option>
               <option value="0.04">0.04</option>
               <option value="0.05">0.05</option>
               <option value="0.06">0.06</option>
               <option value="0.07">0.07</option>
               <option value="0.08">0.08</option>
               <option value="0.09">0.09</option>
               <option value="0.1">0.10</option>
               <option value="0.11">0.11</option>
               <option value="0.12">0.12</option>
               </select>
         </div> -->
         <div class="clearfix mtop15"></div>
         <!-- <button class="button btn btn-primary pull-right mtop15" id="submit-button" @click="handleCompareSubmit()">Submit</button> -->
      </div>
   </div>

   <div class="col-lg-18 col-md-18 col-sm-24">
      <h2>Earnings</h2>
      <div class="row">
         <div class="col-lg-24 col-md-24 card">
            <div class="row">
               <div class="col-lg-24">
                     <b-table
                        :fields="fields"
                        :items="taxIndexes"
                        hover
                     >
                        <template slot="Team" slot-scope="data">
                           {{data.item.Team}}
                        </template>

                        <template slot="Tax Rate" slot-scope="data">
                           {{(Pct(1 - data.item.NetIncome))}}
                        </template>

                        <template slot="Tax Paid" slot-scope="data">
                           {{(Num((1 - data.item.NetIncome) * adjContractAmount))}}
                        </template>

                        <template slot="Net Income" slot-scope="data">
                           {{(Num((data.item.NetIncome) * adjContractAmount))}}
                        </template>

                        <template slot="Federal Tax" slot-scope="data">
                           {{(Num((data.item.FederalTax) * adjContractAmount - socialSecurity(data.item.Country)))}}
                        </template>

                        <template slot="State Tax" slot-scope="data">
                           {{(Num((data.item.StateTax) * adjContractAmount))}}
                        </template>

                        <template slot="City Tax" slot-scope="data">
                           {{(Num((data.item.CityTax) * adjContractAmount))}}
                        </template>

                        <template slot="Fica Tax" slot-scope="data">
                           {{(Num((data.item.FicaTax) * adjContractAmount))}}
                        </template>

                        <template slot="Deductions" slot-scope="data">
                           {{(Num((data.item.Deductions) * adjContractAmount))}}
                        </template>

                        <template slot="Taxable Income" slot-scope="data">
                           {{(Num(taxableIncome(data.item.Deductions)))}}
                        </template>

                     </b-table>
               </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '@/api/api'
import {Numbers} from '@/mixins'

export default {
  mixins: [
    Numbers
  ],
  mounted () {
    this.fetch()
  },

  data () {
    return {
      state: {
        isLoading: false,
        isDirty: false,
        amountFieldValue: 10000000,
        escrowFieldValue: '0.00'
        // discountRateFieldValue: '0.07'
      },
      fields: ['Team', 'Tax Rate', 'Tax Paid', 'Net Income', 'Federal Tax', 'State Tax', 'City Tax', 'Fica Tax', 'Deductions', 'Taxable Income'],
      taxIndexes: {}
    }
  },
  computed: {
    adjContractAmount () {
      return this.state.amountFieldValue * (1 - this.state.escrowFieldValue)
    }
  },
  methods: {
    fetch () {
      api.getTaxIndexes(this.$route.params.league_id)
        .then(res => {
          this.taxIndexes = res.data
          console.log(this.taxIndexes)
        })
    },
    socialSecurity (country) {
      var socialSecuritye = 7347

      if (country === 'CA') {
        socialSecuritye = 0
      }

      return socialSecuritye
    },
    taxableIncome (deductions) {
      return this.adjContractAmount - this.adjContractAmount * deductions
    }
  }
}
</script>
