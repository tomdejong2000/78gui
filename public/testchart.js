$(document).ready(function(){

var chart = new CanvasJS.Chart("chartContainer", {
    // Set up your chart options here
    axisX: {
      // Use xValueFormatString to format the x-axis label
      valueFormatString: "hh:mm:ss"
    },
    data: [{
      // Set up your chart data here
      type: "line",
      dataPoints: []
    }]
  });
  
  function pushDataPoint() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var timeString = hours + ":" + minutes + ":" + seconds;
  
    // Push a new data point to your CanvasJS chart with the current time as the x-value
    chart.options.data[0].dataPoints.push({ x: currentTime, y: 10 });
    chart.options.data[1].dataPoints.push({ x: currentTime, y: 40 });
    chart.options.data[2].dataPoints.push({ x: currentTime, y: 50 });
    // Call chart.render() to update the chart with the new data point
    chart.render();
  }
  
  // Call pushDataPoint every second to push a new data point to the chart
  setInterval(pushDataPoint, 1000);
  

});