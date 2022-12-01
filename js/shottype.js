class ShotType {
    /**
     * Creates a Shot type line chart object
     */
    constructor(globalApplicationState) {
        // Import shotdata from 2010 to 2022
        this.shotdata10_22 = globalApplicationState.shotdata10_22;

        this.fgadata10_22 = globalApplicationState.fgadata10_22;

        // svg height
        this.height = 752;

        // svg width
        this.width = 900;

        // svg padding
        this.pad_left = 80
        this.pad_right = 50
        this.pad_bottom = 40
        this.pad_top = 40

        // call draw function
        this.drawShotTypeChart(this.fgadata10_22)
    }

    drawShotTypeChart(fgadata10_22){
        let that = this;

        // divide data by shot type:
        let fgaByType10_22 = [];
        let stats = {};
        let paint = 0, mid = 0, three = 0, total = 0;
        let i = 10;
        let year = "";
        for (const season of fgadata10_22) {
            season.forEach(function(d) {
                // Paint 
                if (d.SHOT_ZONE_BASIC == "Restricted Area" || d.SHOT_ZONE_BASIC == "In The Paint (Non-RA)"){
                    paint++;
                }
                // Midrange
                else if (d.SHOT_ZONE_BASIC == "Mid-Range"){
                    mid++;
                }
                // 3 pointer
                else if (d.SHOT_ZONE_BASIC == "Right Corner 3" || d.SHOT_ZONE_BASIC == "Left Corner 3"
                      || d.SHOT_ZONE_BASIC == "Backcourt" || d.SHOT_ZONE_BASIC == "Above the Break 3"){
                    three++;
                }
            });
            
            // save season stats 
            year = "20" + String(i) + "-" + String(i+1);
            total = paint + mid + three;
            stats = {year: year, paint: paint, mid: mid, three: three, total: total}
            fgaByType10_22.push(stats);
            stats = {};
            paint = 0, mid = 0, three = 0, total = 0;
            i++;
        }

        let shotTypeChart = d3.select('#shottypelinechart')
            .attr('width', that.width)
            .attr('height', that.height)
        
        let xAxisLabels = ['2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', 
            '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22'];
        
        let xScale = d3.scaleBand()
            .domain(xAxisLabels)
            .range([this.pad_left, this.width - this.pad_right])

        let yScale = d3.scaleLinear()
            .domain([0, 1])
            .range([this.height - this.pad_bottom, that.pad_top])

        // append axis lines
        shotTypeChart.append('g')
            .attr('width', that.width)
            .attr('height', that.height)
            .attr('class', 'shottypechart-axis-lines')
            .append('line')
            .attr('x1', that.pad_left)
            .attr('y1', that.pad_top)
            .attr('x2', that.pad_left)
            .attr('y2', that.height - that.pad_top)
            .attr('stroke', 'black')
            .attr('stroke_weight', 3)
        
        shotTypeChart.select('.shottypechart-axis-lines')
            .append('line')
            .attr('x1', that.pad_left)
            .attr('y1', that.height - that.pad_bottom)
            .attr('x2', that.width - that.pad_right)
            .attr('y2', that.height - that.pad_bottom)
            .attr('stroke', 'black')
            .attr('stroke_weight', 3)

        // append axis ticks
        let yTickLabels = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
        shotTypeChart.append('g')
            .attr('width', that.width)
            .attr('height', that.height)
            .attr('class', 'shottypechart-axis-ticks')
    
        // append y axis tick labels
        yTickLabels.forEach(function(d){
            shotTypeChart.select('.shottypechart-axis-ticks')
                .append('line')
                .attr('x1', that.pad_left -10)
                .attr('y1', yScale(d))
                .attr('x2', that.pad_left)
                .attr('y2', yScale(d))
                .attr('stroke', 'black')
                .attr('stroke_weight', 3)
        });

        shotTypeChart.append('g')
            .attr('width', that.width)
            .attr('height', that.height)
            .attr('class', 'shottypechart-axis-labels')

        // append y axis labels
        yTickLabels.forEach(function(element){
            shotTypeChart.select('.shottypechart-axis-labels')
                .append('text')
                .text(function(d) {
                    let t = element * 100;
                    return String(t) + "%";
                })
                .attr('stroke', 'black')
                .attr('text-anchor', 'middle')
                .attr('transform', function(d){
                    let v = yScale(element) + 5
                    return "translate(50," + String(v) +")";
                })
            });

        // append x axis tick labels
        xAxisLabels.forEach(function(d){
            shotTypeChart.select('.shottypechart-axis-ticks')
                .append('line')
                .attr('x1', 55.83 + xScale(d))
                .attr('y1', that.height - that.pad_bottom)
                .attr('x2', 55.83 + xScale(d))
                .attr('y2', that.height - that.pad_bottom + 10)
                .attr('stroke', 'black')
                .attr('stroke_weight', 3)
        }); 

        // append x axis labels
        xAxisLabels.forEach(function(element){
            shotTypeChart.select('.shottypechart-axis-labels')
                .append('text')
                .text(function(d) {
                    return element;
                })
                .attr('stroke', 'black')
                .attr('text-anchor', 'middle')
                .attr('transform', function(d){
                    return "translate(" + String(xScale(element)+55.83) + ", " + (that.height - that.pad_bottom + 30)  +")";
                })
            });
       
        // append paint line
        let lineChart = d3.select('#shottypelinechart')
            .append('g')
            .attr('class', 'shottypechart-lines')
            .attr('width', that.width)
            .attr('height', that.height)

        for (let x = 0; x < fgaByType10_22.length - 1; x++) {
            let data = fgaByType10_22;
            lineChart
                .append('line')
                .attr('x1', 55.83 + xScale(data[x].year))
                .attr('y1', function(d) {
                    let v = data[x].paint / data[x].total
                    let y =  yScale(v);
                    return parseFloat(y);
                })
                .attr('x2', 55.83 + xScale(data[x+1].year))
                .attr('y2', function(d) {
                    let y =  yScale(data[x+1].paint / data[x+1].total);
                    return parseFloat(y);
                })
                .attr('stroke', 'blue')
        }
        
        // append mid line
        for (let x = 0; x < fgaByType10_22.length - 1; x++) {
            let data = fgaByType10_22;
            lineChart
                .append('line')
                .attr('x1', 55.83 + xScale(data[x].year))
                .attr('y1', function(d) {
                    let v = data[x].mid / data[x].total
                    let y =  yScale(v);
                    return parseFloat(y);
                })
                .attr('x2', 55.83 + xScale(data[x+1].year))
                .attr('y2', function(d) {
                    let y =  yScale(data[x+1].mid / data[x+1].total);
                    return parseFloat(y);
                })
                .attr('stroke', 'red')
        }
        
        // append 3 line
        for (let x = 0; x < fgaByType10_22.length - 1; x++) {
            let data = fgaByType10_22;
            lineChart
                .append('line')
                .attr('x1', 55.83 + xScale(data[x].year))
                .attr('y1', function(d) {
                    let v = data[x].three / data[x].total
                    let y =  yScale(v);
                    return parseFloat(y);
                })
                .attr('x2', 55.83 + xScale(data[x+1].year))
                .attr('y2', function(d) {
                    let y =  yScale(data[x+1].three / data[x+1].total);
                    return parseFloat(y);
                })
                .attr('stroke', 'green')
        }
        // append legend
        d3.select('#shottypelinechart')
            .append('rect')
            .attr('x', 700)
            .attr('y', 200)
            .attr('width', '15')
            .attr('height', '15')
            .attr('fill', 'blue')
        
        d3.select('#shottypelinechart')
            .append('text')
            .text("Paint")
            .attr('stroke', 'black')
            .attr('text-anchor', 'middle')
            .attr('transform',"translate(740, 212)")

        d3.select('#shottypelinechart')
            .append('rect')
            .attr('x', 700)
            .attr('y', 220)
            .attr('width', '15')
            .attr('height', '15')
            .attr('fill', 'red')

            d3.select('#shottypelinechart')
            .append('text')
            .text("Mid-Range")
            .attr('stroke', 'black')
            .attr('text-anchor', 'middle')
            .attr('transform',"translate(760, 233)")

        d3.select('#shottypelinechart')
            .append('rect')
            .attr('x', 700)
            .attr('y', 240)
            .attr('width', '15')
            .attr('height', '15')
            .attr('fill', 'green')

        d3.select('#shottypelinechart')
            .append('text')
            .text("Three Point")
            .attr('stroke', 'black')
            .attr('text-anchor', 'left')
            .attr('transform',"translate(722, 252)")    

        // append axis descriptions
        team_chart.append("text").attr('id', 't2')
            .style("font", "15px times")
            .style("text-anchor", "middle")
            .attr('x', 450)
            .attr('y', 740)
            .text('Current season(in months and year)')

        team_chart.append("text").attr('id', 't3')
            .style("font", "15px times")
            .style("text-anchor", "middle")
            .attr('x', 400)
            .attr('y', 10)
            .attr('transform', 'rotate(270 400 376)')
            .text('Team points from 3 pointers')
        
        // append title 
        d3.select('#shottypelinechart')
            .append('text')
            .text("Percentage of Shot Type Attempts by Season")
            .attr('stroke', 'black')
            .attr('text-anchor', 'middle')
            .attr('transform',"translate(450, 40)")
            .style("font", "25px times")


    }
}