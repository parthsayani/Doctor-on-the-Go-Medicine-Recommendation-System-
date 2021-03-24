function update_line_chart(data) {
    $("#line_chart_title").html("Time-Series Chart For " + data);


    console.log(data)
    var elm = d3.select("#line");

    elm.selectAll("*").remove();
    var month_curr_disease_count = month_disease_count.filter(month_disease_count => {
        iterated_disease_replaced = month_disease_count.Disease.replace(", ", ",");

        return iterated_disease_replaced == data
    })
    data1 = data
    data = month_curr_disease_count
    console.log(data)

    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = $('#timeline').width() / 1.2,
        height = $('.wrapper').height() / 4
   

    var x = d3.scale.ordinal().rangePoints([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function (d) { return x(d.MonthName); })
        .y(function (d) { return y(d.count); });

  
    var svg = d3.select("#line").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data

    // Scale the range of the data
    x.domain(data.map(function (d) { return d.MonthName; }));
    y.domain([0, d3.max(data, function (d) { return d.count; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline)
        .style("stroke", function () { // Add dynamically
            return "black"
        })
        .attr("fill", "none");


    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    svg
        .append("text")
        .attr("class", "label")
        .attr("x", -(height / 2))
        //.attr("y", -30)
        .attr("y", -(width) / 25)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", '1em')

        .text("Number Of Reviews")

    svg.append("text")
        .attr("class", "label")
        .attr("x", width / 2)
        .attr("y", height + 30)
        .attr("text-anchor", "middle")
        .style("font-size", '1em')
        .text("Month")


}
