class PlayerInfo {
    /**
     * Creates a Player Info Object
     */
    constructor(globalApplicationState) {
        // Import shotdata from 2010 to 2022
        this.shotdata10_22 = globalApplicationState.shotdata10_22;
        this.globalApplicationState  = globalApplicationState;

        // svg height
        this.height = 752;

        // svg width
        this.width = 1200;
        
        // svg padding
        this.pad_left = 80
        this.pad_right = 50
        this.pad_bottom = 60

        // First draw linechart for season 2010-2011 dataset
        this.drawPlayerInfo(this.shotdata10_22[0]);
    }

    // Draws player linechart with given dataset
    drawPlayerInfo(shotdata) {
        let that = this

        // data processing for player line chart
        let made_shots = shotdata.filter(d => d.SHOT_MADE_FLAG == 1)
        let grouped_players = d3.group(made_shots, d=> d.PLAYER_NAME)
        let sortedValues = new Map([...grouped_players.entries()].sort((a, b) => b[1].length - a[1].length))
        this.best_players = []
        let counter = 0
        for (let [key, value] of sortedValues) {
            if (counter === 10){
                break
            }
            let total_points = 3
            for (let i = 0; i < value.length; i++){     
                this.best_players.push([key, value[i].GAME_DATE, total_points])
                total_points += 3
            }
            counter += 1
        }
        //console.log(this.best_players)
        let best_players_mapped = d3.group(this.best_players, (d) => d[0])
        let dates = []
        let cases = []
        for (let [key, value] of best_players_mapped) {
            value.forEach(function(element){
                let year = element[1].substring(0, 4)
                let month = element[1].substring(4, 6)
                let day = element[1].substring(6, 8)
                element[1] = new Date(year, month-1, day)
                dates.push(element[1])
                cases.push(element[2])
            })
        }
        // console.log(best_players_mapped)

        // find averages for all players
        
        // let total = 0
        // let player_counter = 0
        // for (let [key, value] of best_players_mapped) {
        //     //console.log(value.length)
        //     total = total + (3 * value.length)
        //     player_counter = player_counter + 1
        // }
        // console.log('total points', total)
        // console.log('total players', player_counter)
        // console.log('average', total/player_counter)

        // draw player line chart svg using the data obtained from data processing
        let player_chart = d3.select('#playerlinechart')
            .attr('width', that.width)
            .attr('height', that.height)

        let xScale = d3.scaleTime().domain(d3.extent(dates)).range([this.pad_left, this.width - this.pad_right]).nice();
        let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %Y"));
        player_chart.select("#x-axis").attr("transform", "translate(0," + (this.height - this.pad_bottom) + ")").call(xAxis)
        .selectAll("text")
        .style("font", "20px times")

        let yScale = d3.scaleLinear().domain([0, d3.max(cases)]).range([this.height - this.pad_bottom, 40]).nice();
        let yAxis = d3.axisLeft().scale(yScale);
        player_chart.select("#y-axis").attr("transform", "translate(" + this.pad_left + ",0)").call(yAxis)
        .selectAll("text")
        .style("font", "20px times")

        let lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(best_players_mapped.keys())
        player_chart.select('#lines')
            .selectAll('path')
            .data(best_players_mapped)
            .join('path')
            .attr('fill', 'none')
            .attr('stroke', ([group, values]) => lineColorScale(group))
            .attr('stroke-width', 3)
            .attr('d', ([group, values]) => d3.line()
                .x((d) => xScale(d[1]))
                .y((d) => yScale(d[2]))
                (values)
            )
            .attr('id', 'line-paths');

        // data needed for overlay line        
        this.neededData = this.makeArrayBetter(this.best_players, d3.extent(dates), Array.from(best_players_mapped.keys()))

        // Redraw heatmap with selected player's data
        d3.selectAll('#line-paths')
            .on('mousemove',function(e,d){
                //console.log(e)
                // console.log(d)
                let required_data = shotdata.filter(player => player.PLAYER_NAME === d[0])
                // console.log(required_data)
                let heatmap = that.globalApplicationState.heatmap;
                heatmap.drawHeatmap(required_data, d[0])
         });
        
        // use this.needed data here to make overlay line
        player_chart.on('mousemove', (event) => {
            if (event.offsetX > this.pad_left && event.offsetX < this.width - this.pad_right) {
                // Set the line position
                player_chart.select('#overlay').select('line').attr('stroke', 'black').attr('x1', event.offsetX).attr('x2', event.offsetX).attr('y1', this.height - this.pad_bottom).attr('y2', 20);
                const yearHovered = new Date(Math.floor(xScale.invert(event.offsetX)))

                // filter data for that time
                let filteredData = this.neededData
                .filter((row) => row[1].setHours(0,0,0,0) === yearHovered.setHours(0,0,0,0))
                .sort((rowA, rowB) => rowB[2] - rowA[2])
                
                // draw overlay line
                player_chart.select('#overlay')
                .selectAll('text')
                .data(filteredData)
                .join('text')
                .text(d=>`${d[0]}, ${d[2]}`)
                .attr('x', event.offsetX < 700 ? event.offsetX : event.offsetX - 200)
                .attr('y', event.offsetX < 400 ? (d, i) => 25*i + 30 : (d, i) => 25*i + 450)
                .attr('alignment-baseline', 'hanging')
                .attr('fill', (d) => lineColorScale(d[0]))
                //.attr("font-weight", 700)
                .style("font", "20px times")
            }
        });

        // Based on season, get starting and ending time for that season
        let selectElement = document.getElementById('dataset-select');
        let output = selectElement.value
        let text
        if (output === '0'){
            text = '2010-2011 Season: Oct 26 - Apr 13, Playoffs: Apr 16 - May 26, Finals: May 31 - Jun 12'
        }else if (output === '1'){
            text = '2011-2012 Season: Dec 25 - Apr 26, Playoffs: Apr 28 - Jun 9, Finals: Jun 12 - Jun 21'
        }else if (output === '2'){
            text = '2012-2013 Season: Oct 30 - Apr 17, Playoffs: Apr 20 - Jun 3, Finals: Jun 6 - Jun 20'
        }else if (output === '3'){
            text = '2013-2014 Season: Oct 29 - Apr 16, Playoffs: Apr 19 - May 31, Finals: Jun 5 - Jun 15'
        }else if (output === '4'){
            text = '2014-2015 Season: Oct 28 - Apr 15, Playoffs: Apr 18 - May 27, Finals: Jun 4 - Jun 16'
        }else if (output === '5'){
            text = '2015-2016 Season: Oct 27 - Apr 13, Playoffs: Apr 16 - May 30, Finals: Jun 2 - Jun 19'
        }else if (output === '6'){
            text = '2016-2017 Season: Oct 25 - Apr 12, Playoffs: Apr 15 - May 25, Finals: Jun 1 - Jun 12'
        }else if (output === '7'){
            text = '2017-2018 Season: Oct 17 - Apr 11, Playoffs: Apr 14 - May 28, Finals: May 31 - Jun 8'
        }else if (output === '8'){
            text = '2018-2019 Season: Oct 16 - Apr 10, Playoffs: Apr 13 - May 25, Finals: May 30 - Jun 13'
        }else if (output === '9'){

            text = 'Regular Season: Oct 22 - Aug 15[COVID], Play-in game: Aug 15,  Playoffs: Aug 17 - Sep 27, Finals: Sep 30 - Oct 11'
        }else if (output === '10'){
            text = 'Regular Season: Dec 22 - May 16, Play-in tournament: May 18 - May 21, Playoffs: May 22 - Jul 3, Finals: Jul 6 - Jul 20'
        }else if (output === '11'){
            text = 'Regular Season: Oct 19 - Apr 10, Play-in tournament: Apr 12 - Apr 15, Playoffs: Apr 16 - May 29, Finals: Jun 2 - Jun 16'

        }
        //console.log(text)

        // Remove and append texts 
        d3.select('#playerlinechart').select('#t1').remove()
        d3.select('#playerlinechart').select('#t2').remove()
        d3.select('#playerlinechart').select('#t3').remove()

        player_chart.append("text").attr('id', 't1')
        .style("font", "24px times")
        .style("text-anchor", "middle")
        .attr('x', this.width/2)
        .attr('y', 20)
        .text(text)

        player_chart.append("text").attr('id', 't2')
        .style("font", "25px times")
        .style("text-anchor", "middle")
        .attr('x', this.width/2)
        .attr('y', 740)
        .text('Current season(in months and year)')


        player_chart.append("text").attr('id', 't3')
        .style("font", "25px times")
        .style("text-anchor", "middle")
        .attr('x', 420)
        .attr('y', 10)
        .attr('transform', 'rotate(270 400 376)')
        .text('Player points from 3 pointers')
    }

    //returns data needed for overlay line
    makeArrayBetter(data, startEnd, players){
        let new_data = []
        let val_1 = startEnd[0]
        let val_2 = startEnd[1]
        while(val_1 <= val_2){
            new_data.push(new Date(val_1))
            val_1.setDate(val_1.getDate() + 1)
        }

        let almost_data = []
        for (let i = 0; i < players.length; i++){
            for (let j = 0; j < new_data.length; j++){
                almost_data.push([players[i], new_data[j], 0])
            }
        }

        for (let i = 0; i < almost_data.length; i++){
            let player = almost_data[i][0]
            let time = almost_data[i][1]
            for (let j = 0; j < data.length; j++){
                let player_2 = data[j][0]
                let time_2 = data[j][1]
                if (player === player_2 && time.setHours(0,0,0,0) === time_2.setHours(0,0,0,0)){
                    almost_data[i][2] = data[j][2]
                }
            }
            if (almost_data[i][2] === 0 && (i-1 >= 0)){
                almost_data[i][2] = almost_data[i-1][2]
            }
        }

        return almost_data
    }

}