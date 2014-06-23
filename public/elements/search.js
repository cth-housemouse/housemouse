// Search element Javascript

Polymer('search-element', { teller: 0, search: "", display: "", tagsList: "", sizedTagsList: "",
   ready: function() {

        console.log(opendata);

        for (var i = 0; i < opendata.length; i++) {
             opendata[i].tagscomma = opendata[i].tagscomma.split(", ");
        };

        this.tagsCounter();
        this.cloudGenerate();

   },

   // strict search in tags
   searchChanged: function() {
        this.displaySearch = [];
        this.teller = 0;     

        for (var i = 0; i < opendata.length; i++) {
             for (var s = 0; s < opendata[i].tagscomma.length; s++) {
                  if (opendata[i].tagscomma[s] === this.search) {
                       this.teller++;
                       var temp  = { hit: opendata[i].title };
                       this.displaySearch.push(temp); 
                  };

             };
        };     


   },

   tagsCounter: function() {

        // count the tags!

        this.tagsList = [];

        for (var i = 0; i < opendata.length; i++) {
             for (var s = 0; s < opendata[i].tagscomma.length; s++) {
                  
                  var tagsBolean = false;

                  if (this.tagsList.length == 0) {
                       var temp  = { text: opendata[i].tagscomma[s], size: 1 };
                       this.tagsList.push(temp);

                  } else {

                       for (var r = 0; r < this.tagsList.length; r++) {

                            if (opendata[i].tagscomma[s] == this.tagsList[r].text) {
                                 tagsBolean = true;
                                 this.tagsList[r].size++;
                                 //break;
                            }
                       };     

                       if (tagsBolean == false) {
                            var temp  = { text: opendata[i].tagscomma[s], size: 1 };
                            this.tagsList.push(temp);
                            //break;
                       }  
                            
                  }; 
                  
             };
        };

        // putting the biggest tag on top of the array

        var tagsListOrder = [];

        // The loop changes the length of the array. But I want it to completly empty out the array. This determines how often the loop will run, before the loop starts. 

        var tagsListLength = this.tagsList.length;

        for (var i = 0; i < tagsListLength; i++) {
             
             var highest = 0;

             for (var r = 0; r < this.tagsList.length; r++) { 
                  if (this.tagsList[r].size > highest) {
                       highest = this.tagsList[r].size;
                       highesthit = this.tagsList[r];
                       highestr = r;
                  }
             };
             tagsListOrder.push(highesthit);
             this.tagsList.splice(highestr,1);
        };

        this.tagsList = tagsListOrder;

   },
   
   cloudGenerate: function() {

        // Give the tags nice value's to be inputted to the D3 cloud generator, and run it.

        // Over here I really started to prefer encapsulation. Because the previous was accually already a pain to test, and functions are easily tested. Forced me to think in seperated codeblocks.

        function resizeArray(arrayToBeResized) {

             // Guys, my math sucks, but this does the job. Used a regression tool to get it.
             // y = 12.13158246 * ln(x) + 5 

             for (var i = 0; i < arrayToBeResized.length; i++) {
                  arrayToBeResized[i].size = 8.13158246 * Math.log(arrayToBeResized[i].size) + 5;
                  
             };

             return arrayToBeResized;
        };


        this.sizedTagsList = resizeArray(this.tagsList);

        // generate the wordcloud

        var fill = d3.scale.category20();

        // Self is important because 'this' means something else to the D3 object. D3 is quite full of itself. 

        selfWordCloud = this.shadowRoot.getElementById('wordCloudLive');

        d3.layout.cloud()
             .size([900, 600])
             .words(this.sizedTagsList)
             .padding(1)
             .rotate(0)
             .font("Impact")
             .fontSize(function(d) { return d.size; })
             .on("end", draw)
             .start();

        function draw(words) {

             d3.select(selfWordCloud)
                  .append("svg")
                  .attr("width", 900)
                  .attr("height", 600)
                  .append("g")
                  .attr("transform", "translate(450,300)")
                  .selectAll("text")
                  .data(words)
                  .enter().append("text")
                  .style("font-size", function(d) { return d.size + "px"; })
                  .style("font-family", "Impact")
                  .style("fill", function(d, i) { return fill(i); console.log(i);})
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
             .text(function(d) { return d.text; });
          }


   }                    
});