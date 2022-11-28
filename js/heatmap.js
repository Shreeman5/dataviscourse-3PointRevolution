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
        d3.select('#heatmap').selectAll('text').remove();

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
                if ((i === 48 || i === 744) && j.toFixed(1) <= 225.6){
                    continue
                }else if ((i === 56 || i === 736) && j.toFixed(1) <= 244.4){
                    continue
                }else if ((i === 64 || i === 728) && j.toFixed(1) <= 253.8){
                    continue
                }else if ((i === 72 || i === 720) && j.toFixed(1) <= 263.2){
                    continue
                }else if ((i === 80 || i === 712) && j.toFixed(1) <= 282){
                    continue
                }else if ((i === 88 || i === 704) && j.toFixed(1) <= 291.4){
                    continue
                }else if ((i === 96 || i === 696) && j.toFixed(1) <= 300.8){
                    continue
                }else if ((i === 104 || i === 688) && j.toFixed(1) <= 310.2){
                    continue
                }else if ((i === 112 || i === 680) && j.toFixed(1) <= 319.6){
                    continue
                }else if ((i === 120 || i === 672) && j.toFixed(1) <= 329){
                    continue
                }else if ((i === 128 || i === 664) && j.toFixed(1) <= 338.4){
                    continue
                }else if ((i === 136 || i === 656) && j.toFixed(1) <= 347.8){
                    continue
                }else if ((i === 144 || i === 648) && j.toFixed(1) <= 357.2){
                    continue
                }else if ((i === 152 || i === 640) && j.toFixed(1) <= 357.2){
                    continue
                }else if ((i === 160 || i === 632) && j.toFixed(1) <= 366.6){
                    continue
                }else if ((i === 168 || i === 624) && j.toFixed(1) <= 376){
                    continue
                }else if ((i === 176 || i === 616) && j.toFixed(1) <= 376){
                    continue
                }else if ((i === 184 || i === 608) && j.toFixed(1) <= 385.4){
                    continue
                }else if ((i === 192 || i === 600) && j.toFixed(1) <= 385.4){
                    continue
                }else if ((i === 200 || i === 592) && j.toFixed(1) <= 394.8){
                    continue
                }else if ((i === 208 || i === 584) && j.toFixed(1) <= 394.8){
                    continue
                }else if ((i === 216 || i === 576) && j.toFixed(1) <= 404.2){
                    continue
                }else if ((i === 224 || i === 568) && j.toFixed(1) <= 404.2){
                    continue
                }else if ((i === 232 || i === 560) && j.toFixed(1) <= 413.6){
                    continue
                }else if ((i === 240 || i === 552) && j.toFixed(1) <= 413.6){
                    continue
                }else if ((i === 248 || i === 544) && j.toFixed(1) <= 413.6){
                    continue
                }else if ((i === 256 || i === 536) && j.toFixed(1) <= 423){
                    continue
                }else if ((i === 264 || i === 528) && j.toFixed(1) <= 423){
                    continue
                }else if ((i === 272 || i === 520) && j.toFixed(1) <= 423){
                    continue
                }else if ((i === 280 || i === 512) && j.toFixed(1) <= 432.4){
                    continue
                }else if ((i === 288 || i === 504) && j.toFixed(1) <= 432.4){
                    continue
                }else if ((i === 296 || i === 496) && j.toFixed(1) <= 432.4){
                    continue
                }else if ((i === 304 || i === 488) && j.toFixed(1) <= 432.4){
                    continue
                }else if ((i === 312 || i === 480) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 320 || i === 472) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 328 || i === 464) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 336 || i === 456) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 344 || i === 448) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 352 || i === 440) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 360 || i === 448) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 368 || i === 440) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 376 || i === 432) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 384 || i === 424) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 392 || i === 416) && j.toFixed(1) <= 441.8){
                    continue
                }else if ((i === 400 || i === 408) && j.toFixed(1) <= 441.8){
                    continue
                }
                else{
                    data.push([i, parseFloat(j.toFixed(1)), 0, 0])
                }
            }
        }

        // for (let i = 0; i < data.length; i++){
        //     if (data[i][0] >= 48){
        //         data.splice(i+1, 1)
        //     }
        // }
        

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
        //console.log(data)

        
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
        
        
        let binary
        let player_array = []
        shotdata.forEach(d => {
            player_array.push(d.PLAYER_NAME)
        })

        let player_set = new Set(player_array)
        if (player_set.size === 1){
            binary = player_array[0]
        }
        else{
            binary = ""
        }

        shots.append("text")
            .style("font", "30px times")
            .style("font-family", "Arvo")
            .style("text-anchor", "middle")
            .attr('x', 400)
            .attr('y', 720)
            .attr('transform', 'rotate(180 400 376)')
            .text(binary)

    }
}