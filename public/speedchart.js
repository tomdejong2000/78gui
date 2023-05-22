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
          title: "windspeed(M/S)",
          
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
          yValueFormatString: "##.##",
          
          name: "sensor 1",
          lineThickness: 5,
          
          dataPoints: [
            
            
    
          ]
        },
        {
          type: "line", 
          markerSize: 0,
          showInLegend: true,
          yValueFormatString: "##.##",
          name: "sensor 2",
          lineThickness: 5,
          dataPoints: [
            
          ]
        },
        {
          type: "line", 
          markerSize: 0,
          showInLegend: true,
          yValueFormatString: "##.##",
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
      setInterval(pushDataPoint, 500);



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

 
      

            // Initialize an empty map
      var myMap = new Map();

      // Function to generate a random key
      function generateRandomKey() {
        return Math.random().toString(36).substring(7);
      }

      // Function to generate a random value
      function generateRandomValue() {
        return Math.floor(Math.random() * 100);
      }

      // Function to add a random key-value pair to the map
      function addRandomKeyValuePair() {
        var randomKey = generateRandomKey();
        var randomValue = generateRandomValue();
        myMap.set(randomKey, randomValue);
      }
      function addToMap(){
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds()
        myMap.set(time, $(".sensor1").text());
      }


// Function to export the map as an XLSX file
function exportMapToXLSX() {
  // Create a new workbook
  var workbook = XLSX.utils.book_new();

  // Create a new worksheet
  var worksheet = XLSX.utils.json_to_sheet([...myMap.entries()]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Generate the XLSX file
  var xlsxFile = XLSX.write(workbook, { type: "binary" });

  // Convert the binary data to a Blob object
  var blob = new Blob([s2ab(xlsxFile)], { type: "application/octet-stream" });

  // Create a temporary download link
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Data.xlsx";

  // Trigger the download
  link.click();
}

// Helper function to convert string to ArrayBuffer
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

      // Add a random key-value pair every 3 seconds
      setInterval(function () {
        addToMap();
        
      }, 100);

      // Button click event handler
      $("#csvbutton").on("click", function () {
        exportMapToXLSX();
      });

})