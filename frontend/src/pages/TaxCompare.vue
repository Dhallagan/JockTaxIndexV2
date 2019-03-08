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
                              <option value="Anaheim Ducks" selected="">Anaheim Ducks</option>
                              <option value="Arizona Coyotes">Arizona Coyotes</option>
                              <option value="Boston Bruins">Boston Bruins</option>
                              <option value="Buffalo Sabres">Buffalo Sabres</option>
                              <option value="Calgary Flames">Calgary Flames</option>
                              <option value="Carolina Hurricanes">Carolina Hurricanes</option>
                              <option value="Chicago Blackhawks">Chicago Blackhawks</option>
                              <option value="Colorado Avalanche">Colorado Avalanche</option>
                              <option value="Columbus Blue Jackets">Columbus Blue Jackets</option>
                              <option value="Dallas Stars">Dallas Stars</option>
                              <option value="Detroit Red Wings">Detroit Red Wings</option>
                              <option value="Edmonton Oilers">Edmonton Oilers</option>
                              <option value="Florida Panthers">Florida Panthers</option>
                              <option value="Los Angeles Kings">Los Angeles Kings</option>
                              <option value="Minnesota Wild">Minnesota Wild</option>
                              <option value="Montreal Canadiens">Montreal Canadiens</option>
                              <option value="Nashville Predators">Nashville Predators</option>
                              <option value="New Jersey Devils">New Jersey Devils</option>
                              <option value="New York Islanders">New York Islanders</option>
                              <option value="New York Rangers">New York Rangers</option>
                              <option value="Ottawa Senators">Ottawa Senators</option>
                              <option value="Philadelphia Flyers">Philadelphia Flyers</option>
                              <option value="Pittsburgh Penguins">Pittsburgh Penguins</option>
                              <option value="San Jose Sharks">San Jose Sharks</option>
                              <option value="St. Louis Blues">St. Louis Blues</option>
                              <option value="Tampa Bay Lightning">Tampa Bay Lightning</option>
                              <option value="Toronto Maple Leafs">Toronto Maple Leafs</option>
                              <option value="Vancouver Canucks">Vancouver Canucks</option>
                              <option value="Vegas Golden Knights">Vegas Golden Knights</option>
                              <option value="Washington Capitals">Washington Capitals</option>
                              <option value="Winnipeg Jets">Winnipeg Jets</option>
                           </select>
                        </div>
                        <!-- ELMER POPULATE TEAMS HERE BASED OFF OF TEAMS IN THE INDEX -->
                        <label for="team2">Competing Offer(s) For</label>
                        <div class="form-group">
                          <select name="team2" id="team2" class="selectpicker">
                         <option value="Anaheim Ducks">Anaheim Ducks</option>
                          <option value="Arizona Coyotes">Arizona Coyotes</option>
                          <option value="Boston Bruins" selected="">Boston Bruins</option>
                          <option value="Buffalo Sabres">Buffalo Sabres</option>
                          <option value="Calgary Flames">Calgary Flames</option>
                          <option value="Carolina Hurricanes">Carolina Hurricanes</option>
                          <option value="Chicago Blackhawks">Chicago Blackhawks</option>
                          <option value="Colorado Avalanche">Colorado Avalanche</option>
                          <option value="Columbus Blue Jackets">Columbus Blue Jackets</option>
                          <option value="Dallas Stars">Dallas Stars</option>
                          <option value="Detroit Red Wings">Detroit Red Wings</option>
                          <option value="Edmonton Oilers">Edmonton Oilers</option>
                          <option value="Florida Panthers">Florida Panthers</option>
                          <option value="Los Angeles Kings">Los Angeles Kings</option>
                          <option value="Minnesota Wild">Minnesota Wild</option>
                          <option value="Montreal Canadiens">Montreal Canadiens</option>
                          <option value="Nashville Predators">Nashville Predators</option>
                          <option value="New Jersey Devils">New Jersey Devils</option>
                          <option value="New York Islanders">New York Islanders</option>
                          <option value="New York Rangers">New York Rangers</option>
                          <option value="Ottawa Senators">Ottawa Senators</option>
                          <option value="Philadelphia Flyers">Philadelphia Flyers</option>
                          <option value="Pittsburgh Penguins">Pittsburgh Penguins</option>
                          <option value="San Jose Sharks">San Jose Sharks</option>
                          <option value="St. Louis Blues">St. Louis Blues</option>
                          <option value="Tampa Bay Lightning">Tampa Bay Lightning</option>
                          <option value="Toronto Maple Leafs">Toronto Maple Leafs</option>
                          <option value="Vancouver Canucks">Vancouver Canucks</option>
                          <option value="Vegas Golden Knights">Vegas Golden Knights</option>
                          <option value="Washington Capitals">Washington Capitals</option>
                          <option value="Winnipeg Jets">Winnipeg Jets</option></select>
                       
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

                     </form></div>
        </div>
      </div>

  </div>
</div>
</template>

<script>
export default {
  
}
</script>
