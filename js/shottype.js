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
        this.width = 800;

        // call draw function
        this.drawShotTypeChart(this.fgadata10_22)
    }

    drawShotTypeChart(fgadata10_22){
        let fgaByType10_11 = d3.group(fgadata10_22[0], d=> d.SHOT_ZONE_BASIC)
        console.log(fgaByType10_11);

        // divide data by shot type:
        let fgaByType10_22 = [];
        let stats = {};
        let paint = 0, mid = 0, three = 0, total = 0;
        for (const season of fgadata10_22) {
            season.forEach(function(d) {
                // Paint 
                if (d.SHOT_ZONE_BASIC == "Restricted Area" || d.SHOT_ZONE_BASIC == "In The Paint (Non-RA)"){
                    //console.log(d)
                    paint++;
                }
                // Midrange
                else if (d.SHOT_ZONE_BASIC == "Mid-Range"){
                    //console.log(d)
                    mid++;
                }
                // 3 pointer
                else if (d.SHOT_ZONE_BASIC == "Right Corner 3" || d.SHOT_ZONE_BASIC == "Left Corner 3"
                      || d.SHOT_ZONE_BASIC == "Backcourt" || d.SHOT_ZONE_BASIC == "Above the Break 3"){
                    //console.log(d)
                    three++;
                }
            });
            // save season stats 
            total = paint + mid + three;
            stats = {paint: paint, mid: mid, three: three, total: total}
            fgaByType10_22.push(stats);
            stats = {};
            paint = 0, mid = 0, three = 0, total = 0;
        }
        console.log(fgaByType10_22)
    }
}