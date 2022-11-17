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
        
        // analyze the data
        // let maxX = 0;
        // let minX = 0;
        // let maxY = 0;
        // let minY = 0;
        // shotdata.forEach(d => {
        //     if (parseInt(d.LOC_X) < maxX){
        //         maxX = parseInt(d.LOC_X)
        //     }
        //     if (parseInt(d.LOC_X )> minX){
        //         minX = parseInt(d.LOC_X)
        //     }
        //     if (parseInt(d.LOC_Y) < maxY){
        //         maxY = parseInt(d.LOC_Y)
        //     }
        //     if (parseInt(d.LOC_Y) > minY){
        //         minY = parseInt(d.LOC_Y)
        //     }
        // });
        // console.log(minX)
        // console.log(maxX)
        // console.log(minY)
        // console.log(maxY)

        // Remove old circles
        //TODO: Nick, can you remove the rectangles?
        d3.select('#heatmap').selectAll('circles').remove();
        d3.select('#heatmap').select('g').remove();

        // draw a small circle to show each 
        let shots = d3.select('#heatmap')
            .attr('width', that.width)
            .attr('height', that.height)
            .append('g')
            .attr('class', 'shot-positions')
            .attr('width', that.width)
            .attr('height', that.height);

        // shots
        //     .selectAll('circle')
        //     .data(shotdata)  
        //     .enter()
        //     .append('circle')
        //     .attr('cx', function(d){
        //         return that.xScale(parseInt(d.LOC_X)); 
        //     })
        //     .attr('cy', function(d){
        //         return that.yScale(Math.abs(parseInt(d.LOC_Y)));
        //     })
        //     .attr('r', 0.5)
        //     .attr('fill', 'black');

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

        // shots
        //     .append('rect')
        //     .attr('x', that.xScale(-250))
        //     .attr('y', that.yScale(0))
        //     .attr('width', that.xScale(-245) - that.xScale(-250))
        //     .attr('height', that.yScale(5) - that.yScale(0))
        //     .attr('stroke', 'black')
        //     .attr('fill', '#69a3b2')

        // shots
        //     .append('rect')
        //     .attr('x', that.xScale(245))
        //     .attr('y', that.yScale(0))
        //     .attr('width', that.xScale(250) - that.xScale(245))
        //     .attr('height', that.yScale(5) - that.yScale(0))
        //     .attr('stroke', 'black')
        //     .attr('fill', 'red')

        // shots
        //     .append('rect')
        //     .attr('x', that.xScale(-250))
        //     .attr('y', that.yScale(395))
        //     .attr('width', that.xScale(-245) - that.xScale(-250))
        //     .attr('height', that.yScale(400) - that.yScale(395))
        //     .attr('stroke', 'black')
        //     .attr('fill', 'red')

        // shots
        //     .append('rect')
        //     .attr('x', that.xScale(245))
        //     .attr('y', that.yScale(395))
        //     .attr('width', that.xScale(250) - that.xScale(245))
        //     .attr('height', that.yScale(400) - that.yScale(395))
        //     .attr('stroke', 'black')
        //     .attr('fill', 'green')

        

        d3.select('.shot-positions')
            .attr('transform', 'rotate(180 400 376)');
    }
}