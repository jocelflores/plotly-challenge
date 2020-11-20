function buildGraphs(id) {
    d3.json("data/samples.json").then((data) => {
        console.log(data)

        // id values filter
        var filteredData = data.samples.filter(x => x.id.toString() === id)[0];
        console.log(filteredData);
    })
}