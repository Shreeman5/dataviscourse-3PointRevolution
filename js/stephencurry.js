class TopFifty {
    /**
     * Creates a top Ten players Object
     */
    constructor(globalApplicationState) {
        // Import shotdata from 2010 to 2022
        this.shotdata10_22 = globalApplicationState.shotdata10_22;
        this.globalApplicationState  = globalApplicationState;

        // svg height
        this.height = 900;

        // svg width
        this.width = 1200;
        
        // svg padding
        this.pad_left = 80
        this.pad_right = 50
        this.pad_bottom = 220

        // First draw heatmap for season 2010-2011 dataset
        this.topFifty();
    }

    // linechart for top 10 scores across 12 seasons
    topFifty() {
        let that = this

        let map1 = new Map();

        map1.set('Ratio', [
            ['Stephen Curry', 11.42, 'images/stephencurry.png', 9660, 846, '2009-present', 'purple'], 
            ['Ray Allen', 6.86, 'images/rayallen.png', 8919, 1300, '1996-2014', '#3db042'],
            ['James Harden', 8.24, 'images/jamesharden.png', 7839, 951, '2009-present', '#0c230d'],
            ['Reggie Miller', 5.53, 'images/reggiemiller.png', 7680, 1389, '1996-2005', 'red'], 
            ['Kyle Korver', 5.97, 'images/kylekorver.png', 7350, 1232, '2003-2020', '#256a28'], 
            ['Vince Carter', 4.46, 'images/vincecarter.png', 6870, 1541, '1998-2020', '#256a28'], 
            ['Jason Terry', 4.86, 'images/jasonterry.png', 6846, 1410, '1999-2018', '#256a28'],
            ['Jamal Crawford', 5.02, 'images/jamalcrawford.png', 6663, 1327, '2000-2020', '#256a28'], 
            ['Damian Lillard', 9.06, 'images/damianlillard.png', 6540, 1327, '2012-present', '#0c230d'], 
            ['LeBron James', 4.72, 'images/lebronjames.png', 6504, 1379, '2003-present', '#0c230d'], 
            ['Paul Pierce', 4.79, 'images/paulpierce.png', 6429, 1343, '1998-2017', '#256a28'], 
            ['Kyle Lowry', 5.82, 'images/kylelowry.png', 6066, 1044, '2006-present', '#0c230d'], 
            ['Jason Kidd', 4.29, 'images/jasonkidd.png', 5964, 1391, '1996-2013', '#3db042'],
            ['Dirk Nowitzki', 3.91, 'images/dirknowitzki.png', 5946, 1522, '1998-2019', '#256a28'],
            ['Klay Thompson', 8.93, 'images/klaythompson.png', 5937, 665, '2011-present', '#0c230d'],
            ['Joe Johnson', 4.65, 'images/joejohnson.png', 5934, 1277, '2001-2022', '#256a28'],
            ['JJ Redick', 6.22, 'images/jjredick.png', 5850, 940, '2006-2021', '#256a28'],
            ['JR Smith', 5.93, 'images/jrsmith.png', 5790, 977, '2004-2020', '#256a28'],
            ['Paul George', 7.56, 'images/paulgeorge.png', 5691, 753, '2010-present', '#0c230d'],
            ['Chauncey Billups', 5.26, 'images/chaunceybillups.png', 5490, 1043, '1997-2014', '#3db042'],
            ['Kobe Bryant', 4.07, 'images/kobebryant.png', 5481, 1346, '1996-2016', '#3db042'],
            ['Kevin Durant', 5.64, 'images/kevindurant.png', 5418, 961, '2007-present', '#0c230d'],
            ['Wesley Matthews', 5.89, 'images/wesleymatthews.png', 5388, 914, '2009-present', '#0c230d'],
            ['Rashard Lewis', 5.11, 'images/rashardlewis.png', 5361, 1049, '1998-2014', '#3db042'],
            ['Eric Gordon', 6.97, 'images/ericgordon.png', 5340, 766, '2008-present', '#0c230d'],
            ['Peja Stojakovic', 6.57, 'images/pejastojakovic.png', 5280, 804, '1998-2011', '#3db042'],
            ['Carmelo Anthony', 4.12, 'images/carmeloanthony.png', 5193, 1260, '2003-2022', '#256a28'],
            ['Dale Ellis', 4.27, 'images/daleellis.png', 5157, 1209, '1983-2000', 'red'],
            ['Steve Nash', 4.15, 'images/stevenash.png', 5055, 1217, '1996-2015', '#3db042'],
            ['Kemba Walker', 6.73, 'images/kembawalker.png', 4989, 741, '2011-present', '#0c230d'],
            ['Jason Richardson', 5.63, 'images/jasonrichardson.png', 4824, 857, '2001-2015', '#3db042'],
            ['Trevor Ariza', 4.31, 'images/trevorariza.png', 4815, 1118, '2004-2022', '#256a28'],
            ['Mike Miller', 4.62, 'images/mikemiller.png', 4770, 1032, '2000-2017', '#256a28'],
            ['Danny Green', 5.72, 'images/dannygreen.png', 4683, 819, '2009-present', '#0c230d'],
            ['Glen Rice', 4.68, 'images/glenrice.png', 4677, 1000, '1989-2004', 'red'],
            ['Chris Paul', 3.99, 'images/chrispaul.png', 4659, 1165, '2005-present', '#0c230d'],
            ['Eddie Jones', 4.86, 'images/eddiejones.png', 4638, 954, '1994-2008', 'red'],
            ['Tim Hardaway', 5.34, 'images/timhardaway.png', 4626, 867, '1998-2003', 'red'],
            ['Nick Van Exel', 5.21, 'images/nickvanexel.png', 4584, 880, '1993-2006', 'red'],
            ['Mike Conley', 4.68, 'images/mikeconley.png', 4563, 975, '2007-present', '#0c230d'],
            ['Mike Bibby', 4.55, 'images/mikebibby.png', 4551, 1001, '1998-2012', '#3db042'],
            ['Kevin Love', 5.45, 'images/kevinlove.png', 4509, 828, '2008-present', '#0c230d'],
            ['Manu Ginobili', 4.24, 'images/manuginobili.png', 4485, 1057, '1995-2018', '#256a28'],
            ['Buddy Hield', 9.15, 'images/buddyhield.png', 4464, 488, '2016-present', '#0c230d'], 
            ['Nicolas Batum', 4.76, 'images/nicolasbatum.png', 4455, '2006-present', '#0c230d'],
            ['Patty Mills', 5.24, 'images/pattymills.png', 4404, 840, '2009-present', '#0c230d'],
            ['Bradley Beal', 6.65, 'images/bradleybeal.png', 4386, 660, '2012-present', '#0c230d'],
            ['Lou Williams', 3.89, 'images/louwilliams.png', 4371, 1123, '2005-2022', '#256a28'],
            ['Michael Finley', 3.95, 'images/michaelfinley.png', 4362, 1103, '1995-2010', 'red'],
            ['Danilo Gallinari', 5.88, 'images/danilogallinari.png', 4278, 728, '2004-present', '#0c230d'], 
            ['Kyrie Irving', 6.77, 'images/kyrieirving.png', 4230, 625, '2011-present', '#0c230d'],
            ['CJ McCollum', 6.96, 'images/cjmccollum.png', 4227, 607, '2013-present', '#0c230d']
    ]);

        let players = []
        let cases = []
        let full = []
        for (let [key, value] of map1) {
            value.forEach(function(element){
                players.push(element[0])
                cases.push(element[1])
                full.push([element[0], element[1], element[2], element[3], element[4], element[5], element[6]])
            })
        }
        // console.log(players)
        // console.log(full)

        

        // draw team line chart svg using the data obtained from data processing
        let team_chart = d3.select('#threepointrev')
            .attr('width', that.width)
            .attr('height', that.height)

        let xScale = d3.scalePoint().domain(players).range([this.pad_left, this.width - this.pad_right]);
        let xAxis = d3.axisBottom(xScale);
        team_chart.select("#x-axis").attr("transform", "translate(0," + (this.height - this.pad_bottom) + ")").call(xAxis)
        .selectAll("text").style("text-anchor", "end").style("font", "20px times")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")

        let yScale = d3.scaleLinear().domain([3, d3.max(cases)]).range([this.height - this.pad_bottom, 40]).nice();
        let yAxis = d3.axisLeft().scale(yScale);
        team_chart.select("#y-axis").attr("transform", "translate(" + this.pad_left + ",0)").call(yAxis)
        .selectAll("text")
        .style("font", "20px times")


        let lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(map1.keys())
        this.line = team_chart.select('#line')
            .selectAll('path')
            .data(map1)
            .join('path')
            .attr('fill', 'none')
            .attr('stroke', ([group, values]) => lineColorScale(group))
            .attr('stroke-width', 3)
            .attr('d', ([group, values]) => d3.line()
                .x((d) => xScale(d[0]))
                .y((d) => yScale(d[1]))
                (values)
            )
            .attr('id', 'line-paths-2');

        this.selectCircle = team_chart.selectAll(".circle").data(full)

        this.players = this.selectCircle.enter().append("circle")
            .attr("class", "circle")
            .attr("cx", function(d) {
                return xScale(d[0])
            })
            .attr("cy", function(d) {
                return yScale(d[1])
            })
            .attr("r", 10)
            .attr("fill", function(d){
                return d[6]
            })
        
        
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.players.on("mouseover", function(e, d) {
            tip.style("opacity", 5)
                .html("<img src='"+d[2]+"'width='200'height='200'></img> <br><span style='font-size: 20px;'>Player: "+d[0]+"</span> <br><span style='font-size: 20px;'>3 pointers total: "+d[3]+"</span><br> <span style='font-size: 20px;'>Total Games Played: "+d[4]+"</span> <br><span style='font-size: 20px;'>Ratio of above 2: "+d[1]+"</span> <br> <span style='font-size: 20px;'>Career: "+d[5]+"</span>")
                .style("left", (e.clientX - 40) + "px")
                .style("top", (e.clientY - 40) + "px")
            //d.style("stroke", "black")
        })//.classed("circle", true)
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })

        team_chart.append("text").attr('id', 't1')
        .style("font", "30px times")
        .style("text-anchor", "middle")
        .attr('x', this.width/2)
        .attr('y', 20)
        .text('Top 52 players(of all time) by 3 pointers scored')

        team_chart.append("text")
        .style("font", "25px times")
        .style("text-anchor", "middle")
        .attr('x', 400)
        .attr('y', 0)
        .attr('transform', 'rotate(270 400 376)')
        .text('Ratio of 3 pointers total by total games')

        team_chart.append("circle").attr("cx", 900).attr("cy", 30).attr("r", 10).attr("fill", 'purple')
        team_chart.append("circle").attr("cx", 900).attr("cy", 60).attr("r", 10).attr("fill", '#0c230d')
        team_chart.append("circle").attr("cx", 900).attr("cy", 90).attr("r", 10).attr("fill", '#256a28')
        team_chart.append("circle").attr("cx", 900).attr("cy", 120).attr("r", 10).attr("fill", '#3db042')
        team_chart.append("circle").attr("cx", 900).attr("cy", 150).attr("r", 10).attr("fill", 'red')

        team_chart.append("text").attr("x", 920).attr("y", 35).attr("fill", 'purple').text('STEPHEN CURRY THE G.O.A.T')
        team_chart.append("text").attr("x", 920).attr("y", 65).attr("fill", '#0c230d').text('ACTIVE PLAYER')
        team_chart.append("text").attr("x", 920).attr("y", 95).attr("fill", '#256a28').text('PLAYER RETIRED BETWEEN 2016-22')
        team_chart.append("text").attr("x", 920).attr("y", 125).attr("fill", '#3db042').text('PLAYER RETIRED BETWEEN 2010-16')
        team_chart.append("text").attr("x", 920).attr("y", 155).attr("fill", 'red').text('PLAYER RETIRED BEFORE 2010')

    }
}