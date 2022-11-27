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
    shotType: null
};
  
// ******* APPLICATION MOUNTING *******
loadData().then((loadedData) => {
    //console.log(loadedData.fgadata10_22);
  
    // Store the loaded shotdata into the globalApplicationState
    globalApplicationState.shotdata10_22 = loadedData.shotdata10_22;

    // store loaded field goal attempt data 
    globalApplicationState.fgadata10_22 = loadedData.fgadata10_22;
    
    //let fgadata10_11 = d3.group(globalApplicationState.fgadata10_22[0], d=> d.SHOT_ZONE_BASIC)
    //console.log(fgadata10_11)

    // Build heatmap
    globalApplicationState.heatmap = new Heatmap(globalApplicationState);

    // Build player linechart 
    globalApplicationState.playerInfo = new PlayerInfo(globalApplicationState);

    //Build team linechart
    globalApplicationState.teamInfo = new TeamInfo(globalApplicationState);

    // Build shot type linechart
    globalApplicationState.shotType = new ShotType(globalApplicationState);

    // Build court
    globalApplicationState.court = new Court();
  });


// Use with dropdown for dataset selection
function dataSelect(selectedData) {
    // get data
    let data = globalApplicationState.shotdata10_22[selectedData];

    // Draw heatmap
    let heatmap = globalApplicationState.heatmap
    heatmap.drawHeatmap(data);

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