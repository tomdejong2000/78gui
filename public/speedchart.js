console.log("chart")

$(document).ready(function(){

    var chart = new CanvasJS.Chart("chartContainer", {
        theme:"light2",
        animationEnabled: true,
        title:{
          text: "Windspeed of all 3 sensors"
        },
        axisY :{
          title: "windspeed",
          suffix: "km/h"
        },
        axisX :{
          suffix: "sec"
        },
        toolTip: {
          shared: "true"
        },
        legend:{
          cursor:"pointer",
          itemclick : toggleDataSeries
        },
        data: [{
          type: "spline",
          visible: true,
          showInLegend: true,
          yValueFormatString: "##km/h",
          name: "sensor 1",
          dataPoints: [
            
    
          ]
        },
        {
          type: "spline", 
          showInLegend: true,
          yValueFormatString: "##km/h",
          name: "sensor 2",
          dataPoints: [
            
          ]
        },
        {
          type: "spline", 
          showInLegend: true,
          yValueFormatString: "##km/h",
          name: "sensor 3",
          dataPoints: [
            
          ]
        }]
      });
      chart.render();
      
      function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chart.render();
      }
    
      let updatechart = function(){
    
        var length = chart.options.data[0].dataPoints.length;
        
        chart.options.data[0].dataPoints.push({ y: parseInt($(".sensor1").text())});
        chart.options.data[1].dataPoints.push({ y: parseInt($(".sensor2").text())});
        chart.options.data[2].dataPoints.push({ y: parseInt($(".sensor3").text())});
        chart.render();
      
        };

        setInterval(function() {updatechart();},1000)




})