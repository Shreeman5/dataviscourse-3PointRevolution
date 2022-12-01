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

  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2010-11_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2011-12_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2012-13_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2013-14_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2014-15_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2015-16_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2016-17_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2017-18_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2018-19_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2019-20_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2020-21_FGA.csv'));
  fgadata10_22.push(await d3.csv('SeparatedData/LineChart/2021-22_FGA.csv'));
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
  // code for overlay
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

        this.overlay_svg.append('rect').style("stroke", "black").attr('fill', 'white').attr("x", 2150).attr("y", 1060).attr("width", 1200).attr("height", 900)
        
        this.overlay_svg.append('text').attr("x", 2750).attr("y", 1100).
            text("THE 3 POINT REVOLUTION(featuring Stephen Curry)")
            .style("text-anchor", "middle").style("font-weight",  "bold")
            .style("font-size", "40").style('fill', 'black')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1150)
        .text("How to use the graph above? ")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#8B0000')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1180)
        .text("- Hover over the circles. Each circle represents a player and for each player, his 3 pointers total, total games")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1210)
        .text("played, ratio of the previous 2 things and career(start to end year) stat is shown.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')



        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1260)
        .text("Intereseting/General stats from the graph: ")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#8B0000')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1290)
        .text("- The graph shows the top 52 players, of all time, for 3 pointers scored. NBA's website has records for 2560")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1320)
        .text("players in total. These 3 pointers are from the regular season(which means we exclude playoffs and finals).")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1350)
        .text("- From left to right, in descending order, we have the top 52 players by total points from 3 pointers. Stephen")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1380)
        .text("Curry, the first circle, leads the charge with 9660 points and CJ McCollum, the last circle, has 4227 points.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1410)
        .text("- From these 52 players, Buddy Hield has played the least number of games at 488(active) and Dirk Nowitzki")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1440)
        .text("has played the most, at 1522(retired).")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1470)
        .text("- Having a lot of 3 pointers is not an indication of efficieny. Efficiency is calculated as a ratio of 3")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1500)
        .text("pointers total to total games played. Ratio is shown in the y axis.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1530)
        .text("- For instance, even though Reggie Miller is 4th all time for 3 pointers total, almost half(23) of the players are")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1560)
        .text("more efficient than him. Lou Williams is the least efficient at 3.89(4371 points in 1123 games).")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1590)
        .text("- Stephen Curry, therefore, is the G.O.A.T when it comes to 3 pointers. He has the most points and the")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1620)
        .text("best ratio. Buddy Hield might be catching up to him though.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1650)
        .text("- Of the 52 players, 22 are still active, 14 retired between 2016-22 or were undrafted for 2023, 9")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1680)
        .text("retired between 2016-22 or were undrafted for 2023, 9 retired between 2010-16, 7 retired before 2010.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')



        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1730)
        .text("Inferences/Conclusions from the graph: ")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#8B0000')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1760)
        .text("- Given that the NBA started keeping records from 1946, it is unusual that players who started before 1983")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1790)
        .text("do not show up once in this graph. Dale Ellis, the earliest player in this graph, started his career in 1983.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1820)
        .text("- Inference being the best explanation, it can be reasonably inferred that scoring 3 pointers is a recent")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1850)
        .text("phenomena. Specifically, scoring 3 pointers became popular around 2010, giving weight to our hypothesis.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        
        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1880)
        .text("- The fact that almost half of the top 52 players are still active gives credence to this inference.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1910)
        .text("- The fact that 45 of the top 52 players are still playing/undrafted for 2023/retired after 2010 gives credence to")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')

        this.overlay_svg.append('text').attr("x", 2150).attr("y", 1940)
        .text("this inference.")
        .style("font-weight", "bold").style("font-size", "25px").style('fill', '#00008B')
        

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

  // // Build court
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