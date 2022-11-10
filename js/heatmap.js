class Heatmap {
    /**
     * Creates a Heatmap Object
     */
    constructor(globalApplicationState) {
        // Import shotdata from 2010 to 2022
        this.shotdata10_22 = globalApplicationState.shotdata10_22;

        // First draw heatmap for entire dataset
        this.drawHeatmap(this.shotdata10_22);
    }

    // Draws heatmap with given dataset
    drawHeatmap(data) {
        console.log(data)
        return
    }
}