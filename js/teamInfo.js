class TeamInfo {
    /**
     * Creates a Team Info Object
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
        this.drawTeamInfo(this.shotdata10_22[0]);
    }

    // Draws team linechart with given dataset
    drawTeamInfo(shotdata) {
        let that = this

        // data processing for team line chart
        let made_shots = shotdata.filter(d => d.SHOT_MADE_FLAG == 1)
        let grouped_teams = d3.group(made_shots, d=> d.TEAM_NAME)
        let sortedTeams = new Map([...grouped_teams.entries()].sort((a, b) => b[1].length - a[1].length))
        this.best_teams = []
        let counter_1 = 0
        for (let [key, value] of sortedTeams) {
            if (counter_1 === 5){
                break
            }
            let total_points = 3
            for (let i = 0; i < value.length; i++){     
                this.best_teams.push([key, value[i].GAME_DATE, total_points])
                total_points += 3
            }
            counter_1 += 1
        }
        let best_teams_mapped = d3.group(this.best_teams, (d) => d[0])
        let dates = []
        let cases = []
        for (let [key, value] of best_teams_mapped) {
            value.forEach(function(element){
                let year = element[1].substring(0, 4)
                let month = element[1].substring(4, 6)
                let day = element[1].substring(6, 8)
                element[1] = new Date(year, month-1, day)
                dates.push(element[1])
                cases.push(element[2])
            })
        }
        console.log(best_teams_mapped)

        // draw team line chart svg using the data obtained from data processing
        let team_chart = d3.select('#teamlinechart')
            .attr('width', that.width)
            .attr('height', that.height)

        let xScale = d3.scaleTime().domain(d3.extent(dates)).range([this.pad_left, this.width - this.pad_right]).nice();
        let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %Y"));
        team_chart.select("#x-axis").attr("transform", "translate(0," + (this.height - this.pad_bottom) + ")").call(xAxis)
        .selectAll("text")
        .style("font", "20px times")

        let yScale = d3.scaleLinear().domain([0, d3.max(cases)]).range([this.height - this.pad_bottom, 40]).nice();
        let yAxis = d3.axisLeft().scale(yScale);
        team_chart.select("#y-axis").attr("transform", "translate(" + this.pad_left + ",0)").call(yAxis)
        .selectAll("text")
        .style("font", "20px times")

        let lineColorScale = d3.scaleOrdinal().domain(best_teams_mapped.keys())
            .range(["#494444", "#726f6f", "#8b8989", '#aaaaaa', "#bbbbbb"])
        team_chart.select('#lines')
            .selectAll('path')
            .data(best_teams_mapped)
            .join('path')
            .attr('fill', 'none')
            .attr('stroke', ([group, values]) => lineColorScale(group))
            .attr('stroke-width', 3)
            .attr('d', ([group, values]) => d3.line()
                .x((d) => xScale(d[1]))
                .y((d) => yScale(d[2]))
                (values)
            )
            .attr('id', 'line-paths-1');

        // data needed for overlay line        
        this.neededData = this.makeArrayBetter(this.best_teams, d3.extent(dates), Array.from(best_teams_mapped.keys()))
        //console.log(this.neededData)


        // Redraw heatmap with selected team's data
        d3.selectAll('#line-paths-1')
            .on('mousemove',function(e,d){
                //console.log(e)
                // console.log(d)
                let required_data = shotdata.filter(team => team.TEAM_NAME === d[0])
                // console.log(required_data)
                let heatmap = that.globalApplicationState.heatmap;
                heatmap.drawHeatmap(required_data, d[0])
         });


         // use this.needed data here to make overlay line
        team_chart.on('mousemove', (event) => {
            if (event.offsetX > this.pad_left && event.offsetX < this.width - this.pad_right) {
                // Set the line position
                team_chart.select('#overlay').select('line').attr('stroke', 'black').attr('x1', event.offsetX).attr('x2', event.offsetX).attr('y1', this.height - this.pad_bottom).attr('y2', 20);
                const yearHovered = new Date(Math.floor(xScale.invert(event.offsetX)))

                // filter data for that time
                let filteredData = this.neededData
                .filter((row) => row[1].setHours(0,0,0,0) === yearHovered.setHours(0,0,0,0))
                .sort((rowA, rowB) => rowB[2] - rowA[2])
                
                // draw overlay line
                team_chart.select('#overlay')
                .selectAll('text')
                .data(filteredData)
                .join('text')
                .text(d=>`${d[0]}, ${d[2]}`)
                .attr('x', event.offsetX < 700 ? event.offsetX : event.offsetX - 260)
                .attr('y', event.offsetX < 450 ? (d, i) => 25*i + 30 : (d, i) => 25*i + 400)
                .attr('alignment-baseline', 'hanging')
                .attr('fill', (d) => lineColorScale(d[0]))
                .style("font", "20px times")
            }
        });

        // Based on season, get champions and season MVP
        let selectElement = document.getElementById('dataset-select');
        let output = selectElement.value
        let text
        if (output === '0'){
            text = 'Champions: Dallas Mavericks, Season MVP: Derrick Rose(Chicago Bulls)'
        }else if (output === '1'){
            text = 'Champions: Miami Heat, Season MVP: LeBron James(Miami Heat)'
        }else if (output === '2'){
            text = 'Champions: Miami Heat, Season MVP: LeBron James(Miami Heat)'
        }else if (output === '3'){
            text = 'Champions: San Antonio Spurs, Season MVP: Kevin Durant(Oklahoma City Thunder)'
        }else if (output === '4'){
            text = 'Champions: Golden State Warriors, Season MVP: Stephen Curry(Golden State Warriors)'
        }else if (output === '5'){
            text = 'Champions: Cleveland Cavaliers, Season MVP: Stephen Curry(Golden State Warriors)'
        }else if (output === '6'){
            text = 'Champions: Golden State Warriors, Season MVP: Russell Westbrook(Oklahoma City Thunder)'
        }else if (output === '7'){
            text = 'Champions: Golden State Warriors, Season MVP: James Harden(Houston Rockets)'
        }else if (output === '8'){
            text = 'Champions: Toronto Raptors, Season MVP: Giannis Antetokounmpo(Milwaukee)'
        }else if (output === '9'){
            text = 'Champions: Los Angeles Lakers, Season MVP: Giannis Antetokounmpo(Milwaukee)'
        }else if (output === '10'){
            text = 'Champions: Milwaukee Bucks, Season MVP: Nikola Jokić(Denver Nuggets)'
        }else if (output === '11'){
            text = 'Champions: Golden State Warriors, Season MVP: Nikola Jokić(Denver Nuggets)'
        }


        // Remove and append texts 
        d3.select('#teamlinechart').select('#t1').remove()
        d3.select('#teamlinechart').select('#t2').remove()
        d3.select('#teamlinechart').select('#t3').remove()

        team_chart.append("text").attr('id', 't1')
        .style("font", "30px times")
        .style("text-anchor", "middle")
        .attr('x', this.width/2)
        .attr('y', 20)
        .text(text)

        team_chart.append("text").attr('id', 't2')
        .style("font", "25px times")
        .style("text-anchor", "middle")
        .attr('x', this.width/2)
        .attr('y', 740)
        .text('Current season(in months and year)')

        team_chart.append("text").attr('id', 't3')
        .style("font", "25px times")
        .style("text-anchor", "middle")
        .attr('x', 400)
        .attr('y', 0)
        .attr('transform', 'rotate(270 400 376)')
        .text('Team points from 3 pointers')
    }

    //returns data needed for overlay line
    makeArrayBetter(data, startEnd, teams){
        let new_data = []
        let val_1 = startEnd[0]
        let val_2 = startEnd[1]
        while(val_1 <= val_2){
            new_data.push(new Date(val_1))
            val_1.setDate(val_1.getDate() + 1)
        }

        let almost_data = []
        for (let i = 0; i < teams.length; i++){
            for (let j = 0; j < new_data.length; j++){
                almost_data.push([teams[i], new_data[j], 0])
            }
        }

        for (let i = 0; i < almost_data.length; i++){
            let team = almost_data[i][0]
            let time = almost_data[i][1]
            for (let j = 0; j < data.length; j++){
                let team_2 = data[j][0]
                let time_2 = data[j][1]
                if (team === team_2 && time.setHours(0,0,0,0) === time_2.setHours(0,0,0,0)){
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