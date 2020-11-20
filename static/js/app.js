function buildGraphs(id) {
    d3.json("data/samples.json").then((data) => {
        console.log(data)

        // id values filter
        var sampleData = data.samples.filter(x => x.id.toString() === id)[0];
        console.log(sampleData);

        // Return top 10 values
        var sampleValues = sampleData.sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        // Return ids
        var IDname = sampleData.otu_ids.slice(0, 10).reverse();

        // map values

        var ID_OTU = IDname.map(y => "OTU " + y)
        console.log('OTU IDs: ${ID_OTU}')

        var OTUlabels = sampleData.otu_labels.slice(0, 10);

        console.log('Sample Values: ${sampleValues}')
        console.log('ID Values: ${IDname}')

        // horizontal plot
        var trace1 = {
            x: sampleValues,
            y: IDname,
            text: OTUlabels,
            type: 'bar',
            orientation: 'h'
            
        };

        var data2 = [trace1];

        var layout2 = {
            title: "10 Leading OTU Found",
            yaxis: {
                tickmode: 'linear',
            }
        };

        // Render horizontal plot
        Plotly.newPlot('bar', data2, layout2);

        // bubble chart
        var trace2 = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            mode: 'markers',
            text: sampleData.otu_labels,
            marker: {
                size: sampleData.sample_values,
                color: sampleData.otu_ids
            }
        }

        var layout3 = {
            xaxis: {title: 'OTU ID'},

        };

        var data3 = [trace2];

        Plotly.newPlot('bubble', data3, layout3);
    });
}

// Return values w/ ID

function buildGraphData(id) {
    d3.json("data/samples.json").then((data) =>{
        var demoData = data.metadata;

        console.log(demoData);

        // filter based on ID
        var metaFilter = demoData.filter( demo => demo.id.toString() === id)[0];

        var demoDataInfo = d3.select('#sample-metadata');

        demoDataInfo.html('');

        Object.entries(metaFilter).forEach((key) => {
            demoDataInfo.append('h5').text(key[0] + ": " + key[1] + '\n');
        });
    });
}

// function to change graph data and build graphs based on that data
function optionChanged(id) {
    buildGraphs(id);
    buildGraphData(id);

}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) => {
        console.log(data)

        //select id from dropdown
        data.names.forEach(function(name) {
            dropdown.append('option').text(name).property('value');
        });

        buildGraphs(data.names[0]);
        buildGraphData(data.names[0]);
    });
}

init();