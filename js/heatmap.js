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
            .domain([-300, 300])
            .range([0, this.width]);
        this.yScale = d3.scaleLinear()
            .domain([0, 564])
            .range([0, 752]);

        // First draw heatmap for season 2021-2022 dataset
        this.drawHeatmap(this.shotdata10_22[11]);
    }

    // Draws heatmap with given dataset
    drawHeatmap(shotdata) {
        let that = this;
        // console.log("within drawHeatmap: ")
        // console.log(data);
        // console.log(that);
    
        // analyze the data
        // what do x and y pos mean in relation to court?
        // data.forEach(d => {
        //     console.log(d.LOC_X);
        //     console.log(d.LOC_Y);
        //     console.log(that.xScale(d.LOC_X));            
        //     console.log(that.yScale(Math.abs(d.LOC_Y)));
        // });
        
        // draw a small circle for each point?
        let heatmap = d3.select('#heatmap')
            .attr('width', 800)
            .attr('height', 900)
            .append('g')
            .attr('class', 'shot-positions')
            .attr('width', 800)
            .attr('height', 900);

        heatmap
            .selectAll('circle')
            .data(shotdata)  
            .enter()
            .append('circle')
            .attr('cx', function(d){
                if (d.LOC_Y < 0){
                    return that.xScale(d.LOC_X); 
                }
                else{
                    return that.xScale(-1*d.LOC_X);
                }
            })
            .attr('cy', function(d){
                return that.yScale(Math.abs(d.LOC_Y));
            })
            .attr('r', 0.1);

        d3.select('#shot-positions')
            .attr('transform', 'rotate(180 400 372)')
        return
    }
}