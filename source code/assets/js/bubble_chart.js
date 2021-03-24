function CreateBubble(dict) {
    var dataset = {
        "children":
            dict
    };
    ////console.log(dict);
    var cont_height = $('.wrapper').height() / 3.4;
    var cont_width = $('.bubble_container').width();




    //console.log(cont_height);
    //console.log(cont_width)
    var diameter = 800;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
        .size([cont_width, cont_height])
    // .padding(1.5);
    d3.select('#bubble_chart').selectAll("*").remove();
    var svg = d3.select("#bubble_chart")
        .append("svg")
        .attr("width", cont_width)
        .attr("height", cont_height)
        .attr("class", "bubble")
        .call(
            d3.behavior.zoom()
                .scaleExtent([1, 10])
                .on("zoom", zoom)
        )
        .append("g");

    var nodes = d3.hierarchy(dataset)
        .sum(function (d) { return d.Count; });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            ////console.log(d,d.children)
            return !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function (d) {
            return d.data.Name;
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {
            return color(i);
        });

    node.append("text")
        // .attr("dy", -20)
        .attr("dx", -5)
        .style("text-anchor", "middle")

        .text(function (d) {
            return d.data.Name.substring(0, d.r);
        })
        .call(wrap, 100)
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    // node.append("text")
    //     .attr("dy", "1.3em")
    //     .style("text-anchor", "middle")
    //     .text(function(d) {
    //         return d.data.Count;
    //     })
    //     .attr("font-family",  "Gill Sans", "Gill Sans MT")
    //     .attr("font-size", function(d){
    //         return d.r/5;
    //     })
    //     .attr("fill", "white");

    // d3.select(self.frameElement)
    //     .style("height", diameter + "px");
    //console.log(cont_height);
    //console.log(cont_width)
    d3.selectAll(".node")
        .on("click", function (d, i) {
            var current_selected_disease = d.data.Name;
            ////console.log(current_selected_disease);
            SentimentalAnalysis(current_selected_disease);
            // console.log("hello")

            current_selected_disease_replaced = current_selected_disease.replace(", ", ",");

            update_line_chart(current_selected_disease_replaced);

        })
        .on("mouseover", function (d, i) {
            ////console.log(d.data.Name);

            d3.select(this).select("circle").transition().duration(600).attr("r", 50);

            d3.select(this).select("text").transition().duration(600).attr("font-size", function (d) {
                return d.r / 2.5;
            })



        })
        .on("mouseout", function (d, i) {
            d3.select(this).select("circle").transition().duration(300).attr("r", d.r);
            d3.select(this).select("text").transition().duration(300).attr("font-size", function (d) {
                return d.r / 5;
            })


        });
    function zoom() {
        svg.attr("transform", "translate("
            + d3.event.translate
            + ")scale(" + d3.event.scale + ")");
    }

}


function wrap(text, width) {
    text.each(function () {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 0, // ems
            x = text.attr("x") + 5,
            y = text.attr("y"),
            dy = 1,
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}
function wrap2(text, width) {
    text.each(function () {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1, // ems
            x = text.attr("x") + 10,
            y = text.attr("y") + 25,
            dy = 2,
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}