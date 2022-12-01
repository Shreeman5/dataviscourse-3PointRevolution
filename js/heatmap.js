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
        this.drawHeatmap(this.shotdata10_22[0], "");
    }

    // Draws heatmap with given dataset
    drawHeatmap(shotdata, receivedString) {
        let that = this;
        
        // colorscale uses red hue
        let colorScale = d3.scaleSequential(d3.interpolateReds)
            .domain([0, 1]);

        // Remove old rectangles
        d3.select('#heatmap').selectAll('rect').remove();
        d3.select('#heatmap').select('g').remove();
        d3.select('#heatmap').selectAll('text').remove();
        d3.select('#heatmap').select('#t1').remove()
        d3.select('#heatmap').select('#t2').remove()


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

        
        shots.append("text")
        .style("font", "25px times")
        //.style("font-family", "Arvo")
        .style("text-anchor", "middle")
        .attr('x', 400)
        .attr('y', 720)
        .attr('transform', 'rotate(180 400 376)')
        .text(receivedString)
        
        
        console.log(receivedString)
        let path1
        let path2
        if (receivedString === 'Ray Allen'){
            path1 = 'images/rayallen.png'
            path2 = 'images/bostonceltics.png'
        }else if (receivedString === 'Jason Richardson'){
            //Orlando Magic
            path1 = 'images/jasonrichardson.png'
            path2 = 'images/orlandomagic.png'
        }else if (receivedString === 'Dorell Wright'){
            //Golden State Warriors
            path1 = 'images/dorellwright.png'
            path2 = 'images/goldenstatewarriors.png'
        }else if (receivedString === 'Kevin Durant'){
            //Oklahoma City Thunder
            path1 = 'images/kevindurant.png'
            path2 = 'images/oklahomacitythunder.png'
        }else if (receivedString === 'Kevin Martin'){
            //Houston Rockets
            path1 = 'images/kevinmartin.png'
            path2 = 'images/houstonrockets.png'
        }else if (receivedString === 'Jason Kidd'){
            //Dallas Mavericks
            path1 = 'images/jasonkidd.png'
            path2 = 'images/dallasmavericks.png'
        }else if (receivedString === 'Channing Frye'){
            //Phoenix Suns
            path1 = 'images/channingfrye.png'
            path2 = 'images/phoenixsuns.png'
        }else if (receivedString === 'Mike Bibby'){
            //Miami Heat
            path1 = 'images/mikebibby.png'
            path2 = 'images/miamiheat.png'
        }else if (receivedString === 'Jason Terry'){
            //Dallas Mavericks
            path1 = 'images/jasonterry.png'
            path2 = 'images/dallasmavericks.png'
        }else if (receivedString === 'Danny Granger'){
            //Indiana pacers
            path1 = 'images/dannygranger.png'
            path2 = 'images/indianapacers.png'
        }else if (receivedString === 'Ryan Anderson'){
            path1 = 'images/ryananderson.png'
            let selectElement = document.getElementById('dataset-select');
            let output = selectElement.value
            if (output === '1'){
                //Orlando Magic
                path2 = 'images/orlandomagic.png'
            }else if (output === '2'){
                //New Orleans Pelicans
                path2 = 'images/neworleanspelicans.png'
            }else if (output === '6'){
                //Houston Rockets
                path2 = 'images/houstonrockets.png'
            }
        }else if (receivedString === 'James Harden'){
            path1 = 'images/jamesharden.png'
            let selectElement = document.getElementById('dataset-select');
            let output = selectElement.value
            if (output === '1'){
                //Oklahoma City Thunder
                path2 = 'images/oklahomacitythunder.png'
            }else{
                //Houston Rockets
                path2 = 'images/houstonrockets.png'
            }
        }else if (receivedString === 'Randy Foye'){
            //Los Angeles Clippers
            path1 = 'images/randyfoye.png'
            path2 = 'images/laclippers.png'
        }else if (receivedString === 'Steve Novak'){
            //New York Knicks
            path1 = 'images/stevenovak.png'
            path2 = 'images/newyorkknicks.png'
        }else if (receivedString === 'Joe Johnson'){
            //Atlanta Hawks
            path1 = 'images/joejohnson.png'
            path2 = 'images/atlantahawks.png'
        }else if (receivedString === 'Mario Chalmers'){
            //Miami Heat
            path1 = 'images/mariochalmers.png'
            path2 = 'images/miamiheat.png'
        }else if (receivedString === 'Stephen Curry'){
            //Golden State Warriors
            path1 = 'images/stephencurry.png'
            path2 = 'images/goldenstatewarriors.png'
        }else if (receivedString === 'Klay Thompson'){
            //Golden State Warriors
            path1 = 'images/klaythompson.png'
            path2 = 'images/goldenstatewarriors.png'
        }else if (receivedString === 'Danny Green'){
            //San Antonion Spurs
            path1 = 'images/dannygreen.png'
            path2 = 'images/sanantoniospurs.png'
        }else if (receivedString === 'Paul George'){
            path1 = 'images/paulgeorge.png'
            let selectElement = document.getElementById('dataset-select');
            let output = selectElement.value
            if (output === '2' || output === '3' || output === '5'){
                //Indiana Pacers
                path2 = 'images/indianapacers.png'
            }else if (output === '7' || output === '8'){
                //Oklahoma City Thunder
                path2 = 'images/oklahomacitythunder.png'
            }else if (output === '10'){
                //Los Angeles Clippers
                path2 = 'images/laclippers.png'
            }
        }else if (receivedString === 'Kyle Korver'){
            //Atlanta Hawks
            path1 = 'images/kylekorver.png'
            path2 = 'images/atlantahawks.png'
        }else if (receivedString === 'Deron Williams'){
            //New Jersey Nets
            path1 = 'images/deronwilliams.png'
            path2 = 'images/newjerseynets.png'
        }else if (receivedString === 'Damian Lillard'){
            //Portland Trail Blazers
            path1 = 'images/damianlillard.png'
            path2 = 'images/portlandtrailblazers.png'
        }else if (receivedString === 'Brandon Jennings'){
            //Milwaukee Bucks
            path1 = 'images/brandonjennings.png'
            path2 = 'images/milwaukeebucks.png'
        }else if (receivedString === 'Wesley Matthews'){
            //Portland Trail Blazers
            path1 = 'images/wesleymatthews.png'
            path2 = 'images/portlandtrailblazers.png'
        }else if (receivedString === 'Kyle Lowry'){
            //Toronto Raptors
            path1 = 'images/kylelowry.png'
            path2 = 'images/torontoraptors.png'
        }else if (receivedString === 'Trevor Ariza'){
            path1 = 'images/trevorariza.png'
            let selectElement = document.getElementById('dataset-select');
            let output = selectElement.value
            if (output === '3'){
                //Washington Wizards
                path2 = 'images/washingtonwizards.png'
            }else{
                //Houston Rockets
                path2 = 'images/houstonrockets.png'
            }
        }else if (receivedString === 'Gerald Green'){
            //Phoenix Suns
            path1 = 'images/geraldgreen.png'
            path2 = 'images/phoenixsuns.png'
        }else if (receivedString === 'JJ Redick'){
            path1 = 'images/jjredick.png'
            let selectElement = document.getElementById('dataset-select');
            let output = selectElement.value
            if (output === '4' || output === '5'){
                //Los Angeles Clippers
                path2 = 'images/laclippers.png'
            }else{
                //Philadelphia 76ers
                path2 = 'images/philadelphia.png'
            }
        }else if (receivedString === 'JR Smith'){
            path1 = 'images/jrsmith.png'
            let selectElement = document.getElementById('dataset-select');
            let output = selectElement.value
            if (output === '4'){
                //New York Knicks
                path2 = 'images/newyorkknicks.png'
            }else{
                //Cleveland Cavaliers
                path2 = 'images/clevelandcavaliers.png'
            }
        }else if (receivedString === 'Kyrie Irving'){
            //Cleveland Cavaliers
            path1 = 'images/kyrieirving.png'
            path2 = 'images/clevelandcavaliers.png'
        }else if (receivedString === 'CJ McCollum'){
            //Portland Trail Blazers
            path1 = 'images/cjmccollum.png'
            path2 = 'images/portlandtrailblazers.png'
        }else if (receivedString === 'Isaiah Thomas'){
            //Boston Celtics
            path1 = 'images/isaiahthomas.png'
            path2 = 'images/bostonceltics.png'
        }else if (receivedString === 'Eric Gordon'){
            //Houston Rockets
            path1 = 'images/ericgordon.png'
            path2 = 'images/houstonrockets.png'
        }else if (receivedString === 'Bradley Beal'){
            //Washington Wizards
            path1 = 'images/bradleybeal.png'
            path2 = 'images/washingtonwizards.png'
        }else if (receivedString === 'Kemba Walker'){
            path1 = 'images/kembawalker.png'
            let selectElement = document.getElementById('dataset-select');
            let output = selectElement.value
            if (output === '9'){
                //Boston Celtics
                path2 = 'images/bostonceltics.png'
            }else{
                //Charlotte Bobcats
                path2 = 'images/charlottebobcats.png'
            }
        }else if (receivedString === 'Joe Ingles'){
            //Utah Jazz
            path1 = 'images/joeingless.png'
            path2 = 'images/utahjazz.png'
        }else if (receivedString === 'Wayne Ellington'){
            //Miami Heat
            path1 = 'images/wayneellington.png'
            path2 = 'images/miamiheat.png'
        }else if (receivedString === 'Buddy Hield'){
            //Sacramento Kings
            path1 = 'images/buddyhield.png'
            path2 = 'images/sacramentokings.png'
        }else if (receivedString === 'D\'Angelo Russell'){
            //Brooklyn Nets
            path1 = 'images/dangelorussell.png'
            path2 = 'images/brooklynnets.png'
        }else if (receivedString === 'Duncan Robinson'){
            //Miami Heat
            path1 = 'images/duncanrobinson.png'
            path2 = 'images/miamiheat.png'
        }else if (receivedString === 'Jayson Tatum'){
            //Boston Celtics
            path1 = 'images/jaysontatum.png'
            path2 = 'images/bostonceltics.png'
        }else if (receivedString === 'Tim Hardaway Jr.'){
            //Dallas Mavericks
            path1 = 'images/timhardawyjr.png'
            path2 = 'images/dallasmavericks.png'
        }else if (receivedString === 'Devonte\' Graham'){
            //Charlotte Hornets
            path1 = 'images/devontegraham.png'
            path2 = 'images/charlottehornets.png'
        }else if (receivedString === 'Donovan Mitchell'){
            //Utah Jazz
            path1 = 'images/donovanmitchell.png'
            path2 = 'images/utahjazz.png'
        }else if (receivedString === 'Joe Harris'){
            //Brooklyn Nets
            path1 = 'images/joeharris.png'
            path2 = 'images/brooklynnets.png'
        }else if (receivedString === 'Jordan Clarkson'){
            //Utah Jazz
            path1 = 'images/jordanclarkson.png'
            path2 = 'images/utahjazz.png'
        }else if (receivedString === 'Luka Doncic'){
            //Dallas Mavericks
            path1 = 'images/lukadoncic.png'
            path2 = 'images/dallasmavericks.png'
        }else if (receivedString === 'Desmond Bane'){
            //Memphis Grizzlies
            path1 = 'images/desmondbane.png'
            path2 = 'images/memphisgrizzlies.png'
        }else if (receivedString === 'Jordan Poole'){
            //Golden State Warriors
            path1 = 'images/jordanpoole.png'
            path2 = 'images/goldenstatewarriors.png'
        }else if (receivedString === 'Fred VanVleet'){
            //Toronto Raptors
            path1 = 'images/fredvanvleet.png'
            path2 = 'images/torontoraptors.png'
        }else if (receivedString === 'Malik Beasley'){
            //Minnesota Timberwolves
            path1 = 'images/malikbeasley.png'
            path2 = 'images/minnesotatimberwolves.png'
        }
        
        else if (receivedString === 'Orlando Magic'){
            path1 = 'images/orlandomagic.png'
        }else if (receivedString === 'New York Knicks'){
            path1 = 'images/newyorkknicks.png'
        }else if (receivedString === 'Phoenix Suns'){
            path1 = 'images/phoenixsuns.png'
        }else if (receivedString === 'San Antonio Spurs'){
            path1 = 'images/sanantoniospurs.png'
        }else if (receivedString === 'Dallas Mavericks'){
            path1 = 'images/dallasmavericks.png'
        }else if (receivedString === 'Los Angeles Clippers'){
            path1 = 'images/laclippers.png'
        }else if (receivedString === 'Oklahoma City Thunder'){
            path1 = 'images/oklahomacitythunder.png'
        }else if (receivedString === 'Houston Rockets'){
            path1 = 'images/houstonrockets.png'
        }else if (receivedString === 'Miami Heat'){
            path1 = 'images/miamiheat.png'
        }else if (receivedString === 'Golden State Warriors'){
            path1 = 'images/goldenstatewarriors.png'
        }else if (receivedString === 'Atlanta Hawks'){
            path1 = 'images/atlantahawks.png'
        }else if (receivedString === 'Portland Trail Blazers'){
            path1 = 'images/portlandtrailblazers.png'
        }else if (receivedString === 'Cleveland Cavaliers'){
            path1 = 'images/clevelandcavaliers.png'
        }else if (receivedString === 'Boston Celtics'){
            path1 = 'images/bostonceltics.png'
        }else if (receivedString === 'Toronto Raptors'){
            path1 = 'images/torontoraptors.png'
        }else if (receivedString === 'Milwaukee Bucks'){
            path1 = 'images/milwaukeebucks.png'
        }else if (receivedString === 'Utah Jazz'){
            path1 = 'images/utahjazz.png'
        }else if (receivedString === 'LA Clippers'){
            path1 = 'images/laclippers.png'
        }else if (receivedString === 'Minnesota Timberwolves'){
            path1 = 'images/minnesotatimberwolves.png'
        }
        
        shots.append("svg:image").attr('id', 't1')
            .style("text-anchor", "middle")
            .attr('x', 350)
            .attr('y', 340)
            .attr('transform', 'rotate(180 400 376)')
            .attr('width', 100)
            .attr('height', 100)
            .attr("xlink:href", path1 )

        shots.append("svg:image").attr('id', 't2')
            .style("text-anchor", "middle")
            .attr('x', 350)
            .attr('y', 460)
            .attr('transform', 'rotate(180 400 376)')
            .attr('width', 100)
            .attr('height', 100)
            .attr("xlink:href", path2)

    }
}