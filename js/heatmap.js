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
        let maxX = 0;
        let minX = 0;
        let maxY = 0;
        let minY = 0;
        shotdata.forEach(d => {
            if (parseInt(d.LOC_X) < maxX){
                maxX = parseInt(d.LOC_X)
            }
            if (parseInt(d.LOC_X )> minX){
                minX = parseInt(d.LOC_X)
            }
            if (parseInt(d.LOC_Y) < maxY){
                maxY = parseInt(d.LOC_Y)
            }
            if (parseInt(d.LOC_Y) > minY){
                minY = parseInt(d.LOC_Y)
            }
        });
        console.log(minX)
        console.log(maxX)
        console.log(minY)
        console.log(maxY)

        // Remove old circles
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

        shots
            .selectAll('circle')
            .data(shotdata)  
            .enter()
            .append('circle')
            .attr('cx', function(d){
                if (d.LOC_Y < 0){
                    return that.xScale(parseInt(d.LOC_X)); 
                }
                else{
                    return that.xScale(-1* parseInt(d.LOC_X));
                }
            })
            .attr('cy', function(d){
                return that.yScale(Math.abs(parseInt(d.LOC_Y)));
            })
            .attr('r', 0.5)
            .attr('fill', 'black');

        d3.select('.shot-positions')
            .attr('transform', 'rotate(180 400 376)');
    }
}