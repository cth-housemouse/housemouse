// Search element Javascript

Polymer('search-element', { teller: 0, search: "", displaySearch: "", tagsList: "",
   ready: function() {

        console.log(opendata);
        var openDataTags = [];

        for (var i = 0; i < opendata.length; i++) {
             opendata[i].tagscomma = opendata[i].tagscomma.split(", ");
        };


        for (var i = 0; i < opendata.length; i++) {
             for (var s = 0; s < opendata[i].tagscomma.length; s++) {
                openDataTags.push(opendata[i].tagscomma[s])
             };
        };     

        console.log(openDataTags); 

        this.tagsList = this.tagsCounter(openDataTags);

        //this.cloudGenerate(this.tagsList);
        this.generateForceGraph();



   },

   // strict search in tags
   searchChanged: function() {
        this.displaySearch = [];
        this.teller = 0;     
        this.tagsList =[];

        for (var i = 0; i < opendata.length; i++) {
             for (var s = 0; s < opendata[i].tagscomma.length; s++) {
                  if (opendata[i].tagscomma[s] === this.search) {
                      this.teller++;
                      var temp  = { hit: opendata[i].title, link: opendata[i].url};
                      this.displaySearch.push(temp);
                       
                      for (var r = 0; r < opendata[i].tagscomma.length; r++) {
                            this.tagsList.push(opendata[i].tagscomma[r]);
                      }
                  }

             };
        };         

        console.log(this.tagsList)
        this.tagsList = this.tagsCounter(this.tagsList);
        if (this.tagsList.length != 0) {
        this.cloudGenerate();
        }
   },

   tagsCounter: function(tags) {

        // count the tags!

        var proccesedTags = [];

        for (var i = 0; i < tags.length; i++) {
                  
                  var tagsBolean = false;

                  if (proccesedTags.length == 0) {
                       var temp  = { text: tags[i], size: 1 };
                       proccesedTags.push(temp);

                  } else {

                       for (var r = 0; r < proccesedTags.length; r++) {

                            if (tags[i] == proccesedTags[r].text) {
                                 tagsBolean = true;
                                 proccesedTags[r].size++;
                            }
                       };     

                       if (tagsBolean == false) {
                            var temp  = { text: tags[i], size: 1 };
                            proccesedTags.push(temp);
                       }   
                  
             };
        };

        // putting the biggest tag on top of the array

        var proccesedTagsOrder = [];

        // The loop changes the length of the array. But I want it to completly empty out the array. This determines how often the loop will run, before the loop starts. 

        var proccesedTagsLength = proccesedTags.length;

        for (var i = 0; i < proccesedTagsLength; i++) {
             
             var highest = 0;

             for (var r = 0; r < proccesedTags.length; r++) { 
                  if (proccesedTags[r].size > highest) {
                       highest = proccesedTags[r].size;
                       highesthit = proccesedTags[r];
                       highestr = r;
                  }
             };
             proccesedTagsOrder.push(highesthit);
             proccesedTags.splice(highestr,1);
        };

        proccesedTags = proccesedTagsOrder;

        return proccesedTags;
   },
   
   cloudGenerate: function(arrayToBeClouded) {

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


        var sizedTagsList = resizeArray(arrayToBeClouded);

        
        // Self is important because 'this' means something else to the D3 object. D3 is quite full of itself.
        selfWordCloud = this.shadowRoot.getElementById('wordCloudLive');

        // generate the wordcloud 

        var fill = d3.scale.category20();

        d3.layout.cloud()
             .size([900, 600])
             .words(sizedTagsList)
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


   },

   queryInput: function(query) {
    console.log(query);
      this.search = query;
   },

   home: function () {
    this.queryInput('wonen')
   },
   globe: function () {
    this.queryInput('aardrijkskunde')
   },
   personIcon: function () {
    this.queryInput('ocw')
   },
   nature: function () {
    this.queryInput('environment')
   },
   money: function () {
    this.queryInput('begroting')
   },
   road: function () {
    this.queryInput('transportation')
   },

   generateForceGraph: function () {
        // Generating the neccecairy linking data. 

        for (var i = 0; i < opendata.length; i++) {
             for (var s = 0; s < opendata[i].tagscomma.length; s++) {
                openDataTags.push(opendata[i].tagscomma[s])

             };
        }; 

















        var width = 960,
            height = 800;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(80)
            .size([width, height]);


        // Destroying D3's sense of identity    
        selfForceGraph = this.shadowRoot.getElementById('forceGraph');      
        console.log(d3.select(selfForceGraph));


        var svg = d3.select(selfForceGraph).append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("elements/miserables.json", function(error, graph) {
          force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();

          var link = svg.selectAll(".link")
              .data(graph.links)
            .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });

          var node = svg.selectAll(".node")
              .data(graph.nodes)
            .enter().append("circle")
              .attr("class", "node")
              .attr("r", 10 )
              .style("fill", function(d) { return color(d.group); })
              .call(force.drag);

          node.append("title")
              .text(function(d) { return d.name; });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

          node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
  });
});
   }


});