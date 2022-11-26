class Heatmap {
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

        // Scales needed for x, y shot positions
        this.xScale = d3.scaleLinear()
            .domain([-250, 250])
            .range([0, this.width]);
        this.yScale = d3.scaleLinear()
            .domain([0, 400])
            .range([0, this.height]);

        // First draw heatmap for season 2010-2011 dataset
        this.drawHeatmap(this.shotdata10_22[0]);
    }

    // Draws heatmap with given dataset
    drawHeatmap(shotdata) {
        let that = this;
        
        // colorscale uses red hue
        let colorScale = d3.scaleSequential(d3.interpolateReds)
            .domain([0, 1]);

        // Remove old rectangles
        d3.select('#heatmap').selectAll('rect').remove();
        d3.select('#heatmap').select('g').remove();

        // draw a small circle to show each 
        let shots = d3.select('#heatmap')
            .attr('width', that.width)
            .attr('height', that.height)
            .append('g')
            .attr('class', 'shot-positions')
            .attr('width', that.width)
            .attr('height', that.height);

        let data = []
        for (let i = 0; i < 800; i += 8){
            for (let j = 0; j < 751; j += 9.4){
                data.push([i, parseFloat(j.toFixed(1)), 0, 0])
            }
        }

        shotdata.forEach(d => {
            let cx = that.xScale(parseInt(d.LOC_X))
            let cy = that.yScale(parseInt(d.LOC_Y))
            for (let i = 0; i < data.length; i++){
                let smallX = data[i][0]
                let bigX = data[i][0] + 8
                let smallY = data[i][1]
                let bigY = data[i][1] + 9.4
                if (cx >= smallX && cx < bigX && cy >= smallY && cy < bigY){
                    data[i][2] = data[i][2] + parseInt(d.SHOT_MADE_FLAG)
                    data[i][3] = data[i][3] + parseInt(d.SHOT_ATTEMPTED_FLAG)
                    break;
                }
            }
        })
        console.log(data)

        shots
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function(d){
                return d[0]
            })
            .attr('y', function(d){
                return d[1]
            })
            .attr('width', 8)
            .attr('height', 9.4)
            .attr('fill', function(d){
                let fraction
                if (d[3] === 0){
                    fraction = -1
                }
                else{
                    fraction = d[2]/d[3]
                }
                
                if (fraction === 1){
                    return '#6F189E'
                }
                else if (fraction > 0 && fraction < 1){
                    return colorScale(fraction)
                }
                else if (fraction === 0){
                    return colorScale(fraction)
                }
                else if (fraction === -1){
                    return 'white'
                }               
            });
        
        d3.select('.shot-positions')
            .attr('transform', 'rotate(180 400 376)');
    }
}