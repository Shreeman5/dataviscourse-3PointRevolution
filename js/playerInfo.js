class PlayerInfo {
    /**
     * Creates a Player Info Object
     */
    constructor(globalApplicationState) {
        // Import shotdata from 2010 to 2022
        this.shotdata10_22 = globalApplicationState.shotdata10_22;
        this.globalApplicationState  = globalApplicationState;
        //this.heatmap = globalApplicationState.heatmap;

        // svg height
        this.height = 752;

        // svg width
        this.width = 900;
 
        this.pad_left = 80
        this.pad_right = 50
        this.pad_bottom = 40

        // First draw heatmap for season 2010-2011 dataset
        this.drawPlayerInfo(this.shotdata10_22[0]);
    }


    drawPlayerInfo(shotdata) {
        let that = this

        let made_shots = shotdata.filter(d => d.SHOT_MADE_FLAG == 1)
        //console.log(made_shots)

        let grouped_players = d3.group(made_shots, d=> d.PLAYER_NAME)
       //console.log('A:', grouped_players)

        let sortedValues = new Map([...grouped_players.entries()].sort((a, b) => b[1].length - a[1].length))
        //console.log('B:', sortedValues)
        
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

        //console.log('BP:', this.best_players)


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
        
        
        this.neededData = this.makeArrayBetter(this.best_players, d3.extent(dates), Array.from(best_players_mapped.keys()))
        //console.log(this.neededData)

        //this.best_players = this.best_players.shift()


        //form the player chart svg
        let player_chart = d3.select('#playerlinechart')
            .attr('width', that.width)
            .attr('height', that.height)

        let xScale = d3.scaleTime().domain(d3.extent(dates)).range([this.pad_left, this.width - this.pad_right]).nice();
        let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %Y"));
        player_chart.select("#x-axis").attr("transform", "translate(0," + (this.height - this.pad_bottom) + ")").call(xAxis)

        let yScale = d3.scaleLinear().domain([0, d3.max(cases)]).range([this.height - this.pad_bottom, 40]);
        let yAxis = d3.axisLeft().scale(yScale).ticks(8);
        player_chart.select("#y-axis").attr("transform", "translate(" + this.pad_left + ",0)").call(yAxis)

        
        let lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(best_players_mapped.keys())
        player_chart.select('#lines')
            .selectAll('path')
            .data(best_players_mapped)
            .join('path')
            .attr('fill', 'none')
            .attr('stroke', ([group, values]) => lineColorScale(group))
            .attr('stroke-width', 1)
            .attr('d', ([group, values]) => d3.line()
                .x((d) => xScale(d[1]))
                .y((d) => yScale(d[2]))
                (values)
            )
            .attr('id', 'line-paths');

        // Redraw heatmap with selected player's data
        d3.selectAll('#line-paths')
            .on('mousemove',function(e,d){
                //console.log(e)
                // console.log(d)
                let required_data = shotdata.filter(player => player.PLAYER_NAME === d[0])
                // console.log(required_data)
                let heatmap = that.globalApplicationState.heatmap;
                heatmap.drawHeatmap(required_data)
         });

        player_chart.on('mousemove', (event) => {
            if (event.offsetX > this.pad_left && event.offsetX < 900 - this.pad_right) {
                // Set the line position
                player_chart.select('#overlay').select('line').attr('stroke', 'black').attr('x1', event.offsetX).attr('x2', event.offsetX).attr('y1', 752 - this.pad_bottom).attr('y2', 0);
                const yearHovered = new Date(Math.floor(xScale.invert(event.offsetX)))
                //console.log(yearHovered)

                let filteredData = this.neededData
                .filter((row) => row[1].setHours(0,0,0,0) === yearHovered.setHours(0,0,0,0))
                .sort((rowA, rowB) => rowB[2] - rowA[2])
                
                //console.log(filteredData)
                player_chart.select('#overlay')
                .selectAll('text')
                .data(filteredData)
                .join('text')
                .text(d=>`${d[0]}, ${d[2]}`)
                .attr('x', event.offsetX < 400 ? event.offsetX : event.offsetX - 280)
                .attr('y', (d, i) => 20*i + 20)
                .attr('alignment-baseline', 'hanging')
                .attr('fill', (d) => lineColorScale(d[0]));
            }
        });

        // d3.select('.shot_1-positions')
        //     .attr('transform', 'rotate(180 400 376)');
    }


    makeArrayBetter(data, startEnd, players){
        //console.log('d:', data)
        //console.log(new_data)

        let new_data = []
        let val_1 = startEnd[0]
        let val_2 = startEnd[1]
        while(val_1 <= val_2){
            new_data.push(new Date(val_1))
            val_1.setDate(val_1.getDate() + 1)
        }

        //console.log('BP:', this.best_players)

        let almost_data = []
        for (let i = 0; i < players.length; i++){
            for (let j = 0; j < new_data.length; j++){
                almost_data.push([players[i], new_data[j], 0])
            }
        }
        //console.log(almost_date)

        for (let i = 0; i < almost_data.length; i++){
            let player = almost_data[i][0]
            let time = almost_data[i][1]
            for (let j = 0; j < data.length; j++){
                let player_2 = data[j][0]
                let time_2 = data[j][1]
                //console.log(data[j][2])
                if (player === player_2 && time.setHours(0,0,0,0) === time_2.setHours(0,0,0,0)){
                    almost_data[i][2] = data[j][2]
                }
            }
            if (almost_data[i][2] === 0){
                almost_data[i][2] = almost_data[i-1][2]
            }
        }

        //console.log('d:', data)
        //console.log('dd:', almost_data)
        return almost_data
    }

}