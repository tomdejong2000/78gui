console.log("kaas");

$(document).ready(function(){
  $(".hamburger-lines").click(function() {
      $(".line1").toggleClass("animated1");
      $(".line2").toggleClass("animated2");
      $(".line3").toggleClass("animated3");

      $(".nav").toggleClass("opened");
      $("body").toggleClass("stopscroll")

    });


  //fetch de data uit json object uit /data en stop dat in h2
  let fetchdata = function(){
    fetch('/sensordata').then(response => response.json()).then (jsonD => {

        $(".stat1").text(jsonD["sensor1"] + jsonD["sensor2"] + jsonD["sensor3"] /3)
        $(".stat2").text(jsonD["avgwinddirection"])
        $(".stat3").text(jsonD["sensordata"])
        $(".sensor1").text(jsonD["sensor1"])
        $(".sensor2").text(jsonD["sensor2"])
        $(".sensor3").text(jsonD["sensor3"])
    
        
      });
  }

  setInterval(function() {fetchdata();},100)

});

window.onload = function () {

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
      yValueFormatString: "##.00mn",
      name: "sensor 1",
      dataPoints: [
        { label: "Ep. 1", y: 2.22 },
        { label: "Ep. 2", y: 2.20 },
        { label: "Ep. 3", y: 2.44 },
        { label: "Ep. 4", y: 2.45 },
        { label: "Ep. 5", y: 2.58 },
        { label: "Ep. 6", y: 2.44 },
        { label: "Ep. 7", y: 2.40 },
        { label: "Ep. 8", y: 2.72 },
        { label: "Ep. 9", y: 2.66 },
        { label: "Ep. 10", y: 3.04 }
      ]
    },



  
    {
      type: "spline", 
      showInLegend: true,
      yValueFormatString: "##.00mn",
      name: "sensor 2",
      dataPoints: [
        { label: "Ep. 1", y: 7.94 },
        { label: "Ep. 2", y: 7.29 },
        { label: "Ep. 3", y: 7.28 },
        { label: "Ep. 4", y: 7.82 },
        { label: "Ep. 5", y: 7.89 },
        { label: "Ep. 6", y: 6.71 },
        { label: "Ep. 7", y: 7.80 },
        { label: "Ep. 8", y: 7.60 },
        { label: "Ep. 9", y: 7.66 },
        { label: "Ep. 10", y: 8.89 }
      ]
    },
    {
      type: "spline", 
      showInLegend: true,
      yValueFormatString: "##.00mn",
      name: "sensor 3",
      dataPoints: [
        { label: "Ep. 1", y: 10.11 },
        { label: "Ep. 2", y: 9.27 },
        { label: "Ep. 3", y: 9.25 },
        { label: "Ep. 4", y: 10.17 },
        { label: "Ep. 5", y: 10.72 },
        { label: "Ep. 6", y: 10.24 },
        { label: "Ep. 7", y: 12.07 }
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
  
  }