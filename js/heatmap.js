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

        // Remove old rectangles
        d3.select('#heatmap').selectAll('rect').remove();
        d3.select('#heatmap').select('g').remove();

        // shot bin selection
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
                let smallX = i
                let bigX = i + 8
                let smallY = j
                let bigY = j + 9.4
                let attempted = 0
                let made = 0
                shotdata.forEach(d => {
                    let cx = that.xScale(parseInt(d.LOC_X))
                    let cy = that.yScale(parseInt(d.LOC_Y))
                    if (cx >= smallX && cx < bigX && cy >= smallY && cy < bigY){
                        // console.log('Row: ', d)
                        // console.log('A:', cx)
                        // console.log('B:', cy)
                        // console.log('C:', smallX)
                        // console.log('D:', bigX)
                        // console.log('E:', smallY)
                        // console.log('F:', bigY)

                        made = made + parseInt(d.SHOT_MADE_FLAG)
                        attempted = attempted + parseInt(d.SHOT_ATTEMPTED_FLAG)
                    }
                })
                let fraction 
                if (attempted === 0){
                    fraction = -1
                }
                else{
                    fraction = made/attempted
                }
                
                // console.log('G:', made)
                // console.log('H:', attempted)
                // console.log('I:', fraction)

                data.push([i, parseFloat(j.toFixed(1)), fraction])
            }
        }
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
                if (d[2] <= 1 && d[2] > 0.8){
                    return '#003300'
                }
                else if (d[2] <= 0.8 && d[2] > 0.6){
                    return '#006600'
                }
                else if (d[2] <= 0.6 && d[2] > 0.4){
                    return '#009900'
                }
                else if (d[2] <= 0.4 && d[2] > 0.2){
                    return '#00cc00'
                }
                else if (d[2] <= 0.2 && d[2] > 0){
                    return '#00ff00'
                }
                else if (d[2] === 0){
                    return '#000000'
                }
                else if (d[2] === -1){
                    return 'white'
                }
            })
            .attr('opacity', function(d){
                if (d[2] === -1){
                    return 0.5
                }
            })

        d3.select('.shot-positions')
            .attr('transform', 'rotate(180 400 376)');
    }
}