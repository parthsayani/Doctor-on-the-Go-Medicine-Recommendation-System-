function CreateCircles(top3med) {

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var colour = d3.scaleOrdinal(d3.schemeCategory20);
    var medicines_array = [];
    for (var i = 0; i < top3med.length; i++) {
        medicines_array.push(top3med[i].med);
    }
   
    var width = $('#circles').width(),
        height = $('.wrapper').height() / 3;
    
    if (top3med.length == 1) {
        //console.log("Hello1");
        json = {
            "nodes": [
                { "x": width / 2, "r": 40, "label": medicines_array[0] },
            ]
        }
    }
    else if (top3med.length == 2) {
        //console.log("Hello2");
        json = {
            "nodes": [
                { "x": width / 2.8, "r": 40, "label": medicines_array[0] },
                { "x": width / 1.5, "r": 40, "label": medicines_array[1] }
            ]
        }
    }
    else if (top3med.length == 3) {
        //console.log("Hello3");
        json = {
            "nodes": [
                { "x": width / 4.3, "r": 40, "label": medicines_array[0] },
                { "x": width / 1.9, "r": 40, "label": medicines_array[1] },
                { "x": width / 1.2, "r": 40, "label": medicines_array[2] }
            ]
        }
    }
    //console.log(json);
    d3.select('#circles').selectAll("*").remove();


    var svg = d3.select("#circles").append("svg")
        .attr("width", width)
        .attr("height", height)


    /* Define the data for the circles */
    var elem = svg.selectAll("g myCircleText")
        .data(json.nodes)
    /*Create and place the "blocks" containing the circle and the text */
    var elemEnter = elem.enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + d.x + ",80)" })

    /*Create the circle for each block */
    var circle = elemEnter.append("circle")
        .attr("r", function (d) { return d.r })
        .attr("stroke", function (d, i) { return colour(i); })
        .attr("fill", function (d, i) { return color(i); })

    var name_med = elemEnter.append("text")
        .attr("dx", function (d) {
            return -50 * d.label.length / 60;
        })
        .attr("dy", function (d) { return 80 })

        .text(function (d, i) {
            return d.label
        })
        .call(wrap2, 40)
    name_med.style("text-anchor", "middle");

    var medicine_number = elemEnter.append("text")
        .attr("font-weight", function (d, i) { return 1000; })
        .text(function (d, i) {
                      return i + 1
        })
    medicine_number.style("text-anchor", "middle");


}
