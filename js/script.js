// ******* DATA LOADING *******
async function loadData () {
  const shotdata10_22 = [], fgadata10_22 = [];
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2010-11_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2011-12_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2012-13_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2013-14_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2014-15_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2015-16_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2016-17_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2017-18_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2018-19_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2019-20_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2020-21_FG3A.csv'));
  shotdata10_22.push(await d3.csv('SeparatedData/Heatmap Data/2021-22_FG3A.csv'));

  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2010-11_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2011-12_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2012-13_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2013-14_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2014-15_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2015-16_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2016-17_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2017-18_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2018-19_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2019-20_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2020-21_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/Linechart/2021-22_FGA.csv'));
  return { shotdata10_22 , fgadata10_22};
}

// ******* STATE MANAGEMENT *******
const globalApplicationState = {
  shotdata10_22: null,
  fgadata10_22: null,
  court: null,
  heatmap: null,
  playerInfo: null,
  teamInfo: null,
  topFifty:null,
  shotType: null
};

// ******* APPLICATION MOUNTING *******
loadData().then((loadedData) => {
  // code for overlay 1
  button = document.getElementById("button")
  button.addEventListener('click', function(e) {
      this.overlay_svg = d3.select('body')
          .append('svg')
          .style('width', 4000)
          .style('height', 2400)
          .style('position', 'fixed')
          .style('left', 0)
          .style('top', 0)
          .style('background-color', 'white')
          .style('opacity', '0.7')

      this.overlay_svg.append('text').attr("x", 1675).attr("y", 40).
        text("CLICK ANYWHERE TO EXIT OVERLAY!")
        .style("text-anchor", "middle").style("font-weight",  "bold")
        .style("font-size", "40").style('fill', 'black')

      this.overlay_svg.append('rect').style("stroke", "black").attr('fill', 'white').attr("x", 450)
      .attr("y", 150).attr("width", 1200).attr("height", 1000)
      //.attr('location', 'relative').attr('left', '400px')
      
      this.overlay_svg.append('text').attr("x", 1050).attr("y", 200).
          text("THE 3 POINT REVOLUTION")
          .style("text-anchor", "middle").style("font-weight",  "bold")
          .style("font-size", "40").style('fill', 'black')



      this.overlay_svg.append('text').attr("x", 450).attr("y", 250)
      .text("Information from the heatmap(top left chart): ")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#023020')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 280)
      .text("- Between consecutive seasons, generally, we can see that the heatmap is filling up the court more and a lot of")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 310)
      .text("dark red spots(indicating efficiency) are appearing. This phenomena supports our hypothesis.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')



      this.overlay_svg.append('text').attr("x", 450).attr("y", 360)
      .text("Information from the player linechart(top middle chart): ")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#023020')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 390)
      .text("- We saw fit to highlight the top 10 players for a season because they represent the best of the league.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 420)
      .text("- When calculating averages, the 10 best players can be outliers. So, we calculated the league average for 3")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 450)
      .text("pointers for all players in each season.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 480)
      .text("- In 2010-11, on average, players scored 162.67 points = 54 3-pointers and by 2021-22, players scored 190.31")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 510)
      .text("points = 63 3-pointers.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 540)
      .text("- This is fascinating because in 2010-11, 311 players played and by 2021-22, 516 players played. Despite the")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 570)
      .text("increase in number of players, the average continued to rise.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 600)
      .text("- More generally, the average has steadily increased for all the players and for the top 10 players as well(540")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 630)
      .text("points in 2010-11 to 816.9 points in 2021-22). The player line chart supports our hypothesis.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

  


      this.overlay_svg.append('text').attr("x", 450).attr("y", 680)
      .text("Information from the team linechart(bottom middle chart):")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#023020')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 710)
      .text("- We saw fit to highlight the top 5 teams for a season because they represent the best of the league.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 740)
      .text("- When calculating averages, the 5 best teams can be outliers. So, we calculated the league average for 3 pointers")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 770)
      .text("for all teams in each season.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 800)
      .text("- In 2010-11, on average, teams scored 1686.4 points = 562 3-pointers and by 2021-22, teams scored 3273.3 points")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 830)
      .text("(almost double) = 1091 3-pointers.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 860)
      .text("- More generally, the average has steadily increased for all the teams and for the top 5 teams as well(50592 points")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 890)
      .text("in 2010-11 to 98199 points in 2021-22).")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 920)
      .text("- The team line chart supports our hypothesis.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')




      this.overlay_svg.append('text').attr("x", 450).attr("y", 970)
      .text("Information from the percentage linechart(bottom left chart):")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#023020')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 1000)
      .text("- It is quite clear that the number of attempts for 3 pointers has increased over the last 12 years. This comes at the")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 1030)
      .text("expense of mid-range shots. Paint shots are relatively unaffected. The percentage chart supports our hypothesis.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')




      this.overlay_svg.append('text').attr("x", 450).attr("y", 1080)
      .text("In conclusion, from a player perspective and from a team persepctive, the number of 3 pointers has increased by")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#023020')

      this.overlay_svg.append('text').attr("x", 450).attr("y", 1110)
      .text("a lot over the last 12 years.")
      .style("font-weight", "bold").style("font-size", "25px").style('fill', '#023020')
      

      let that = this
      this.overlay_svg.on("click", function(f){
          that.overlay_svg.remove()
      })
  })

  // code for overlay 2
  button2 = document.getElementById("button2")
    button2.addEventListener('click', function(e) {
        this.overlay_svg = d3.select('body')
            .append('svg')
            .attr('class', 'overlay')
            .style('width', 4000)
            .style('height', 2400)
            .style('position', 'fixed')
            .style('left', 0)
            .style('top', 0)
            .style('background-color', 'white')
            .style('opacity', '0.7')

        let xPos = 900;
        let yPos = 500; 
        let diff = 30;
        i = 0;

        this.overlay_svg.append('text').attr("x", xPos+600).attr("y", 40)
          .text("CLICK ANYWHERE TO EXIT OVERLAY!")
          .style("text-anchor", "middle").style("font-weight",  "bold")
          .style("font-size", "40").style('fill', 'black')

        this.overlay_svg.append('rect').style("stroke", "black").attr('fill', 'white').attr("x", xPos-20)
        .attr("y", yPos-150).attr("width", 1200).attr("height", 900)
        .attr('id', 'overlay-rect')
        .attr('location', 'relative').attr('left', '400px')
        
        this.overlay_svg.append('text').attr("x", xPos + 70).attr("y", yPos - 100)  
            .text("THE 3 POINT REVOLUTION(featuring Stephen Curry)")
            .style("text-anchor", "left").style("font-weight",  "bold")
            .style("font-size", "40").style('fill', 'black')

        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos - 50)
        .text("How to use the graph above? ")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#8B0000')

        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- Hover over the circles. Each circle represents a player and for each player, his 3 pointers total, total games")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("played, ratio of the previous 2 things and career(start to end year) stat is shown.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("Intereseting/General stats from the graph: ")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#8B0000')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- The graph shows the top 52 players, of all time, for 3 pointers scored. NBA's website has records for 2560")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("players in total. These 3 pointers are from the regular season(which means we exclude playoffs and finals).")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- From left to right, we have the top 52 players by total points from 3 pointers. Stephen Curry, the first")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("circle, leads the charge with 9660 points and CJ McCollum, the last circle, has 4227 points.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- From these 52 players, Buddy Hield has played the least number of games at 488(active) and Dirk Nowitzki")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("has played the most, at 1522(retired).")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- Having a lot of 3 pointers is not an indication of efficieny. Efficiency is calculated as a ratio of 3")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("pointers total to total games played. Ratio is shown in the y axis.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- For instance, even though Reggie Miller is 4th all time for 3 pointers total, almost half(23) of the players are")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("more efficient than him. Lou Williams is the least efficient at 3.89(4371 points in 1123 games).")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- Stephen Curry, therefore, is the G.O.A.T when it comes to 3 pointers. He has the most points and the")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("best ratio. Buddy Hield might be catching up to him though.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- Of the 52 players, 22 are still active, 14 retired between 2016-22 or were undrafted for 2023, 9")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("retired between 2016-22 or were undrafted for 2023, 9 retired between 2010-16, 7 retired before 2010.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("Inferences/Conclusions from the graph: ")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#8B0000')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- Given that the NBA started keeping records from 1946, it is unusual that players who started before 1983")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("do not show up once in this graph. Dale Ellis, the earliest player in this graph, started his career in 1983.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- Inference being the best explanation, it can be reasonably inferred that scoring 3 pointers is a recent")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("phenomena. Specifically, scoring 3 pointers became popular around 2010, giving weight to our hypothesis.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- The fact that almost half of the top 52 players are still active gives credence to this inference.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("- The fact that 45 of the top 52 players are still playing/undrafted for 2023/retired after 2010 gives credence to")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        i++;
        this.overlay_svg.append('text').attr("x", xPos).attr("y", yPos + i * diff)
        .text("this inference.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        

        d3.selectAll('text').attr('class', 'overlay-text')

        let that = this
        this.overlay_svg.on("click", function(f){
            that.overlay_svg.remove()
        })
    })

    


  //console.log(loadedData.fgadata10_22);

  // Store the loaded shotdata into the globalApplicationState
  globalApplicationState.shotdata10_22 = loadedData.shotdata10_22;

  // store loaded field goal attempt data 
  globalApplicationState.fgadata10_22 = loadedData.fgadata10_22;

  // Build heatmap
  globalApplicationState.heatmap = new Heatmap(globalApplicationState);

  // Build player linechart 
  globalApplicationState.playerInfo = new PlayerInfo(globalApplicationState);

  //Build team linechart
  globalApplicationState.teamInfo = new TeamInfo(globalApplicationState);

  // // Build shot type linechart
  globalApplicationState.shotType = new ShotType(globalApplicationState);

  // Build court
  globalApplicationState.court = new Court();

  // // Build top 50 linechart
  globalApplicationState.topFifty = new TopFifty(globalApplicationState);
});


// Use with dropdown for dataset selection
function dataSelect(selectedData) {
  // get data
  let data = globalApplicationState.shotdata10_22[selectedData];

  // Draw heatmap
  let heatmap = globalApplicationState.heatmap
  heatmap.drawHeatmap(data, "");

  // Draw player linechart
  let playerInfo = globalApplicationState.playerInfo
  playerInfo.drawPlayerInfo(data)

  // Draw team linechart
  let teamInfo = globalApplicationState.teamInfo
  teamInfo.drawTeamInfo(data)
}

// Use with reset heatmap button to get dataset and draw heatmap
function getValue(){
  let selectElement = document.getElementById('dataset-select');
  let output = selectElement.value;
  dataSelect(output);
}