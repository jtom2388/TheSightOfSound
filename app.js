$(document).ready(function() {
    let svgHeight = 100;
    let svgWidth = 600;
    let barPadding = 1;
    const graphData = [15, 25, 8, 13, 28, 11, 5, 9, 17, 20, 12, 6, 25, 16];

    function createSvg(parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    let graph = createSvg('#graph', svgHeight, svgWidth);

    graph.selectAll('rect').data(graphData).enter()
        .append('rect')
        .attr('width', svgWidth / graphData.length - barPadding)
        .attr('height', function(d) {
            return d * 4;
        })
        .attr('x', function(d, i) {
            return i * (svgWidth / graphData.length);
        })
        .attr('y', function(d) {
            return svgHeight - (d * 4);
        })
});