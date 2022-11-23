class TeamInfo {
    /**
     * Creates a Heatmap Object
     */
    constructor(globalApplicationState) {
        // Import shotdata from 2010 to 2022
        this.shotdata10_22 = globalApplicationState.shotdata10_22;

        // svg height
        this.height = 752;

        // svg width
        this.width = 800;

        // // Scales needed for x, y shot positions
        // this.xScale = d3.scaleLinear()
        //     .domain([-250, 250])
        //     .range([0, this.width]);
        // this.yScale = d3.scaleLinear()
        //     .domain([0, 400])
        //     .range([0, this.height]);

        // First draw heatmap for season 2010-2011 dataset
        this.drawTeamInfo(this.shotdata10_22[0]);
    }


    drawTeamInfo(shotdata) {
        let that = this

        let made_shots = shotdata.filter(d => d.SHOT_MADE_FLAG == 1)
        //console.log(made_shots)

        let grouped_teams = d3.group(made_shots, d=> d.TEAM_NAME)
        //console.log(grouped_teams)

        let sortedTeams = new Map([...grouped_teams.entries()].sort((a, b) => b[1].length - a[1].length))
        //console.log(sortedTeams)
        
        let best_teams = []
        let counter_1 = 0
        for (let [key, value] of sortedTeams) {
            if (counter_1 === 5){
                break
            }
            let total_points = 3
            for (let i = 0; i < value.length; i++){     
                best_teams.push([key, value[i].GAME_DATE, total_points])
                total_points += 3
            }
            counter_1 += 1
        }
        //console.log(best_teams)

        // form the team chart svg
        let player_chart = d3.select('#teamlinechart')
            .attr('width', that.width)
            .attr('height', that.height)
            .append('g')
            .attr('class', 'shot_2-positions')
            .attr('width', that.width)
            .attr('height', that.height);


        d3.select('.shot_2-positions')
            .attr('transform', 'rotate(180 400 376)');
    }

}