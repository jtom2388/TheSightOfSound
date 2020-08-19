$(document).ready(function () {

   let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   let audioElement = document.getElementById('audioElement');
   let audioSrc = audioCtx.createMediaElementSource(audioElement);
   let analyser = audioCtx.createAnalyser();

   audioSrc.connect(analyser);
   audioSrc.connect(audioCtx.destination);

   let frequencyData = new Uint8Array(200);

   let svgHeight = '300';
   let svgWidth = '1200';
   let barPadding = '1';

   function createSvg(parent, height, width) {
   return d3.select(parent).append('svg').attr('height', height).attr('width', width);
   }

   let svg = createSvg('body', svgHeight, svgWidth);

   svg.selectAll('rect')
      .data(frequencyData)
      .enter()
      .append('rect')
      .attr('x', function (i) {
         return i * (svgWidth / frequencyData.length);
      })
      .attr('width', svgWidth / frequencyData.length - barPadding);

   function renderChart() {
      requestAnimationFrame(renderChart);

      analyser.getByteFrequencyData(frequencyData);

      svg.selectAll('rect')
         .data(frequencyData)
         .attr('y', function(d) {
            return svgHeight - d;
         })
         .attr('height', function(d) {
            return d;
         })
         .attr('fill', function(d) {
            return 'rgb(0, 0, ' + d + ')';
         });
   }

   renderChart();
  
});