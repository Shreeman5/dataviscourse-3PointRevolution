Hosted at: https://nickdejonge.github.io/

Video: https://vimeo.com/manage/videos/777913589

# What is in this repository?

The index.html file uses all the javascript files from the js folder as source scripts, the 
styles.css file as the stylesheet, all the image files from the images folder and the data files
from the SeparatedData subfolders(Heatmap Data and Linechart). There is also a process book that shows how we made our visualization. 

# How to use this repository?

Once you have cloned the repository in your working machine, navigate to the root of your 
local repository. To be able to access the data files with Javascript, you will need to 
serve the project directory, not just opening the HTML file in a browser. If your development environment doesn't provide a built-in server, use this command:

python -m http.server 8080

We used visual studio for coding. Open visual studio. On the left, you will notice the 
index.html file. Right click on it and one of the options is to "Open with live server".
Do that and a browser(Chrome, Firefox, Edge etc.) will open up. Give it 30 seconds, and 
our visualization will pop up. Instructions are given on the browser so that you will know
how to interact with the visualization and most importantly, learn what the project is about.
We would also recommend that you check our process book so that you can know how every
visualization came about in detail. This is a short summary:

This project uses data visualizations to demonstrate the prevalence of the three point shots in the modern NBA.

The heatmap in the top left corner maps three point shots taken in the season selected by the years dropdown above. The red hue visualizes the total number of shots made over the total number of shots attempted within each bin for the season selected. The line charts in the center column show the top teams and players in terms of points from three point shots for the selected season. By hovering over a line for a team or player, the heatmap automatically populates with that team or player's respective three pointer data. The reset heatmap button will reset the heatmap to show the league heatmap again for that season.

The chart on the far right shows the top 52 players of all time by 3 pointers scored and by hovering over a data point, a tooltip on the chart will show that players career statistics.

The chart on the bottom left shows the number of 3 pointers attempted rising over the last 10 years at the cost of mid-range shots.

The other 2 buttons above the heatmap can be clicked to bring up information on Steph Curry, considered the greatest three point shooter of all time, as well as information on the visualizations.

# Code documentation:

The index.html and styles.css file shows how our visualizations are structured. In summary, we declare each visualization as an svg(from the index.html file) and each svg is given a width and height(from the styles.css file). As mentioned before, the html file specifies the javascript files from the js folder as scripts. Additionally, the dropdowns and the buttons are declared in the html file as well, with their styles specified in the css file.

The script.js file is where we load the data, using javascript's async and await functionality which enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).After loading the data, we use the global variable globalApplicationState to keep records of our other javascript classes and what data we are feeding into them. Using this global variable, we start the visualization classes and feed data into them. Initially, we show data for the 2010-11 NBA season. Using the years dropdown(which is coded in the dataSelect function), we can see the heatmap and the middle line charts change to reflect that season. The bottom left and the far right visualizations are static throughout the 12 years of data we have to show. The reset heatmap function is coded using the getValue function. Then, we attach our overlays, which appear when the '3 Point Revolution' and 'Stephen Curry' buttons are clicked. Note that these overlays are not part of the html file. Rather, they are DOM element which appear when the buttons are clicked and disappear after the user clicks anywhere on the screen. 

The court.js file codes the court into the visualization. By it's very nature, it is static, in that, the court size does not change in the 12 years of data we have to show. The heatmap.js file codes the heatmap on top of the court. Using the information given on this website: https://datavizardry.com/2020/01/28/nba-shot-charts-part-1/, we specify the domain and range of the xScale and yScale variables. Each rectangle of the heatmap is coded in such a way that each rectangle has the information of attempted shots and made shots(lines 154-167). The rectangles are appended onto the screen and given colors(lines 33-34) using lines 171-198 of the code. Lines 219-539 are for the interactive part of this project. Essentially, when the middle line charts are used, lines 219-539 will work and show what player or team the user is hovering over. The legend for the heatmap is drawn using the drawLegend function. Lines 37-41 is standard bookkeeping when the user shifts from one season to the other. This is handy in the sense that when the code is first launched, it won't throw an error despite texts and rectangles not being on the screen. After the first visualization though, there are texts and rectangles on the screen. So, when the user switches to another season, the current season's visualization is deleted and replaced by the new season's visualization.

The playerInfo.js codes the top middle linechart into the visualization. Using d3.group, filter and map functionalities(lines 30-59), the 3 point data for the 10 best players that season is retrieved. then, using lines 76-108, the linechart is joined onto the screen. Due to the usage of the join functionality in line 96, bookkeeping is reduced such that when the next season is visualized, the previous season's visualization is automatically removed. Line 111 codes the interactivity part of the project. As you can recall, when the user hovers over a player, the heatmap for that player is filtered out and sent to the heatmap.js file. Line 108 exists in order to call the makeArrayBetter function(line 211-243) which fills in the dates from the start of the regular season until the final day of the season(which in NBA, is called Finals). Using the neededData variable from line 108, a moving line is constructed(lines 122-146), which shows the progression of the top 10 players that season for 3 pointers. Finally, the title of the player linechart is constructed using lines 149-178 and the axis labels are constructed using lines 193-207. Bookkeeping is done using lines 182-184, similar to the heatmap.js file.

The teamInfo.js file is literally the same as the playerInfo.js file(as far as coding and interaction is concerned), except that it shows information for the top 5 teams for 3 pointers that season. This file codes the bottom middle line chart.

The heatmap.js, playerInfo.js and teamInfo.js files use the globalApplicationState's shotdata10_22 parameter, which if examined on the script.js file(lines 4-15), tells us that the data files being used for this parameter are from the Heatmap Data folder. The 12 data files within this parameter are FG3A files, which only give information about 3 pointers attempted and made in a particular season.

The stephenCurry.js file codes the far right line chart but as mentioned before, this is a static chart. The data is declared from lines 31-84, the axes are defined from lines 99-115 and the linehcart(with no moving line) is defined from lines 118-131. Lines 137-161 exist such that when a circle is hovered over on the line chart, the player's career info(for 3 pointers) is shown using a tooltip. The title, axes labels and legend is coded from lines 164-189.

The shottype.js file uses the fgadata10_22 parameter(which contains the data files from the Linechart folder) of globalApplicationState. This file constructs the bottom left static linechart(with no moving line). The data is derived from lines 36-51 and the visualization is based off of that.








