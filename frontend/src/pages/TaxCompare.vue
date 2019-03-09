<template>
  <div class="container-fluid">

  <!-- Don't Touch Above! -->
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-24">
      <div class="panel">
          <div class="panel-body hidden-print">
            <h4>Options</h4>
            <form role="form" action="/nhl" method="post">
               <label for="contract">Contract Amount</label>
               <div class="form-group">
                  <input type="text" name="contract" id="contract" value="10000000" placeholder="10000000" class="selectpicker">
               </div>
               <label for="years">Years</label>
               <div class="form-group">

                  <select name="years" id="years" class="selectpicker" value="5">
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5" selected="">5</option>
                     <option value="6">6</option>
                     <option value="7">7</option>
                     <option value="8">8</option>
                     <option value="9">9</option>
                     <option value="10">10</option>
                     <option value="11">11</option>
                     <option value="12">12</option>
                     </select>
               </div>

               <!-- ELMER POPULATE TEAMS HERE BASED OFF OF TEAMS IN THE INDEX -->
               <label for="team1">Offer From</label>
               <div class="form-group">
                  <select name="team1" id="team1" class="selectpicker">
                     <option v-for="(taxIndex, key) in taxIndexes" :key="key" :value="taxIndex.Id">{{ taxIndex.Team }}</option>
                  </select>
               </div>
               <!-- ELMER POPULATE TEAMS HERE BASED OFF OF TEAMS IN THE INDEX -->
               <label for="team2">Competing Offer(s) For</label>
               <div class="form-group">
                  <select name="team2" id="team2" class="selectpicker">
                     <option v-for="(taxIndex, key) in taxIndexes" :key="key" :value="taxIndex.Id">{{ taxIndex.Team }}</option>
                  </select>
               </div>
               <label for="escrow">Escrow</label>
               <div class="form-group">
                  <select name="escrow" id="escrow" class="selectpicker">
                     <option selected="" value="0.00">0%</option>
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
               <h4>Present Value</h4>
               <label for="discountrate">Discount Rate</label>
               <div class="form-group">
                  <select name="discountrate" id="discountrate" class="selectpicker"><option value="0.0">0.0</option>
                     <option value="0.01">0.01</option>
                     <option value="0.02">0.02</option>
                     <option value="0.03">0.03</option>
                     <option value="0.04">0.04</option>
                     <option value="0.05">0.05</option>
                     <option value="0.06">0.06</option>
                     <option value="0.07" selected="">0.07</option>
                     <option value="0.08">0.08</option>
                     <option value="0.09">0.09</option>
                     <option value="0.1">0.10</option>
                     <option value="0.11">0.11</option>
                     <option value="0.12">0.12</option>
                     </select>
               </div>
               <div class="clearfix mtop15"></div>
               <button class="button btn btn-primary pull-right mtop15" id="submit-button">Submit</button>

            </form>
         </div>
        </div>
      </div>

      <div class="col-lg-18 col-md-18 col-sm-24">
         <h2>Tax Analysis</h2>
         <div class="panel_s">
            <div class="panel-body">
               <div class="row">
                  <div class="col-lg-24 col-md-24">
                     <ul class="nav nav-tabs navtab-custom">
                        <li class="active ">
                           <a href="#0" data-toggle="tab" aria-expanded="false">
                           <span class="visible-xs"><i class="fa fa-home"></i></span>
                           <span class="hidden-xs">team1.team</span>
                           </a>
                        </li>
                     </ul>
                     <div class="tab-content summary">
                        <div class="tab-pane active page-break" id="0" role="tabpanel">
                           <div class="col-sm-24">
                              <div class="row">
                                 <div class="col-lg-24 ">
                                    <h4 class="bold no-margin">Summary</h4>
                                    <hr>
                                    <div class="col-lg-24">
                                       <div class="row">
                                          <p> Given a gross contract of fnumber params.income, a player will make fnumber team1.netIncome
                                             if signing with the team1.team, and make fnumber team2.netIncome if they were to sign with the team2.team.
                                             Net of taxes, playing for the comparison.betterTeam is a better deal.
                                             For the team2.team to match the contract of the
                                             team1.team, they must pay fnumber comparison.matchedContract to the signee— <strong>a comparison.premiumWord}} of ${number comparison.premium</strong>.
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col-lg-8  col-md-8 col-sm-8">
                                    <div class="row">
                                       <div class="col-lg-24">
                                          <h4 class="bold no-margin">Inputs</h4>
                                          <hr>
                                          <div class="row">
                                             <table class="table table-borded no-margin">
                                                <tbody>
                                                   <tr>
                                                      <td class="bold">Contract Amount</td>
                                                      <td>fnumber params.income</td>
                                                   </tr>
                                                   <tr>
                                                      <td class="bold">Years</td>
                                                      <td>params.years</td>
                                                   </tr>
                                                   <tr>
                                                      <td class="bold">Offer From</td>
                                                      <td>team1.team</td>
                                                   </tr>
                                                   <tr>
                                                      <td class="bold">Competing Offer</td>
                                                      <td>team2.team</td>
                                                   </tr>
                                                   <tr>
                                                      <td class="bold">Discount Rate</td>
                                                      <td>params.discountrate</td>
                                                   </tr>
                                                   <tr>
                                                      <td class="bold">Escrow</td>
                                                      <td>pct params.escrow</td>
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
export default {
  mounted () {
    this.fetch()
  },

  data () {
    return {
      defaultState: {},
      state: {
        isLoading: false,
        isDirty: false,
        team1: null
      },
      taxIndexes: {}
    }
  },

  methods: {
    fetch () {
      api.getTaxIndexes(this.$route.params.league_id)
        .then(res => {
          this.taxIndexes = res.data
        })
    }
  }
}
</script>
