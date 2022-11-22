// ******* DATA LOADING *******
async function loadData () {
    const shotdata10_22 = [];
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
    return { shotdata10_22 };
  }
  
// ******* STATE MANAGEMENT *******
const globalApplicationState = {
    shotdata10_22: null,
    court: null,
    heatmap: null
};
  
// ******* APPLICATION MOUNTING *******
loadData().then((loadedData) => {
    console.log(loadedData.shotdata10_22);
  
    // Store the loaded data into the globalApplicationState
    globalApplicationState.shotdata10_22 = loadedData.shotdata10_22;
    
    let playerData10_11 = d3.group(globalApplicationState.shotdata10_22[0], d=> d.PLAYER_NAME)
    console.log(playerData10_11)

    // Build heatmap
    globalApplicationState.heatmap = new Heatmap(globalApplicationState);

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
}