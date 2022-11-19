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
                else if (fraction < 1 && fraction >= 0.8){
                    return '#002600'
                }
                else if (fraction < 0.8 && fraction >= 0.6){
                    return '#004d00'
                }
                else if (fraction < 0.6 && fraction >= 0.4){
                    return '#006600'
                }
                else if (fraction < 0.4 && fraction >= 0.2){
                    return '#008000'
                }
                else if (fraction < 0.2 && fraction > 0){
                    return '#fcf05c'
                }
                else if (fraction === 0){
                    return 'red'
                }
                else if (fraction === -1){
                    return 'white'
                }
            })
            .attr('opacity', function(d){
                let fraction
                if (d[3] === 0){
                    fraction = -1
                }
                if (fraction === -1){
                    return 0.5
                }
            })
            .attr('stroke', function(d){
                let fraction
                if (d[3] === 0){
                    fraction = -1
                }
                if (fraction === -1){
                    return 'white'
                }
                else{
                    return 'black'
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