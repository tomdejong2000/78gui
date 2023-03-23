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
          title: "runtime (SEC)",
          minimum: 1
          
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
          yValueFormatString: "##km/h",
          xValueFormatString: "## sec",
          name: "sensor 1",
          lineThickness: 5,
          
          dataPoints: [
            {x: 0, y:0}
            
    
          ]
        },
        {
          type: "line", 
          markerSize: 0,
          showInLegend: true,
          yValueFormatString: "##km/h",
          name: "sensor 2",
          lineThickness: 5,
          dataPoints: [
            {x: 0, y: 0}
          ]
        },
        {
          type: "line", 
          markerSize: 0,
          showInLegend: true,
          yValueFormatString: "##km/h",
          name: "sensor 3",
          lineThickness: 5,
          dataPoints: [
            {x: 0, y: 0}
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
    
      let updatechart = function(){
    
        var length = chart.options.data[0].dataPoints.length;
        
        chart.options.data[0].dataPoints.push({ y: parseInt($(".sensor1").text())});
        chart.options.data[1].dataPoints.push({ y: parseInt($(".sensor2").text())});
        chart.options.data[2].dataPoints.push({ y: parseInt($(".sensor3").text())});
        chart.render();
      
        };

        setInterval(function() {updatechart();},1000)



        $("#exportButton").click(function(){
          var pdf = new jsPDF('l', 'mm', [1500, 500]);
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