console.log("chart")


$(document).ready(function(){

    
    var chart = new CanvasJS.Chart("chartContainer", {
        theme:"light2",
        animationEnabled: true,
        zoomEnabled: true,


        
        title:{
          text: "Windspeed of all 3 sensors"
        },
        axisY :{
          title: "windspeed(KM/H)",
          
        },
        axisX :{
          title: "time",
          valueFormatString: "hh:mm:ss"
        },
        toolTip: {
          shared: "true"
        },
        legend:{
          cursor:"pointer",
          itemclick : toggleDataSeries
        },
        data: [{
          type: "line",
          markerSize: 0,
          showInLegend: true,
          yValueFormatString: "##.##km/h",
          
          name: "sensor 1",
          lineThickness: 5,
          
          dataPoints: [
            
            
    
          ]
        },
        {
          type: "line", 
          markerSize: 0,
          showInLegend: true,
          yValueFormatString: "##.##km/h",
          name: "sensor 2",
          lineThickness: 5,
          dataPoints: [
            
          ]
        },
        {
          type: "line", 
          markerSize: 0,
          showInLegend: true,
          yValueFormatString: "##.##km/h",
          name: "sensor 3",
          lineThickness: 5,
          dataPoints: [
            
          ]
        }]
      });


      //check for session for darktheme
      if(sessionStorage.getItem("toggleValue") == "ON"){
        chart.set("backgroundColor", "#121212");
        chart.set("theme","dark2");
      }else{
        
      }
      chart.render();
      
      function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chart.render();
      }
    
      // let updatechart = function(){
    
      //   var length = chart.options.data[0].dataPoints.length;
      //   var currentTime = new Date();
      //   var hours = currentTime.getHours();
      //   var minutes = currentTime.getMinutes();
      //   var seconds = currentTime.getSeconds();
      //   var timeString = hours + ":" + minutes + ":" + seconds;

      //   chart.options.data[0].dataPoints.push({x:timeString, y: parseInt($(".sensor1").text())});
      //   chart.options.data[1].dataPoints.push({x:timeString, y: parseInt($(".sensor2").text())});
      //   chart.options.data[2].dataPoints.push({x:timeString, y: parseInt($(".sensor3").text())});
      //   chart.render();

        
      
      //   };

      //   setInterval(function() {updatechart();},1000)

      function pushDataPoint() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var timeString = hours + ":" + minutes + ":" + seconds;
      
        // Push a new data point to your CanvasJS chart with the current time as the x-value
        chart.options.data[0].dataPoints.push({ x: currentTime, y: parseFloat($(".sensor1").text()) });
        chart.options.data[1].dataPoints.push({ x: currentTime, y: parseFloat($(".sensor2").text()) });
        chart.options.data[2].dataPoints.push({ x: currentTime, y: parseFloat($(".sensor3").text()) });
        // Call chart.render() to update the chart with the new data point
        chart.render();
      }
      
      // Call pushDataPoint every second to push a new data point to the chart
      setInterval(pushDataPoint, 1000);



        $("#exportButton").click(function(){
          var pdf = new jsPDF('l', 'mm', [1500, 400]);
          var chartTheme = chart.get("theme");
          chart.set("theme", "light2");
          var canvas = $("#chartContainer .canvasjs-chart-canvas").get(0);
          var dataURL = canvas.toDataURL();
          chart.set("theme", chartTheme);
          pdf.addImage(dataURL, 'JPEG', 0, 0);
          pdf.save("chart.pdf");
      });


      //update graph realtime
      $( ".darktoggle" ).click(function() {
        if(sessionStorage.getItem("toggleValue")) {
          chart.set("backgroundColor", "#121212");
          chart.set("theme","dark2");
        }else{
          chart.set("backgroundColor", "#ffffff");
          chart.set("theme","light2");
        }




      })

})