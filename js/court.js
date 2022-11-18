class Court {
    /**
     * Creates a Court Object
     */
    constructor() {
        // Dimensions of NBA regulation basketball court
        // dimensions, appendArcPath() and drawCourt() derived from MIT Open source LICENSE
        // https://github.com/virajsanghvi/d3.basketball-shot-chart/blob/master/LICENSE
        this.dimensions = {
            // svg height
            height: 752,

            // svg width
            width: 800,

            // basketball hoop diameter (ft)
            basketDiameter: 1.5,

            // distance from baseline to backboard (ft)
            basketProtrusionLength: 4,

            // backboard width (ft)
            basketWidth: 6,

            // full length of basketball court (ft)
            courtLength: 94,

            // full width of basketball court (ft)
            courtWidth: 50,

            // distance from baseline to free throw line (ft)
            freeThrowLineLength: 19,

            // radius of free throw line circle (ft)
            freeThrowCircleRadius: 8,

            // width of key marks (dashes on side of the paint) (ft)
            keyMarkWidth: .5,

            // width the key (paint) (ft)
            keyWidth: 16,

            // radius of restricted circle (ft)
            restrictedCircleRadius: 4,

            // distance from baseline where three point line becomes circular (ft)
            threePointCutoffLength: 14,

            // distance of three point line from basket (ft)
            threePointRadius: 23.75,

            // distance of corner three point line from basket (ft)
            threePointSideRadius: 22, 

            // width of key marks (dashes on side of the paint) (ft)
            keyMarkWidth: .5,
        }

        // Draw Court
        this.drawCourt();
    }

    // Arc path helper function
    appendArcPath(base, radius, startAngle, endAngle) {
        var points = 30;

        var angle = d3.scaleLinear()
            .domain([0, points - 1])
            .range([startAngle, endAngle]);

        var line = d3.lineRadial()
            .radius(radius)
            .angle(function(d, i) {
                return angle(i);
            });

        return base.append('path').datum(d3.range(points))
            .attr('d', line);
      }

    // Draws half length basketball court with outline 
    drawCourt(){
        var courtWidth = this.dimensions.courtWidth,
            courtLength = this.dimensions.courtLength,
            keyWidth = this.dimensions.keyWidth,
            threePointRadius = this.dimensions.threePointRadius,
            threePointSideRadius = this.dimensions.threePointSideRadius, 
            threePointCutoffLength = this.dimensions.threePointCutoffLength,
            freeThrowLineLength = this.dimensions.freeThrowLineLength,
            freeThrowCircleRadius = this.dimensions.freeThrowCircleRadius,
            basketProtrusionLength = this.dimensions.basketProtrusionLength,
            basketDiameter = this.dimensions.basketDiameter,
            basketWidth = this.dimensions.basketWidth,
            keyMarkWidth = this.dimensions.keyMarkWidth,
            width = this.dimensions.width,
            height = this.dimensions.height;

        let visibleCourtLength = courtLength/2;

        var base = d3.select('#court')
            .attr('width', width)
            .attr('viewBox', '0 0 ' + courtWidth + ' ' + visibleCourtLength)
            .append('g')
            .attr('class', 'shotmap-court');

        base.attr('height', height);
                         
        base.append('rect')
            .attr('class', 'shotmap-court-outline')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', courtWidth)
            .attr('height', visibleCourtLength);

        base.append('rect')
            .attr('class', 'shotmap-court-key')
            .attr('x', (courtWidth / 2 - keyWidth / 2))
            .attr('y', (visibleCourtLength - freeThrowLineLength))
            .attr('width', keyWidth)
            .attr('height', freeThrowLineLength);
  
        base.append('line')
            .attr('class', 'shotmap-court-baseline')
            .attr('x1', 0)
            .attr('y1', visibleCourtLength)
            .attr('x2', courtWidth)
            .attr('y2', visibleCourtLength);
                
        var tpAngle = Math.atan(threePointSideRadius / 
            (threePointCutoffLength - basketProtrusionLength - basketDiameter/2));

        this.appendArcPath(base, threePointRadius, -1 * tpAngle, tpAngle)
            .attr('class', 'shotmap-court-3pt-line')
            .attr('transform', 'translate(' + (courtWidth / 2) + ', ' + 
                (visibleCourtLength - basketProtrusionLength - basketDiameter / 2) + 
                ')');
           
        [1, -1].forEach(function (n) {
            base.append('line')
                .attr('class', 'shotmap-court-3pt-line')
                .attr('x1', courtWidth / 2 + threePointSideRadius * n)
                .attr('y1', visibleCourtLength - threePointCutoffLength)
                .attr('x2', courtWidth / 2 + threePointSideRadius * n)
                .attr('y2', visibleCourtLength);
        });
                                                                  
        this.appendArcPath(base, freeThrowCircleRadius, -1 * Math.PI/2, Math.PI/2)
            .attr('class', 'shotmap-court-ft-circle-top')
            .attr('transform', 'translate(' + (courtWidth / 2) + ', ' + 
                (visibleCourtLength - freeThrowLineLength) + ')');
                                                            
        this.appendArcPath(base, freeThrowCircleRadius, Math.PI/2, 1.5 * Math.PI)
            .attr('class', 'shotmap-court-ft-circle-bottom')
            .attr('transform', 'translate(' + (courtWidth / 2) + ', ' + 
                (visibleCourtLength - freeThrowLineLength) + ')');
  
        [7, 8, 11, 14].forEach(function (mark) {
            [1, -1].forEach(function (n) {
                base.append('line')
                    .attr('class', 'shotmap-court-key-mark')
                    .attr('x1', courtWidth / 2 + keyWidth / 2 * n + keyMarkWidth * n)
                    .attr('y1', visibleCourtLength - mark)
                    .attr('x2', courtWidth / 2 + keyWidth / 2 * n)
                    .attr('y2', visibleCourtLength - mark)
          });
        });    
  
        base.append('line')
            .attr('class', 'shotmap-court-backboard')
            .attr('x1', courtWidth / 2 - basketWidth / 2)
            .attr('y1', visibleCourtLength - basketProtrusionLength)
            .attr('x2', courtWidth / 2 + basketWidth / 2)
            .attr('y2', visibleCourtLength - basketProtrusionLength)
                                       
        base.append('circle')
            .attr('class', 'shotmap-court-hoop')
            .attr('cx', courtWidth / 2)
            .attr('cy', visibleCourtLength - basketProtrusionLength - basketDiameter / 2)
            .attr('r', basketDiameter / 2)
      }
}
